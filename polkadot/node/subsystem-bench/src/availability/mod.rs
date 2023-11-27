// Copyright (C) Parity Technologies (UK) Ltd.
// This file is part of Polkadot.

// Polkadot is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Polkadot is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Polkadot.  If not, see <http://www.gnu.org/licenses/>.
use itertools::Itertools;
use std::{
	collections::HashMap,
	iter::Cycle,
	ops::Sub,
	sync::Arc,
	time::{Duration, Instant},
};

use crate::TestEnvironment;
use polkadot_node_subsystem::{Overseer, OverseerConnector, SpawnGlue};
use polkadot_overseer::Handle as OverseerHandle;

use sc_network::request_responses::ProtocolConfig;

use colored::Colorize;

use futures::{channel::oneshot, stream::FuturesUnordered, StreamExt};
use polkadot_node_metrics::metrics::Metrics;

use polkadot_availability_recovery::AvailabilityRecoverySubsystem;

use crate::GENESIS_HASH;
use parity_scale_codec::Encode;
use polkadot_erasure_coding::{branches, obtain_chunks_v1 as obtain_chunks};
use polkadot_node_network_protocol::request_response::{IncomingRequest, ReqProtocolNames};
use polkadot_node_primitives::{BlockData, PoV, Proof};
use polkadot_node_subsystem::messages::{AllMessages, AvailabilityRecoveryMessage};

use crate::core::{
	environment::TestEnvironmentDependencies,
	mock::{
		av_store,
		network_bridge::{self, MockNetworkBridgeTx, NetworkAvailabilityState},
		runtime_api, MockAvailabilityStore, MockRuntimeApi,
	},
};

use super::core::{configuration::TestConfiguration, mock::dummy_builder, network::*};

const LOG_TARGET: &str = "subsystem-bench::availability";

use polkadot_node_primitives::{AvailableData, ErasureChunk};

use super::{cli::TestObjective, core::mock::AlwaysSupportsParachains};
use polkadot_node_subsystem_test_helpers::mock::new_block_import_info;
use polkadot_primitives::{
	CandidateHash, CandidateReceipt, GroupIndex, Hash, HeadData, PersistedValidationData,
	ValidatorIndex,
};
use polkadot_primitives_test_helpers::{dummy_candidate_receipt, dummy_hash};
use sc_service::SpawnTaskHandle;

mod cli;
pub mod configuration;
pub use cli::{DataAvailabilityReadOptions, NetworkEmulation, NetworkOptions};
pub use configuration::AvailabilityRecoveryConfiguration;

fn build_overseer(
	spawn_task_handle: SpawnTaskHandle,
	runtime_api: MockRuntimeApi,
	av_store: MockAvailabilityStore,
	network_bridge: MockNetworkBridgeTx,
	availability_recovery: AvailabilityRecoverySubsystem,
) -> (Overseer<SpawnGlue<SpawnTaskHandle>, AlwaysSupportsParachains>, OverseerHandle) {
	let overseer_connector = OverseerConnector::with_event_capacity(64000);
	let dummy = dummy_builder!(spawn_task_handle);
	let builder = dummy
		.replace_runtime_api(|_| runtime_api)
		.replace_availability_store(|_| av_store)
		.replace_network_bridge_tx(|_| network_bridge)
		.replace_availability_recovery(|_| availability_recovery);

	let (overseer, raw_handle) =
		builder.build_with_connector(overseer_connector).expect("Should not fail");

	(overseer, OverseerHandle::new(raw_handle))
}

/// Takes a test configuration and uses it to creates the `TestEnvironment`.
pub fn prepare_test(
	config: TestConfiguration,
	state: &mut TestState,
) -> (TestEnvironment, ProtocolConfig) {
	prepare_test_inner(config, state, TestEnvironmentDependencies::default())
}

/// Takes a test configuration and uses it to creates the `TestEnvironment`.
#[allow(unused)]
pub fn prepare_test_with_dependencies(
	config: TestConfiguration,
	state: &mut TestState,
	dependencies: TestEnvironmentDependencies,
) -> (TestEnvironment, ProtocolConfig) {
	prepare_test_inner(config, state, dependencies)
}

fn prepare_test_inner(
	config: TestConfiguration,
	state: &mut TestState,
	dependencies: TestEnvironmentDependencies,
) -> (TestEnvironment, ProtocolConfig) {
	// We need to first create the high level test state object.
	// This will then be decomposed into per subsystem states.
	let candidate_count = config.n_cores * config.num_blocks;
	state.generate_candidates(candidate_count);

	// Generate test authorities.
	let test_authorities = config.generate_authorities();

	let runtime_api = runtime_api::MockRuntimeApi::new(config.clone(), test_authorities.clone());

	let av_store =
		av_store::MockAvailabilityStore::new(state.chunks.clone(), state.candidate_hashes.clone());

	let availability_state = NetworkAvailabilityState {
		candidate_hashes: state.candidate_hashes.clone(),
		available_data: state.available_data.clone(),
		chunks: state.chunks.clone(),
	};

	let network = NetworkEmulator::new(
		config.n_validators.clone(),
		test_authorities.validator_authority_id,
		config.peer_bandwidth,
		dependencies.task_manager.spawn_handle(),
		&dependencies.registry,
	);

	let network_bridge_tx = network_bridge::MockNetworkBridgeTx::new(
		config.clone(),
		availability_state,
		network.clone(),
	);

	let use_fast_path = match &state.config().objective {
		TestObjective::DataAvailabilityRead(options) => options.fetch_from_backers,
		_ => panic!("Unexpected objective"),
	};

	let (collation_req_receiver, req_cfg) =
		IncomingRequest::get_config_receiver(&ReqProtocolNames::new(&GENESIS_HASH, None));

	let subsystem = if use_fast_path {
		AvailabilityRecoverySubsystem::with_fast_path(
			collation_req_receiver,
			Metrics::try_register(&dependencies.registry).unwrap(),
		)
	} else {
		AvailabilityRecoverySubsystem::with_chunks_only(
			collation_req_receiver,
			Metrics::try_register(&dependencies.registry).unwrap(),
		)
	};

	let (overseer, overseer_handle) = build_overseer(
		dependencies.task_manager.spawn_handle(),
		runtime_api,
		av_store,
		network_bridge_tx,
		subsystem,
	);

	(TestEnvironment::new(dependencies, config, network, overseer, overseer_handle), req_cfg)
}

#[derive(Clone)]
pub struct TestState {
	// Full test configuration
	config: TestConfiguration,
	pov_sizes: Cycle<std::vec::IntoIter<usize>>,
	// Generated candidate receipts to be used in the test
	candidates: Cycle<std::vec::IntoIter<CandidateReceipt>>,
	// Map from pov size to candidate index
	pov_size_to_candidate: HashMap<usize, usize>,
	// Map from generated candidate hashes to candidate index in `available_data`
	// and `chunks`.
	candidate_hashes: HashMap<CandidateHash, usize>,

	candidate_receipts: Vec<CandidateReceipt>,
	available_data: Vec<AvailableData>,
	chunks: Vec<Vec<ErasureChunk>>,
}

impl TestState {
	fn config(&self) -> &TestConfiguration {
		&self.config
	}

	pub fn next_candidate(&mut self) -> Option<CandidateReceipt> {
		let candidate = self.candidates.next();
		let candidate_hash = candidate.as_ref().unwrap().hash();
		gum::trace!(target: LOG_TARGET, "Next candidate selected {:?}", candidate_hash);
		candidate
	}

	/// Generate candidates to be used in the test.
	pub fn generate_candidates(&mut self, count: usize) {
		gum::info!(target: LOG_TARGET,"{}", format!("Pre-generating {} candidates.", count).bright_blue());

		// Generate all candidates
		self.candidates = (0..count)
			.map(|index| {
				let pov_size = self.pov_sizes.next().expect("This is a cycle; qed");
				let candidate_index = *self
					.pov_size_to_candidate
					.get(&pov_size)
					.expect("pov_size always exists; qed");
				let mut candidate_receipt = self.candidate_receipts[candidate_index].clone();

				// Make it unique.
				candidate_receipt.descriptor.relay_parent = Hash::from_low_u64_be(index as u64);
				// Store the new candidate in the state
				self.candidate_hashes.insert(candidate_receipt.hash(), candidate_index);

				gum::debug!(target: LOG_TARGET, candidate_hash = ?candidate_receipt.hash(), "new candidate");

				candidate_receipt
			})
			.collect::<Vec<_>>()
			.into_iter()
			.cycle();
	}

	pub fn new(config: &TestConfiguration) -> Self {
		let config = config.clone();

		let mut chunks = Vec::new();
		let mut available_data = Vec::new();
		let mut candidate_receipts = Vec::new();
		let mut pov_size_to_candidate = HashMap::new();

		// we use it for all candidates.
		let persisted_validation_data = PersistedValidationData {
			parent_head: HeadData(vec![7, 8, 9]),
			relay_parent_number: Default::default(),
			max_pov_size: 1024,
			relay_parent_storage_root: Default::default(),
		};

		// For each unique pov we create a candidate receipt.
		for (index, pov_size) in config.pov_sizes().iter().cloned().unique().enumerate() {
			gum::info!(target: LOG_TARGET, index, pov_size, "{}", "Generating template candidate".bright_blue());

			let mut candidate_receipt = dummy_candidate_receipt(dummy_hash());
			let pov = PoV { block_data: BlockData(vec![index as u8; pov_size]) };

			let new_available_data = AvailableData {
				validation_data: persisted_validation_data.clone(),
				pov: Arc::new(pov),
			};

			let (new_chunks, erasure_root) = derive_erasure_chunks_with_proofs_and_root(
				config.n_validators,
				&new_available_data,
				|_, _| {},
			);

			candidate_receipt.descriptor.erasure_root = erasure_root;

			chunks.push(new_chunks);
			available_data.push(new_available_data);
			pov_size_to_candidate.insert(pov_size, index);
			candidate_receipts.push(candidate_receipt);
		}

		let pov_sizes = config.pov_sizes().to_vec().into_iter().cycle();
		gum::info!(target: LOG_TARGET, "{}","Created test environment.".bright_blue());

		Self {
			config,
			available_data,
			candidate_receipts,
			chunks,
			pov_size_to_candidate,
			pov_sizes,
			candidate_hashes: HashMap::new(),
			candidates: Vec::new().into_iter().cycle(),
		}
	}
}

fn derive_erasure_chunks_with_proofs_and_root(
	n_validators: usize,
	available_data: &AvailableData,
	alter_chunk: impl Fn(usize, &mut Vec<u8>),
) -> (Vec<ErasureChunk>, Hash) {
	let mut chunks: Vec<Vec<u8>> = obtain_chunks(n_validators, available_data).unwrap();

	for (i, chunk) in chunks.iter_mut().enumerate() {
		alter_chunk(i, chunk)
	}

	// create proofs for each erasure chunk
	let branches = branches(chunks.as_ref());

	let root = branches.root();
	let erasure_chunks = branches
		.enumerate()
		.map(|(index, (proof, chunk))| ErasureChunk {
			chunk: chunk.to_vec(),
			index: ValidatorIndex(index as _),
			proof: Proof::try_from(proof).unwrap(),
		})
		.collect::<Vec<ErasureChunk>>();

	(erasure_chunks, root)
}

pub async fn bench_chunk_recovery(env: &mut TestEnvironment, mut state: TestState) {
	let config = env.config().clone();

	env.import_block(new_block_import_info(Hash::repeat_byte(1), 1)).await;

	let start_marker = Instant::now();
	let mut batch = FuturesUnordered::new();
	let mut availability_bytes = 0u128;

	env.metrics().set_n_validators(config.n_validators);
	env.metrics().set_n_cores(config.n_cores);

	for block_num in 0..env.config().num_blocks {
		gum::info!(target: LOG_TARGET, "Current block {}/{}", block_num + 1, env.config().num_blocks);
		env.metrics().set_current_block(block_num);

		let block_start_ts = Instant::now();
		for candidate_num in 0..config.n_cores as u64 {
			let candidate =
				state.next_candidate().expect("We always send up to n_cores*num_blocks; qed");
			let (tx, rx) = oneshot::channel();
			batch.push(rx);

			let message = AllMessages::AvailabilityRecovery(
				AvailabilityRecoveryMessage::RecoverAvailableData(
					candidate.clone(),
					1,
					Some(GroupIndex(
						candidate_num as u32 % (std::cmp::max(5, config.n_cores) / 5) as u32,
					)),
					tx,
				),
			);
			env.send_message(message).await;
		}

		gum::info!("{}", format!("{} recoveries pending", batch.len()).bright_black());
		while let Some(completed) = batch.next().await {
			let available_data = completed.unwrap().unwrap();
			env.metrics().on_pov_size(available_data.encoded_size());
			availability_bytes += available_data.encoded_size() as u128;
		}

		let block_time_delta =
			Duration::from_secs(6).saturating_sub(Instant::now().sub(block_start_ts));

		let block_time = Instant::now().sub(block_start_ts).as_millis() as u64;
		env.metrics().set_block_time(block_time);
		gum::info!("Block time {}", format!("{:?}ms", block_time).cyan());
		gum::info!(target: LOG_TARGET,"{}", format!("Sleeping till end of block ({}ms)", block_time_delta.as_millis()).bright_black());
		tokio::time::sleep(block_time_delta).await;
	}

	env.stop().await;

	let duration: u128 = start_marker.elapsed().as_millis();
	let availability_bytes = availability_bytes / 1024;
	gum::info!("All blocks processed in {}", format!("{:?}ms", duration).cyan());
	gum::info!(
		"Throughput: {}",
		format!("{} KiB/block", availability_bytes / env.config().num_blocks as u128).bright_red()
	);
	gum::info!(
		"Block time: {}",
		format!("{} ms", start_marker.elapsed().as_millis() / env.config().num_blocks as u128)
			.red()
	);

	let stats = env.network().stats();
	gum::info!(
		"Total received from network: {}",
		format!(
			"{} MiB",
			stats
				.iter()
				.enumerate()
				.map(|(_index, stats)| stats.tx_bytes_total as u128)
				.sum::<u128>() / (1024 * 1024)
		)
		.cyan()
	);

	let test_metrics = super::core::display::parse_metrics(&env.registry());
	let subsystem_cpu_metrics =
		test_metrics.subset_with_label_value("task_group", "availability-recovery");
	let total_cpu = subsystem_cpu_metrics.sum_by("substrate_tasks_polling_duration_sum");
	gum::info!(target: LOG_TARGET, "Total subsystem CPU usage {}", format!("{:.2}s", total_cpu).bright_purple());
	gum::info!(target: LOG_TARGET, "CPU usage per block {}", format!("{:.2}s", total_cpu/env.config().num_blocks as f64).bright_purple());

	let test_env_cpu_metrics =
		test_metrics.subset_with_label_value("task_group", "test-environment");
	let total_cpu = test_env_cpu_metrics.sum_by("substrate_tasks_polling_duration_sum");
	gum::info!(target: LOG_TARGET, "Total test environment CPU usage {}", format!("{:.2}s", total_cpu).bright_purple());
	gum::info!(target: LOG_TARGET, "CPU usage per block {}", format!("{:.2}s", total_cpu/env.config().num_blocks as f64).bright_purple());
}

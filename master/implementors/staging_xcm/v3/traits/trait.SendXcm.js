(function() {var implementors = {
"asset_hub_rococo_integration_tests":[],
"asset_hub_westend_integration_tests":[],
"bridge_hub_rococo_integration_tests":[],
"bridge_hub_westend_integration_tests":[],
"cumulus_pallet_xcmp_queue":[["impl&lt;T: <a class=\"trait\" href=\"cumulus_pallet_xcmp_queue/pallet/trait.Config.html\" title=\"trait cumulus_pallet_xcmp_queue::pallet::Config\">Config</a>&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"cumulus_pallet_xcmp_queue/pallet/struct.Pallet.html\" title=\"struct cumulus_pallet_xcmp_queue::pallet::Pallet\">Pallet</a>&lt;T&gt;"]],
"cumulus_primitives_core":[],
"cumulus_primitives_utility":[["impl&lt;T, W, P&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"cumulus_primitives_utility/struct.ParentAsUmp.html\" title=\"struct cumulus_primitives_utility::ParentAsUmp\">ParentAsUmp</a>&lt;T, W, P&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"cumulus_primitives_core/trait.UpwardMessageSender.html\" title=\"trait cumulus_primitives_core::UpwardMessageSender\">UpwardMessageSender</a>,\n    W: <a class=\"trait\" href=\"staging_xcm/trait.WrapVersion.html\" title=\"trait staging_xcm::WrapVersion\">WrapVersion</a>,\n    P: <a class=\"trait\" href=\"polkadot_runtime_common/xcm_sender/trait.PriceForMessageDelivery.html\" title=\"trait polkadot_runtime_common::xcm_sender::PriceForMessageDelivery\">PriceForMessageDelivery</a>&lt;Id = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.73.0/std/primitive.unit.html\">()</a>&gt;,</span>"]],
"pallet_contracts_mock_network":[["impl&lt;T: Get&lt;<a class=\"struct\" href=\"polkadot_parachain_primitives/primitives/struct.Id.html\" title=\"struct polkadot_parachain_primitives::primitives::Id\">ParaId</a>&gt;&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"pallet_contracts_mock_network/struct.ParachainXcmRouter.html\" title=\"struct pallet_contracts_mock_network::ParachainXcmRouter\">ParachainXcmRouter</a>&lt;T&gt;"],["impl <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"pallet_contracts_mock_network/struct.RelayChainXcmRouter.html\" title=\"struct pallet_contracts_mock_network::RelayChainXcmRouter\">RelayChainXcmRouter</a>"]],
"pallet_xcm_bridge_hub_router":[["impl&lt;T: <a class=\"trait\" href=\"pallet_xcm_bridge_hub_router/pallet/trait.Config.html\" title=\"trait pallet_xcm_bridge_hub_router::pallet::Config\">Config</a>&lt;I&gt;, I: 'static&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"pallet_xcm_bridge_hub_router/pallet/struct.Pallet.html\" title=\"struct pallet_xcm_bridge_hub_router::pallet::Pallet\">Pallet</a>&lt;T, I&gt;"]],
"polkadot_runtime_common":[["impl&lt;T: <a class=\"trait\" href=\"polkadot_runtime_parachains/configuration/pallet/trait.Config.html\" title=\"trait polkadot_runtime_parachains::configuration::pallet::Config\">Config</a> + <a class=\"trait\" href=\"polkadot_runtime_parachains/dmp/pallet/trait.Config.html\" title=\"trait polkadot_runtime_parachains::dmp::pallet::Config\">Config</a>, W: <a class=\"trait\" href=\"staging_xcm/trait.WrapVersion.html\" title=\"trait staging_xcm::WrapVersion\">WrapVersion</a>, P&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"polkadot_runtime_common/xcm_sender/struct.ChildParachainRouter.html\" title=\"struct polkadot_runtime_common::xcm_sender::ChildParachainRouter\">ChildParachainRouter</a>&lt;T, W, P&gt;<span class=\"where fmt-newline\">where\n    P: <a class=\"trait\" href=\"polkadot_runtime_common/xcm_sender/trait.PriceForMessageDelivery.html\" title=\"trait polkadot_runtime_common::xcm_sender::PriceForMessageDelivery\">PriceForMessageDelivery</a>&lt;Id = <a class=\"struct\" href=\"polkadot_parachain_primitives/primitives/struct.Id.html\" title=\"struct polkadot_parachain_primitives::primitives::Id\">Id</a>&gt;,</span>"]],
"polkadot_test_runtime":[["impl <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"polkadot_test_runtime/xcm_config/struct.DoNothingRouter.html\" title=\"struct polkadot_test_runtime::xcm_config::DoNothingRouter\">DoNothingRouter</a>"]],
"staging_xcm":[],
"staging_xcm_builder":[["impl&lt;Inner: <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a>&gt; <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"staging_xcm_builder/struct.WithUniqueTopic.html\" title=\"struct staging_xcm_builder::WithUniqueTopic\">WithUniqueTopic</a>&lt;Inner&gt;"],["impl&lt;Exporter: ExportXcm, UniversalLocation: Get&lt;<a class=\"type\" href=\"staging_xcm_builder/test_utils/type.InteriorMultiLocation.html\" title=\"type staging_xcm_builder::test_utils::InteriorMultiLocation\">InteriorMultiLocation</a>&gt;&gt; <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"staging_xcm_builder/struct.UnpaidLocalExporter.html\" title=\"struct staging_xcm_builder::UnpaidLocalExporter\">UnpaidLocalExporter</a>&lt;Exporter, UniversalLocation&gt;"],["impl&lt;Inner: <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a>, TopicSource: SourceTopic&gt; <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"staging_xcm_builder/struct.WithTopicSource.html\" title=\"struct staging_xcm_builder::WithTopicSource\">WithTopicSource</a>&lt;Inner, TopicSource&gt;"],["impl&lt;Bridges: <a class=\"trait\" href=\"staging_xcm_builder/trait.ExporterFor.html\" title=\"trait staging_xcm_builder::ExporterFor\">ExporterFor</a>, Router: <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a>, UniversalLocation: Get&lt;<a class=\"type\" href=\"staging_xcm_builder/test_utils/type.InteriorMultiLocation.html\" title=\"type staging_xcm_builder::test_utils::InteriorMultiLocation\">InteriorMultiLocation</a>&gt;&gt; <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"staging_xcm_builder/struct.SovereignPaidRemoteExporter.html\" title=\"struct staging_xcm_builder::SovereignPaidRemoteExporter\">SovereignPaidRemoteExporter</a>&lt;Bridges, Router, UniversalLocation&gt;"],["impl&lt;Bridges: <a class=\"trait\" href=\"staging_xcm_builder/trait.ExporterFor.html\" title=\"trait staging_xcm_builder::ExporterFor\">ExporterFor</a>, Router: <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a>, UniversalLocation: Get&lt;<a class=\"type\" href=\"staging_xcm_builder/test_utils/type.InteriorMultiLocation.html\" title=\"type staging_xcm_builder::test_utils::InteriorMultiLocation\">InteriorMultiLocation</a>&gt;&gt; <a class=\"trait\" href=\"staging_xcm_builder/test_utils/trait.SendXcm.html\" title=\"trait staging_xcm_builder::test_utils::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"staging_xcm_builder/struct.UnpaidRemoteExporter.html\" title=\"struct staging_xcm_builder::UnpaidRemoteExporter\">UnpaidRemoteExporter</a>&lt;Bridges, Router, UniversalLocation&gt;"]],
"xcm_fuzzer":[["impl <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"xcm_fuzzer/struct.RelayChainXcmRouter.html\" title=\"struct xcm_fuzzer::RelayChainXcmRouter\">RelayChainXcmRouter</a>"],["impl&lt;T: Get&lt;<a class=\"struct\" href=\"polkadot_parachain_primitives/primitives/struct.Id.html\" title=\"struct polkadot_parachain_primitives::primitives::Id\">ParaId</a>&gt;&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"xcm_fuzzer/struct.ParachainXcmRouter.html\" title=\"struct xcm_fuzzer::ParachainXcmRouter\">ParachainXcmRouter</a>&lt;T&gt;"]],
"xcm_simulator":[],
"xcm_simulator_example":[["impl <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"xcm_simulator_example/struct.RelayChainXcmRouter.html\" title=\"struct xcm_simulator_example::RelayChainXcmRouter\">RelayChainXcmRouter</a>"],["impl&lt;T: Get&lt;<a class=\"struct\" href=\"polkadot_parachain_primitives/primitives/struct.Id.html\" title=\"struct polkadot_parachain_primitives::primitives::Id\">ParaId</a>&gt;&gt; <a class=\"trait\" href=\"staging_xcm/v3/traits/trait.SendXcm.html\" title=\"trait staging_xcm::v3::traits::SendXcm\">SendXcm</a> for <a class=\"struct\" href=\"xcm_simulator_example/struct.ParachainXcmRouter.html\" title=\"struct xcm_simulator_example::ParachainXcmRouter\">ParachainXcmRouter</a>&lt;T&gt;"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()
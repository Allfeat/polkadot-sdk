(function() {var implementors = {
"kitchensink_runtime":[["impl <a class=\"trait\" href=\"pallet_asset_tx_payment/payment/trait.HandleCredit.html\" title=\"trait pallet_asset_tx_payment::payment::HandleCredit\">HandleCredit</a>&lt;&lt;&lt;<a class=\"enum\" href=\"sp_runtime/enum.MultiSignature.html\" title=\"enum sp_runtime::MultiSignature\">MultiSignature</a> as <a class=\"trait\" href=\"sp_runtime/traits/trait.Verify.html\" title=\"trait sp_runtime::traits::Verify\">Verify</a>&gt;::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.Verify.html#associatedtype.Signer\" title=\"type sp_runtime::traits::Verify::Signer\">Signer</a> as <a class=\"trait\" href=\"sp_runtime/traits/trait.IdentifyAccount.html\" title=\"trait sp_runtime::traits::IdentifyAccount\">IdentifyAccount</a>&gt;::<a class=\"associatedtype\" href=\"sp_runtime/traits/trait.IdentifyAccount.html#associatedtype.AccountId\" title=\"type sp_runtime::traits::IdentifyAccount::AccountId\">AccountId</a>, Pallet&lt;<a class=\"struct\" href=\"kitchensink_runtime/struct.Runtime.html\" title=\"struct kitchensink_runtime::Runtime\">Runtime</a>, <a class=\"struct\" href=\"frame_support/instances/struct.Instance1.html\" title=\"struct frame_support::instances::Instance1\">Instance1</a>&gt;&gt; for <a class=\"struct\" href=\"kitchensink_runtime/impls/struct.CreditToBlockAuthor.html\" title=\"struct kitchensink_runtime::impls::CreditToBlockAuthor\">CreditToBlockAuthor</a>"]],
"pallet_asset_tx_payment":[],
"parachains_common":[["impl&lt;R, I&gt; <a class=\"trait\" href=\"pallet_asset_tx_payment/payment/trait.HandleCredit.html\" title=\"trait pallet_asset_tx_payment::payment::HandleCredit\">HandleCredit</a>&lt;&lt;R as <a class=\"trait\" href=\"frame_system/pallet/trait.Config.html\" title=\"trait frame_system::pallet::Config\">Config</a>&gt;::<a class=\"associatedtype\" href=\"frame_system/pallet/trait.Config.html#associatedtype.AccountId\" title=\"type frame_system::pallet::Config::AccountId\">AccountId</a>, Pallet&lt;R, I&gt;&gt; for <a class=\"struct\" href=\"parachains_common/impls/struct.AssetsToBlockAuthor.html\" title=\"struct parachains_common::impls::AssetsToBlockAuthor\">AssetsToBlockAuthor</a>&lt;R, I&gt;<span class=\"where fmt-newline\">where\n    I: 'static,\n    R: Config + Config&lt;I&gt;,\n    <a class=\"type\" href=\"parachains_common/impls/type.AccountIdOf.html\" title=\"type parachains_common::impls::AccountIdOf\">AccountIdOf</a>&lt;R&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"type\" href=\"polkadot_core_primitives/type.AccountId.html\" title=\"type polkadot_core_primitives::AccountId\">AccountId</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"type\" href=\"polkadot_core_primitives/type.AccountId.html\" title=\"type polkadot_core_primitives::AccountId\">AccountId</a>&gt;,</span>"]],
"penpal_runtime":[["impl&lt;R&gt; <a class=\"trait\" href=\"pallet_asset_tx_payment/payment/trait.HandleCredit.html\" title=\"trait pallet_asset_tx_payment::payment::HandleCredit\">HandleCredit</a>&lt;&lt;R as <a class=\"trait\" href=\"frame_system/pallet/trait.Config.html\" title=\"trait frame_system::pallet::Config\">Config</a>&gt;::<a class=\"associatedtype\" href=\"frame_system/pallet/trait.Config.html#associatedtype.AccountId\" title=\"type frame_system::pallet::Config::AccountId\">AccountId</a>, <a class=\"struct\" href=\"pallet_assets/pallet/struct.Pallet.html\" title=\"struct pallet_assets::pallet::Pallet\">Pallet</a>&lt;R, <a class=\"struct\" href=\"frame_support/instances/struct.Instance1.html\" title=\"struct frame_support::instances::Instance1\">Instance1</a>&gt;&gt; for <a class=\"struct\" href=\"penpal_runtime/xcm_config/struct.AssetsToBlockAuthor.html\" title=\"struct penpal_runtime::xcm_config::AssetsToBlockAuthor\">AssetsToBlockAuthor</a>&lt;R&gt;<span class=\"where fmt-newline\">where\n    R: <a class=\"trait\" href=\"pallet_authorship/pallet/trait.Config.html\" title=\"trait pallet_authorship::pallet::Config\">Config</a> + <a class=\"trait\" href=\"pallet_assets/pallet/trait.Config.html\" title=\"trait pallet_assets::pallet::Config\">Config</a>&lt;<a class=\"struct\" href=\"frame_support/instances/struct.Instance1.html\" title=\"struct frame_support::instances::Instance1\">Instance1</a>&gt;,\n    <a class=\"type\" href=\"penpal_runtime/xcm_config/type.AccountIdOf.html\" title=\"type penpal_runtime::xcm_config::AccountIdOf\">AccountIdOf</a>&lt;R&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"type\" href=\"polkadot_core_primitives/type.AccountId.html\" title=\"type polkadot_core_primitives::AccountId\">AccountId</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"type\" href=\"polkadot_core_primitives/type.AccountId.html\" title=\"type polkadot_core_primitives::AccountId\">AccountId</a>&gt;,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()
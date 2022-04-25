---
layout: page-bp
title: Setting fees
description: Setting fees
---
# Setting fees

Block producers are responsible for setting FIO Chain fees. Fees are set by BPs in the following way:

* Top 21 BPs submit fee votes using these two calls. Both calls have to be executed before a vote is valid.
   * Fee ratios using [/submit_fee_ratios]({{site.baseurl}}/pages/api/fio-api/#options-setfeevote) call (can be made no more than once every 3600 seconds) - this defines ratios between fees. It takes a number for every endpoint. It can be any number, but a good rule of thumb is to set this number to equivalent value in another currency and add 9 zeros. For example, if you want register_fio_address to cost 2 USD, set it to 2000000000.
   * Fee multiplier using [/submit_fee_multiplier]({{site.baseurl}}/pages/api/fio-api/#options-setfeemult) call (can be made no more than once every 120 seconds) - this defines the number which will be multiplied by the ratio for a specific endpoint to create an actual fee amount in SUF. The multiplier is intended to allow BPs to easily adjust fees as rate of exchange of FIO token changes. It can be any number, but a good rule of thumb is to set this number of FIO tokens inside the unit of currency used in fee ratios. For example, if 1 FIO = $0.05, set this to 20.
* Once received, the fee in SUFs is computed by multiplying ratio by multiplier. For example, register_fio_domain = 2000000000 x 20 = 40000000000 SUFs or 40 FIO.
* After each submission, the fee is then added to a list of fees submitted by elected block producers and a live fee is determined by deriving a median of all submissions for particular fee. Example
   * Submissions from 3 BPs:
      * BP1: 40000000000
      * BP2: 50000000000
      * BP3: 1000000000000
   * Fee is set to 50000000000
* If a BP is removed from elected BPs list, their submissions are removed from consideration at the next time a fee is computed, unless there are no other submission for that type of fee.
* In order for a fee to be updated there should be at least 15 valid votes for any end point.

#### Example

The following table is an example of setting fee ratios and multipliers. In this case, we have a formula for our multiplier based on the dollar value of FIO.

For this example we will assume an exchange rate of FIO:
* 1 FIO = $0.20

Using the rule of thumb above, we set the multiplier based on the exchange rate:
* multiplier = $1.00 / Price of FIO = $1.00 / $0.20 = 5

Using /add_bundled_transactions as an example:
* Set the value of: /add_bundled_transactions = 2000000000 
* This results in a FIO fee of: 2000000000 * 5 = 10.000000000 FIO
* Which results in a USD fee of: 10.000000000 * $0.20 = $2.00 USD

|end_point |value |Fee FIO |Fee USD|
|---|---|---|---|
|/add_bundled_transactions |2000000000 |10.000000000 |$2.00 |
|/add_nft |30000000 |0.150000000 |$0.03 |
|/add_pub_address |30000000 |0.150000000 |$0.03 |
|/auth_delete |20000000 |0.100000000 |$0.02 |
|/auth_link |20000000 |0.100000000 |$0.02 |
|/auth_update |50000000 |0.250000000 |$0.05, charged per 1,000 bytes |
|/burn_fio_address |60000000 |0.300000000 |$0.06  |
|/buy_domain |20000000 |0.100000000 |$0.02 |
|/cancel_funds_request |60000000 |0.300000000 |$0.06  |
|/cancel_list_domain |20000000 |0.100000000 |$0.02 |
|/list_domain |30000000 |0.150000000 |$0.03 |
|/msig_approve |20000000 |0.100000000 |$0.02 |
|/msig_cancel |20000000 |0.100000000 |$0.02 |
|/msig_exec |20000000 |0.100000000 |$0.02 |
|/msig_invalidate |20000000 |0.100000000 |$0.02 |
|/msig_propose |50000000 |0.250000000 |$0.05, charged per 1,000 bytes |
|/msig_unapprove |20000000 |0.100000000 |$0.02 |
|/new_funds_request |60000000 |0.300000000 |$0.06 |
|/proxy_vote |30000000 |0.150000000 |$0.03 |
|/record_obt_data  |60000000 |0.300000000 |$0.06 |
|/register_fio_address |2000000000 |10.000000000 |$2.00 |
|/register_fio_domain |40000000000 |200.000000000 |$40.00 |
|/register_producer |10000000000 |50.000000000 |$10.00 |
|/register_proxy |1000000000 |5.000000000 |$1.00 |
|/reject_funds_request |30000000 |0.150000000 |$0.03 |
|/remove_all_nfts |30000000 |0.150000000 |$0.03 |
|/remove_all_pub_addresses|60000000 |.300000000 |$0.06 |
|/remove_nft |60000000 |0.300000000 |$0.06|
|/remove_pub_address |30000000 |0.150000000 |$0.03 |
|/renew_fio_address (deprecated) |2000000000 |10.000000000 |$2.00 |
|/renew_fio_domain  |40000000000 |200.000000000 |$40.00 |
|/set_fio_domain_public |30000000 |0.150000000 |$0.03 |
|/set_marketplace_config |30000000 |0.150000000 |$0.03 |
|/stake_fio_tokens |30000000 |0.150000000 |$0.03 |
|/submit_bundled_transactions |10000000 |0.150000000 |$0.03 |
|/submit_fee_multiplier |30000000 |0.150000000 |$0.03 |
|/submit_fee_ratios |30000000 |0.150000000 |$0.03 |
|/transfer_fio_address |60000000 |0.300000000 |$0.06 |
|/transfer_fio_domain  |100000000 |0.500000000  |$0.10 |
|/transfer_locked_tokens |300000000 |1.500000000 |$0.30 |
|/transfer_tokens_pub_key |100000000 |0.500000000  |$0.10 |
|/unregister_producer |20000000 |0.100000000 |$0.02 |
|/unregister_proxy  |20000000 |0.100000000 |$0.02 |
|/unstake_fio_tokens |30000000 |0.150000000 |$0.03 |
|/vote_producer |30000000 |0.150000000 |$0.03 |


---
## Setting Fee Ratios

{% include alert.html type="info" title="Fee ratios are stable" content="You should only need to set fee ratios when a new fee is added, or you want to adjust the relative cost of an action. Once the fee ratios are set, you should use the multiplier to ensure the fees are aliged with the current FIO rate of exchange." %}

#### Setting Fee Ratios using the API

The following data can be used with [setfeevote]({{site.baseurl}}/pages/api/fio-api/#options-setfeevote) to set fee ratios to the values in the example above.

```
{
	"fee_ratios": [
		{
			"end_point": "add_bundled_transactions",
			"value": 2000000000
		},
		{
			"end_point": "add_nft",
			"value": 30000000
		},
		{
			"end_point": "add_pub_address",
			"value": 30000000
		},
		{
			"end_point": "auth_delete",
			"value": 20000000
		},
		{
			"end_point": "auth_link",
			"value": 20000000
		},
		{
			"end_point": "auth_update",
			"value": 20000000
		},
		{
			"end_point": "burn_fio_address",
			"value": 60000000
		},
		{
			"end_point": "buy_domain",
			"value": 20000000
		},
		{
			"end_point": "cancel_funds_request",
			"value": 60000000
		},
		{
			"end_point": "cancel_list_domain",
			"value": 20000000
		},
		{
			"end_point": "list_domain",
			"value": 30000000
		},
		{
			"end_point": "msig_approve",
			"value": 20000000
		},
		{
			"end_point": "msig_cancel",
			"value": 20000000
		},
		{
			"end_point": "msig_exec",
			"value": 20000000
		},
		{
			"end_point": "msig_invalidate",
			"value": 20000000
		},
		{
			"end_point": "msig_propose",
			"value": 50000000
		},
		{
			"end_point": "msig_unapprove",
			"value": 20000000
		},
		{
			"end_point": "new_funds_request",
			"value": 60000000
		},
		{
			"end_point": "proxy_vote",
			"value": 30000000
		},
		{
			"end_point": "record_obt_data",
			"value": 60000000
		},
		{
			"end_point": "register_fio_address",
			"value": 2000000000
		},
		{
			"end_point": "register_fio_domain",
			"value": 40000000000
		},
		{
			"end_point": "register_producer",
			"value": 10000000000
		},
		{
			"end_point": "register_proxy",
			"value": 1000000000
		},
		{
			"end_point": "reject_funds_request",
			"value": 30000000
		},
		{
			"end_point": "remove_all_nfts",
			"value": 30000000
		},
		{
			"end_point": "remove_all_pub_addresses",
			"value": 60000000
		},
		{
			"end_point": "remove_nft",
			"value": 30000000
		},
		{
			"end_point": "remove_pub_address",
			"value": 30000000
		},
		{
			"end_point": "renew_fio_address",
			"value": 2000000000
		},
		{
			"end_point": "renew_fio_domain",
			"value": 40000000000
		},
		{
			"end_point": "set_fio_domain_public",
			"value": 30000000
		},
		{
			"end_point": "set_marketplace_config",
			"value": 30000000
		},
		{
			"end_point": "stake_fio_tokens",
			"value": 30000000
		},
		{
			"end_point": "submit_bundled_transactions",
			"value": 10000000
		},
		{
			"end_point": "submit_fee_multiplier",
			"value": 10000000
		},
		{
			"end_point": "submit_fee_ratios",
			"value": 10000000
		},
		{
			"end_point": "transfer_fio_address",
			"value": 60000000
		},
		{
			"end_point": "transfer_fio_domain",
			"value": 100000000
		},
		{
			"end_point": "transfer_locked_tokens",
			"value": 300000000
		},
		{
			"end_point": "transfer_tokens_pub_key",
			"value": 100000000
		},
		{
			"end_point": "unregister_producer",
			"value": 20000000
		},
		{
			"end_point": "unregister_proxy",
			"value": 20000000
		},
		{
			"end_point": "unstake_fio_tokens",
			"value": 30000000
		},
		{
			"end_point": "vote_producer",
			"value": 30000000
		}
	],
	"actor": "BP_ACTOR"
}
```

#### Setting fee ratios with clio

```sh

clio -u https://API_NODE_URL push action fio.fee setfeevote '{"fee_ratios":[{"end_point": "add_bundled_transactions","value": 2000000000},{"end_point": "add_nft","value": 30000000},{"end_point": "add_pub_address","value": 30000000},{"end_point": "auth_delete","value": 20000000},{"end_point": "auth_link","value": 20000000},{"end_point": "auth_update","value": 20000000},{"end_point": "burn_fio_address","value": 60000000},{"end_point": "buy_domain","value": 20000000},{"end_point": "cancel_funds_request","value": 60000000},{"end_point": "cancel_list_domain","value": 20000000},{"end_point": "list_domain","value": 30000000},{"end_point": "msig_approve","value": 20000000},{"end_point": "msig_cancel","value": 20000000},{"end_point": "msig_exec","value": 20000000},{"end_point": "msig_invalidate","value": 20000000},{"end_point": "msig_propose","value": 50000000},{"end_point": "msig_unapprove","value": 20000000},{"end_point": "new_funds_request","value": 60000000},{"end_point": "proxy_vote","value": 30000000},{"end_point": "record_obt_data","value": 60000000},{"end_point": "register_fio_address","value": 40000000000},{"end_point": "register_fio_domain","value": 50000000},{"end_point": "register_producer","value": 10000000000},{"end_point": "register_proxy","value": 1000000000},{"end_point": "reject_funds_request","value": 30000000},{"end_point": "remove_all_nfts","value": 30000000},{"end_point": "remove_all_pub_addresses","value": 60000000},{"end_point": "remove_nft","value": 30000000},{"end_point": "remove_pub_address","value": 30000000},{"end_point": "renew_fio_domain","value": 40000000000},{"end_point": "set_fio_domain_public","value": 30000000},{"end_point": "set_marketplace_config","value": 30000000},{"end_point": "stake_fio_tokens","value": 30000000},{"end_point": "submit_bundled_transactions","value": 30000000},{"end_point": "submit_fee_multiplier","value": 30000000},{"end_point": "submit_fee_ratios","value": 30000000},{"end_point": "transfer_fio_address","value": 60000000},{"end_point": "transfer_fio_domain","value": 100000000},{"end_point": "transfer_locked_tokens","value": 300000000},{"end_point": "transfer_tokens_pub_key","value": 100000000},{"end_point": "unregister_producer","value": 20000000},{"end_point": "unregister_proxy","value": 20000000},{"end_point": "unstake_fio_tokens","value": 30000000},
{"end_point": "vote_producer","value": 30000000}],"actor":"BP_ACTOR"}' -p BP_ACTOR@active

```


---
## Setting Fee Multiplier

While `fee ratios` should remain stable, the `fee multiplier` should be frequently updated to account for fluctuations in the price of FIO. The current dollar cost of fees for different FIO actions, based on the median values entered by the BPs, can be found on the [Aloha EOS Active Fees](https://www.alohaeos.com/tools/fiofees){:target="_blank"} page. 

The following are tools are available to help BPs automate the setting of the Fee multiplier:
* [FIO BP Pricing Tool](https://github.com/fioprotocol/bp-tools){:target="_blank"}
* [FIO Fee Vote Go Utility](https://github.com/blockpane/fio-tools/tree/master/fio-fee-vote){:target="_blank"} (published by [Blockpane](https://blockpane.com){:target="_blank"})
* [FIO Mulitplier Calculator](https://fio-utils.blockpane.com/index.html#/fees){:target="_blank"} (published by [Blockpane](https://blockpane.com){:target="_blank"})

#### Setting Fee Multiplier using the API

The following can be used with [setfeemult]({{site.baseurl}}/pages/api/fio-api/#options-setfeemult) to set the fee multiplier.

```
{
	"multiplier": 20,
	"actor": "BP_ACTOR"
}
```

#### Setting Fee Multiplier using clio

```

clio -u https://API_NODE_URL push action fio.fee setfeemult '{"multiplier":20,"actor":"BP_actor"}' -p BP_ACTOR@active

```

---
## Setting bundled transactions

Number of bundled transactions credited for all new FIO Crypto Handle registrations is set by BPs in the following way:

* Top 21 BPs submit at anytime [/submit_bundled_transaction]({{site.baseurl}}/pages/api/fio-api/#options-bundlevote) (can be made no more than once every 120 seconds) call
* Once received, the bundled transactions are determined by deriving a median of all submissions. Example:
   * Submissions from 4 BPs:
      * BP1: 1
      * BP2: 1000
      * BP3: 2000
      * BP4: 15000
   * Bundled transactions are set to 1500
* If a BP is removed from elected BPs list, their submissions are removed from consideration at the next time bundled transactions are computed, unless there are no other submissions.
* In order for the default bundled transaction count to be updated there should be at least 15 valid votes for.

#### Setting bundled transactions using the API

```
{
	"bundled_transactions": 100,
	"actor": "BP_ACTOR"
}
```

#### Setting bundled transactions using clio

```

clio -u https://API_NODE_URL push action fio.fee bundlevote '{"bundled_transactions":100,"actor":"BP_ACTOR"}' -p BP_ACTOR@active

```

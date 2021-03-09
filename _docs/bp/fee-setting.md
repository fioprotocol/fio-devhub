---
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

Setting fees to Mainnet values.

**Submitting Fee Ratios**

**API**

```
{
	"fee_ratios": [
		{
			"end_point": "register_fio_domain",
			"value": 40000000000
		},
		{
			"end_point": "register_fio_address",
			"value": 2000000000
		},
		{
			"end_point": "renew_fio_domain",
			"value": 40000000000
		},
		{
			"end_point": "renew_fio_address",
			"value": 2000000000
		},
		{
			"end_point": "add_pub_address",
			"value": 30000000
		},
		{
			"end_point": "transfer_tokens_pub_key",
			"value": 100000000
		},
		{
			"end_point": "new_funds_request",
			"value": 60000000
		},
		{
			"end_point": "reject_funds_request",
			"value": 30000000
		},
		{
			"end_point": "record_obt_data",
			"value": 60000000
		},
		{
			"end_point": "set_fio_domain_public",
			"value": 30000000
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
			"end_point": "unregister_proxy",
			"value": 20000000
		},
		{
			"end_point": "unregister_producer",
			"value": 20000000
		},
		{
			"end_point": "proxy_vote",
			"value": 30000000
		},
		{
			"end_point": "vote_producer",
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
			"value": 50000000
		},
		{
			"end_point": "msig_propose",
			"value": 50000000
		},
		{
			"end_point": "msig_approve",
			"value": 20000000
		},
		{
			"end_point": "msig_unapprove",
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
		}
	],
	"actor": "BP_ACTOR"
}
```

**clio**

```

clio -u https://API_NODE_URL push action fio.fee setfeevote '{"fee_ratios":[{"end_point":"register_fio_domain","value":40000000000},{"end_point":"register_fio_address","value":2000000000},{"end_point":"renew_fio_domain","value":40000000000},{"end_point":"renew_fio_address","value":2000000000},{"end_point":"add_pub_address","value":30000000},{"end_point":"transfer_tokens_pub_key","value":100000000},{"end_point":"new_funds_request","value":60000000},{"end_point":"reject_funds_request","value":30000000},{"end_point":"record_obt_data","value":60000000},{"end_point":"set_fio_domain_public","value":30000000},{"end_point":"register_producer","value":10000000000},{"end_point":"register_proxy","value":1000000000},{"end_point":"unregister_proxy","value":20000000},{"end_point":"unregister_producer","value":20000000},{"end_point":"proxy_vote","value":30000000},{"end_point":"vote_producer","value":30000000},{"end_point":"auth_delete","value":20000000},{"end_point":"auth_link","value":20000000},{"end_point":"auth_update","value":50000000},{"end_point":"msig_propose","value":50000000},{"end_point":"msig_approve","value":20000000},{"end_point":"msig_unapprove","value":20000000},{"end_point":"msig_cancel","value":20000000},{"end_point":"msig_exec","value":20000000},{"end_point":"msig_invalidate","value":20000000}],"actor":"BP_ACTOR"}' -p BP_ACTOR@active

```


**Submitting Fee Multiplier**

**API**

```
{
	"multiplier": 20,
	"actor": "BP_ACTOR"
}
```

**clio**

```

clio -u https://API_NODE_URL push action fio.fee setfeemult '{"multiplier":20,"actor":"BP_actor"}' -p BP_ACTOR@active

```

---
### Setting bundled transactions

Number of bundled transactions credited for all new FIO Address registrations and renewals is set by BPs in the following way:

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

#### Example

Setting default bundled transaction count to Mainnet values.

Submitting bundled transaction count

**API**
```
{
	"bundled_transactions": 100,
	"actor": "BP_ACTOR"
}
```

**clio**

```

clio -u https://API_NODE_URL push action fio.fee bundlevote '{"bundled_transactions":100,"actor":"BP_ACTOR"}' -p BP_ACTOR@active

```

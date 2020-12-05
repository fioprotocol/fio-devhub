---
title: Being a block producer
description: Being a block producer
---
# Being a block producer
## Calling all block producer candidates

The FIO Chain block producers receive 85% of the fees collected by the FIO Protocol and there are additional incentives available. FIO Chain code will become open source around Mainnet launch, but if you are interested in being a Block producer now, please reach out.

## Code of conduct

Please review BP Code of Conduct to better understand responsibilities of a block producer.

## Recommended infrastructure

The FIO platform is comprised of two networks:

* Testnet is a network for developers and others to have a full but valueless version of the network for testing.
* Mainnet is the production network where all FIO transactions are recorded.

![Image](/assets/img/integration/bp-infrastructure.png)

Mainnet nodes generally runs in two modes:

* **Block Producing Nodes** are nodes that are configured to produce blocks in a FIO-based blockchain. This functionality if provided through the producer_plugin as well as other Nodeos Plugins. They connect to the peer-to-peer network and actively produce new blocks. Loose transactions are also validated and relayed. On Mainnet, Producing Nodes only produce blocks if their assigned block producer is part of an active schedule.
* **Front-End Non-Producing Nodes** connect to the peer-to-peer network but do not actively produce new blocks. Instead, it is connected and synchronized with other peers from a FIO-based blockchain, exposing one or more services publicly or privately by enabling one or more Nodeos Plugins, except the producer_plugin. They are useful for acting as proxy nodes, relaying API calls, validating transactions, and broadcasting information to other nodes. Non-Producing Nodes are also useful for monitoring the blockchain state.
Testnet nodes are less robust then Mainnet nodes and often combine the producer_plugin and other servicing plugins on a single server.

The following table outlines recommended hardware for producing and non-producing nodes based on initial 12 month transaction projections of:

* 14M transactions
* 10 GB total RAM in State

This transaction volume would result in:

* 950,000 FIO allocated to a Top 21 BP that has maintained a server for the entire 12 months.
* 400,000 FIO allocated to Standby (22-42) BP that has maintained a server for the entire 12 months.

![Image](assets/img/integration/node-specs.png)

All projected numbers are rough approximations and do not account for post-Mainnet RAM optimization improvements that are currently on the development roadmap. These will reduce or eliminate the amount of RAM required by some Transactions.

## Setting fees

Among other things, block producers are responsible for setting FIO Chain fees. Fees are set by BPs in the following way:

* Top 21 BPs submit fee votes using these two calls. Both calls have to be executed before a vote is valid.
   * Fee ratios using /submit_fee_ratios call (can be made no more than once every 3600 seconds) - this defines ratios between fees. It takes a number for every endpoint. It can be any number, but a good rule of thumb is to set this number to equivalent value in another currency and add 9 zeros. For example, if you want register_fio_address to cost 2 USD, set it to 2000000000.
   * Fee multiplier using /submit_fee_multiplier call (can be made no more than once every 120 seconds) - this defines the number which will be multiplied by the ratio for a specific endpoint to create an actual fee amount in SUF. The multiplier is intended to allow BPs to easily adjust fees as rate of exchange of FIO token changes. It can be any number, but a good rule of thumb is to set this number of FIO tokens inside the unit of currency used in fee ratios. For example, if 1 FIO = $0.05, set this to 20.
* Once received, the fee in SUFs is computed by multiplying ratio by multiplier. For example, register_fio_domain = 2000000000 x 20 = 40000000000 SUFs or 40 FIO.
* After each submission, the fee is then added to a list of fees submitted by elected block producers and a live fee is determined by deriving a median of all submissions for particular fee. Example
   * Submissions from 3 BPs:
      * BP1: 40000000000
      * BP2: 50000000000
      * BP3: 1000000000000
   * Fee is set to 50000000000
* If a BP is removed from elected BPs list, their submissions are removed from consideration at the next time a fee is computed, unless there are no other submission for that type of fee.
* In order for a fee to be updated there should be at least 15 valid votes for any end point.

### Example

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

`clio -u https://API_NODE_URL push action fio.fee setfeemult '{"multiplier":20,"actor":"BP_actor"}' -p BP_ACTOR@active`

## Setting bundled transactions for new registration

Number of bundled transactions credited for all new FIO Address registrations and renewals is set by BPs in the following way:

* Top 21 BPs submit at anytime /submit_bundled_transaction (can be made no more than once every 120 seconds) call
* Once received, the bundled transactions are determined by deriving a median of all submissions. Example:
   * Submissions from 4 BPs:
      * BP1: 1
      * BP2: 1000
      * BP3: 2000
      * BP4: 15000
   * Bundled transactions are set to 1500
* If a BP is removed from elected BPs list, their submissions are removed from consideration at the next time bundled transactions are computed, unless there are no other submissions.
* In order for the default bundled transaction count to be updated there should be at least 15 valid votes for.

### Example

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

`clio -u https://API_NODE_URL push action fio.fee bundlevote '{"bundled_transactions":100,"actor":"BP_ACTOR"}' -p BP_ACTOR@active`

## Claiming block producer rewards

When fees are paid by users, they are collected in BP pools which are dynamically set-up for each day. Certain fees are placed into the current day pool, while others are divided up and placed into 365 pools for each day in the future. This is intended to cover bundled transaction. For example if /register_fio_domain fee of 40,000,000,000 SUF is paid, 96,438,356 SUF (40,000,000,000/365*.85) is allocated to current day pool, another 96,438,356 SUF to BP Pool for Day 2 and so on.

* Each BP is paid by calling /claim_bp_rewards.
* The call can only be called once every 24 hrs.
* When the it’s called the following actions are taken
   * The payout will apply to last 24 hours
   * Before a payout can be made, a Payout Schedule must exist. If it does not it gets created as follows:
      * Top 42 BPs based on votes and their votes are stored in table as of the creation of the Payout Schedule.
      * This schedule will be used for all payments to all BPs for the next 24 hours
   * If Payout Schedule exists, the BPs are paid as follows:
      * Every block producer (elected and standby, max 42) will receive 60% of the entire pool distributed pro-rata based on votes they received. Specifically:
         * All votes in Payout Schedule are summed up and each BPs votes as percent of total votes casted are used as payout percentage.
         * Scheduled block producers (top 21 in Payout Schedule) will receive 40% of the entire pool divided by number of scheduled block producers.
* If BP does not claim their rewards within 24 hours after becoming eligible, their fees are moved over to the current day’s BP Poll to be distributed among all BPs.

## How to become a block producer

Start with setting up a Testnet node and join Testnet Telegram Channel.

## Knowledge Base articles

* Block Production
* BP Code of Conduct
* Fee Setting and Distribution
* Bundling and Fees


---
title: Block Producers
description: Block Producers
---
# Becoming a FIO Block Producer

Anybody can register to be a block producer (BP) and produce blocks if they receive enough votes. The top 21 active BPs and up to 21 stand-by BPs will be paid - the pool of the 42 total BPs are determine by number of vote.

At the start of every round, the 21 block producers with the highest number of votes are selected to produce the blocks of the next round. The selected producers are scheduled in order of geographic location to ensure high performance and prevent regional centralization.

---
### Getting started

Start with setting up a Testnet node and join [Testnet Telegram Channel](https://t.me/fiotestnet){:target="_blank"}.

---
### Code of conduct

* Secure the FIO Protocol network
* Ensure the network has enough capacity and processing power to service user requests
  * Every active BP shall run an API node capable of handling at least 100 simultaneous connections
  * BPs will publish real-time performance metrics of the block producing nodes
* Run the latest code base approved by BPs via a vote 
  * BPs will self-report version number of software running
* Set fees and number of bundled transactions included with each FIO Crypto Handle
* BPs will not share fees in exchange for votes. However, BPs may outsource the technical operation of running the node. Vote incentivization has the potential to degrade Delegated Proof of Stake systems. The block reward should incentive value creation over value transfer and no single entity should have a controlling stake in more than one block producing node, otherwise the decentralized intent of DPoS will be compromised.
* Each of the 42 BPs submits their desired fee amount of FIO Tokens for each blockchain interaction and amount of bundled transactions to be included with every FIO Crypto Handle.
* Amounts submitted by active block producers are analyzed, and the fee is set at median of all submitted amounts.
* Until an on-chain mechanism is proposed, maintain a bp.json file (and chains.json if producing on multiple EOSIO-based chains) as described here and regularly review community tools like this one to keep your information up to date.

---
### Recommended infrastructure

The FIO platform is comprised of two networks:

* Testnet is a network for developers and others to have a full but valueless version of the network for testing.
* Mainnet is the production network where all FIO transactions are recorded.

![Image]({{ site.baseurl }}/assets/img/integration/bp-infrastructure.png)

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

![Image]({{ site.baseurl }}/assets/img/integration/node-specs.png)

All projected numbers are rough approximations and do not account for post-Mainnet RAM optimization improvements that are currently on the development roadmap. These will reduce or eliminate the amount of RAM required by some Transactions.



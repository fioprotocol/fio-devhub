---
layout: page-fio
title: Protocol Guide   
description: Protocol Guide
---


# Protocol Guides
**Note:** This section is based on the [EOSIO Protocol Guide](https://developers.eos.io/welcome/v2.1/protocol-guides/index).

The EOSIO Protocol section describes how the EOSIO platform actually works and can be split into two layers. The core which is open source and implemented in C++ and system which is implemented in smart contracts running on the core.

## Core
The EOSIO Core provides the basic building blocks for the system layer and are not implemented as smart contracts. The core implementation is open source and the source code can be customised to suit specific business requirements.

The core protocols are:

- [Consensus Protocol]({{site.baseurl}}/docs/protocol/consensus)
- [Transactions Protocol]({{site.baseurl}}/docs/protocol/transactions)
- [Network or Peer to Peer Protocol]({{site.baseurl}}/docs/protocol/transactions)
- [Accounts and Permissions]({{site.baseurl}}/docs/protocol/transactions)
- System
The EOSIO blockchain platform is unique in that the features and characteristics of the blockchain built on it are flexible, that is, they can be changed, or be modified completely to suit each business case requirement. Core blockchain features such as consensus, fee schedules, account creation and modification, token economics, block producer registration, voting, multi-sig, etc., are implemented inside smart contracts which are deployed on the blockchain built on the EOSIO platform. These smart contracts are referred to as system contracts and the layer as the EOSIO system layer, or simply system layer.

Block.one implements and maintains these system contracts, as samples only, encapsulating the base functionality for an EOSIO based blockchain and they are listed below:

- eosio.bios
- eosio.system
- eosio.msig
- eosio.token
- eosio.wrap
Also part of the system layer are the following concepts:

- System accounts
- RAM
- CPU
- NET
- Stake
- Vote

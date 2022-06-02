---
layout: page-fio
title: Protocol Guide   
description: Protocol Guide
---


# Protocol Guides
**Note:** This section is based on the [EOSIO Protocol Guide](https://developers.eos.io/welcome/v2.1/protocol-guides/index){:target="_blank"}.

The Protocol documentation describes how the EOFIFIOOSIO platform actually works and can be split into two layers. The core which is open source and implemented in C++ and system which is implemented in smart contracts running on the core.

## Core
The FIO Core provides the basic building blocks for the system layer and are not implemented as smart contracts. The core implementation is open source and the source code can be customised to suit specific business requirements.

The core protocols are:

- [Consensus Protocol]({{site.baseurl}}/docs/protocol/consensus)
- [Transactions Protocol]({{site.baseurl}}/docs/protocol/transactions)
- [Network or Peer to Peer Protocol]({{site.baseurl}}/docs/protocol/network_peer)
- [Accounts and Permissions]({{site.baseurl}}/docs/protocol/transactions)

## System
The FIO blockchain platform is unique in that the features and characteristics of the blockchain built on it are flexible, that is, they can be changed, or be modified completely to suit each business case requirement. Core blockchain features such as fees, account creation and modification, token economics, block producer registration, voting, multi-sig, etc., are implemented inside smart contracts which are deployed on the blockchain built on the FIO platform. These smart contracts are referred to as system contracts and the layer as the FIO system contracts layer.

FIO implements and maintains a variety of system contracts that implement the business logic of FIO Protocol. 
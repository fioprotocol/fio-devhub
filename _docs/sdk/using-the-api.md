---
layout: page-int
title: Using the FIO API
description: Using the FIO API
redirect_from:
    - /docs/integration-guide/using-the-api

---

# Using the FIO API

There are several ways to interact with the FIO Chain. You may directly call the FIO API, you may integrate the [Typescript]({{ site.baseurl }}/docs/sdk/typescript) SDK which handles interfacing to the API, or you may interact through a third-party application. 

There are two types of interactions with the FIO blockchain: FIO API Getters and FIO Transactions.

---
## FIO API Getters

[FIO API getters]({{ site.baseurl }}/pages/api/fio-api/#tag--Getters) are used to retrieve information. These calls do not require any signing and may be called directly without any pre-packaging. 

---
## FIO Transactions 

[FIO Transactions]({{ site.baseurl }}/pages/api/fio-api/#tag--Transactions) are sent to [/push_transaction]({{ site.baseurl }}/pages/api/fio-api/#post-/push_transaction), a generic API endpoint that accepts all FIO action data objects. Transaction instances consist of a transaction header, the list of action instances, and transaction extensions that make the actual transaction.

All transactions must be [packed and signed]({{ site.baseurl }}/pages/api/fio-api/#options-packed_transaction) prior to [submitting them to the FIO chain]({{ site.baseurl }}/docs/general-functions/transactions).

---
## FIO APIs

The FIO Block Producer community hosts both Testnet and Mainnet nodes that are publicly accessible. In addition, there is a public FIO Domain and Crypto Handle (Address) registration site with an available API. 

#### Mainnet API

The following mainnet API nodes and applications are available for integration testing:

* [FIO API Documentation]({{ site.baseurl }}/pages/api/fio-api)
* Mainnet API nodes - <https://github.com/fioprotocol/fio.mainnet#fio-api>{:rel="nofollow noopener noreferrer" target="_blank"}
* Mainnet V1 History API nodes - <https://github.com/fioprotocol/fio.mainnet#fio-api>{:rel="nofollow noopener noreferrer" target="_blank"}
* Mainnet Hyperion History API nodes - <https://github.com/fioprotocol/fio.mainnet#hyperion>{:rel="nofollow noopener noreferrer" target="_blank"}
* Mainnet Monitor - <https://monitor.mainnet.fioprotocol.io/>{:rel="nofollow noopener noreferrer" target="_blank"}
* Mainnet Block Explorer - <https://fio.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"}

#### Testnet API

The following testnet API nodes and applications are available for integration testing:

* [FIO API Documentation]({{ site.baseurl }}/pages/api/fio-api)
* Testnet API nodes - <https://github.com/fioprotocol/fio.mainnet#fio-testnet-api>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet History API node - `https://fiotestnet.blockpane.com/v1/chain`
* Testnet Monitor - <https://monitor.testnet.fioprotocol.io/>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet Block Explorer - <https://fio-test.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"}

#### Registration API

The following testnet API nodes and applications are available for integration testing:

* [FIO Registration API Documentation]({{ site.baseurl }}/pages/api/fio-reg-api/#post-/buy-address)
* Mainnet Registration Site API - `https://reg.fioprotocol.io/public-api/`
* Testnet Registration Site API - `https://reg.fio.dev/public-api/`

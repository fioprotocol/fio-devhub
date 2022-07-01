---
layout: page-int
title: FIO Token Support
description: FIO Token Support
---

# FIO Token Support

This page provides information for integration partners looking to list the FIO token. It begins with an overview of the FIO token and the structure of FIO public and private keys. 

There is information specific to enabling FIO token deposits and withdrawals on Exchanges.

---
## Overview

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ

The Foundation operates API end-points which return token supply statistics. Refer to the [FIO Token overview]({{site.baseurl}}/docs/fio-protocol/fio-token#obtaining-token-supply-in-real-time) for more information.

FIO Token is registered at index `235/0x800000eb` on the [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md){:target="_blank"} coin types with FIO key derivation path of **`44'/235'/0'/0/0`**

FIO Private Keys follow standard [Wallet Import Format (WIF) standard]({{site.baseurl}}/docs/fio-protocol/keys#fio-private-key-wallet-import-format-wif) and public keys follow well-known [base58 encoding with FIO prefix]({{site.baseurl}}/docs/fio-protocol/keys#fio-public-key-format). For example: **FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G**

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

For more information on FIO keys visit the [FIO Public/Private Keys]({{site.baseurl}}/docs/fio-protocol/keys) overview.

---
## Transferring FIO

Tokens on the FIO Chain are transferred using the [`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action.

The action requires a FIO Public Key for the payee (the person receiving the funds). The FIO Public Key is [hashed down]({{site.baseurl}}/docs//general-functions/actor-account) to an account name and funds are transferred to that account. If that account does not exist, it gets [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

{% include alert.html type="info" content="The native EOSIO `transfer` action is not supported." %}

**Set your TPID!** Do not forget to include your [TPID]({{site.baseurl}}/docs/general-functions/tpid) in all FIO transactions to earn a portion of the fees paid. 

Refer to [FIO Send]({{site.baseurl}}/docs/integration-guide/fio-send) for more information on how to use FIO Crypto Handles to make sending crypto easier for your users.

#### Transaction memos

[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To [attach a memo to a FIO token transfer]({{site.baseurl}}/docs/general-functions/fio-data), both payer and payee must have a [FIO Crypto Handle]({{site.baseurl}}/docs/fio-protocol/fio-address). For more information refer to the [deposit using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-receive) and [withdraw using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/fio-request) integration details.

#### Checking token balance

Token balance can be obtained by passing FIO Public Key to [/get_fio_balance]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance) API method.

#### Retrieving account balances and transaction history

The [how to retrieve account balances and history]({{site.baseurl}}/docs/general-functions/txn-history) page details the different options available for exchanges for presenting a user’s balance and transaction history.

#### FIO API and History nodes

FIO Block Producers maintain API and History nodes for the FIO community. These public API nodes are listed on [the fio.mainnet github repository README](https://github.com/fioprotocol/fio.mainnet){:target="_blank"}.

#### Building and running an API node

For performance and security reasons, integration partners may want to maintain internal nodes. See [Building a node]({{site.baseurl}}/docs/chain/node-build) and [History node]({{site.baseurl}}/docs/chain/node-history) for more information on lauching an internal FIO API History node.

---
## Supporting FIO deposits on Exchanges

There are two main methods for enabling FIO token deposits on exchanges: using a unique FIO Public Key for every user and using FIO Crypto Handles and FIO Requests for FIO deposits. While some exchanges prefer to use a single key for all deposits, this method is not recommended for supporting FIO on exchanges. The two methods are explained below.

#### Using a unique FIO Public Key for every user

Similar to UTXO-based chains, to accept FIO token deposits an exchange may generate a unique FIO Public Key for every user. Unlike EOSIO, FIO Chain does not require that key to be assigned to an existing account before funds are sent to it. Once a token transfer is initiated to that Public Key, the account will be [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

#### Using a single FIO Public Key for all user deposits

[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To [attach a memo to a FIO token transfer]({{site.baseurl}}/docs/general-functions/fio-data), both payer and payee must have a [FIO Crypto Handle]({{site.baseurl}}/docs/fio-protocol/fio-address) and a [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) has to be sent every time a user deposits FIO. Because it is difficult to ensure that wallets transferring FIO to the exchange will always attach an OBT record, it is not recommended that exchanges use the "single FIO Public Key" method for enabling FIO deposits. 

{% include alert.html type="warning" title="transfer_tokens_pub_key does not accept a memo field"  content="FIO does not support EOSIO memo fields. Therefore, it is not recommended that exchanges use the *Single FIO Public Key for all deposits* method for enabling FIO deposits." %}

Refer to [deposit using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-receive) for more information on how to use FIO Crypto Handles and FIO Requests to enable FIO deposits.

---
## Supporting FIO withdrawals on Exchanges

#### Using a FIO Public Key

With this option, the user’s withdrawal area on the exchange would ask for a FIO Public Key and the amount of withdrawals. The transfer would be executed using the[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action and metadata recorded using [`recordobt`]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) action.

#### Using FIO Crypto Handles and FIO Requests for FIO withdrawals

See: [Withdraw Crypto using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/fio-request).
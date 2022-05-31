---
layout: page-int
title: Listing the FIO Token
description: Listing the FIO Token
redirect_from:
    - /docs/exchanges/exchange-token-supply
    - /docs/exchanges/exchange-token-transfer
---

# Listing the FIO Token

This page provides information for integration partners looking to list the FIO token. It contains the following content:

|Content  |Summary |
|---|---|
| [FIO Keys]({{site.baseurl}}/docs/integration-guide/token-listing#fio-keys) | An overview of the structure of FIO public and private keys. |
| [FIO token structure and token transfer]({{site.baseurl}}/docs/integration-guide/token-listing#fio-token-structure-and-token-transfer) | Information on the FIO token and instructions on how to enable token transfers. |
| [Retrieving account balances and transaction history]({{site.baseurl}}/docs/integration-guide/token-listing#retrieving-account-balances-and-transaction-history) | Different options available for exchanges to present a user’s balance and transaction history. |
| [Enabling FIO token deposits]({{site.baseurl}}/docs/integration-guide/token-listing#enabling-fio-token-deposits) | An overview of FIO token deposits. |
| [Enabling FIO token withdrawals]({{site.baseurl}}/docs/integration-guide/token-listing#enabling-fio-token-withdrawals) | An overview of FIO token withdrawals. |

---
## FIO keys

FIO Token is registered at index 235/0x800000eb on the [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md){:target="_blank"}.

**FIO Key Derivation Path:** `"44'/235'/0'/0/0"`

FIO Private Keys follow standard [Wallet Import Format (WIF) standard]({{site.baseurl}}/docs/fio-protocol/keys#fio-private-key-wallet-import-format-wif) and public keys follow well-known [base58 encoding with FIO prefix]({{site.baseurl}}/docs/fio-protocol/keys#fio-public-key-format), e.g.

**FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G**

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

For more information, visit the [FIO Public/Private Keys]({{site.baseurl}}/docs/fio-protocol/keys) overview.

---
## FIO token

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ

#### Obtaining token supply in real-time

The Foundation operates API end-points which return token supply statistics. Refer to the [FIO Token overview]({{site.baseurl}}/docs/fio-protocol/fio-token#obtaining-token-supply-in-real-time) for more information.


---
## Supporting the FIO Token

#### Transferring FIO

Tokens on the FIO Chain are transferred using the [`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action.

The action requires a FIO Public Key for the payee (the person receiving the funds). The FIO Public Key is [hashed down]({{site.baseurl}}/docs//general-functions/actor-account) to an account name and funds are transferred to that account. If that account does not exist, it gets [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

The native EOSIO `transfer` action is not supported.

<br>
**Set your TPID!** Do not forget to include your [TPID]({{site.baseurl}}/docs/general-functions/tpid) in all FIO transactions to earn a portion of the fees paid. 

#### Transaction memo

[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To [attach a memo to a FIO token transfer]({{site.baseurl}}/docs/general-functions/fio-data), both payer and payee must have a [FIO Crypto Handle]({{site.baseurl}}/docs/fio-protocol/fio-address). For more information refer to the [deposit using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-receive) and [withdraw using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/fio-request) integration details.

#### Checking token balance

Token balance can be obtained by passing FIO Public Key to [/get_fio_balance]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance) API method.

#### Retrieving account balances and transaction history

The [how to retrieve account balances and history]({{site.baseurl}}/docs/general-functions/txn-history) page details the different options available for exchanges for presenting a user’s balance and transaction history.

#### FIO API and History nodes

FIO Block Producers maintain API and History nodes for the FIO community. These public API nodes are listed on [the fio.mainnet github repository README](https://github.com/fioprotocol/fio.mainnet){:target="_blank"}.

#### Building and running an API node

For performance and security reasons, integration partners may want to maintain internal nodes. See [Building a node]({{site.baseurl}}/docs/chain/node-build) and [History node]({{site.baseurl}}/docs/chain/node-history) for more information on lauching an internal FIO API History node.


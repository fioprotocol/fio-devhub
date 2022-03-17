---
layout: page-int
title: Listing the FIO Token
description: Listing the FIO Token
redirect_from:
    - /docs/exchanges/exchange-token-supply
    - /docs/exchanges/exchange-token-transfer
---

# Listing the FIO Token

This page provides information for Exchanges looking to list the FIO token. It contains the following content:

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
## FIO token structure and token transfer

[FIO Chain’s]({{site.baseurl}}/docs/chain/) native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ
* [Brand Assets](https://fioprotocol.io/brand-assets/){:target="_blank"}.

#### Obtaining token supply in real-time

The Foundation operates API end-points which return token supply statistics. Refer to the [FIO Token overview]({{site.baseurl}}/docs/fio-protocol/fio-token#obtaining-token-supply-in-real-time) for more information.

#### Transferring FIO token

Tokens on the FIO Chain are transferred using the [`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action.

The action requires a FIO Public Key for the payee (the person receiving the funds). The FIO Public Key is [hashed down]({{site.baseurl}}/docs//general-functions/actor-account) to an account name and funds are transferred to that account. If that account does not exist, it gets [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

The native EOSIO `transfer` action is not supported.

<br>
**Set your TPID!** Do not forget to include your [TPID]({{site.baseurl}}/docs/general-functions/tpid) in all FIO transactions to earn a portion of the fees paid. 

#### Transaction memo

[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To [attach a memo to a FIO token transfer]({{site.baseurl}}/docs/general-functions/fio-data), both payer and payee must have a [FIO Crypto Handle]({{site.baseurl}}/docs/fio-protocol/fio-address). For more information refer to the [deposit using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-deposit) and [withdraw using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-withdraw) integration details.

---
## Retrieving account balances and transaction history

The [how to retrieve account balances and history]({{site.baseurl}}/docs/general-functions/txn-history) page details the different options available for exchanges for presenting a user’s balance and transaction history.

#### FIO API and History nodes

FIO Block Producers maintain API and History nodes for the FIO community:
* Testnet History API Node: `http://testnet.fioprotocol.io/v1/history/`
* Mainnet History API Nodes: See [Github](https://github.com/fioprotocol/fio.mainnet#history-v1){:target="_blank"}

For performance and security reasons, exchanges may want to maintain internal nodes. See [Building a node]({{site.baseurl}}/docs/chain/node-build) and [History node]({{site.baseurl}}/docs/chain/node-history) for more information on lauching an internal FIO API History node.

---
## Enabling FIO token deposits

There are two main methods for enabling FIO token deposits: using a unique FIO Public Key for every user and using FIO Crypto Handles and FIO Requests for FIO deposits. While some exchanges prefer to use a single key for all deposits, this method is not recommended for FIO. The different methods are explained below.

#### Using a unique FIO Public Key for every user

Similar to UTXO-based chains, to accept FIO token deposit, an exchange may generate a unique FIO Public Key for every user or deposit. Unlike EOSIO, FIO Chain does not require that key to be assigned to an existing account before funds are sent to it. Once a token transfer is initiated to that Public Key, the account will be [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

When using a unique [FIO Public Key]({{site.baseurl}}/docs/fio-protocol/keys) for deposits, you can look for the `trnsfiopubky` transactions with target `payee_public_key` in every block. You can get transactions in every block by running [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) at every block height.

##### *trnsfiopubky* via Multisig

It is important to note that [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) **will not** return a `trnsfiopubky` transaction if it was executed as part of a [Multisig]({{site.baseurl}}/docs/fio-protocol/multisig) as that transaction is executed via inline contract actions and only shows up as inline traces, which are not returned by [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block).

In order to properly recognize transfers made using [Multisig]({{site.baseurl}}/docs/fio-protocol/multisig) you should monitor [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) for executed transaction status:
```
"transactions": [   {
      "status": "executed",
      "cpu_usage_us": 7929,
      "net_usage_words": 0,
      "trx": "fa206c2e47af50873dfe08a03802918113c1832e3f42b26e1b20ad77b66ccf20"
}]
```

Next, fetch inline traces using `/v1/history/get_transaction` and returned trx. This requires access to a [History node]({{site.baseurl}}/docs/chain/node-history).

#### Using a single FIO Public Key for all deposits

[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To [attach a memo to a FIO token transfer]({{site.baseurl}}/docs/general-functions/fio-data), both payer and payee must have a [FIO Crypto Handle]({{site.baseurl}}/docs/fio-protocol/fio-address) and a [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) has to be sent every time a user deposits FIO. Because it is difficult to ensure that wallets transferring FIO to the exchange will always attach an OBT record, it is not recommended that exchanges use the "single FIO Public Key" method for enabling FIO deposits. 

{% include alert.html type="warning" title="transfer_tokens_pub_key does not accept a memo field"  content="FIO does not support EOSIO memo fields. Therefore, it is not recommended that exchanges use the *Single FIO Public Key for all deposits* method for enabling FIO deposits." %}

Refer to [deposit using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-deposit) for more information on how to use FIO Crypto Handles and FIO Requests to enable FIO deposits.

#### Using FIO Crypto Handles and FIO Requests for FIO deposits

See: [Deposit Crypto using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-deposit).

---
## Enabling FIO token withdrawals

#### Using a FIO Public Key

With this option, the user’s withdrawal area on the exchange would ask for a FIO Public Key and the amount of withdrawals. The transfer would be executed using the[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action and metadata recorded using [`recordobt`]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) action.

#### Using FIO Crypto Handles and FIO Requests for FIO withdrawals

See: [Withdraw Crypto using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-withdraw).

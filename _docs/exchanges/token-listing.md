---
title: Listing the FIO Token
description: Listing the FIO Token
redirect_from:
    - /docs/exchanges/exchange-token-supply
    - /docs/exchanges/exchange-token-transfer
---

# Listing the FIO Token

---
## Running nodes

See [Building a node]({{site.baseurl}}/docs/chain/node-build) and [History node]({{site.baseurl}}/docs/chain/node-history).

---
## FIO token transfer transactions

#### FIO token

[FIO Chain’s]({{site.baseurl}}/docs/chain/) native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ
* [Brand Assets](https://fioprotocol.io/brand-assets/){:target="_blank"}.

#### Transferring FIO token

Tokens on the FIO Chain are transferred using [/transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) method.

The method requires payee FIO Public Key. The key is [hashed down]({{site.baseurl}}/docs/how-to/actor-account) to an account name and funds are transferred to that account. If that account does not exist, it gets [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

The native EOSIO transfer action is not supported.

#### Retrieving account balances and history

The [How to retrieve account balances and history]({{site.baseurl}}/docs/how-to/txn-history) page lists the different options available for wallets, exchanges, and information providers for presenting a user’s balance and history.

#### Transaction memo

[/transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To attach a memo to a FIO token transfer, both payer and payee must have a FIO Address. See [FIO integration].

#### TPID

Do not forget to include your [TPID]({{site.baseurl}}/docs/how-to/tpid) in the request to earn portion of fees paid.

---
## Handling FIO token deposits

#### Using unique FIO Public Key

Similar to UTXO-based chains, to accept FIO token deposit, an exchange may generate a unique FIO Public Key for every user or deposit. Unlike EOSIO, FIO Chain does not require that key to be assigned to an existing account before funds are sent to it. Once a token transfer is initiated to that Public Key, the account will be [created automatically]({{site.baseurl}}/docs/fio-protocol/accounts-permissions#fio-accounts).

FIO Token is registered at index 235/0x800000eb on the [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md){:target="_blank"}.

FIO Private Keys follow standard Wallet Import Format (WIF) standard and public keys follow well-known base58 encoding with FIO prefix, e.g.

**FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G**

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

**FIO Key Derivation Path:**

`"44'/235'/0'/0/0"`

See [Private/Public Keys]({{site.baseurl}}/docs/fio-protocol/keys) for more information including testing examples.

#### Using FIO Address or FIO Request

See [FIO integration].

#### Additional Resources

* [Account balances and history](https://gist.github.com/blockpane/a5a62539ceeae963ce3ed69a9dd53663){:target="_blank"}

#### Recognizing deposits when using unique FIO Public Key

When using unique FIO Public Key for deposits, you can look for the `trnsfiopubky` transaction with target payee_public_key in every block. You can get transactions in every block by running [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) at every block height.

#### *trnsfiopubky* via Multisig

It is important to note that [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) **will not** return trnsfiopubky transaction if it was executed as part of [Multisig]({{site.baseurl}}/docs/fio-protocol/multisig) as that transaction is executed via inline contract actions and only shows up as inline trace, which are not returned by [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block).

In order to properly recognize transfers made using [Multisig]({{site.baseurl}}/docs/fio-protocol/multisig) you should monitor [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) for executed transaction status:
```
"transactions": [   {
      "status": "executed",
      "cpu_usage_us": 7929,
      "net_usage_words": 0,
      "trx": "fa206c2e47af50873dfe08a03802918113c1832e3f42b26e1b20ad77b66ccf20"
}]
```

and then fetch inline traces using /v1/history/get_transaction and returned trx. This requires [History node]({{site.baseurl}}/docs/chain/node-history).

---
## Handling FIO token withdrawals

#### Using FIO Public Key

With this option, the user’s withdrawal area on the exchange would ask for a FIO Public Key and the amount of withdrawals. The transfer would be executed using /[transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) and metadata recorded using [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt).

#### Using FIO Address or FIO Request

See [FIO integration].

---
## Obtaining token supply in real-time

The Foundation operates API end-point which returns token supply statistics, specifically:

|Statistic |Description |End-point|
|---|---|---|
|Total supply	|All tokens that were ever minted. Maximum token supply is capped at 1,000,000,000 FIO.	|<https://fioprotocol.io/supply>{:target="_blank"} |
|Circulating supply	|Total supply less locked tokens.	|<https://fioprotocol.io/circulating>{:target="_blank"} |
|Locked tokens	|Tokens which are locked and cannot be transferred.	|<https://fioprotocol.io/locked>{:target="_blank"} |

Data returned includes 9 decimal points, e.g. 705906876.848960519

To return data in Smallest Units of FIO (SUFs), add /suf to end point, e.g. <https://fioprotocol.io/supply/suf>{:target="_blank"}

To return the data as json, add ?json=true top end point, e.g. <https://fioprotocol.io/supply?json=true>{:target="_blank"}
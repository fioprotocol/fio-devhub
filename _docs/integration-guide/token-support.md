---
layout: page-int
title: FIO Token Support for Exchanges
description: FIO Token Support for Exchanges
---

# Supporting FIO token deposits and withdrawals on Exchanges

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

Refer to [deposit using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-receive) for more information on how to use FIO Crypto Handles and FIO Requests to enable FIO deposits.

#### Using FIO Crypto Handles and FIO Requests for FIO deposits

See: [Deposit Crypto using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/handle-receive).

---
## Enabling FIO token withdrawals

#### Using a FIO Public Key

With this option, the user’s withdrawal area on the exchange would ask for a FIO Public Key and the amount of withdrawals. The transfer would be executed using the[`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action and metadata recorded using [`recordobt`]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) action.

#### Using FIO Crypto Handles and FIO Requests for FIO withdrawals

See: [Withdraw Crypto using FIO Crypto Handles]({{site.baseurl}}/docs/integration-guide/fio-request).
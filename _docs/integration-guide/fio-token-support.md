---
title: FIO Token Support
description: FIO Token Support
---

# FIO Token Support

### Transferring FIO token

Tokens on the FIO Chain are transferred using /transfer_tokens_pub_key method.

The method requires payee FIO Public Key. The key is hashed down to an account name and funds are transferred to that account. If that account does not exist, it gets created automatically.

The native EOSIO transfer action is not supported.

### Transaction memo

/transfer_tokens_pub_key does not accept a memo field. To attach a memo to a FIO token transfer, a /record_obt_data transaction should be sent after the tokens are transferred and include the token transfer transaction id. /record_obt_data requires that both payer and payee have a FIO Address. If either party does not have a FIO Address transfer of memo is not supported.

### Checking token balance

Token balance can be obtained by passing FIO Public Key to /get_fio_balance API method.

### Transaction history

See [History node]({{site.baseurl}}/docs/chain/node-history)

### TPID

Do not forget to include your TPID in the request to earn portion of fees paid.

### Additional Resources

* [Account balances and history](https://gist.github.com/blockpane/a5a62539ceeae963ce3ed69a9dd53663){:target="_blank"}
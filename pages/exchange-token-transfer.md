---
title: Token transfers
sidebar_label: Token transfers
layout: sidenav
sidebar: sidebars
---

## FIO token transfer transactions

### FIO token

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ
* Brand Assets

### Transferring FIO token

Tokens on the FIO Chain are transferred using /transfer_tokens_pub_key method.

The method requires payee FIO Public Key. The key is hashed down to an account name and funds are transferred to that account. If that account does not exist, it gets created automatically.

The native EOSIO transfer action is not supported.

### Checking token balance

Token balance can be obtained by passing FIO Public Key to /get_fio_balance API method.

### Transaction history

See History node

### Transaction memo

/transfer_tokens_pub_key does not accept a memo field. To attach a memo to a FIO token transfer, both payer and payee must have a FIO Address. See FIO integration.

### TPID

Do not forget to include your TPID in the request to earn portion of fees paid.




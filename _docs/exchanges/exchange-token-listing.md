---
title: Listing the FIO Token
description: Listing the FIO Token
---

# Listing the FIO Token

## FIO token transfer transactions

### FIO token

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ
* Brand Assets

## Transfer Using a FIO Public Key

### Using unique FIO Public Key

Similar to UTXO-based chains, to accept FIO token deposit, an exchange may generate a unique FIO Public Key for every user or deposit. Unlike EOSIO, FIO Chain does not require that key to be assigned to an existing account before funds are sent to it. Once a token transfer is initiated to that Public Key, the account will be created automatically.

FIO Chain’s is registered at index 235/0x800000eb on the SLIP-44.

FIO Private Keys follow standard Wallet Import Format (WIF) standard and public keys follow well-known base58 encoding with FIO prefix, e.g.

**FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G**

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

**FIO Key Derivation Path:**

`"44'/235'/0'/0/0"`

See Private/Public Keys for more information including testing examples.

### Additional Resources

* Account balances and history

### Recognizing deposits when using unique FIO Public Key

When using unique FIO Public Key for deposits, you can look for trnsfiopubky transaction with target payee_public_key in every block. You can get transactions in every block by running /get_block at every block height.

### *trnsfiopubky* via Multisig

It is important to note that /get_block will not return trnsfiopubky transaction if it was executed as part of Multisig as that transaction is executed via inline contract actions and only shows up as inline trace, which are not returned by /get_block.

In order to properly recognize transfers made using Multisig you should monitor /get_block for executed transaction status:
```
"transactions": [   {
      "status": "executed",
      "cpu_usage_us": 7929,
      "net_usage_words": 0,
      "trx": "fa206c2e47af50873dfe08a03802918113c1832e3f42b26e1b20ad77b66ccf20"
}]
```

and then fetch inline traces using /v1/history/get_transaction and returned trx. This requires History node.

See more details on Community Discussion Page.


## TBD: older content need to figure out

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




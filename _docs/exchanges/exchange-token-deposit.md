---
title: Token deposits
description: Token deposits
---

# Token deposits

## Using a FIO Public Key

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

When using unique FIO Public Key for deposits, you can look for trnsfiopubky transaction with target payee_public_key in every block. You can get transactions in every block by running [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) at every block height.

### *trnsfiopubky* via Multisig

It is important to note that [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) will not return trnsfiopubky transaction if it was executed as part of Multisig as that transaction is executed via inline contract actions and only shows up as inline trace, which are not returned by [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block).

In order to properly recognize transfers made using Multisig you should monitor [/get_block]({{site.baseurl}}/pages/api/fio-api/#post-/get_block) for executed transaction status:
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

## Using a FIO Address

### Using unique FIO Address for each user

An exchange may set-up a unique FIO Address for each user of the exchange, and display it in their deposit area, e.g. alice@myexchange.

To deposit tokens of any supported cryptocurrency to their account the user would simply send tokens from a FIO-enabled wallet to their FIO Address (e.g. alice@myexchange) and would not have to deal with Public Keys, memo fields or even having to log into the exchange.

Each FIO Address may be mapped using [/add_pub_address]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) to either the same Public Address for all users or a unique Public Address for each user.

### Using same FIO Address for all users

An exchange may set-up a single deposit FIO Address for all users of the exchange, and display it their deposit area (e.g. deposits@myexchange).

To deposit any supported token to their account the user would simply send tokens from FIO-enabled wallet to the Deposit FIO Address, e.g. deposits@myexchange. To properly identify the inbound transaction, the user would have to either include a memo which includes their exchange account, or provide the exchange, ahead of time, with a list of FIO Addresses which the user owns.

The Deposit FIO Address would be mapped using [/add_pub_address]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) to a single FIO Public Key.

The inbound transaction can be identified by reading the OBT Data using [/get_obt_data]({{site.baseurl}}/pages/api/fio-api/#post-/get_obt_data). The data is encrypted. Once decrypted, memo or FIO Address of Payee will uniquely identify the user and obt_id will contain native chain transaction ID of the corresponding deposit.

### Transaction memo for FIO token transfer

[/transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To attach a memo to a FIO token transfer, a [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) transaction should be sent after the tokens are transferred and include the token transfer transaction id. [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) requires that both payer and payee have a FIO Address. If either party does not have a FIO Address transfer of memo is not supported.
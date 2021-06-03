---
title: Deposit Crypto using FIO Addresses
description: Deposit Crypto using FIO Addresses
---

# Deposit Crypto using FIO Addresses

### Using a unique FIO Address for each user

An exchange may [set-up a unique FIO Address for each user]({{site.baseurl}}/docs/how-to/registration) of the exchange, and display it in their deposit area, e.g. alice@myexchange.

To deposit tokens of any supported cryptocurrency to their account the user would simply send tokens from a FIO-enabled wallet to their FIO Address (e.g. alice@myexchange) and would not have to deal with Public Keys, memo fields or even having to log into the exchange.

Each FIO Address may be mapped using [/add_pub_address]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) to either the same Public Address for all users or a unique Public Address for each user.

### Using the same FIO Address for all users

An exchange may set-up a single deposit FIO Address for all users of the exchange, and display it their deposit area (e.g. deposits@myexchange).

To deposit any supported token to their account the user would simply send tokens from FIO-enabled wallet to the Deposit FIO Address, e.g. deposits@myexchange. To properly identify the inbound transaction, the user would have to either include a memo which includes their exchange account, or provide the exchange, ahead of time, with a list of FIO Addresses which the user owns.

The Deposit FIO Address would be mapped using [/add_pub_address]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) to a single FIO Public Key.

The inbound transaction can be identified by reading the OBT Data using [/get_obt_data]({{site.baseurl}}/pages/api/fio-api/#post-/get_obt_data). The data is [encrypted]({{site.baseurl}}/docs/how-to/encryption). Once decrypted, memo or FIO Address of Payee will uniquely identify the user and obt_id will contain native chain transaction ID of the corresponding deposit.

### Using a FIO Request

If users of exchange were assigned unique FIO Addresses, they could send a FIO Request from the exchange to a FIO Address of a FIO-integrated wallet or exchange. (e.g., `alice@mywallet`). The user would then login to the wallet and approve the FIO Request. Once approved, the wallet would execute the transfer on the native chain.

### Transaction memo for FIO token transfer

[/transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) does not accept a memo field. To attach a memo to a FIO token transfer, a [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) transaction should be sent after the tokens are transferred and include the token transfer transaction id. [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) requires that both payer and payee have a FIO Address. If either party does not have a FIO Address transfer of **memo is not supported**.
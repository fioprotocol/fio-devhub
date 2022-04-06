---
layout: page-int
title: Receive to FIO Crypto Handle
description: Receive to FIO Crypto Handle
redirect_from:
    - /docs/integration-guide/fio-receive
---

# Receive Deposits to a FIO Crypto Handle

[FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) (aka FIO Addresses) are human-readable wallet identifiers (such as john@edge or alice@gold) which eliminate the need to see, or even know of, blockchain public addresses. Enabling deposits using [FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) give exchange users friendly interwallet operability, making deposits easy and near error-free, dramatically reducing support tickets.

As a first step, **Platforms should register a custom [FIO Domain]({{site.baseurl}}/docs/fio-protocol/fio-address#fio-domains) (e.g., @myexchange)**. Users will then be able to register FIO Crypto Handles on that custom domain (e.g., alice@myexchange).

In order allow others to send crypto currency using the user’s FIO Crypto Handle, it has to be mapped to native blockchain public addresses (NBPAs). This has to be done from within the platform using /add_pub_address API method as it needs to be signed with user’s private key. For now, this mapping is stored unencrypted, but a privacy mode is [being worked on](https://github.com/fioprotocol/fips){:rel="nofollow noopener noreferrer" target="_blank"}.

It is up to the platform to decide if this happens automatically, behind the scenes or driven by the user via UI. If the platform supports multiple NBPAs for the same blockchain at the same time, e.g. multiple bitcoin wallets, the decision will likely need to be made by the user via UI.

Please read [Mapping Public Addresses]({{site.baseurl}}/docs/integration-guide/handle-mapping) to better understand how public address mappings work.

Please note that a user may have multiple FIO Crypto Handles owned by a single key, and the UX should accommodate that.

## Using a unique FIO Crypto Handle for each user

For example, to accept crypto deposits using FIO Crypto Handles, an exchange may [register a unique FIO Crypto Handle for each user]({{site.baseurl}}/docs/integration-guide/handle-registration) of the exchange, and display it in their deposit area, e.g. alice@myexchange.

To deposit tokens of any supported cryptocurrency to their account the user would simply send tokens from a FIO-enabled wallet to their FIO Crypto Handle (e.g. alice@myexchange) and would not have to deal with Public Keys, memo fields, or even having to log into the exchange.

Each [FIO Crypto Handle may be mapped]({{site.baseurl}}/docs/integration-guide/handle-mapping) using the [`addaddress`]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) action to either the same crypto public address for all users, or a unique crypto public address for each user.

---
## Using the same FIO Crypto Handle for all users

Alternatively, an exchange may [register a single deposit FIO Crypto Handle]({{site.baseurl}}/docs/integration-guide/handle-registration) for all users of the exchange, and display it their deposit area (e.g. deposits@myexchange).

To deposit any supported token to their account the user would simply send tokens from a FIO-enabled wallet to the Deposit FIO Crypto Handle, e.g. deposits@myexchange. To properly identify the inbound transaction, the user would have to either include a [FIO Data memo]({{site.baseurl}}/docs/general-functions/fio-data) which includes their exchange account, or provide the exchange, ahead of time, with a list of FIO Crypto Handles which the user owns.

The Deposit FIO Crypto Handle would be mapped using [`addaddress`]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) to a single FIO Public Key.

The inbound transaction can be identified by reading the OBT Data using [/get_obt_data]({{site.baseurl}}/pages/api/fio-api/#post-/get_obt_data). The data is [encrypted]({{site.baseurl}}/docs/general-functions/encryption). Once decrypted, the memo or FIO Crypto Handle of Payee can be used to uniquely identify the user, and the obt_id will contain native chain transaction ID of the corresponding deposit.

#### Transaction memo for FIO token transfer

The [`trnsfiopubky`]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) action does not accept a memo field. To [attach a FIO Data memo]({{site.baseurl}}/docs/general-functions/fio-data) to a FIO token transfer, a [`recordobt`]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) transaction should be sent after the tokens are transferred and include the token transfer transaction id. [`recordobt`]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) requires that both payer and payee have a FIO Crypto Handle. **If either party does not have a FIO Crypto Handle then transfer of memo is not supported**.


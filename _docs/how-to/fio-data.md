---
title: FIO Data
description: FIO Data
---

# Recording and Retrieving FIO Data

FIO Data is metadata that can accompany any blockchain transaction using a FIO-enabled application.

This metadata can range from a simple memo (e.g., "for lunch"), to structured data like an order cart, exchange deposit details or hashes that are references to off-chain data. This is especially useful for future decentralized commerce, in which conventional transaction information (like invoices, dates, additional contact information) can be stored on-chain for future audits, with full audibility and encryption between counter parties.

FIO Data can also include metadata related to a native blockchain transaction, such as transaction ids, refund addresses, and even hashes of off-chain data. Some of this data accompanies a regular FIO Request.

Finally, FIO Data can also provide a secure and private mechanism for certain regulated entities to maintain encrypted stores of information on customers, as stipulated by examples such as the Travel Rule. This will allow for a level of cross-application compliance where jurisdiction demands.

**FIO Data (up to a certain character limit) are included as part of the bundled transaction with registering/renewing a FIO Crypto Handle.**

### Recording FIO Data

Anytime crypto is sent using FIO Crypto Handle (aka FIO Address), optional metadata such as amount, currency, and memo, may be recorded on the FIO Chain. This optional metadata is referred to as **Other Blockchain Transaction (OBT)** data by FIO Protocol. FIO OBT Data is encrypted and only readable by the Payee (the user receiving the crypto) and Payer (the user sending the crypto).

FIO Data, can be recorded using the [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) API method.

Although [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) has to be sent any time user is sending crypto currency in response to a FIO Request, it is optional when a user directly sends crypto to a user with a FIO Crypto Handle.

It is **strongly encouraged** that [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) is sent when a user populates the memo field, as it allows for the transaction memo to be reliably sent across different wallets.

When sending FIO tokens using a FIO Crypto Handle **you must submit [/record_obt_data]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) following [transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) to ensure FIO Crypto Handles are attached to the transaction**. Some wallets and exchanges may be relying on this information to properly account the FIO tokens, e.g. exchange deposit.

### Retrieving FIO Data

Other blockchain transaction (OBT) memo data can be retrieved using [/get_obt_data]({{site.baseurl}}/pages/api/fio-api/#post-/get_obt_data). This call will return all metadata relevant to the provided FIO Public key, including:

* Outbound data. Payer’s FIO Crypto Handle is owned by provided FIO Public key
* Inbound data. Payee’s FIO Crypto Handle is owned by provided FIO Public key
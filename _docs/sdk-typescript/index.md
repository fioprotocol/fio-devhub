---
title: Using the Typescript SDK
description: Using the Typescript SDK
layout: page
---

# Using the Typescript SDK

The [FIO Typescript SDK]({{ site.baseurl }}/pages/api/fio-api) is an opensource SDK used to interact with FIO blockchain using the [FIO API]({{ site.baseurl }}/pages/api/fio-api). 

There are two types of interactions with the FIO blockchain: FIO API Getters and FIO Transactions.

## FIO API Getters

[FIO API getters]({{ site.baseurl }}/pages/api/fio-api/#tag--Getters) are used to retrieve information. These calls do not require any signing and may be called directly without any pre-packaging. 

## FIO Transactions 

[FIO Transactions]({{ site.baseurl }}/pages/api/fio-api/#tag--Transactions) are sent to [/push_transaction]({{ site.baseurl }}/pages/api/fio-api/#post-/push_transaction), a generic API endpoint that accepts all FIO action data objects. Transaction instances consist of a transaction header, the list of action instances, and transaction extensions that make the actual transaction.

All transactions must be [packed and signed]({{ site.baseurl }}/pages/api/fio-api/#options-packed_transaction) prior to submitting them to /push_transaction.

## Initializing the SDK

Getting started with the SDK is easy. To start, FIO must be imported and initialized.

Importing using commonJS syntax is supported by Node.js out of the box:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
```

The Typescript SDK uses a singleton model requiring initialization in the constructor as these parameters are referenced in subsequent SDK Calls.

```javascript
    const fetchJson = async (uri, opts = {}) => {
        return fetch(uri, opts)
    }
    
    const privateKey = 'your_private_key';
    const publicKey = 'your_public_key';
    const baseUrl = 'http://testnet.fioprotocol.io/v1/';
    
    fioSdk = new FIOSDK(
        privateKey,
        publicKey,
        baseUrl,
        fetchJson
     )
```

* `privateKey/publicKey` - The wallet user's private/public keys
* `baseURL` - The base URL to a FIO Protocol blockchain API node
* `fetchjson` - A reference to fetchJson, used for http post/get calls 

Once initialized, the fioSdk object can be used to send transactions to the FIO blockchain. Refer to the Typescript SDK examples for more usage details.
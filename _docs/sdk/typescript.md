---
title: Using the Typescript SDK
description: Using the Typescript SDK
layout: 
redirect_from:
    - /docs/sdk-typescript
---

# Using the Typescript SDK

The [FIO Typescript SDK]({{ site.baseurl }}/pages/api/fio-api) is an opensource SDK used to interact with FIO blockchain using the [FIO API]({{ site.baseurl }}/pages/api/fio-api). 

## Getting Started with the SDK

Getting started with the SDK is easy. To start, FIO must be imported and initialized. Importing using commonJS syntax is supported by Node.js out of the box:

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

Once initialized, the fioSdk object can be used to send transactions to the FIO blockchain. Refer to the [Typescript SDK Github] for more usage details and the [fiosdk_typescript-examples repo](https://github.com/fioprotocol/fiosdk_typescript-examples/blob/main/fiosdk.prepared-txn.js){:target="_blank"} for examples.
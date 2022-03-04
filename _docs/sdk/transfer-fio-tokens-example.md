---
layout: page-sdk
title: Using the Typescript SDK
description: Using the Typescript SDK
redirect_from:
    - /docs/sdk-typescript/transfer-fio-tokens-example
---
# Example: Transfer FIO tokens using a FIO Crypto Handle

{% include alert.html type="warning" title="Typescript SDK version compatability" 
content = "The following example uses Version 1.x of the Typescript SDK. Version 2.x introduced non-backward compatible changes and a different syntax for pushing transactions to the blockchain."
%}

The following is an example of how to use the [FIO Typescript SDK](https://github.com/fioprotocol/fiosdk_typescript){:target="_blank"} to transfer FIO from a payer (the user sending the funds) to a payee (the user receiving the funds) using the payee's FIO Crypto Handle. Use the [FIO Testnet Monitor to register your Testnet private/public keys and fund your Testnet account]({{site.baseurl}}/docs/chain/testnet#integration-testing-with-fio-testnet).

## Import FIO

Importing using commonJS syntax is supported by Node.js out of the box:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
```

## Initialize the SDK

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



### Look up token public address

In this step we use the payee's FIO Crypto Handle and the token and chain code for FIO to look up the payee's FIO Public Key.

```javascript
    const payeeFioAddress = 'payee@fiotestnet'
    
    const result = await fioSdk.getPublicAddress(payeeFioAddress, "FIO", "FIO")
```

This returns the following JSON:
```javascript
    {
        "public_address": "0xab5801a7d398351b8be11c439e05c5b3259aec9b"
    }
```

We capture the payee's FIO Public Key:

```javascript
    payeePublicKey = result.public_address
```

### Get FIO fee

Use /get_fee to look up the payer fee for [/transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky) (trnsfiopubky)

```javascript
    const { fee } = await fioSdk.getFee('transfer_tokens_pub_key');
```

### Transfer FIO

*pushTransaction* is used to sign and push transactions onto the blockchain.

```javascript
    const transferAmount = 1000000000   // 1 FIO
    
    await fioSdk.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
            payee_public_key: payeePublicKey,
            amount: transferAmount,
            max_fee: fee,
            tpid: "rewards@wallet"
        }
    )
```

### Final code

The following summarizes the steps to transfer FIO tokens using a FIO Crypto Handle:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
    
    const fetchJson = async (uri, opts = {}) => {
        return fetch(uri, opts)
    }
    
    const privateKey = 'your_private_key';
    const publicKey = 'your_public_key';
    const baseUrl = 'http://testnet.fioprotocol.io/v1/';
    
    const payeeFioAddress = 'payee@fiotestnet';
    
    async function main() {
        const fioSdk = new FIOSDK(
            privateKey,
            publicKey,
            baseUrl,
            fetchJson
        )

        try {
            const { public_address: payeePublicKey } = await fioSdk.getPublicAddress(payeeFioAddress, "FIO", "FIO")
        
            const { fee } = await fioSdk.getFee('transfer_tokens_pub_key');
        
            const transferAmount = 1000000000   // 1 FIO
        
            await fioSdk.pushTransaction(
                'fio.token',
                'trnsfiopubky',
                {
                    payee_public_key: payeePublicKey,
                    amount: transferAmount,
                    max_fee: fee,
                    tpid: "rewards@wallet"
                }
            )
        } catch (e) {
          console.log(e);
        }
    }
    
    main()
```

<div class="row position-relative">
    <div class="col-6">
        <div class="form-group">
            <label for="transfer-payee">Payee FIO Crypto Handle</label>
            <input type="text" class="form-control" id="transfer-payee" placeholder="payee@fiotestnet">
        </div>
        <div class="form-group">
            <label for="transfer-amount">Amount (FIO)</label>
            <input type="number" class="form-control" id="transfer-amount" placeholder="1">
        </div>
        <button id="try-transfer" class="btn btn-default btn--blue">Try</button>
    </div>
    <div id="spinner" class="fa-3x d-none" role="status">
        <i class="fas fa-spinner fa-spin"></i>
    </div>
</div>

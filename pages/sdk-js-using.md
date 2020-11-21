---
title: Using the Typescript SDK
sidebar_label: Using the Typescript SDK
layout: sidenav
sidebar: sidebars
---

## Import

Importing using commonJS syntax is supported by Node.js out of the box:

```
const { FIOSDK } = require('@fioprotocol/fiosdk');
const { fetch } = require('node-fetch');
```

## Initializing the SDK

The Typescript SDK uses a singleton model requiring initialization in the constructor as these parameters are referenced in subsequent SDK Calls.

```
const fetchJson = async (uri, opts = {}) => {
    return fetch(uri, opts)
}

const privateKey = '5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu';
const publicKey = 'FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o';
const baseUrl = 'http://testnet.fioprotocol.io/v1/';
const registerMockUrl = '';

fioSdk = new FIOSDK(
    privateKey,
    publicKey,
    baseUrl,
    fetchJson,
    registerMockUrl
  )
```

* `privateKey/publicKey` - The wallet user's private/public keys
* `baseURL` - The base URL to a FIO Protocol blockchain API node
* `fetchjson` - A reference to fetchJson, used for http post/get calls 
* `registerMockUrl` - the URL of the server used to auto-register FIO names for wallet users. This is only used by wallets that have deployed a central server used to register names on their domain. It is used by the registerOnBehalfOfUser method. **Note that this parameter is being deprecated in Version 2.0 of the Typescript SDK.**

## Example: Transfer FIO tokens using a FIO Address

**(The following example user Version 1.x of the Typescript SDK. Version 2.x introduced non-backward compatible changes and a different syntax for pushing transaction to the blockchain.)**

In this example we will use the SDK to transfer FIO from a payer (the user sending the funds) to a payee (the user receiving the funds) using the payee's FIO Address.

### Step 1. Look up token public address

In this step we use the payee's FIO Address and the token and chain code for FIO to look up the payee's FIO Public Key.

```
const payeeFioAddress = 'payee@fiotestnet'

const result = await fiosdk.genericAction('getPublicAddress', {
    fioAddress: payeeFioAddress,
    chainCode: "FIO",
    tokenCode: "FIO"
})
```

This returns the following JSON:
```
{
  "public_address": "0xab5801a7d398351b8be11c439e05c5b3259aec9b"
}
```

We capture the payee's FIO Public Key:

```
payeePublicKey = result.public_address

```

### Step 2. Get FIO fee

Use /get_fee to look up the payer fee for /transfer_tokens_pub_key (trnsfiopubky)

```
const payerFioAddress = 'payer@fiotestnet'

const { fee } = await fiosdk.getFee('transfer_tokens_pub_key', payerFioAddress);
```

### Step 3. Look up actor

In Version 1 of the SDK the 'actor' must be passed in to pushTransaction. To retrieve the actor:

```
Need to complete
```

### Step 4. Transfer FIO

*pushTransaction* is used to sign and push transactions onto the blockchain.

```
const transferAmount = 1000000000   // 1 FIO

const result = await fiosdk.genericAction('pushTransaction', {
    action: 'trnsfiopubky',
    account: 'fio.token',
    data: {
        payee_public_key: payeePublicKey,
        amount: transferAmount,
        max_fee: fee,
        tpid: "rewards@wallet",
        actor: "aftyershcu22"
    }
}
```

### Final code

The following summarizes the steps to transfer FIO tokens using a FIO Address:

```

const { FIOSDK } = require('@fioprotocol/fiosdk');
const { fetch } = require('node-fetch');

const fetchJson = async (uri, opts = {}) => {
    return fetch(uri, opts)
}

const privateKey = '5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu';
const publicKey = 'FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o';
const baseUrl = 'http://testnet.fioprotocol.io/v1/';
const registerMockUrl = '';

const payerFioAddress = 'payer@fiotestnet'
const payeeFioAddress = 'payee@fiotestnet';

async function main () {


    fioSdk = new FIOSDK(
        privateKey,
        publicKey,
        baseUrl,
        fetchJson,
        registerMockUrl
    )

    const result = await fiosdk.genericAction('getPublicAddress', {
        fioAddress: payeeFioAddress,
        chainCode: "FIO",
        tokenCode: "FIO"
    })

    payeePublicKey = result.public_address

    const { fee } = await fiosdk.getFee('transfer_tokens_pub_key', payerFioAddress);

    const transferAmount = 1000000000   // 1 FIO

    const result = await fiosdk.genericAction('pushTransaction', {
        action: 'trnsfiopubky',
        account: 'fio.token',
        data: {
            payee_public_key: payeePublicKey,
            amount: transferAmount,
            max_fee: fee,
            tpid: "rewards@wallet",
            actor: "aftyershcu22"
        }
    }

}

main()

```




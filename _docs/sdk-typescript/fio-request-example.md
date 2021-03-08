---
title: Example - FIO Request
description: Example - FIO Request
layout: page-sdk
---

# Example - FIO Request

The following is an example of how to send, get, approve or reject a FIO Request. Use the [FIO Testnet Monitor to create your Testnet private/public keys and fund your Testnet account]({{site.baseurl}}/docs/chain/testnet#integration-testing-with-fio-testnet).

## Import FIO

Importing using commonJS syntax is supported by Node.js out of the box:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
```

### Initialize the SDK.

```javascript
    
    const fetchJson = async (uri, opts = {}) => {
      return fetch(uri, opts)
    }
   
    const baseUrl = 'http://testnet.fioprotocol.io/v1/';
    
    const payeePrivateKey = '';
    const payeePublicKey = '';
    const payeeFioAddress = '';
    const payerFioAddress = '';
    const requestAmount = 1; // set amount
    const memo = ''; // optional

    const fioSdkPayee = new FIOSDK(
      payeePrivateKey,
      payeePublicKey,
      baseUrl,
      fetchJson
    )

    const { public_address: payerPublicKey } = await fioSdkPayee.getPublicAddress(payerFioAddress, "FIO", "FIO")
```

* `privateKey/publicKey` - The wallet user's private/public keys
* `baseURL` - The base URL to a FIO Protocol blockchain API node
* `fetchjson` - A reference to fetchJson, used for http post/get calls 

### Get fee for send request.

Use /get_fee to look up the payer fee for /new_funds_request. You need to set `payeeFioAddress` for this call

```javascript
    const { fee: sendRequestFee } = await fioSdkPayee.getFeeForNewFundsRequest(payeeFioAddress)
```

### Step 3. Send new funds request.

Call `requestFunds` with needed params. `payeeTokenPublicAddress` could be public address of any coin (BTC, ETH, ...), and you should provide proper `chainCode/tokenCode` for it.

```javascript
    const requestFundsResult = await fioSdkPayee.genericAction('requestFunds', {
        payerFioAddress,
        payeeFioAddress,
        payeeTokenPublicAddress: fioSdkPayee.publicKey,
        payerFioPublicKey: payerPublicKey,
        amount: requestAmount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        memo,
        maxFee: sendRequestFee,
    })
    const requestId = requestFundsResult.fio_request_id
```

### Step 4. Check request sent.

You could check that request created for payee.

```javascript
    const { requests: sentRequests } = await fioSdkPayee.getSentFioRequests()
    const sentRequest = sentRequests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
    if (sentRequest && sentRequest.fio_request_id) {
      console.log(sentRequest);
    }
```

### Final code

The following summarizes the steps to send and get sent FIO Request:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
    
    const fetchJson = async (uri, opts = {}) => {
      return fetch(uri, opts)
    }
   
    const baseUrl = 'http://testnet.fioprotocol.io/v1/';
    
    async function main() {
      const payeePrivateKey = '';
      const payeePublicKey = '';
      const payeeFioAddress = '';
      const payerFioAddress = '';
      const requestAmount = 1; // set amount
      const memo = ''; // optional

      const fioSdkPayee = new FIOSDK(
        payeePrivateKey,
        payeePublicKey,
        baseUrl,
        fetchJson
      )

      const { public_address: payerPublicKey } = await fioSdkPayee.getPublicAddress(payerFioAddress, "FIO", "FIO")
      const { fee: sendRequestFee } = await fioSdkPayee.getFeeForNewFundsRequest(payeeFioAddress)
    
      const requestFundsResult = await fioSdkPayee.genericAction('requestFunds', {
        payerFioAddress,
        payeeFioAddress,
        payeeTokenPublicAddress: fioSdkPayee.publicKey,
        payerFioPublicKey: payerPublicKey,
        amount: requestAmount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        memo,
        maxFee: sendRequestFee,
      })
      const requestId = requestFundsResult.fio_request_id
    
      let sentRequest
      while (!sentRequest) {
        try {
          const { requests } = await fioSdkPayee.getSentFioRequests()
          sentRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
          if (sentRequest && sentRequest.fio_request_id) {
            console.log(sentRequest);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    
    main()
```

<div id="fio-request-example-container" class="row position-relative">
    <div class="col-6">
        <div class="form-group">
            <label for="fio-request-payer">Requestor FIO Address</label>
            <select class="form-control" id="fio-request-payee"></select>
        </div>
        <div class="form-group">
            <label for="fio-request-payer">Payer FIO Address</label>
            <input type="text" class="form-control" id="fio-request-payer" placeholder="payee@fiotestnet">
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label>Requested Chain Code</label>
                    <input type="text" disabled class="form-control" value="FIO" />
                </div>
                <div class="col-6">
                    <label>Requested Token Code</label>
                    <input type="text" disabled class="form-control" value="FIO" />
                 </div>
            </div>
        </div>
        <div class="form-group">
            <label>Token Public Address</label>
            <input type="text" class="form-control" disabled id="fio-request-token-pub-address">
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-4">
                    <label for="fio-request-amount">Amount (FIO)</label>
                    <input type="number" class="form-control" id="fio-request-amount">
                </div>
                <div class="col-8">
                    <label for="fio-request-memo">Memo</label>
                    <input type="text" class="form-control" id="fio-request-memo" placeholder="Message for payer">
                 </div>
            </div>
        </div>
        <button id="try-fio-request" class="btn btn-default btn--blue">Try</button>
    </div>
    <div id="spinner" class="fa-3x d-none" role="status">
        <i class="fas fa-spinner fa-spin"></i>
    </div>
</div>

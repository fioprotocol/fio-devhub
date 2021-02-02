---
title: Fio Request Example
description: Fio Request Example
layout: page-sdk
---

# Fio Request Example

The following is an example of how to send, get, approve or reject fio request. Use the [FIO Testnet Monitor to register your Testnet private/public keys and fund your Testnet account]({{site.baseurl}}/docs/chain/testnet#integration-testing-with-fio-testnet) if you haven't registered yet.

## Import

Importing using commonJS syntax is supported by Node.js out of the box:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
```

### Step 1. Initializing the SDK.

In this example you would need 2 key pairs for payee and payer

```javascript
    
    const fetchJson = async (uri, opts = {}) => {
      return fetch(uri, opts)
    }
   
    const baseUrl = 'http://testnet.fioprotocol.io/v1/';
    
    const payeePrivateKey = '';
    const payeePublicKey = '';
    const payeeFioAddress = '';
    const payerFioAddress = '';
    const payerPrivateKey = '';
    const requestAmount = 1; // set amount
    const memo = ''; // optional

    const fioSdkPayee = new FIOSDK(
      payeePrivateKey,
      payeePublicKey,
      baseUrl,
      fetchJson
    )

    const { public_address: payerPublicKey } = await fioSdkPayee.getPublicAddress(payerFioAddress, "FIO", "FIO")

    const fioSdkPayer = new FIOSDK(
      payerPrivateKey,
      payerPublicKey,
      baseUrl,
      fetchJson
    )
```

* `privateKey/publicKey` - The wallet user's private/public keys
* `baseURL` - The base URL to a FIO Protocol blockchain API node
* `fetchjson` - A reference to fetchJson, used for http post/get calls 

### Step 2. Get fee for send request.

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
        payerFioPublicKey: fioSdkPayer.publicKey,
        amount: requestAmount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        memo,
        maxFee: sendRequestFee,
    })
    const requestId = requestFundsResult.fio_request_id
```

### Step 4. Check request sent.

You could check that request created for payee and you should be able to retrieve it for payer.

```javascript
    const { requests: sentRequests } = await fioSdkPayee.getSentFioRequests()
    const sentRequest = sentRequests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
    if (sentRequest && sentRequest.fio_request_id) {
      console.log(sentRequest);
    }
    
    const { requests: pendingRequests } = await fioSdkPayer.getPendingFioRequests()
    const pendingRequest = pendingRequests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
    if (pendingRequest && pendingRequest.fio_request_id) {
      console.log(pendingRequest);
    }
```

### Step 5. Approve FIO Request.

Now you could create a transfer and call `recordObtData` to mark request as approved.

```javascript
      const { fee: transferFee } = await fioSdkPayer.getFee('transfer_tokens_pub_key');
      fioSdkPayer.returnPreparedTrx = true
      const preparedTrx = await fioSdkPayer.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
          payee_public_key: pendingRequest.content.payee_public_address,
          amount: FIOSDK_LIB.FIOSDK.amountToSUF(pendingRequest.content.amount),
          max_fee: transferFee,
          // tpid: "rewards@wallet"
        }
      )
      const transferResult = await fioSdkPayer.executePreparedTrx(
        'transfer_tokens_pub_key',
        preparedTrx
      )
      fioSdkPayer.returnPreparedTrx = false
      console.log(transferResult.transaction_id);
    
      const { fee: recordObtFee } = await fioSdkPayer.getFeeForRecordObtData(pendingRequest.payer_fio_address);
      const recordObtDataResult = await fioSdkPayer.genericAction('recordObtData', {
        fioRequestId: requestId,
        payerFioAddress: pendingRequest.payer_fio_address,
        payeeFioAddress: pendingRequest.payee_fio_address,
        payerTokenPublicAddress: fioSdkPayer.publicKey,
        payeeTokenPublicAddress: pendingRequest.content.payee_public_address,
        amount: pendingRequest.content.amount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        status: 'sent_to_blockchain',
        obtId: '',
        maxFee: recordObtFee,
      })
      console.log(recordObtDataResult);
```

### Step 6. Approve FIO Request.

Then you could see that request status changed. Also, now payer would not get this request from `getPendingFiorequests` call.

```javascript
    const { requests } = await fioSdkPayee.getSentFioRequests()
    const sentRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
    if (sentRequest && sentRequest.fio_request_id) {
      console.log(sentRequest.status);
    }
```

### Rejecting FIO Requests

FIOSDK has `rejectFundsRequest` method to do it

```javascript
    const { fee: rejectFee } = await fioSdkPayer.getFeeForRejectFundsRequest(payerFioAddress)
    const rejectResult = await fioSdkPayer.rejectFundsRequest(requestId, rejectFee)
    console.log(rejectResult);
```

### Final code

The following summarizes the steps to send, get and approve FIO Request:

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
      const payerPrivateKey = '';
      const requestAmount = 1; // set amount
      const memo = ''; // optional

      const fioSdkPayee = new FIOSDK(
        payeePrivateKey,
        payeePublicKey,
        baseUrl,
        fetchJson
      )

      const { public_address: payerPublicKey } = await fioSdkPayee.getPublicAddress(payerFioAddress, "FIO", "FIO")
    
      const fioSdkPayer = new FIOSDK(
        payerPrivateKey,
        payerPublicKey,
        baseUrl,
        fetchJson
      )
      const { fee: sendRequestFee } = await fioSdkPayee.getFeeForNewFundsRequest(payeeFioAddress)
    
      const requestFundsResult = await fioSdkPayee.genericAction('requestFunds', {
        payerFioAddress,
        payeeFioAddress,
        payeeTokenPublicAddress: fioSdkPayee.publicKey,
        payerFioPublicKey: fioSdkPayer.publicKey,
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
    
      let pendingRequest
      try {
        const { requests } = await fioSdkPayer.getPendingFioRequests()
        pendingRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
        if (pendingRequest && pendingRequest.fio_request_id) {
          console.log(pendingRequest);
        }
      } catch (e) {
        console.log(e);
      }
    
      const { fee: transferFee } = await fioSdkPayer.getFee('transfer_tokens_pub_key');
      fioSdkPayer.returnPreparedTrx = true
      const preparedTrx = await fioSdkPayer.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
          payee_public_key: pendingRequest.content.payee_public_address,
          amount: FIOSDK_LIB.FIOSDK.amountToSUF(pendingRequest.content.amount),
          max_fee: transferFee,
          // tpid: "rewards@wallet"
        }
      )
      const transferResult = await fioSdkPayer.executePreparedTrx(
        'transfer_tokens_pub_key',
        preparedTrx
      )
      fioSdkPayer.returnPreparedTrx = false
      console.log(transferResult.transaction_id);
    
      const { fee: recordObtFee } = await fioSdkPayer.getFeeForRecordObtData(pendingRequest.payer_fio_address);
      const recordObtDataResult = await fioSdkPayer.genericAction('recordObtData', {
        fioRequestId: requestId,
        payerFioAddress: pendingRequest.payer_fio_address,
        payeeFioAddress: pendingRequest.payee_fio_address,
        payerTokenPublicAddress: fioSdkPayer.publicKey,
        payeeTokenPublicAddress: pendingRequest.content.payee_public_address,
        amount: pendingRequest.content.amount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        status: 'sent_to_blockchain',
        obtId: '',
        maxFee: recordObtFee,
      })
      console.log(recordObtDataResult);
    
      // check sent request has changed status
      try {
        const { requests } = await fioSdkPayee.getSentFioRequests()
        const sentRequest = requests.find(pr => parseInt(pr.fio_request_id) === parseInt(requestId))
        if (sentRequest && sentRequest.fio_request_id) {
          console.log(sentRequest);
        }
      } catch (e) {
        console.log(e);
      }
    }
    
    main()
```

<div id="fio-request-example-container" class="row position-relative">
    <div class="col-6">
        <div class="form-group">
            <label for="fio-request-payer">Sender FIO Address</label>
            <select class="form-control" id="fio-request-payee"></select>
        </div>
        <div class="form-group">
            <label for="fio-request-payer">Receiver FIO Address</label>
            <input type="text" class="form-control" id="fio-request-payer" placeholder="payee@fiotestnet">
        </div>
        <div class="form-group">
            <label for="fio-request-private">Receiver Private Key</label>
            <input type="password" class="form-control" id="fio-request-private" placeholder="5Jkeo...">
        </div>
        <div class="form-group">
            <label for="fio-request-amount">Amount (FIO)</label>
            <input type="number" class="form-control" id="fio-request-amount" placeholder="1">
        </div>
        <div class="form-group">
            <label for="fio-request-memo">Memo</label>
            <input type="text" class="form-control" id="fio-request-memo" placeholder="Message for receiver">
        </div>
        <button id="try-fio-request" class="btn btn-default btn--blue">Try</button>
    </div>
    <div id="spinner" class="fa-3x d-none" role="status">
        <i class="fas fa-spinner fa-spin"></i>
    </div>
</div>

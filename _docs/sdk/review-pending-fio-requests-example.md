---
title: Example - Review Pending FIO Requests
description: Example - Review Pending FIO Requests
layout: page-sdk
---

# Example - Review Pending FIO Requests

The following is an example of how to get, approve or reject pending fio requests. Use the [FIO Testnet Monitor to register your Testnet private/public keys and fund your Testnet account]({{site.baseurl}}/docs/chain/testnet#integration-testing-with-fio-testnet) if you haven't registered yet.

## Import

Importing using commonJS syntax is supported by Node.js out of the box:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
```

### Step 1. Initializing the SDK.

See `Using FIOSDK` page.

### Step 2. Get pending fio requests.

```javascript
    const { requests: pendingRequests } = await fioSdk.getPendingFioRequests()
```

### Step 3. Approve FIO Request.

Now you could create a transfer and call `recordObtData` to mark request as approved.

```javascript
      const { fee: transferFee } = await fioSdk.getFee('transfer_tokens_pub_key');
      fioSdk.returnPreparedTrx = true
      const preparedTrx = await fioSdk.pushTransaction(
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
      fioSdk.returnPreparedTrx = false
      console.log(transferResult.transaction_id);
    
      const { fee: recordObtFee } = await fioSdk.getFeeForRecordObtData(pendingRequest.payer_fio_address);
      const recordObtDataResult = await fioSdk.genericAction('recordObtData', {
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

### Rejecting FIO Requests

FIOSDK has `rejectFundsRequest` method to do it

```javascript
    const { fee: rejectFee } = await fioSdk.getFeeForRejectFundsRequest(payerFioAddress)
    const rejectResult = await fioSdk.rejectFundsRequest(requestId, rejectFee)
    console.log(rejectResult);
```

### Final code

The following summarizes the steps to get and approve pending FIO Request:

```javascript
    const { FIOSDK } = require('@fioprotocol/fiosdk');
    const { fetch } = require('node-fetch');
    
    const fetchJson = async (uri, opts = {}) => {
      return fetch(uri, opts)
    }
   
    const baseUrl = 'http://testnet.fioprotocol.io/v1/';
    
    async function main() {
      const privateKey = '';
      const publicKey = '';
      const limit = null;
      const offset = null;
      const memo = ''; // optional

      const fioSdk = new FIOSDK(
        privateKey,
        publicKey,
        baseUrl,
        fetchJson
      )

    
      let pendingRequests
      try {
        const { requests } = await fioSdk.getPendingFioRequests()
        pendingRequests = requests
      } catch (e) {
        console.log(e);
      }
      const pendingRequest = pendingRequests[0]

    
      const { fee: transferFee } = await fioSdk.getFee('transfer_tokens_pub_key');
      fioSdk.returnPreparedTrx = true
      const preparedTrx = await fioSdk.pushTransaction(
        'fio.token',
        'trnsfiopubky',
        {
          payee_public_key: pendingRequest.content.payee_public_address,
          amount: FIOSDK_LIB.FIOSDK.amountToSUF(pendingRequest.content.amount),
          max_fee: transferFee,
          // tpid: "rewards@wallet"
        }
      )
      const transferResult = await fioSdk.executePreparedTrx(
        'transfer_tokens_pub_key',
        preparedTrx
      )
      fioSdk.returnPreparedTrx = false
      console.log(transferResult.transaction_id);
    
      const { fee: recordObtFee } = await fioSdk.getFeeForRecordObtData(pendingRequest.payer_fio_address);
      const recordObtDataResult = await fioSdk.genericAction('recordObtData', {
        fioRequestId: requestId,
        payerFioAddress: pendingRequest.payer_fio_address,
        payeeFioAddress: pendingRequest.payee_fio_address,
        payerTokenPublicAddress: fioSdk.publicKey,
        payeeTokenPublicAddress: pendingRequest.content.payee_public_address,
        amount: pendingRequest.content.amount,
        chainCode: 'FIO',
        tokenCode: 'FIO',
        status: 'sent_to_blockchain',
        obtId: '',
        maxFee: recordObtFee,
      })
      console.log(recordObtDataResult);
    }
    
    main()
```

<div id="respond-fio-request-example-container" class="row position-relative">
    <div class="col-6">
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label for="fio-request-limit">Limit</label>
                    <input id="fio-request-limit" type="number" class="form-control" />
                </div>
                <div class="col-6">
                    <label for="fio-request-offset">Offset</label>
                    <input id="fio-request-offset" type="number" class="form-control" />
                 </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col-6">
                    <label>Requested Chain Code</label>
                    <input type="text" disabled class="form-control" value="any" />
                </div>
                <div class="col-6">
                    <label>Requested Token Code</label>
                    <input type="text" disabled class="form-control" value="any" />
                 </div>
            </div>
        </div>
        <button id="try-answer-fio-request" class="btn btn-default btn--blue">Try</button>
    </div>
    <div id="spinner" class="fa-3x d-none" role="status">
        <i class="fas fa-spinner fa-spin"></i>
    </div>
</div>

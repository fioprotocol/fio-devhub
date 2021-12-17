---
title: Submitting Transactions
description: Submitting Transactions
redirect_from:
    - /docs/integration-guide/transactions
---

# Submitting Transactions

Transactions go through various stages during their lifespan. First, a transaction is created in an application or a FIO-integrated client by bundling actions into a transaction. Next, the transaction is sent to a locally connected node, which in turn relays it to the active producing nodes for validation and execution via the peer-to-peer network. Next, the validated transaction is pushed to a block by the active producer on schedule along with other transactions. Finally the block that contains the transaction is pushed to all other nodes for validation. When a supermajority of producers have validated the block, and the block becomes irreversible, the transaction gets permanently recorded in the blockchain and it is considered immutable.

This section descr

|Content  |Summary |
|---|---|
| [Building and submitting a transaction]({{site.baseurl}}/docs/how-to/transactions#building-and-submitting-a-transaction) | High level overview of the transaction process. |
| [Quick start - Using the SDK]({{site.baseurl}}/docs/how-to/transactions#quick-start---using-the-sdk) | Getting started with the FIO SDK. |
| [Creating a prepared transaction]({{site.baseurl}}/docs/how-to/transactions#creating-a-prepared-transaction) | Creating a prepared transaction with the FIO SDK. |
| [More details on transactions]({{site.baseurl}}/docs/how-to/transactions#more-details-on-transactions) | Digs into the details of transaction packaging and signing. |

---
## Building and submitting a transaction

The process for creating a transaction digest (serializing the transaction) and signing the serialized transaction are depicted below.

![Image]({{ site.baseurl }}/assets/img/transaction-signing.png)

The chain ID identifies the actual FIO blockchain and consists of a hash of its genesis state, which depends on the blockchain’s initial configuration parameters. Before signing the transaction, the application first computes a digest of the transaction. The digest value is a SHA-256 hash of the chain ID, the transaction instance, and the context free data if the transaction has any context free actions. Any instance fields get serialized before computing any cryptographic hashes to avoid including reference fields (memory addresses) in the hash computation.

---
## Quick start - Using the SDK

FIO offers [several SDKs]({{site.baseurl}}/docs/sdk/using-the-api) that simplify the process of building and submitting a transaction. Refer to the [Javascript SDK examples]({{site.baseurl}}/docs/sdk/transfer-fio-tokens-example) and the [Javascript SDK examples repository](https://github.com/fioprotocol/fiosdk_typescript-examples){:target="_blank"} to get up and running with FIO.

Using the SDK in this manner combines the packaging, signing, and sending of a FIO transaction into a single function call. For integrators who want to separate the packaging and signing of the transaction from the sending of the transaction to the chain, the SDK offers methods for [preparing transactions]({{site.baseurl}}/docs/how-to/transactions#creating-a-prepared-transaction). 

---
## Creating a prepared transaction

The FIO SDK offers some helper functions for integrators who wish to separate the creation of the transaction from the sending of the transaction. This is helpful if you want to have the ability to inspect the transaction prior to submitting and if you want to have the ability to re-submit the same transaction in cases where the initial transaction send fails.

In the Typescript SDK, when preparing a transaction, setting `setSignedTrxReturnOption` to `true` will cause calls to the `genericaAction` action method to return a prepared transaction without submitting it to the chain. Once the prepared transaction has been captured, it can then be sent to the chain using `executePreparedTrx`. 

The following is an example using `setSignedTrxReturnOption` and `executePreparedTrx` to create and send a prepared transaction. The full working example can be found in the [fiosdk_typescript-examples repo](https://github.com/fioprotocol/fiosdk_typescript-examples/blob/main/fiosdk.prepared-txn.js){:target="_blank"}.

```javascript
const transferFioPreparedTxn = async () => {

  const user = new FIOSDK(
    privateKey,
    publicKey,
    baseUrl,
    fetchJson
  );

  let preparedTrx;

  try {
    user.setSignedTrxReturnOption(true);
    preparedTrx = await user.genericAction('pushTransaction', {
      action: 'trnsfiopubky',
      account: 'fio.token',
      data: {
        payee_public_key: payeeKey,
        amount: amount,
        max_fee: max_fee,
        tpid: ''
      }
    });
    console.log('Prepared transaction: ', preparedTrx);
  } catch (err) {
    console.log('Error preparedTrx: ', err);
    console.log('Json error==> : ', JSON.stringify(err.json.fields));
  }

  try {
    const result = await user.executePreparedTrx('transfer_tokens_pub_key', preparedTrx);
    console.log('Executed transaction: ', result);
    user.setSignedTrxReturnOption(false);
  } catch (err) {
    console.log('Error transaction_id: ', err);
    console.log('Json error==> : ', JSON.stringify(err));
  }

};
```

---
## More details on transactions

This section outlines the details of how transactions are packaged, signed, and pushed to the FIO chain. This information is generally not needed by most partners integrating the FIO protocol. It is mainly for informational purposes and for integration partners who do not want to use the FIO SDK but instead wish to use their own libraries.

{% include alert.html type="info" content="The examples in this section are for informational purposes. The FIO SDKs have simplified the process of creating transactions by performing all serialization and signing automatically." %}

There are four main steps, outlined below, for creating a transaction:
1. Structure and serialize a transaction
2. Sign the seralized transaction
3. Push the transaction to an API node
4. Verification of the transaction by the node

#### Create transaction digest
Transaction digests are created within an application by instantiating a transaction object and pushing the related action instances into a list within the transaction instance. An action instance contains the actual details about the receiver account to whom the action is intended, the name of the action, the list of actors and permission levels that must authorize the transaction via signatures and delays, and the actual message to be sent, if any.

Below is an example of fully contructed `addaddress` transaction using the FIO [Transaction schema]({{site.baseurl}}/pages/api/fio-api/#options-transaction). 

```javascript
const fetch = require('node-fetch')
const httpEndpoint = 'http://testnet.fioprotocol.io'

// Create keypair, fund from the faucet, and register a FIO Crypto Handle on the Testnet monitor (http://monitor.testnet.fioprotocol.io).
const user = {
    privateKey: '',
    publicKey: '',
    account: '',
    address: ''
}

const contract = 'fio.address'
const action = 'addaddress'

// Example data for addaddress
const data = {
    fio_address: user.address,
    public_addresses: [
        {
        chain_code: 'BCH',
        token_code: 'BCH',
        public_address: 'bitcoincash:somebitcoincashpublicaddress'
        },
        {
        chain_code: 'DASH',
        token_code: 'DASH',
        public_address: 'somedashpublicaddress'
        }
    ],
    max_fee: 600000000,
    tpid: 'rewards@wallet',
    actor: user.account
}

info = await (await fetch(httpEndpoint + '/v1/chain/get_info')).json();
blockInfo = await (await fetch(httpEndpoint + '/v1/chain/get_block', { body: `{"block_num_or_id": ${info.last_irreversible_block_num}}`, method: 'POST' })).json()
chainId = info.chain_id;
currentDate = new Date();
timePlusTen = currentDate.getTime() + 10000;
timeInISOString = (new Date(timePlusTen)).toISOString();
expiration = timeInISOString.substr(0, timeInISOString.length - 1);

transaction = {
    expiration,
    ref_block_num: blockInfo.block_num & 0xffff,
    ref_block_prefix: blockInfo.ref_block_prefix,
    actions: [{
        account: contract,
        name: action,
        authorization: [{
        actor: user.account,
        permission: 'active'
        }],
        data: data
    }]
};
```

Next, the completed transaction is serialized. Serializing a transaction takes two steps:

**1. Serialize the data in the `actions` field**

For this example we use the `fiojs` serializer which is the same as that used by `eosjs`.

```javascript
const { TextEncoder, TextDecoder } = require('text-encoding');
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
const { base64ToBinary, arrayToHex } = require('@fioprotocol/fiojs/dist/chain-numeric');
var ser = require("@fioprotocol/fiojs/dist/chain-serialize");

// Retrieve the fio.address ABI
abiFioAddress = await (await fetch(httpEndpoint + '/v1/chain/get_abi', { body: `{"account_name": "fio.address"}`, method: 'POST' })).json();
rawAbi = await (await fetch(httpEndpoint + '/v1/chain/get_raw_abi', { body: `{"account_name": "fio.address"}`, method: 'POST' })).json()
const abi = base64ToBinary(rawAbi.abi);

// Get a Map of all the types from fio.address
var typesFioAddress = ser.getTypesFromAbi(ser.createInitialTypes(), abiFioAddress.abi);

// Get the addaddress action type
const actionAddaddress = typesFioAddress.get('addaddress');

// Serialize the actions[] "data" field (This example assumes a single action, though transactions may hold an array of actions.)
const buffer = new ser.SerialBuffer({ textEncoder, textDecoder });
actionAddaddress.serialize(buffer, transaction.actions[0].data);
serializedData = arrayToHex(buffer.asUint8Array())

// Get the actions parameter from the transaction and replace the data field with the serialized data field
serializedAction = transaction.actions[0]
serializedAction = {
    ...serializedAction,
    data: serializedData
};
```

**2. Serialize the entire transaction**

```javascript
abiMsig = await (await fetch(httpEndpoint + '/v1/chain/get_abi', { body: `{"account_name": "eosio.msig"}`, method: 'POST' })).json()

var typesTransaction = ser.getTypesFromAbi(ser.createInitialTypes(), abiMsig.abi)

// Get the transaction action type
const txnaction = typesTransaction.get('transaction');

rawTransaction = {
    ...transaction,
    max_net_usage_words: 0,
    max_cpu_usage_ms: 0,
    delay_sec: 0,
    context_free_actions: [],
    actions: [serializedAction],     //Actions have to be an array
    transaction_extensions: [],
}

// Serialize the transaction
const buffer2 = new ser.SerialBuffer({ textEncoder, textDecoder });
txnaction.serialize(buffer2, rawTransaction);
serializedTransaction = buffer2.asUint8Array()
```

#### Sign transaction

After the transaction digest is computed, the digest is signed with the private key associated with the signing account’s public key. The public-private key pair is usually stored within the local machine that connects to the local node. The signing process is performed within the wallet manager associated with the signing account, which is typically the same user that deploys the application. The wallet manager provides a virtual secure enclave to perform the digital signing, so a message signature is generated without the private key ever leaving the wallet.

The transaction must be signed by a set of keys sufficient to satisfy the accumulated set of explicit actor:permission pairs specified in all the actions enclosed within the transaction. This linkage is done through the authority table for the given permission (see [Accounts & Permissions]({{site.baseurl}}/docs/fio-protocol/accounts-permissions)). The actual FIO Private key used for signing is obtained by querying the wallet on the client where the application is run.

The transaction signing process takes three parameters: 
1. The chain ID
2. The transaction instance to sign
3. The set of public keys from which the associated private keys within the application wallet are retrieved

For this example we use the `fiojs` signature provider which is the same as that used by `eosjs`.

```javascript
const { JsSignatureProvider } = require('@fioprotocol/fiojs/dist/chain-jssig');
const signatureProvider = new JsSignatureProvider([user.privateKey]);

requiredKeys = [user.publicKey]
serializedContextFreeData = null;

signedTxn = await signatureProvider.sign({
    chainId: chainId,
    requiredKeys: requiredKeys,
    serializedTransaction: serializedTransaction,
    serializedContextFreeData: serializedContextFreeData,
    abis: abi,
});
```

#### Push transaction
After the transaction is signed, a packed transaction instance is created from the signed transaction instance and pushed from the application to a local FIO node, which in turn relays the transaction to the active producing nodes for signature verification, execution, and validation. 

```javascript
const txn = {
    signatures: signedTxn.signatures,
    compression: 0,
    packed_context_free_data: arrayToHex(serializedContextFreeData || new Uint8Array(0)),
    packed_trx: arrayToHex(serializedTransaction)
}

pushResult = await fetch(httpEndpoint + '/v1/chain/push_transaction', {
    body: JSON.stringify(txn),
    method: 'POST',
});

jsonResult = await pushResult.json()

if (jsonResult.transaction_id) {
    console.log('Success. \nTransaction: ', jsonResult);
} else if (jsonResult.code) {
    console.log('Error: ', jsonResult.error);
} else {
    console.log('Error: ', jsonResult)
}
```

Every producing node that receives a transaction will attempt to execute and validate it in their local context before relaying it to the next producing node. Hence, valid transactions are relayed while invalid ones are dropped. The idea behind this is to prevent bad actors from spamming the network with bogus transactions. The expectation is for bad transactions to get filtered and dropped before reaching the active producer on schedule. When a transaction is received, no assumption is made on its validity. All transactions are validated again by the next producing node, regardless of whether it is producing blocks. The only difference is that the producer on schedule attempts to produce blocks by pushing the transactions it validates into a pending block before pushing the finalized block to its own local chain and relaying it to other nodes.

#### Verify transaction

The process to verify a transaction is twofold. First, the public keys associated with the accounts that signed the transaction are recovered from the set of signatures provided in the transaction. Such a recovery is cryptographically possible for ECDSA, the elliptic curve digital signature algorithm used in FIO. Second, the public key of each actor specified in the list of action authorizations (actor:permission) from each action included in the transaction is checked against the set of recovered keys to see if it is satisfied. Third, each satisfied actor:permission is checked against the associated minimum permission required for that actor:contract::action pair to see if it meets or exceeds that minimum. This last check is performed at the action level before any action is executed.


---
layout: page-int
title: FIO Transactions
description: FIO Transactions
redirect_from:
    - /docs/integration-guide/transactions
---

# FIO Transactions

Transactions go through various stages during their lifespan. First, a transaction is created in an application or a FIO-integrated client by bundling actions into a transaction. Next, the transaction is sent to a locally connected node, which in turn relays it to the active producing nodes for validation and execution via the peer-to-peer network. Next, the validated transaction is pushed to a block by the active producer on schedule along with other transactions. Finally the block that contains the transaction is pushed to all other nodes for validation. When a supermajority of producers have validated the block, and the block becomes irreversible, the transaction gets permanently recorded in the blockchain and it is considered immutable.

More details on the transaction lifecycle can be found in the [Transactions Protocol Guide]({{site.baseurl}}/docs/protocol/transactions). This section focuses on the steps needed to package, sign and submit transactions to the FIO chain.

---
## Quick start - Using the SDK

FIO offers [several SDKs]({{site.baseurl}}/docs/sdk/using-the-api) that simplify the process of building and submitting a transaction. Refer to the [Javascript SDK examples]({{site.baseurl}}/docs/sdk/transfer-fio-tokens-example) and the [Javascript SDK examples repository](https://github.com/fioprotocol/fiosdk_typescript-examples){:target="_blank"} to get up and running with FIO.

The SDK allows for different levels of control when packaging and signing transactions for the FIO Chain. For example, integrators may want to:

* Package, sign, and send a FIO transaction in a **single function call**
* Separate the packaging and signing of the transaction from the submitting of the transaction to the chain by **creating a prepared transaction**
* Separate the signing of the transaction from the packaging to allow for **"offline" signing of the transaction**

The following sections detail these three options in more detail.


### Single function call

The simplest way to use the FIO SDK to enable transaction with the FIO chain is to simply create a FIOSDK object and pass in the correct action parameters to the `genericAction` function. An example of this can be found in the [Transfer FIO Token Javascript SDK example]({{site.baseurl}}/docs/sdk/transfer-fio-tokens-example).

There are two parts to submitting a transaction using `genericAction`:

1) Create a new FIOSDK object:

```javascript
  user = new FIOSDK(
    privateKey,
    publicKey,
    baseUrl,
    fetchJson
  )
```

2) Call `genericAction` with the correct action data:

```javascript
const result = await user.genericAction('pushTransaction', {
  action: 'trnsfiopubky',
  account: 'fio.token',
  data: {
    payee_public_key: 'FIO6cqcmx7pyuYkG9omdr9juQEhksQEkTvpJhfwxkj42k2PhU7EWA',
    amount: 1000000000,
    max_fee: 1000000000,
    tpid: 'tpid@wallet'
  }
})
```

Here we are executing the `trnsfiopubky` action from the `fio.token` contract. The **action and account parameters** and the **data parameters** for this function call can be found in the [FIO API documentation](https://developers.fioprotocol.io/pages/api/fio-api/#options-trnsfiopubky){:target="_blank"}.


### Creating a prepared transaction

The FIO SDK offers some helper functions for integrators who wish to separate the creation of the transaction from the sending of the transaction. This is helpful if you want to have the ability to inspect the transaction prior to submitting it or if you want to have the ability to re-submit the same transaction in cases where the initial transaction send fails.

In the Typescript SDK, when preparing a transaction, setting `setSignedTrxReturnOption` to `true` will cause calls to the `genericAction` action method to return a prepared transaction without submitting it to the chain. Once the prepared transaction has been captured, it can then be sent to the chain using `executePreparedTrx`. 

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

  const result = await user.executePreparedTrx('transfer_tokens_pub_key', preparedTrx);
  user.setSignedTrxReturnOption(false);
};
```


### Offline signing of transactions

For integrators who want to limit access to FIO private keys, the FIO SDK offers methods that separate the serialization and signing of transactions.

This [fiosdk_typescript example](https://github.com/fioprotocol/fiosdk_typescript-examples/blob/main/fio.serialize-sign.js){:target="_blank"} demonstrates how to use the FIO Javascript SDK to enable offline signing of transactions. First, it creates a serialized transaction without requiring any FIO keys. It then passes the serialized transaction to the sign method to generate the signature.

```javascript
const {FIOSDK } = require('@fioprotocol/fiosdk')
fetch = require('node-fetch')
const createHash = require('create-hash');
const properties = require('./properties.js')

const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

const baseUrl = properties.server + '/v1/'

const privateKey = properties.privateKey,
  publicKey = properties.publicKey,
  payeeKey = '',  // FIO Public Key of the payee
  amount = 1000000000,
  max_fee = 100000000000


const main = async () => {

  user = new FIOSDK(
      '',
      '',
      baseUrl,
      fetchJson
  )

  const chainData = await user.transactions.getChainDataForTx();

  const transaction = await user.transactions.createRawTransaction({
      action: 'trnsfiopubky',
      account: 'fio.token',
      data: {
          payee_public_key: payeeKey,
          amount: amount,
          max_fee: max_fee,
          tpid: ''
      },
      publicKey,
      chainData,
  });

  const { serializedContextFreeData, serializedTransaction } = await user.transactions.serialize({
      chainId: chainData.chain_id,
      transaction,
  });
  
  // Pre-compute transaction ID
  const txnId = createHash('sha256').update(serializedTransaction).digest().toString('hex');

  const signedTransaction = await user.transactions.sign({
      chainId: chainData.chain_id,
      privateKeys: [privateKey],
      transaction,
      serializedTransaction,
      serializedContextFreeData,
  });

  const result = await user.executePreparedTrx('transfer_tokens_pub_key', signedTransaction);
}

main();
```

### Pre-compute transaction ID

Pre-computing the transaction ID for a FIO transaction is useful for integrators wanting to confirm transactions on the FIO chain. To calculate the `transaction_id` for a FIO transaction prior to sending it to the blockchain, you perform a SHA-256 hash of the `packed_trx`.

For example, here is a typical transaction you might pass to `push_transaction`:

```shell
txn:  { signatures:
   [ 'SIG_K1_Km62xn9thv3LYQv356PJMj9bP5ZwHRWZ2CgGan75sbcMfeZ7gtLrD1yukDiLgmdPVLZV3tpH4FW4A96ZKs5U42uAsnuyDb' ],
  compression: 0,
  packed_context_free_data: '',
  packed_trx:
   '1958cb60285764a002ba0000000001003056372503a85b0000c6eaa6645232013059393021cea2d800000000a8ed32326812656274657374314066696f746573746e657402034243480342434818626974636f696e636173683a617364666173646661736466044441534804444153481764617368616464726573736173646661736466617364660046c323000000003059393021cea2d80000' }
```

The `packed_trx` field contains the serialized transaction. The "Offline signing of transactions" code above provides an example of how to pre-compute the transaction ID from this serialized transaction.

`const txnId = createHash('sha256').update(serializedTransaction).digest().toString('hex');`

You can also manually view the pre-computed transaction ID by plugging the `packed_trx` hex into the Binary hash field of a calculator and checking the SHA-256 result. 

[Pre-compute transaction ID lookup example](https://www.fileformat.info/tool/hash.htm?hex=1958cb60285764a002ba0000000001003056372503a85b0000c6eaa6645232013059393021cea2d800000000a8ed32326812656274657374314066696f746573746e657402034243480342434818626974636f696e636173683a617364666173646661736466044441534804444153481764617368616464726573736173646661736466617364660046c323000000003059393021cea2d80000){:target="_blank"} 


---
## Using fiojs to package and send transactions

The FIO SDK wraps the [fiosjs library](https://github.com/fioprotocol/fiojs){:target="_blank"} to provide convenience methods for creating and submitting transactions to the FIO chain. Integrators who want to limit the number of third party libraries they embed or who want lower level access to FIO functionality in their applications can access the `fiojs` library directly in their applications.

This [fiojs example](https://github.com/fioprotocol/fiosdk_typescript-examples/blob/main/fiojs.token-trnsfiopubky.js){:target="_blank"} demonstrates how to use the `fiojs` library to create a `trnsfiopubky` transaction on the FIO chain:

```javascript
const { Fio } = require('@fioprotocol/fiojs');
const { TextEncoder, TextDecoder } = require('text-encoding');
const fetch = require('node-fetch');
const properties = require('./properties.js')

const httpEndpoint = properties.server

const privateKey = properties.privateKey,
  publicKey = properties.publicKey,
  account = properties.account,
  payeeKey = '',  // FIO Public Key of the payee
  amount = 1000000000,
  maxFee = 100000000000

const fiojsTrnsfiopubky = async () => {
  info = await (await fetch(httpEndpoint + '/v1/chain/get_info')).json();
  blockInfo = await (await fetch(httpEndpoint + '/v1/chain/get_block', {body: `{"block_num_or_id": ${info.last_irreversible_block_num}}`, method: 'POST'})).json()
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
      account: 'fio.token',
      name: 'trnsfiopubky',
      authorization: [{
        actor: account,
        permission: 'active',
      }],
      data: {
        payee_public_key: payeeKey,
        amount: amount,
        max_fee: maxFee,
        tpid: '',
        actor: account
      }
    }]
  };

  abiMap = new Map()
  tokenRawAbi = await (await fetch(httpEndpoint + '/v1/chain/get_raw_abi', {body: `{"account_name": "fio.token"}`, method: 'POST'})).json()
  abiMap.set('fio.token', tokenRawAbi)
 
  var privateKeys = [privateKey];
  
  const tx = await Fio.prepareTransaction({
    transaction,
    chainId,
    privateKeys,
    abiMap,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  });

  pushResult = await fetch(httpEndpoint + '/v1/chain/push_transaction', {
      body: JSON.stringify(tx),
      method: 'POST',
  });
  
  json = await pushResult.json();

  if (json.type) {
    console.log('Error: ', json.fields[0].error);
  } else {
    console.log('Success. Transaction ID: ', json.transaction_id)
  }
   
};

fiojsTrnsfiopubky();
```

---
## More details on transactions

This section outlines the details of how transactions are packaged, signed, and pushed to the FIO chain. This information is generally not needed by most partners integrating the FIO protocol. It is mainly for informational purposes and for integration partners who do not want to use the FIO SDK but instead wish to use their own libraries.

{% include alert.html type="info" content="The examples in this section are for informational purposes. The FIO SDKs have simplified the process of creating transactions by performing all serialization and signing automatically." %}

There are four main steps, outlined below, for creating a transaction:
1. Create a transaction digest
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


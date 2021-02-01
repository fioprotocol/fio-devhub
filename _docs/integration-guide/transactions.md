---
title: Submitting Transactions
description: Submitting Transactions
---

# Submitting Transactions

## Transaction Lifecycle

Transactions go through various stages during their lifespan. First, a transaction is created in an application or a FIO-integrated client by bundling actions into a transaction. Next, the transaction is sent to a locally connected node, which in turn relays it to the active producing nodes for validation and execution via the peer-to-peer network. Next, the validated transaction is pushed to a block by the active producer on schedule along with other transactions. Finally the block that contains the transaction is pushed to all other nodes for validation. When a supermajority of producers have validated the block, and the block becomes irreversible, the transaction gets permanently recorded in the blockchain and it is considered immutable.

### Create Transaction
Transactions are created within an application by instantiating a transaction object and pushing the related action instances into a list within the transaction instance. An action instance contains the actual details about the receiver account to whom the action is intended, the name of the action, the list of actors and permission levels that must authorize the transaction via signatures and delays, and the actual message to be sent, if any (see action schema below).

[Action schema]({{site.baseurl}}/pages/api/fio-api/#post-action)

After the transaction instance is created at the application level, the transaction is arranged for processing. This involves two main steps: signing the transaction and pushing the signed transaction to the local node for actual propagation and execution of the transaction. These steps are typically performed within the client application.

### Sign Transaction

The transaction must be signed by a set of keys sufficient to satisfy the accumulated set of explicit actor:permission pairs specified in all the actions enclosed within the transaction. This linkage is done through the authority table for the given permission (see [Keys, accounts, and permissions]({{site.baseurl}}/docs/fio-protocol/keys-accounts). The actual FIP Private key used for signing is obtained by querying the wallet on the client where the application is run.

The transaction signing process takes three parameters: 
1. The chain ID
2. The transaction instance to sign
3. The set of public keys from which the associated private keys within the application wallet are retrieved

The chain ID identifies the actual FIO blockchain and consists of a hash of its genesis state, which depends on the blockchain’s initial configuration parameters. Before signing the transaction, the application first computes a digest of the transaction. The digest value is a SHA-256 hash of the chain ID, the transaction instance, and the context free data if the transaction has any context free actions. Any instance fields get serialized before computing any cryptographic hashes to avoid including reference fields (memory addresses) in the hash computation. The transaction digest computation and the signing process are depicted below.

![Image]({{ site.baseurl }}/assets/img/transaction-signing.png)

After the transaction digest is computed, the digest is finally signed with the private key associated with the signing account’s public key. The public-private key pair is usually stored within the local machine that connects to the local node. The signing process is performed within the wallet manager associated with the signing account, which is typically the same user that deploys the application. The wallet manager provides a virtual secure enclave to perform the digital signing, so a message signature is generated without the private key ever leaving the wallet. After the signature is generated, it is finally added to the signed transaction instance.

### Push Transaction
After the transaction is signed, a packed transaction instance is created from the signed transaction instance and pushed from the application to a local FIO node, which in turn relays the transaction to the active producing nodes for signature verification, execution, and validation. Every producing node that receives a transaction will attempt to execute and validate it in their local context before relaying it to the next producing node. Hence, valid transactions are relayed while invalid ones are dropped. The idea behind this is to prevent bad actors from spamming the network with bogus transactions. The expectation is for bad transactions to get filtered and dropped before reaching the active producer on schedule. When a transaction is received, no assumption is made on its validity. All transactions are validated again by the next producing node, regardless of whether it is producing blocks. The only difference is that the producer on schedule attempts to produce blocks by pushing the transactions it validates into a pending block before pushing the finalized block to its own local chain and relaying it to other nodes.

### Verify Transaction
The process to verify a transaction is twofold. First, the public keys associated with the accounts that signed the transaction are recovered from the set of signatures provided in the transaction. Such a recovery is cryptographically possible for ECDSA, the elliptic curve digital signature algorithm used in EOSIO. Second, the public key of each actor specified in the list of action authorizations (actor:permission) from each action included in the transaction is checked against the set of recovered keys to see if it is satisfied. Third, each satisfied actor:permission is checked against the associated minimum permission required for that actor:contract::action pair to see if it meets or exceeds that minimum. This last check is performed at the action level before any action is executed.


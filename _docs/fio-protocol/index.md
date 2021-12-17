---
title: Overview
description: Overview
---
# FIO Protocol

## What is FIO Protocol? 

The FIO Protocol is bridging the gap between wallets (both exchange-based and self-sovereign) as well as crypto payment processing platforms providing an industry standard decentralized service layer of data, requests and confirmations that abstract away the complexities of the underlying blockchains. The FIO Protocol is not a wallet, not an exchange and not a crypto payment processor, rather, it enables them all to deliver a dramatically improved user experience. The FIO Protocol does not compete with other blockchains nor does it send value on or integrate with other blockchains but, rather, it enables them all to be more successful. Technically speaking, all other blockchains do not even know that the FIO Protocol exists.

## Important things to know about the FIO Protocol

<details>
  <summary><i>FIO Protocol is decentralized</i></summary>
<br>  
The service FIO offers is not centralized. There is no company making money off adoption, just a non-profit foundation trusted by the community to support the technology. The FIO Protocol is a decentralized business model rewarding everyone who adds value. It does this directly via the blockchain by distributing fees and tokens directly to validators, integrators, and (in the future, once FIP-21 is released) voters who stake their tokens.
</details>
<br>

<details>
  <summary><i>FIO Protocol does not directly send or receive your cryptocurrency</i></summary>
<br>  
The FIO Protocol, which acts like a layer 2 usability layer for all blockchains, doesn't actually integrate directly with any other blockchain. When sending to a human-readable FIO Crypto Handle (aka FIO Address) or responding to a FIO Request, the wallet, exchange, or FIO-enabled service you are using looks up the native blockchain address and sends to it directly. FIO is not involved in that transaction in any way. For example, the wallet looks up a bitcoin address mapped to user@fio and once it has that BTC address, it does a normal BTC transaction on the BTC chain.
</details>
<br>

<details>
  <summary><i>FIO Protocol is a standalone blockchain built on EOSIO technology</i></summary>
<br>  
The FIO Protocol is a Byzantine Fault Tolerant DPOS blockchain. Data lookups and validations for FIO Crypto Handle interactions are secured by the FIO Chain. Only the FIO private key holder who owns the FIO Crypto Handle NFT can map native blockchain addresses to that FIO Crypto Handle or send encrypted FIO Requests from that FIO Crypto Handle. This ensures the entire security of the network (currently over $14M worth of FIO tokens are being used to vote in the top block producer) is securing your FIO Crypto Handle mappings.
</details>

## What are main goals of the FIO Protocol?

The FIO Protocol reimagines and enables a better way of sending and receiving blockchain-based value, regardless of the wallet, exchange, token or coin used. This is achieved in a manner which is:

* **Human-meaningful:** allows users to initiate transactions using human-readable and memorable identifiers like "john@edgewallet" or "jane@gold"
* **Decentralized:** powered by a public blockchain that does not require a centralized solution of a trusted third party
* **Secure:** enables transactions to be exchanged between parties in a secure way. All FIO Protocol transactions require a FIO private key, which is stored in the user’s wallet
* **Private:** sensitive counter-party information, including public addresses and metadata, can be encrypted on the blockchain
* **Interoperable:** once integrated into a wallet, the FIO Protocol works with any blockchain and cryptocurrency without any integration to those chains
* **eCommerce ready:** enables request for payment functionality (i.e. for wallet-to-wallet order cart presentation) along with robust, immutable and private metadata for every transaction and simple refund processes

## What are the Primary Features of the FIO Protocol?

The FIO Protocol currently provides several features, with a robust roadmap of future items that may be added. Currently, the FIO Protocol enables the following:

#### FIO Crypto Handle

[FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) act as the human readable “wallet names” and user identifiers on the network. In addition, FIO Crypto Handles are the gateway to all other capabilities of the FIO Protocol. Registration of a FIO Crypto Handle is done in a FIO enabled wallet or exchange where a FIO Private/Public Key pair is generated. The FIO Crypto Handle and all actions on the FIO Chain are self-sovereign via the FIO Private Key. Without a FIO Crypto Handle, users cannot access any of the other FIO protocol capabilities.

#### FIO Request

A [FIO Request]({{site.baseurl}}/docs/how-to/fio-request) is a transaction in which a payee is requesting funds from payer using FIO Crypto Handles. The payee first encrypts all sensitive metadata (e.g. currency, amount, public address of payee, memo, etc.) using Diffie-Hellman key method , which derives a shared secret from the payee private key and the payer public key and places the transaction on the FIO Chain. The payer polls the FIO Chain, decrypts the metadata inside their wallet and uses the information to pre-populate the send transaction, which is broadcasted to the native blockchain without involving the FIO Protocol.

#### FIO Data

In addition, the payer places a [metadata about the native blockchain transaction]({{site.baseurl}}/docs/how-to/fio-data)  (e.g. native blockchain transaction id, refund address, memo, hash of off-chain metadata, etc.) on the FIO Chain. Just like the request, the metadata would be encrypted using Diffie-Hellman key method.

## Resources

If you are interested in integrating FIO Protocol check out our [Integration Guide]({{ site.baseurl }}/docs/integration-guide), and if you are ready to dive into code, our [API spec]({{ site.baseurl }}/pages/api/fio-api) will explain all the calls we provide. 

If you want to spin-up your own node or even become a block producer, check out the [FIO Chain section]({{ site.baseurl }}/docs/chain) for more information about building a node.





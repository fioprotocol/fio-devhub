---
title: Overview
description: Overview
---
# Integration Guide

The following is a step-by-step walkthrough of the integration process. It begins by reviewing FIO Protocol and tools websites available to support integration. Next, it summarizes how to set up a test environment and reviews the different categories of features that are available for integration. Lastly, it outlines the requirements for QA and acceptance testing.

![Image]({{ site.baseurl }}/assets/img/integration/integration-process.png)

## Phase 1: Get familiar with FIO Protocol

Before starting your integration, we recommend you first familiarize yourself with FIO Protocol by reviewing following resources:

* [What is FIO Protocol?]({{site.baseurl}}/docs/fio-protocol/)
* [FIO API Reference Guide]({{site.baseurl}}/pages/api/fio-api)
* Review how [FIO packages and signs transactions]({{site.baseurl}}/docs/integration-guide/transactions) for the FIO chain
* SDK Guides for [Typescript]({{site.baseurl}}/docs/sdk-typescript/), [Kotlin]({{site.baseurl}}/docs/sdk-kotlin/), and [iOS]({{site.baseurl}}/docs/sdk-swift/)
* Review [Sample UX and Demos]({{site.baseurl}}/docs/integration-guide/sample-ux) from other FIO integrations

Next, reach out to the FIO team to set up a joint Telegram or Discord channel. This will give you access to account management, product management, and developer resources.

## Phase 2: Set up your test environment

The FIO community has built several applications for interacting with the FIO Testnet chain. These are useful during integration development. For example, you will want to register FIO Addresses and transfer FIO Tokens during testing. But, registering a new address for the first time requires FIO tokens. Therefore, some manual setup is required to acquire a Testnet FIO public key and Testnet FIO tokens.

The following testnet applications are availble for integration testing:
* Testnet Monitor - <https://monitor.testnet.fioprotocol.io/>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet Block Explorer - <https://fio-test.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"}

To set up a FIO public key with FIO tokens in a test environment:

1. Manually generate a private/public FIO key pair
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Create Keypair' button (top left of the website)
   * Copy the keypairs and FIO Internal Account
2. Register a FIO Address
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Register Address' button
   * Type in a FIO address
   * Paste in the FIO Public Key (created above)
   * Select the 'Create' button
   * The created FIO address will be in this format, "myname@fiotestnet"
3. Transfer FIO into the FIO account
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Faucet' button
   * Paste in the FIO Public Key (created above)
   * Select the 'Send Coins' button
4. You now have a FIO account with a Public key, a Private key, a FIO Address, and FIO tokens. This account can be used for testing [Signed API calls]({{site.baseurl}}/pages/api/fio-api/#tag--Transactions).


## Phase 3: Integrate FIO

FIO Protocol provides a variety of features that make it easier for wallet and exchange users to send and receive crypto. The following are common functionality groups and estimates of the development effort to integrate them into your product.

|Functionality groups	|Dev description	|User benefit	|Dev effort|
|---|---|---|---|
|[Send to FIO Address]({{site.baseurl}}/docs/integration-guide/fio-send)	|Simple rest API (send FIO Address and token code, get public address).	|User can send crypto to other FIO Addresses.	|~16 hours|
|[Register FIO Address]({{site.baseurl}}/docs/integration-guide/registration)	|Link-off to external registration site for FIO Address registration and renewal.	|User can register FIO Address on external wallet-branded site and participate in FIO Address Giveaways.	|~8 hours|
|[FIO Token Support]({{site.baseurl}}/docs/integration-guide/fio-token-support)	|Sending/receiving of FIO tokens and transaction history via dedicated APIs.	|User can receive, hold, send FIO tokens and see history of FIO token transactions.	|~32 hours|
|[Receive to FIO Address]({{site.baseurl}}/docs/integration-guide/fio-receive)	|Assigning public addresses to FIO Address (automatic with no UI or selected by user) via dedicated APIs.	|User can receive crypto sent to their FIO Address.	|~40 hours|
|[FIO Request]({{site.baseurl}}/docs/integration-guide/fio-request)	|View, approve, reject incoming FIO Requests (including showing attached FIO Data and send FIO Data on Send in response to request) and send FIO Requests to other FIO users.	|User can accept FIO Requests and respond to them and initiate FIO Requests to other users and participate in contest whereby users can win prizes funded by the Foundation for sending FIO Requests to a specified FIO Address via dedicated APIs.	|~80 hours|
|[FIO Data]({{site.baseurl}}http://127.0.0.1:4000/docs/integration-guide/fio-request)	|Send and display FIO Data when crypto sent using FIO Address.	|Cross-chain, cross-wallet memo capability for any crypto.	|~24 hours|
|[FIO Domain Registration]({{site.baseurl}}/docs/integration-guide/registration#fio-domain-registration)	|Registering FIO Domain (in wallet or via Link-off to external registration site).	|User can register a custom FIO Domain.	|~8 hours|
|[Register FIO Address on Custom Domain]({{site.baseurl}}/docs/integration-guide/registration#register-fio-address-on-custom-domain)	|Registering FIO Address inside wallet and on custom domains.	|Users can register a FIO Address on a custom FIO Domain and utilize it from Sending and Receiving.	|~32 hours|

The functionality groups above are ordered in such a way as to provide a sample integration path that begins with Send to FIO Address, which is one of the easiest features to integrate, and moves on to more complex features that require the building of packed and signed transactions. Nonetheless, it is ultimately up to the integrator to decide which features of the FIO Protocol you want to implement and in what order. 

## Phase 4: Configure your Technology Provider ID (TPID)

Make sure you are set to earn FIO tokens from your users by configuring your [Technology Provider ID (TPID)]({{site.baseurl}}/docs/integration-guide/tpid).

## Phase 5: Client testing and FIO acceptance testing

Once you have completed your initial integration you should perform internal testing against the FIO Testnet. 

We’ve created a [list of test cases]({{site.baseurl}}/docs/integration-guide/guide-certification) that should be completed prior to moving to production.

When you’ve successfully performed all the relevant test cases and you feel comfortable that your integration meets requirements, contact FIO to initiate a review by the FIO product team. Final FIO acceptance testing should occur against FIO Mainnet. 

## Join the FIO community!

FIO Protocol is only as strong as its community of developers, integrators, and users. We therefore ask that that integation partners [participate in FIO governance by voting your user's tokens]({{site.baseurl}}/docs/integration-guide/governance).



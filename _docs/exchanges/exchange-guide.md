---
title: Exchange Integration Guide
description: Exchange Integration Guide
---
# Exchange Integration Guide

The following is a step-by-step walkthrough of the integration process for exchanges. It begins by reviewing FIO Protocol and the tools and websites that are available to support integration. Next, it summarizes how to set up a test environment and reviews the different categories of features that are available for integration. Lastly, it outlines the requirements for QA and acceptance testing.

![Image]({{ site.baseurl }}/assets/img/integration/integration-process.png)

## Phase 1: Get familiar with FIO Protocol

Before starting your integration, we recommend you first familiarize yourself with FIO Protocol by reviewing following resources:

* [What is FIO Protocol?]({{site.baseurl}}/docs/fio-protocol/)
* [FIO API Reference Guide]({{site.baseurl}}/pages/api/fio-api)
* Review how [FIO packages and signs transactions]({{site.baseurl}}/docs/integration-guide/transactions) for the FIO chain
* SDK Guides for [Typescript]({{site.baseurl}}/docs/sdk/typescripttypescript), [Kotlin]({{site.baseurl}}/docs/sdk/kotlin/), and [iOS]({{site.baseurl}}/docs/sdk/swift/)
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

1. List the FIO Token
2. Enable FIO Addresses for your users
3. Enable crypto deposits using FIO Addresses and FIO Requests
4. Enable crypto withdrawals using FIO Addresses and FIO Requests


## Phase 4: Configure your Technology Provider ID (TPID)

Make sure you are set to earn FIO tokens from your users by configuring your [Technology Provider ID (TPID)]({{site.baseurl}}/docs/how-to/tpid).

## Phase 5: Client testing and FIO acceptance testing

Once you have completed your initial integration you should perform internal testing against the FIO Testnet. 

We’ve created a [list of test cases]({{site.baseurl}}/docs/integration-guide/guide-certification) that should be completed prior to moving to production.

When you’ve successfully performed all the relevant test cases and you feel comfortable that your integration meets requirements, contact FIO to initiate a review by the FIO product team. Final FIO acceptance testing should occur against FIO Mainnet. 

## Join the FIO community!

FIO Protocol is only as strong as its community of developers, integrators, and users. We therefore ask that that integation partners [participate in FIO governance by voting your user's tokens]({{site.baseurl}}/docs/how-to/governance).



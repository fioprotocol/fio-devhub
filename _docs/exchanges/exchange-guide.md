---
layout: page-int
title: Exchange Integration Guide
description: Exchange Integration Guide
---
# Exchange Integration Guide

The following is a step-by-step walkthrough of the integration process for exchanges. It begins by reviewing FIO Protocol and the tools and websites that are available to support integration. Next, it summarizes how to set up a test environment and reviews the different categories of features that are available for integration. Lastly, it outlines the requirements for QA and acceptance testing.

![Image]({{ site.baseurl }}/assets/img/integration/integration-process-ex.png)

---
## Phase 1: Get familiar with FIO Protocol

Before starting your integration, we recommend you first familiarize yourself with FIO Protocol by reviewing following resources:

* [What is FIO Protocol?]({{site.baseurl}}/docs/fio-protocol/)
* [FIO API Reference Guide]({{site.baseurl}}/pages/api/fio-api)
* Review how [FIO packages and signs transactions]({{site.baseurl}}/docs/general-functions/transactions) for the FIO chain
* SDK Guides for [Typescript]({{site.baseurl}}/docs/sdk/typescript/), [Kotlin]({{site.baseurl}}/docs/sdk/kotlin), and [iOS]({{site.baseurl}}/docs/sdk/swift)
* Review [Sample UX and Demos]({{site.baseurl}}/docs/integration-guide/sample-ux) from other FIO integrations

Next, reach out to the FIO team to set up a joint Telegram or Discord channel. This will give you access to account management, product management, and developer resources.

---
## Phase 2: Set up your test environment

The FIO community has built several applications for interacting with the FIO Testnet chain. These are useful during integration development. For example, you will want to register FIO Crypto Handles (aka FIO Addresses) and transfer FIO Tokens during testing. But, registering a new address for the first time requires FIO tokens. Therefore, some manual setup is required to acquire a Testnet FIO public key and Testnet FIO tokens.

The following testnet applications are availble for integration testing:
* Testnet Monitor - <https://monitor.testnet.fioprotocol.io/>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet Block Explorer - <https://fio-test.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"}

Refer to [Setting up your test environment]({{site.baseurl}}/docs/chain/testnet#setting-up-your-test-environment) to set up a FIO public key with FIO tokens in a test environment.

---
## Phase 3: Integrate FIO

There are two main integration activities for exchanges. The first step is to [list the FIO token]({{site.baseurl}}/docs/integration-guide/token-listing) on your exchange. The next step is to enable deposits and withdrawals of crypto using [FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) for your users on your custom `@myexchange` domain.

|Integration |Summary	|
|---|---|
|FIO Token |[List the FIO Token]({{site.baseurl}}/docs/integration-guide/token-listing) |
|Deposits |[Enable crypto deposits using FIO Crypto Handles and FIO Requests]({{site.baseurl}}/docs/integration-guide/handle-deposit) |
|Withdrawals |[Enable crypto withdrawals using FIO Crypto Handles and FIO Requests]({{site.baseurl}}/docs/integration-guide/handle-withdraw) |

---
## Phase 4: Configure your Technology Provider ID (TPID)

Make sure you are set to earn FIO tokens from your users by configuring your [Technology Provider ID (TPID)]({{site.baseurl}}/docs/general-functions/tpid).

---
## Phase 5: Client testing and FIO acceptance testing

Once you have completed your initial integration you should perform internal testing against the FIO Testnet. 

We’ve created a [list of test cases]({{site.baseurl}}/docs/integration-guide/integrator-checklist) that should be completed prior to moving to production.

When you’ve successfully tested all of the relevant test cases and you feel comfortable that your integration meets requirements, contact FIO to initiate a review by the FIO product team. Final FIO acceptance testing should occur against FIO Mainnet. 

---
## Join the FIO community!

FIO Protocol is only as strong as its community of developers, integrators, and users. We therefore ask that that integation partners [participate in FIO governance by voting your user's tokens]({{site.baseurl}}/docs/integration-guide/token-governance).



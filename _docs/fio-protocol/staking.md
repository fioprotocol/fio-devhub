---
title: FIO Staking
description: FIO Staking
---

# FIO Staking

FIO Staking is an on-chain program which rewards users for participating in blockchain governance. It was developed as part of [FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md){:target="_blank"}. This section provides on overview of FIO Staking and describes how to stake your tokens.

{% include alert.html type="warning" title="Staking feature is Testnet only" content="FIO staking is currently being tested in Testnet. Once the feature has passed acceptance testing it will be released to production." %}

## Using Anchor wallet

Anchor wallet supports access to [FIO system contract actions]({{site.baseurl}}/pages/api/fio-api/#tag--Actions). To use Anchor you must install and import your FIO private key as explained in [Using FIO with Anchor]({{site.baseurl}}/docs/how-to/bloks#using-fio-in-anchor).

{% include alert.html type="info" title="Testnet staking" content="The following provides instructions for FIO Staking on Testnet." %}

**1) Open Anchor wallet and connect to FIO chain**

* Select `FIO` or `FIO Testnet` from the dropdown in Anchor wallet

**2) Select the stakefio action**

* Select Tools > Utilities > Smart Contracts 
* Type `fio.staking` into `Contract Account Name` and click `Load Contract` (or hit Return)
* Select `stakefio` from the `Contract Actions` dropdown

**3) Sign and execute the transaction**

* Make sure wallet is unlocked
* Fill in the `Action Parameters` for the action. Refer to the [FIO API]({{site.baseurl}}/pages/api/fio-api/#tag--Actions) for reference information on the stakefio action parameters.
* Click `Create Transaction`
* Approve the transaction

**4) Confirm your balance**

* Go to the [FIO API]({{site.baseurl}}/pages/api/fio-api/#overview) and confirm `https://fiotestnet.blockpane.com/v1/chain - FIO Testnet server` is selected under `API SERVER`
* Go to the [Get FIO balance getter]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance)
* Under `REQUEST BODY` click on the `EXAMPLE` tab
* Copy your FIO Public Key into the `fio_public_key` paramter and click the `TRY` button

**5) After unstaking, confirm your locked balance**

When FIO is unstaked, it is locked for 7 days. To view your locked balance:

* Go to the [FIO API]({{site.baseurl}}/pages/api/fio-api/#overview) and confirm `https://fiotestnet.blockpane.com/v1/chain - FIO Testnet server` is selected under `API SERVER`
* Go to the [Get token lock information for account]({{site.baseurl}}/pages/api/fio-api/#post-/get_locks)
* Under `REQUEST BODY` click on the `EXAMPLE` tab
* Copy your FIO Public Key into the `fio_public_key` paramter and click the `TRY` button

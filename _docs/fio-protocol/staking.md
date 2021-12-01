---
title: FIO Staking
description: FIO Staking
---

# FIO Staking

FIO Staking is an on-chain program which rewards users for participating in blockchain governance. It was developed as part of [FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md){target="_blank"}. This section provides on overview of FIO Staking and describes how to stake your tokens.

{% include alert.html type="warning" title="Staking feature is Testnet only" content="FIO staking is currently being tested in Testnet. Once the feature has passed acceptance testing it will be released to production." %}

## Using partner wallets

For a full list of wallets that have integrated Staking refer to our [FIO Ecosystem](https://github.com/fioprotocol/fips/blob/master/fip-0021.md){target="_blank"}.

## Using Anchor wallet

Anchor wallet supports access to [FIO system contract actions]({{site.baseurl}}/pages/api/fio-api/#tag--Actions). To use Anchor you must install and import your FIO private key as explained in [Using FIO with Anchor]({{site.baseurl}}/docs/how-to/bloks#using-fio-in-anchor).

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
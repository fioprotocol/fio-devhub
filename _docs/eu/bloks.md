---
layout: page-eu
title: Sign transactions with Anchor Wallet and bloks.io
description: Sign transactions with Anchor Wallet and bloks.io
---

# Sign transactions with Anchor Wallet and bloks.io

## Using FIO in Anchor

This section describes how to set up Anchor wallet so it is able to sign FIO transactions.

**1) Download Anchor Wallet**

Download the [latest release of the Anchor Wallet](https://greymass.com/en/anchor/){:rel="nofollow noopener noreferrer" target="_blank"}.

<br>
**2) Enable FIO Blockchain**

Select FIO from the list of available blockchains and click Enable blockchain.

<br>
**3) Import your private key**

* Click the newly create FIO blockchian icon
* Click Existing Account
* Click Import Private Key
* You will be prompted to set wallet password. Make sure you save the password. You will need it in the future to unlcok your wallet.
* Enter your private key
* When prompted select active account
* Click Import Accounts

## Signing transactions using Anchor Wallet

**1) Open Anchor wallet and connect to FIO chain**

* Select `FIO` or `FIO Testnet` from the dropdown in Anchor wallet

**2) Select an action**

* Go to Tools > Utilities > Smart Contracts
* Select the contract account name for the action. Refer to the [FIO API]({{site.baseurl}}/pages/api/fio-api/#tag--Actions) for the contract account and action names.
* On the `Actions` tab, select the action from the dropdown

**3) Sign and execute the transaction**

* Fill in the `Action Parameters` for the action. Refer to the [FIO API]({{site.baseurl}}/pages/api/fio-api/#tag--Actions) for reference information on the action parameters.
* Click `Create Transaction`
* Approve the transaction

## Signing transactions using bloks.io and Anchor Wallet

**1) Connect bloks.io to Anchor**

* Select FIO or FIO Testnet from the dropdown in the upper left corner of bloks.io
* Click login and select Anchor
* Make sure the correct account is selected in Anchor
* You should now be logged in

**2) Select an action**

**3) Sign and execute the transaction**


## Sign transaction

* Go to the account you will be using to sign the transaction.
* Under the More dropdown select `Contract > Tables + Actions`
---
title: Sign transactions with bloks.io and Anchor
description: Sign transactions with bloks.io and Anchor
---

# Recording and Retrieving FIO Data

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

{% include alert.html type="info" title="FIO Address required for voting"  content="The imported key has to have a previously registered FIO Address associated with it before it can be used for voting." %}

## Connect bloks.io to Anchor

* Select FIO or FIO Testnet from the dropdown in the upper left corner of bloks.io
* Click login and select Anchor
* Make sure the correct account is selected in your Anchor app
* You should now be logged in

## Sign transaction

* Go to the account you will be using to sign the transaction.
* Under the More dropdown select `Contract > Tables + Actions`
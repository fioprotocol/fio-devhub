---
layout: page-fio
title: Proxy your vote
description: Proxy your vote
---

# Proxy votes to a registered proxy

FIO token holders may participate in governance activities that benefit the protocol. An important activity is to make sure you have voted for one or more block producers. One option is to [vote directly]({{site.baseurl}}/docs/contribute/govern-voting). In this case, make sure you [research the effectiveness of FIO BPs]({{site.baseurl}}/docs/bp/). Alternatively, you can proxy your vote to a [registered proxy](https://fio.bloks.io/#proxies){:target="_blank"}. 

---
## Using Anchor Wallet for Desktop

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

{% include alert.html type="info" title="FIO Crypto Handle required to proxy your vote"  content="The imported key has to have a previously registered FIO Crypto Handle associated with it before you can proxy your vote." %}

**4) Proxy your vote**

* Make sure FIO is the selected blockchain and your FIO account is selected
* Click the Tools menu
* Click on Utilities > Smart Contracts
* Type "eosio" into Contract Account Name and hit return
* Select "voteproxy" from the Contract Actions pulldown menu
* Enter the FIO Crypto Handle of the proxy.
* Enter your FIO Crypto Handle
* Click "Use current account for field actor" checkbox
* Enter a max fee
* Click Create Transaction
* Click Broadcast Transaction

Go to your account on [bloks.io](https://fio.bloks.io/){:rel="nofollow noopener noreferrer" target="_blank"} and refer to the Chain Data > Votes tab to confirm your votes are proxied.

For additional information see the [voteproxy]({{site.baseurl}}/pages/api/fio-api/#options-voteproxy) API documentation.
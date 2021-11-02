---
title: Register as a Proxy
description: Register as a Proxy
---

# Register as a proxy

FIO block producers (BPs) host and manage the infrastructure necessary to run the FIO Chain BPs also play a major role in the governance of the chain. FIO Protocol is a distributed proof-of-stake chain wherein FIO token holders choose BPs [by voting for producers]({{site.baseurl}}/docs/fio-protocol/voting) or [proxying their vote]({{site.baseurl}}/docs/how-to/proxy-vote). 

If you have [researched the effectiveness of FIO BPs]({{site.baseurl}}/docs/bp/) and feel that you can help other FIO token holders by serving as a proxy, step up and register as a proxy!

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

{% include alert.html type="info" title="FIO Address required to register as a proxy"  content="The imported key has to have a previously registered FIO Address associated with it before it can be registered as a proxy." %}

**4) Register as a proxy**

* Make sure FIO is the selected blockchain and your FIO account is selected
* Click the Tools menu
* Click on Utilities > Smart Contracts
* Type "eosio" into Contract Account Name and hit return
* Select "regproxy" from the Contract Actions pulldown menu
* Enter your address
* Click "Use current account for field actor" checkbox
* Enter a max fee
* Click Create Transaction
* Click Broadcast Transaction

Go to your account on [bloks.io](https://fio.bloks.io/){:rel="nofollow noopener noreferrer" target="_blank"} and refer to the Chain Data > Votes tab to confirm your FIO Address is registered as a proxy.

For additional information see the [regproxy]({{site.baseurl}}/pages/api/fio-api/#options-regproxy) API documentation.
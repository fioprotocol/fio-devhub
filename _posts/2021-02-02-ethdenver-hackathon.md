---
title:  2021 ETHDenver Hackathon
date:   2021-02-02
categories: release
badges:
 - type: info
   tag: event
---

FIO is sponsoring the [ETHDenver Hackathon](https://www.ethdenver.com){:target="_blank"} with $5,000 worth of bounties that will be rewarded to developers who use FIO to simplify their application. 

<!--more-->

### ETHDenver Bounty: FIO Open Hack
FIO is a protocol that makes sending and receiving crypto easier. To that end, FIO bounties will reward developers who have simplified their application by utilizing FIO features. FIO is sponsoring ETHDenver with three open hack bounties:
 
$2000 - First Prize
$1000 - Second Prize
$500 - Third Prize
$100 - Runner-Ups (15x) 

The open hack allows participants to use their creative and technical skills to “wow” the judges with their FIO integration. We want to see new and exciting ways FIO can be used to allow for easy and seamless FIO transactions, requests, and address lookups. Prizes will be judged based on the following criteria:
* Originality - Show us something we’ve never seen before!
* Technical - Show us your skills in bringing blockchain technology, tools, and other web3    concepts to life! 
* Completeness - We’re looking for projects that solve complex problems with simple solutions and implementations!
* User Experience - Blockchains are already complicated! Show us how you’ve made it easier by using the FIO Protocol!

### Getting Started:
 
At a high level, FIO uses a naming scheme that makes sending and receiving crypto easier by enabling users to send crypto to a FIO Address (e.g., bufficorn21@ethdenver) instead of sending to their crypto public key (e.g., 0xaae47eae4ddd4877e0ae0bc780cfaee3cc3b52cb). 
 
There are three basic steps to get started with using FIO Addresses:
1.     Register a FIO Address
2.     Map your crypto public keys to your FIO Address
3.     Use /get_pub_address in your application to lookup
 
#### Step 1. Register FIO Address
 
We recommend using one of our FIO integrated crypto wallets to register a free FIO Address and to map your crypto public keys. The list of FIO integrated wallets can be found at:
 
<https://kb.fioprotocol.io/user-guides/user-guides>{:rel="nofollow noopener noreferrer" target="_blank"}
 
Choose your favorite wallet and follow the steps for registering your FIO Address.
 
#### Step 2. Map your crypto public keys to your FIO Address
 
When you register a FIO Address, your FIO public key is automatically mapped to your FIO Address. If you want to map other tokens, for example ETH, you will need to use the functionality provided by the wallet for mapping. 
 
#### Step 3. Use /get_pub_address in your application to lookup
 
Now that you have mapped your public addresses to your public key you can use the FIO API to do lookups of your (or someone else’s) crypto public keys. We will be using /get_public_address to do the lookup. Refer to [the full API specification for /get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address).
 
The call is fairly simple: you pass in a FIO Address (user@domain), a chain code (e.g., FIO or ETH) and a token code (e.g., FIO or ETH). The API call will then return the crypto public key for that token (assuming it has been mapped by the user).
 
Here is an example that looks up a FIO Public Address for the test@edge FIO Address on the FIO Mainnet using one of our public API nodes:
 
curl --request POST \
     --url https://fio.greymass.com/v1/chain/get_pub_address \
     --data '{"fio_address":"test@edge","chain_code":"FIO","token_code":"FIO"}'
 
Give it a try! It should return the FIO public key associated with test@edge listed under the “Owned Addresses” on the FIO block explorer: 
 
<https://fio.bloks.io/address/test@edge>{:rel="nofollow noopener noreferrer" target="_blank"}

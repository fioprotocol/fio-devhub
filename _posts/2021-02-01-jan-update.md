---
title:  Development Update January 2021
date:   2021-02-01
categories: release
badges:
 - type: warning
   tag: release
---

## Introduction

### FIO Domains and Addresses as NFTs

Several FIO Improvement Proposals (FIPs) were released to Mainnet. One of the main requests has been to enable the exchange of FIO Domains and Addresses. With our latest release it is now possible to transfer FIO Addresses to a new owner. This gets us one step closer to being able to building FIO Domains and FIO Addresses that are tradeable NFTs. The next step will be to enable users to wrap their Domains onto the Ethereum chain to faciliate NFT exchanges. Work on wrapping is in progress.

### Improving usability

Other improvements that made it to Mainnet this past month focused on usability. Most FIO users are familiar with FIO "bundles" which are the free transactions included when a FIO Address is purchased or renewed. As users have increased their use of FIO, it has become clear that there needs to be an easy way to purchase more bundles. The January release enables users to purchase multiple sets of bundled transactions in a single blockchain transaction.

If you went through the process of mapping your FIO Address to your ERC20 tokens, you probably found it a bit tedius because a unique chain code and token code mapping was required for every key. The January release now allows the for a generic "*" token code to be used indicating all tokens for that chain are mapped to the same blockchain public key.

### Secure your tokens in a locked account

While FIO is principly a utility token, there are occasions when you may want to add on an extra layer of security by preventing the transfer of your FIO tokens. The January release enables users to transfer tokens to a new account and lock those tokens on a pre-defined schedule. An added bonus: the ability to lock tokens is the first step to enabling FIO staking--a feature that is currently in design. 

### Developer Hub

Work continues on the updated FIO developer hub. This new github site will faciliate community contributions with the goal if making using our FIO SDKs and integrating FIO protocol into other projects much easier. 

Find out more here: https://devhub.fioprotocol.io

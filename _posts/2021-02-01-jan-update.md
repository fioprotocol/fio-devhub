---
title:  Development Update January 2021
date:   2021-02-01
categories: release
badges:
 - type: warning
   tag: release
---

## Introduction

The transition to 2021 finds FIO development also in a bit of a transition. In January we released the contract code updates targeting several FIO Improvement Proposals (FIPs) that have been on the list for awhile. Since September of 2020 we have been targeting monthly FIP-based releases and in January we added another four features (FIPs 1, 6, 11, and 18). Our upcoming chain code update in February will put the finishing touches on this round of FIPs by adding in all the new API endpoints and other chain plugin utilities. In the meantime, the development team is transitioning from core protocol features to working on larger FIO initiatives including staking, NFT wrapping, and a new dApp that will make it easy for users to interact with FIO. Of course, the team will also continue to work on core features--more FIPs are on the way.

### FIO Domains and Addresses as NFTs

One of the main requests has been to enable the exchange of FIO Domains and Addresses. With our latest release it is now possible to transfer FIO Addresses to a new owner. This gets us one step closer towards providing FIO Domains and FIO Addresses that are tradeable NFTs. The next step will be to enable users to wrap their Domains onto the Ethereum chain to facilitate NFT exchanges. Work on wrapping is in progress.

### Improving usability

Other improvements that made it to Mainnet this past month focused on usability. Most FIO users are familiar with FIO "bundles" which are the free transactions included when a FIO Address is purchased or renewed. As users have increased their use of FIO, it has become clear that there needs to be an easy way to purchase more bundles. The January release enables users to buy multiple sets of bundles in a single transaction.

If you have gone through the process of mapping your FIO Address to your ERC-20 tokens, you probably found it a bit tedious because a unique chain code and token code mapping was required for every ERC-20 token. The January release now allows you to enter a generic "*" token code that indicates all tokens for that chain are mapped to the same blockchain public key.

### Secure your tokens in a locked account

While FIO is principally a utility token, there are occasions when you may want to add on an extra layer of security. The January release enables users to transfer tokens to a new account and lock those tokens on a pre-defined schedule. An added bonus: the ability to lock tokens is the first step to enabling FIO staking--a feature that is currently in design. 

### Developer Hub

Work continues on the updated FIO developer hub. This new Github site will facilitate community contributions with the goal of making it easier to use the FIO SDKs and integrate FIO features into wallets and other crypto applications. 

Find out more here: https://devhub.fioprotocol.io
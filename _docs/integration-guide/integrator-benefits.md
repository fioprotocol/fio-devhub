---
layout: page-int
title: Benefits & Bounties for Wallets
description: Benefits & Bounties for Wallets
redirect_from:
    - /docs/integration-guide/tpid
    - /docs/general-functions/tpid
---

# Benefits & Bounties 

---
## How Can Your Application Use and Benefit from the FIO Protocol?

* ***Enhanced User Experience & Decreased Support Costs***
* ***Ability to generate income from FIO integration***
* ***User Benefits and New User Growth Through FIO Marketing Programs***
* ***Token Listing***
* ***Block Production***
* ***Integraiton Grants***

---

## Enhanced User Experience & Decreased Support Costs

How much time and money does your exchange spend with users on crypto deposit/withdrawal errors and support? Integrating the FIO Protocol gives your users friendly interwallet operability, making deposits, withdrawals and requests as easy as Venmo and near error-free dramatically reducing support tickets

---

## Income from FIO Integration

The sky’s the limit. Exchanges that complete integration and an ability to deposit/withdrawal/request using FIO Crypto Handles (aka FIO Addresses) currently earn approximately $1 in FIO Tokens for each new FIO Crypto Handle registered from within the exchange.  This includes for those given away for free through the FIO Crypto Handle Giveaway described in the marketing section below.

|Number of New FIO Crypto Handles Registered|Approximate Profit Your Exchange Earns|
|:-:|:-:|
|25,000|$25,000|
|100,000|$100,000|
|250,000|$250,000|
|1,000,000|$1,000,000|

### Technology Provider ID (TPID) Fees

To increase the adoption of the FIO Protocol among existing blockchain ecosystem participants, every interaction with the FIO blockchain can be tagged with a **Technology Provider ID (TPID)**, which is a valid FIO Crypto Handle (aka FIO Address). The TPID FIO Crypto Handle receives 10% of all [fees]({{site.baseurl}}/docs/fio-protocol/fio-fees) collected from all transactions with that mapped TPID.

In the example below, the owner of rewards@wallet will receive a portion of the fees payed by the user to register purse@alice.

```
{
  "fio_address": "purse@alice",
  "owner_fio_public_key": "FIO8PRe4WRZJj5mkem6qVGKyvNFgPsNnjNN6kPhh6EaCpzCVin5Jj",
  "max_fee": 30000000000,
  "tpid": "rewards@wallet",
  "actor": "aftyershcu22"
}
```

*TPIDs are not paid when a transaction is processed as a bundled transaction and no fee was charged.*

#### Payouts to TPIDs

TPIDs *virtual* accounts get incremented every time a qualifying fee is paid. An integrator TPID which has accrued 100 FIO or more can call the [/pay_tpid_rewards]({{site.baseurl}}/pages/api/fio-api/#options-tpidclaim) endpoint to claim their rewards. When called, the entire balance from the virtual account is transferred to the TPID FIO Crypto Handle.

The [/pay_tpid_rewards]({{site.baseurl}}/pages/api/fio-api/#options-tpidclaim) endpoint processes payments across all TPIDs each time it is called. If a TPID has accrued 100 FIO or more in rewards, the reward will be paid out. It is expected that Block Producers will call [/pay_tpid_rewards]({{site.baseurl}}/pages/api/fio-api/#options-tpidclaim) on a regular basis, although any member of the community can call the endpoint and initate the payout. The call is free and only modifies the blockchain if there are transactions that need processing. This call will only trigger an action if it is made at least 60 seconds after the previous time it was called.

If a TPID virtual account does not reference a valid FIO Crypto Handle (e.g. the Address has expired and was burned since the fees were accrued) the payout will transfer to the current day's BP rewards bucket.

TPIDs can check reward accrual by examining [the fio.tpid > tpids table on bloks.io](https://fio.bloks.io/contract?tab=Tables&account=fio.tpid&scope=fio.tpid&limit=100&table=tpids){:rel="nofollow noopener noreferrer" target="_blank"}.

### New User Bounties

New user bounties are additional tokens which will be minted and allocated to TPIDs to further incentivize the adoption of the FIO Protocol. The limit for user bounties is set at 125,000,000 FIO tokens and is distributed as follows:

* If a transaction is collecting a fee and TPID is present in that transaction, that TPID will receive a bonus payout equal to 40% of the transaction being collected.
* Example:
  * Transaction is collecting 40 FIO fee and it gets distributed as follows:
     * 2 FIO (5% of collected fee) to Foundation
     * 4 FIO (10% of collected fee) to TPID
     * 24 FIO (60% of collected fee) to BP Pool
     * 10 FIO (25% of collected fee) to the Staking Reward Pool
  * New user bounty tokens are minted (if available)
     * 16 FIO (40% of collected fee) to TPID
  * The TPID will receive a total of 20 FIO (4 regular payout + 16 new user bounty)
* Once 125,000,000 tokens have been minted for the purpose of the new user bounty, it will no longer be paid.

You can find the total New User Bounty tokens minted in [the fio.tpid > bounties table on bloks.io](https://fio.bloks.io/contract?tab=Tables&account=fio.tpid&scope=fio.tpid&limit=100&table=bounties){:rel="nofollow noopener noreferrer" target="_blank"}.

### FIO Staking integration reward

FIO Staking offers a new incentive to wallets which lets them earn 11% of the staking reward paid out to their users. Check out [FIO Staking Developer Guide]({{site.baseurl}}/docs/integration-guide/staking) for more details.

### Integration Airdrop 

Select wallets that are known to have large numbers of users may be eligible for an additional airdrop of FIO Tokens upon completion of a full FIO integration. 

To apply for an Integration Grant and obtain more information [use this brief form](https://docs.google.com/forms/d/e/1FAIpQLScU4efavwLErmJyRb1T_w9CGGLEqip2kVp1JSH-pfV7WDF--A/viewform?usp=sf_link){:rel="nofollow noopener noreferrer" target="_blank"}. 

---
## User Benefits and New User Growth Through FIO Marketing Programs
### Marketing with FIO

The FIO Protocol has extensive following on social media. Your exchange will have the opportunity to leverage the marketing, public relations and communications support from the Foundation to conduct a powerful joint marketing campaign and promote your new integration partnership with FIO. To make the launch of your new FIO integration capabilities and listing a success, the Foundation will provide a mutually agreed upon FIO Token budget.

In addition, the Foundation will enable your exchange to give away up to a mutually agreed upon specified maximum number of free FIO Crypto Handles Addresses on your exchange’s unique FIO Domain for its users. A FIO Crypto Handle looks like and consists of the following parts: “username@domain” were @domain will be your exchange's proprietary NFT FIO Domain


### FIO Crypto Handle Giveaways

Wallets that have integrated FIO Crypto Handle registration and the ability to send and receive with FIO Crypto Handles can participate in FIO Crypto Handle Giveaway campaigns. In these campaigns the Foundation for Interwallet operability pays the ~$2 per FIO Crypto Handle FIO Token fee on behalf of the wallet’s users for registering a FIO Crypto Handle. The wallet still receives a FIO roughly $1 TPID fee for these free FIO Crypto Handles.

### Participation in Exchange Listing Marketing

When the FIO Token is listed on exchanges there are often marketing activities around the listing. Some of those may require the users to obtain a FIO Enabled wallet.  Once sufficiently integrated, your company’s wallet would be included on that list of wallets that users can select.  In the not distant future, some exchanges will be integrating FIO into their deposit withdrawal interface and users will need a FIO enabled wallet to utilize that capability. 

### FIO Utilization Contests

Once FIO Request is integrating, the Foundation will sponsor campaigns encouraging users to use the FIO Request functionality whereby, by doing so, users are entered into drawings or contests where they can win prizes that may include FIO tokens or other crypto.  

### Future Marketing Campaigns

There are many additional marketing activities around registering FIO Crypto Handles and utilizing FIO Requests that the Foundation is in process of planning.  FIO enabled wallets end up being the beneficiaries of these campaigns as users must have a FIO enabled wallet to participate. 

A Better User Experience Leads to More Users

Until moving tokens/coins in a decentralized manner is easy and worry free, crypto will never reach mass adoption.  The FIO Protocol’s goal is to enable companies like yours to do that be solving the problems that exist **between** wallets, exchanges, crypto payment processing platforms, Dapps, etc.  A rising tide lifts all boats. 

---
## Token Listing

The Foundation for Interwallet Operability (FIO) will facilitate listing of the FIO Token on reputable exchanges. The Foundation generally will not pay listing fees, however, there are a number of additional economic benefits to your exchange, such as immediate cost savings on deposit/withdrawal customer support, generous user bounty upside, increased marketing, and demand-driving activity and possible PR.

---

## Block Production

The FIO Protocol automatically proxies the vote of FIO tokens held in self sovereign wallets to the company that build the wallet unless  a user takes action to vote those tokens themselves.  This  combined with the various other ways described on this page that wallets obtain FIO Tokens, enables wallets with large numbers of customers holding FIO tokens the ability to potentially participate in the economics of block production either individually or by teaming up with other companies.

As a Delegated Proof of Stake blockchain, the FIO Protocol enables your exchange to participate in the economics and governance of block production either individually or by teaming up with other companies. Centralized exchanges will obtain FIO Tokens through the various elements described on this page and may also choose to vote with the tokens held on their exchange.  

---

## Integration Grants

Integration grants are available to organizations that meet Foundation established minimum criteria.  Grants range from $10,000 value to $500,000 value depending on the user base of the application and in the sole discretion of the Foundation for Interwallet Operability.  In addition, the Foundation will sponsor a certain number of free FIO Crypto Handles (aka FIO Addresses) for your users and you'll receive approximately $1 in token income directly from the blockchain for each as described below.  

To apply for an Integration Grant and obtain more information [use this brief form](https://docs.google.com/forms/d/e/1FAIpQLScU4efavwLErmJyRb1T_w9CGGLEqip2kVp1JSH-pfV7WDF--A/viewform?usp=sf_link){:rel="nofollow noopener noreferrer" target="_blank"}.  

---
## This is Your Protocol!

The FIO Protocol was structured specifically to enable companies that provide user facing crypto solutions like wallets to benefit economically from the protocol and to be able to be involved in governance of the protocol via their FIO token vote.  In addition, wallets have the ability to get even more involved in the FIO Protocol’s future by participating in various activities coordinated by the Foundation via an emerging decentralized autonomous consortia model or even serving on the Foundation Board of Directors.




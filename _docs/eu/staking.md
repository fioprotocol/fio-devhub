---
layout: page-eu
title: About FIO Staking 
description: About FIO Staking 
redirect_from:
    - /docs/howto/
---

# About FIO Staking
## Overview
[FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md){:target="_blank"} is introducing **FIO Staking**, an on-chain program which rewards users for participating in blockchain governance.

## How FIO Staking works
### High level
* User has to vote, proxy, or [auto-proxy]({{site.baseurl}}/docs/contribute/governance) their FIO Tokens.
* User decides what amount of their FIO Tokens to stake.
* User stakes FIO Tokens, which are now locked and not spendable until unstake + 7 days.
* 25% of all FIO Chain fees collected plus [daily mint](https://github.com/fioprotocol/fips/blob/master/fip-0021.md#staking-rewards-reserves){:target="_blank"} is redirected to a pool to be distributed among all stakers.
* User decides what amount of their FIO Tokens to unstake.
* User unstakes FIO Tokens and they receive the original staked amount plus their share of rewards.
* Unstaked tokens are locked and are unspendable for a period of 7 days.

### FIO Staking activation and early participation
The staking rewards are computed in [such a way](https://github.com/fioprotocol/fips/blob/master/fip-0021.md){:target="_blank"} that the earlier you stake the higher the reward earning potential. To ensure that early stakers do not get an unfair advantage over others staking, the concept of activation date has been built into staking.

After staking launches on Mainnet (planned for January 2022), staking rewards will accrue, but users who unstake before the activation date on 02/22/2022, will only receive their principal and not their share of staking reward.

Integrators are encouraged to launch staking integration before the activation date to offer the greatest benefit to their users.

### Integrator incentive
FIO Staking offers a new incentive to integrators which lets them earn 11% of the staking reward paid out to their users. When the user unstakes their FIO Tokens, the staking reward is computed and 90% of it is paid out to the user staking. If a [TPID]({{site.baseurl}}/docs/how-to/tpid) was supplied in the unstake call, the remaining 10% (or 11.11% of what was paid to the user) is credited to that [TPID]({{site.baseurl}}/docs/how-to/tpid). If [TPID]({{site.baseurl}}/docs/how-to/tpid) is not supplied, that amount remains in treasury and increases staking reward for all remining stakers. (Reference the [FIO Staking Developers Guide]({{site.baseurl}}/docs/how-to/staking) for assistence with integrating staking.)

## Resources
Looking for a non-technical guide to staking? Checkout [FIO Staking blog post](https://medium.com/fio-blog/fio-token-staking-fio-improvement-proposal-fip-21-explained-e80a43bf3e83){:target="_blank"}

## How to Stake Your FIO Tokens
[Read More, for help with staking your FIO tokens.](https://medium.com/fio-blog/fio-staking-now-live-on-mainnet-fe3f7919be2a)
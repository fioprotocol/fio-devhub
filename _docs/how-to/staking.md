---
title: FIO Staking Developer Guide
description: FIO Staking Developer Guide
---

# FIO Staking Developer Guide
## Overview
[FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md){:target="_blank"} is introducing **FIO Staking**, an on-chain program which rewards users for participating in blockchain governance.

This guide is intended to help integrators with FIO Staking integration into their products.

## How FIO Staking works
### High level
* User has to vote, proxy, or [auto-proxy]({{site.baseurl}}/docs/how-to/governance) their FIO Tokens.
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
FIO Staking offers a new incentive to integrators which lets them earn 11% of the staking reward paid out to their users. When the user unstakes their FIO Tokens, the staking reward is computed and 90% of it is paid out to the user staking. If a [TPID]({{site.baseurl}}/docs/how-to/tpid) was supplied in the unstake call, the remaining 10% (or 11.11% of what was paid to the user) is credited to that [TPID]({{site.baseurl}}/docs/how-to/tpid). If [TPID]({{site.baseurl}}/docs/how-to/tpid) is not supplied, that amount remains in treasury and increases staking reward for all remining stakers.

## How to implement voting, proxy, or auto-proxy
The easiest way to achieve this objective is for the integrator (not the User) to [register as a proxy]({{site.baseurl}}/docs/how-to/reg-proxy), [vote for block producers]({{site.baseurl}}/docs/fio-protocol/voting) and insert the FIO Address of their proxy into the TPID field of every call made by the user.

Alternatively, the integrator may choose to let the User vote their tokens directly, but that would require the development of a voting UI inside the wallet or exchange.

## How to stake FIO Tokens
Staking is accomplished using [stakefio]({{site.baseurl}}/pages/api/fio-api/#options-stakefio) action and passing in amount of FIO Tokens to stake.

Please note that the FIO Address parameter may be left blank. The user does not need to have a FIO Address to stake, but if they don't, the stake call will [have a fee]({{site.baseurl}}/pages/api/fio-api/#post-/get_fee), instead of deducting a [bundled transaction]({{site.baseurl}}/docs/fio-protocol/fio-fees).

## How to unstake FIO Tokens
Unstaking is accomplished using [unstakefio]({{site.baseurl}}/pages/api/fio-api/#options-unstakefio) action and passing in amount of FIO Tokens to unstake.

Please note that the FIO Address parameter may be left blank. The user does not need to have a FIO Address to unstake, but if they don't, the unstake call will [have a fee]({{site.baseurl}}/pages/api/fio-api/#post-/get_fee), instead of deducting a [bundled transaction]({{site.baseurl}}/docs/fio-protocol/fio-fees).

When tokens are unstaked, the reward amount is automatically deposited into the user's account. Both the unstaked amount and the reward amount are then locked for a period of 7 days.

When tokens are locked they cannot be transferred, or used to pay a FIO Chain fee. However, they can be voted.

Make sure you supply your [TPID]({{site.baseurl}}/docs/how-to/tpid) to receive integrator's incentive.

## Understanding user's FIO balance
### Getting user's balance
The [/get_fio_balance]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance) call is being modified to include new values:

|Parameter|Description|
|---|---|
|balance|Unchanged. Total amount of FIO Tokens (SUFs) in account. Please note that this value will now include tokens which may not spendable, because they are staked or locked.|
|available|Amount of FIO Tokens (SUFs) which can be spent. _available_ = _balance_ - _staked_ - _locked_.|
|staked|Amount of FIO Tokens (SUFs) which are staked.|
|srps|Amount of staking reward points held by account. See below for _Computing staking rewards_.|
|roe|Rate of exchange of SRPs to FIO when unstaking. See below for _Computing staking rewards_.|

### Getting information about locked tokens
Total amount of locked tokens in account can be computed by using the values returned by [/get_fio_balance]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance) call:
```
locked_tokens = balance - staked - available
```

In addition, information on when locked tokens will become available is returned using [/get_locks]({{site.baseurl}}/pages/api/fio-api/#post-/get_locks) endpoint. It returns:

|Parameter|Description|
|---|---|
|lock_amount|Amount of FIO Tokens (SUFs) that were locked in account.|
|remaining_lock_amount|Amount of FIO Tokens (SUFs) still locked.|
|time_stamp|Epoch date when locking clock was started.|
|payouts_performed|Number of unlocks that have already occurred.|
|can_vote|0 - user cannot vote locked tokens; 1 - user can vote locked tokens (for tokens locked as a result of unstake, 1 will be returned.)|
|unlock_periods|Multiple unlock periods remaining and depicted as SUF _amount_ of FIO Tokens unlocking _duration_ seconds after _time_stamp_.|

Please note that when user unstakes tokens multiple times, there may be multiple lock periods returned (unstakes during the same 24-hour period will only have 1 unlock period). Therefore, a maximum of 7 unlock periods will be found in accounts which staked tokens. However, locking can also be used for other purposes than staking unlocking, which means that some users may have more than 7 unlock periods.

### Computing staking rewards
When user has staked tokens, it's possible to compute their currently accrued rewards by using the values returned by [/get_fio_balance]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance) call:

```
amount of staking rewards accrued = (srps * roe) - staked
```

A prorated amount of staking rewards accrued can also be used to compute partial unstaking. For example if user is has 1000 tokens staked and plans to unstake 200 tokens, they will receive 20% (200/1000) of total amount of staking rewards accrued.

Please note that amount of staking rewards accrued calculation is approximate and may be very slightly different due to rounding.

## Resources
Looking for a non-technical guide to staking. Checkout [FIO Staking blog post](https://medium.com/fio-blog/fio-token-staking-fio-improvement-proposal-fip-21-explained-e80a43bf3e83){:target="_blank"}

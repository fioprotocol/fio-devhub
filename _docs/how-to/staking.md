---
title: FIO Staking
description: FIO Staking
redirect_from:
    - /docs/integration-guide/staking
---

# FIO Staking
## Overview
[FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md) is introducing **FIO Staking**, an on-chain program which rewards users for participating in blockchain governance.

This guide is intended to help integrators with FIO Staking integration into their products.

## How FIO Staking works
At a high-level FIO Staking works as follows:
* User has to vote, proxy, or [auto-proxy](https://developers.fioprotocol.io/docs/how-to/governance) their FIO Tokens.
* User decides what amount of their FIO Tokens to stake.
* User stakes FIO Tokens, which are now locked and not spendable until unstake + 7 days.
* 25% of all FIO Chain fees collected plus [daily mint](https://github.com/fioprotocol/fips/blob/master/fip-0021.md#staking-rewards-reserves) is redirected to a pool to be distributed among all stakers.
* User decides what amount of their FIO Tokens to unstake.
* User unstakes FIO Tokens and they receive the original staked amount plus their share of rewards.
* Unstaked tokens are locked and are unspendable for a period of 7 days.

## How to implement voting, proxy, or auto-proxy
The easiest way to achieve this objective is for the integrator (not the User) to [register as a proxy](https://developers.fioprotocol.io/docs/how-to/reg-proxy), [vote for block producers](https://developers.fioprotocol.io/docs/fio-protocol/voting) and insert the FIO Address of their proxy into the TPID field of every call made by the user.

Alternatively, the integrator may choose to let the User vote their tokens directly, but that would require the development of a voting UI inside the wallet or exchange.

## How to stake FIO Tokens
Staking is accomplished using [stakefio](https://developers.fioprotocol.io/pages/api/fio-api/#options-stakefio) action and passing in amount of FIO Tokens to stake.

Please note that the FIO Address parameter may be left blank. The user does not need to have a FIO Address to stake, but if they don't, the stake call will have carry fee, instead of deducting a [bundled transaction](https://kb.fioprotocol.io/fio-protocol/fio-addresses/bundling-and-fees).

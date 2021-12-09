---
title:  FIP-21 Advisory - FIO Staking coming soon
date:   2021-12-09 14:38:00
categories: release
badges:
 - type: warning
   tag: advisory
---

[FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md) is planned to be launched to Mainnet in January 2022. Users will have the option to stake their FIO Tokens and earn staking rewards. The staking rewards are computed in such a way that the earlier you stake the higher the reward earning potential. Integrators are encouraged to launch staking integration before the activation date of 02/22/2022 to offer the greatest benefit to their users.

**Please note that FIO Staking offers a new incentive to integrators which lets them earn 11% of the staking reward paid out to their users!**

This Advisory is intended for wallets and exchanges wishing to integrate FIO Staking.

In addition, when staked or during unstaking, FIO Tokens in user's account may be locked. If you allow users to import FIO Private Key or seed phrases, it's possible that an account will be imported which contain locked FIO Tokens. You may consider evaluating user's available balance and potentially showing in UI.

<!--more-->

## How does staking work and how to implement it?
Please see the following documentation:

|Document|Description|
|---|---|
|[FIO Staking Developer Guide](https://developers.fioprotocol.io/docs/how-to/staking)|This is a technical guide which describes how to integrate FIO Staking.|
|[FIP-21](https://github.com/fioprotocol/fips/blob/master/fip-0021.md)|FIO Improvement Proposal describing FIO Staking as adopted by the community.|
|[FIO Staking Blog Post](https://medium.com/fio-blog/fio-token-staking-fio-improvement-proposal-fip-21-explained-e80a43bf3e83)|FIO Staking description for non-developers.|

## Impact of staking on account's FIO Token balance
Even if you choose not to integrate FIO Staking, please note that, [/get_fio_balance](https://developers.fioprotocol.io/pages/api/fio-api/#post-/get_fio_balance), the call to return FIO Token balance, will now contain few new fields, which you may choose to consider. Specifically:
* _balance_ remains unchanged and represents total number of FIO Tokens (SUFs) in account, but may now include tokens which are staked or locked and therefore not spendable.
* _available_ returns FIO Tokens (SUFs) which are not staked or locked and therefore spendable.

[See more information about getting user's balance](https://github.com/fioprotocol/fio-devhub/blob/pawmmm-StakingGuide/_docs/how-to/staking.md#understanding-users-fio-balance)

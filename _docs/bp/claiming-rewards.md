---
layout: page-bp
title: Claiming rewards
description: Claiming rewards
---
# Claiming block producer rewards

When fees are paid by users, they are collected in BP pools which are dynamically set-up for each day. Certain fees are placed into the current day pool, while others are divided up and placed into 365 pools for each day in the future. This is intended to cover bundled transaction. For example if [/register_fio_domain]({{site.baseurl}}/pages/api/fio-api/#options-regdomain) fee of 40,000,000,000 SUF is paid, 96,438,356 SUF (40,000,000,000/365*.85) is allocated to current day pool, another 96,438,356 SUF to BP Pool for Day 2 and so on.

* Each BP is paid by calling [/claim_bp_rewards]({{site.baseurl}}/pages/api/fio-api/#options-bpclaim).
* The call can only be called once every 24 hrs.
* When the it’s called the following actions are taken
   * The payout will apply to last 24 hours
   * Before a payout can be made, a Payout Schedule must exist. If it does not it gets created as follows:
      * Top 42 BPs based on votes and their votes are stored in table as of the creation of the Payout Schedule.
      * This schedule will be used for all payments to all BPs for the next 24 hours
   * If Payout Schedule exists, the BPs are paid as follows:
      * Every block producer (elected and standby, max 42) will receive 60% of the entire pool distributed pro-rata based on votes they received. Specifically:
         * All votes in Payout Schedule are summed up and each BPs votes as percent of total votes casted are used as payout percentage.
         * Scheduled block producers (top 21 in Payout Schedule) will receive 40% of the entire pool divided by number of scheduled block producers.
* If BP does not claim their rewards within 24 hours after becoming eligible, their fees are moved over to the current day’s BP Poll to be distributed among all BPs.




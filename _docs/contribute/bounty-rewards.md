---
layout: page-fio
title: FIO Bug Bounty Rewards
description: FIO Bug Bounty Rewards
---
# Bug Bounty Rewards

Rewards are distributed according to the impact of the vulnerability based on the Vulnerability Classification System. Rewards for critical vulnerabilities are capped at 10% of economic damage, primarily focusing on the possible loss of funds controlled by FIO System contracts.

Payouts are handled by the Foundation and are denominated in USD. All payouts are done in FIO.

|**Level**	|**Payout** |
|---|---|
|Critical	|Up to USD $100,000 |
|High	|Up to USD $20,000 |
|Medium	|Up to USD $5,000 |
|Low	|Up to USD $1,000 |
|None	|$0 |

## Vulnerability Classification System

FIO classifies vulnerabilities on a 5-level scale:

* Critical
* High
* Medium
* Low
* None

This scale encompasses all the aspects of a vulnerability, from the consequence of a successful exploit, to the level of access required to exploit it, to the probability that an exploitation attempt will be successful.

For example:

* A bug that results in loss of funds is more severe than a bug that temporarily prevents token holders from transferring their tokens.
* A bug that can be triggered by any token holder is more severe than a bug that requires a block producer to go rogue.
* A bug that can be triggered by a third party invoking a particular function/method is more severe than a bug that requires the affected token holder to invoke that same function/method.

The table below provides examples of the the consequence of a successful exploit. Keep in mind that if the exploit requires elevated privileges or uncommon user interaction, the level of the bug may be downgraded to reflect that.

**Sample Consequences to Smart Contracts/Blockchain:**

|**Level**	|**Examples**	|
|---|---|
|5. Critical	|Empty or freeze protocol tokens (e.g. economic attacks, logic errors, integer over-/under-flow)	|
|4. High	|Token holders temporarily unable to transfer tokens<br> Cryptographic flaws |
|3. Medium	|Users are temporarily unable to create transactions or use FIO features |
|2. Low	|Protocol returns inaccurate information, but on-chain data is not affected |
|1. None	|Best practices |

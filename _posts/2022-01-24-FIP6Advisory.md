---
title:  FIP-6 Advisory - Transfer locked tokens
date:   2022-01-24 14:45:00
categories: release
badges:
 - type: warning
   tag: advisory
---

[FIP-6](https://github.com/fioprotocol/fips/blob/master/fip-0006.md) introduced the ability to transfer tokens to an account and have them be locked based on a pre-determine schedule. If your integration looks for specific actions, e.g. _trnsfiopubky_, to determine which transactions to show as token transfers, you may want to add _trnsloctoks_ as one of those transactions.

<!--more-->

## Other information
* [Updated information about getting user's balance]({{site.baseurl}}/docs/integration-guide/staking#understanding-users-fio-balance)

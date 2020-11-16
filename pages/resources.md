---
id: resources
title: RAM, CPU, and NET limits
sidebar_label: RAM, CPU, and NET limits
layout: sidenav
sidebar: sidebars
---

## Overview

The FIO Chain inherits EOSIO resource management, but makes a number of modifications to it to remove the user complexity, while supporting its fee model.

## Staking

FIO Chain does not support staking.

## RAM limits

Every new account will have initial RAM allocated to 25600 bytes (25K). Every time an account pays a fee or covers a transaction from a bundle, that account’s RAM will be permanently increased by the number associated with the executed action. In case of multi-action transactions, each action will increment the RAM independently.

|Action	|Increase amount in bytes|
|---|---|
|REGDOMAIN	|2,560|
|REGADDRESS	|2,560|
|ADDADDRESS	|512|
|SETDOMPUB	|256|
|NEWFUNDSREQUEST	|2,048|
|RECORDOBT	|2,048|
|RENEWADDRESS	|1,024|
|RENEWDOMAIN	|1,024|
|TRNSPBKY	|1,024|
|REJECTFUNDS	|512|
|LINKAUTH	|1,024|
|REGPRODUCER	|1,024|
|REGPROXY	|1,024|
|VOTEPROXY	|512|
|VOTEPRODUCER	|1,024|
|UPDATEAUTH	|1,024 per 1,000 bytes of trx size|
|PROPOSE	|1,024 per 1,000 bytes of trx size|
|APPROVE	|1,024|
|XFERDOMAIN	|512|
|XFERADDRESS	|512|

### Example

Account A registers a FIO Address for themselves and pays a 40 FIO fee
Account A RAM is increased by 2,560 bytes
Account A transfers funds to a key not associated with an account
Account A RAM is increased by 2,560 bytes
Account B is created with initial limit of 25KB of RAM

### Scheduled BP RAM override

When a BP is added to the BP schedule to produce blocks, their RAM limit will be changed to unlimited
When a BP is removed from BP schedule, their RAM will be changed to existing RAM usage of their account + 25K

## Transaction size limit

Every transaction is limited to max size of 8098 bytes. BPs in schedule as exempt from the transaction limit for propose action.

## CPU limit

All accounts are created with unlimited CPU, as only authorized contracts with pre-approved CPU usage can run on the FIO Chain.

## NET limit

All accounts are created with unlimited NET, as there is a transaction size limit.


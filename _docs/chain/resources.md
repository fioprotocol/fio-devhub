---
layout: page-fio
title: RAM, CPU, and NET limits
description: RAM, CPU, and NET limits
---
# RAM, CPU, and NET limits

The FIO Chain inherits EOSIO resource management, but makes a number of modifications to it to remove the user complexity, while supporting its fee model.

---
## RAM limits

Every new account will have initial RAM allocated to 25600 bytes (25K). Every time an account pays a fee or covers a transaction from a bundle, that account’s RAM will be permanently increased by the number associated with the executed action. In case of multi-action transactions, each action will increment the RAM independently.

|Transaction |Action |Increase amount in bytes |
|---|---|
|Transfer FIO tokens |trnsfiopubky |1024|
|Transfer locked FIO tokens |trnsloctoks |1024 + 64 * number of lock periods |
|Map blockchain public address |addaddress |512|
|Request funds |newfundsreq |3120|
|Cancel funds request |cancelfndreq |512|
|Reject funds request |rejectfndreq |512|
|Record other blockchain transaction metadata|recordobt |4098|
|Register Address |regaddress |2560|
|Renew Address (deprecated) |renewaddress |1024|
|Transfer Address |xferaddress |512|
|Register Domain |regdomain |2560|
|Renew Domain |renewdomain |1024|
|Make Domain public |setdomainpub |256|
|Transfer Domain |xferdomain |512|
|Map NFT Signature to a FIO Crypto Handle|addnft |2048|
|Stake FIO Tokens |stakefio |512|
|Unstake FIO Tokens |unstakefio |512|
|List domain on marketplace |listdomain |1536|
|Vote on block producers |voteproducer |1024|
|Proxy votes to registered proxy |voteproxy |512|
|Register as a proxy |regproxy |1024|
|Register as block producer |regproducer |1024|
|Set fee ratios* |setfeevote |4000|
|msig_propose |propose |Variable based on transaction |
|auth_link |linkauth |1024|
|auth_update |updateauth |1024|

#### Example

* Account A registers a FIO Crypto Handle for themselves
* Account A RAM is increased by 2,560 bytes
* Account A transfers funds to a key not associated with an account
* Account A RAM is increased by 2,560 bytes
* Account B is created with initial limit of 25KB of RAM

#### Scheduled BP RAM override

When a BP is added to the BP schedule to produce blocks, their RAM limit will be changed to unlimited. When a BP is removed from BP schedule, their RAM will be changed to existing RAM usage of their account + 25K.

---
## Transaction size limit

Every transaction is limited to max size of 8098 bytes. BPs in schedule are exempt from the transaction limit for propose actions.

---
## CPU limit

All accounts are created with unlimited CPU, as only authorized contracts with pre-approved CPU usage can run on the FIO Chain.

---
## NET limit

All accounts are created with unlimited NET, as there is a transaction size limit.

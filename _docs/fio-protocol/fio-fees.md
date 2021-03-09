---
title: FIO Fees
description: FIO Fees
---
# FIO Fees

All blockchain altering transactions are subject to a fee though some transactions may be eligible to be covered by bundled transactions, which come with every FIO Address.

---
### Fee Setting

The FIO Protocol is designed such that fees charged to participants within the ecosystem are based on market forces and benchmarked against costs of running block producing infrastructure. It is therefore likely that the amount of FIO Tokens required for different fees will change based on the market value of the FIO Token and cost of running a node such that the human perceived cost of a FIO Address or transaction of the FIO Chain will likely remain more constant even though the human perceived value of the FIO token likely will change over time. 

To accommodate this, fee amounts are set based on bids from block producers in the following way: 

* Each of the 21 scheduled BPs submits their desired fee amount of FIO Tokens for each blockchain interaction and amount of bundled transactions to be included with every FIO Address.
* Amounts submitted by active block producers are analyzed, and the fee is set at median of all submitted amounts.


---
### Bundling and Fees

FIO Addresses have a default yearly fee that is set by block producers based on the economic needs of the FIO Chain.

The fee is paid on an yearly basis, and includes a bundle of included transactions, **which eliminates the need for a user to pay a per-transaction fee for use of the FIO Protocol.**

FIO Address Domains also include a separate yearly fee, also dictated by block producers.

​| |FIO Address |FIO Address Domains|
|---|---|---|
|Example Cost |40 FIO Tokens |800 FIO Tokens |
|Bundled transactions |100/year |N/A |

---
### Bundled Transactions

While most types of transaction are included with bundled transactions, there are a few notable exceptions:

* Registering/Renewing a FIO Address or FIO Domain are not included.
* The actual transfer of FIO Tokens themselves (such as to an exchange to be traded) are not included.
* Governance-related registrations (registering as a proxy or block producer), though the actual voting for a block producer or proxy is included.
* Advanced transactions (such as msig or account authorizations) are not included.

If a user ever exceeds the number of included bundled transactions, the user will be given the choice the renew their FIO Address early, which reloads their bundled transactions, or to pay for each transaction.

Due to the amount of storage required, two types of transactions will use up two bundled transactions instead of one:

* New FIO Request
* Recording FIO Data

Lastly, top 21 block producers are exempt from paying certain transaction fees, including: 

* Multisig propose

---
### Fee Types

|Transaction |Bundled tx used|
|---|---|
|Transfer FIO tokens |Not eligible |
|Transfer locked FIO tokens |Not eligible |
|Map blockchain public address |1 |
|Remove mapped address |1 |
|Remove all mapped addresses |1 |
|Request funds |2 |
|Cancel funds request |1 |
|Reject funds request |1 |
|Record other blockchain transaction metadata |2 |
|Register Address |Not eligible |
|Renew Address |Not eligible |
|Buy bundled transactions |Not eligible |
|Transfer Address |Not eligible |
|Burn Address |1 |
|Register Domain |Not eligible |
|Renew Domain |Not eligible |
|Make Domain public |Not eligible |
|Transfer Domain |Not eligible |
|Vote on block producers |1 |
|Proxy votes to registered proxy |1 |
|Register as a proxy |Not eligible |
|Unregister as a proxy |Not eligible |
|Register as block producer |Not eligible |
|Unregister as block producer |Not eligible |
|Set fee ratios* |Not eligible |
|Set fee multiplier* |Not eligible |
|Set bundled transaction count* |Not eligible |
|Pay rewards to TPIDs |Not eligible |
|Claim BP rewards* |Not eligible |
|Burn expired FIO Addresses and Domains |Not eligible |
|msig_propose |Not eligible, charged per 1,000 bytes |
|msig_approve |Not eligible |
|msig_unapprove |Not eligible |
|msig_cancel |Not eligible |
|msig_exec |Not eligible |
|msig_invalidate |Not eligible |
|auth_delete |Not eligible |
|auth_link |Not eligible |
|auth_unlink |Not eligible |
|auth_update |Not eligible, charged per 1,000 bytes |

*Restricted call

---
### Current fees

See [https://www.alohaeos.com/tools/fiofees​](https://www.alohaeos.com/tools/fiofees){:rel="nofollow noopener noreferrer" target="_blank"}

---
### Fee Distribution

|Share |Recipient|
|---|---|
|85% |Block Producers |
|10% |Entity facilitating transaction (TPID) or, if not provided, block producers |
|5% |Foundation |

<br>
Block producer shares are distributed as follows:

|Share |Recipient|
|---|---|
|60% |Distributed among top 42 BPs, based on share of votes |
|40% |21 active BPs scheduled when fees are distributed, divided equally |

Although most fees are distributed within the same day, the block producer share of FIO Domain and **FIO Address registration/renewal fees are paid out over 365 days** to properly incentivize block producers which will be processing bundled transactions over the full validity period.

#### Example

![Image]({{ site.baseurl }}/assets/img/tpid.png)

---
### Third Party Payment of FIO Blockchain Fees

Registration fees for FIO Addresses and FIO Domains must be paid with FIO Tokens, but the smart contract involved does not care about the originator of those tokens. This enables users and services to pay in part, or entirely, on the behalf of others.

This also enables users to pay for a FIO Address or FIO Domains through a crypto payment processor or instant exchange, which can convert a variety of different cryptocurrencies into a necessary FIO Tokens needed for renewal (and potentially even fiat).

The Foundation itself runs a portal which enables the ability for FIO Addresses and FIO Domains to be paid with a variety of cryptocurrencies.  The software for this portal is open source and any third party may establish their own registration sites.  

It is important to note that such third party registration sites never have access to the registrants' FIO Private Key.  Rather, they receive the FIO Public key from the user and pay for registration of the FIO Address or Domain they desire on chain and assign it to their FIO Public Key.

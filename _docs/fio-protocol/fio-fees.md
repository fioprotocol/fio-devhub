---
layout: page-fio
title: FIO Fees
description: FIO Fees
---
# FIO Fees and Bundled Transactions

All blockchain altering transactions are subject to a fee though some transactions may be eligible to be covered by bundled transactions, which come with every FIO Crypto Handle (aka FIO Address).

---
### Fee Setting

The FIO Protocol is designed such that fees charged to participants within the ecosystem are based on market forces and benchmarked against costs of running block producing infrastructure. It is therefore likely that the amount of FIO Tokens required for different fees will change based on the market value of the FIO Token and cost of running a node such that the human perceived cost of a FIO Crypto Handle or transaction of the FIO Chain will likely remain more constant even though the human perceived value of the FIO token likely will change over time. 

To accommodate this, fee amounts are set based on bids from block producers in the following way: 

* Each of the 21 scheduled BPs submits their desired fee amount of FIO Tokens for each blockchain interaction and amount of bundled transactions to be included with every FIO Crypto Handle.
* Amounts submitted by active block producers are analyzed, and the fee is set at median of all submitted amounts.


---
### Bundling and Fees

Registering a FIO Crypto Handles has a fee that is set by block producers based on the economic needs of the FIO Chain.

The fee includes a bundle of included transactions, **which eliminates the need for a user to pay a per-transaction fee for use of the FIO Protocol.**

FIO Domains include a separate yearly fee, also dictated by block producers.

​| |FIO Crypto Handle |FIO Domains|
|---|---|---|
|Example Cost |40 FIO Tokens |800 FIO Tokens |
|Bundled transactions |100/year |N/A |

---
### Bundled Transactions

While most types of transaction are included with bundled transactions, there are a few notable exceptions:

* Registering/Renewing a FIO Domain are not included.
* The actual transfer of FIO Tokens themselves (such as to an exchange to be traded) are not included.
* Governance-related registrations (registering as a proxy or block producer), though the actual voting for a block producer or proxy is included.
* Advanced transactions (such as msig or account authorizations) are not included.

If a user ever exceeds the number of included bundled transactions, the user will be given the choice to reload their bundled transactions or to pay for each transaction.

Due to the amount of storage required, two types of transactions will use up two bundled transactions instead of one:

* New FIO Request
* Recording FIO Data

Lastly, top 21 block producers are exempt from paying certain transaction fees, including: 

* Multisig propose

---
### Fee Types

|Transaction |Action |API Endpoint |Bundled tx used|
|---|---|
|Transfer FIO tokens |trnsfiopubky |/transfer_tokens_pub_key  |Not eligible |
|Transfer locked FIO tokens |trnsloctoks |/transfer_locked_tokens |Not eligible |
|Map blockchain public address |addaddress |/add_pub_address |1 |
|Remove mapped address |remaddress |/remove_pub_address |1 |
|Remove all mapped addresses |remalladdr |/remove_all_pub_addresses |1 |
|Request funds |newfundsreq |/new_funds_request |2 |
|Cancel funds request |cancelfndreq |/cancel_funds_request |1 |
|Reject funds request |rejectfndreq |/reject_funds_request |1 |
|Record other blockchain transaction metadata |recordobt |/record_obt_data |2 |
|Register Address |regaddress |register_fio_address |Not eligible |
|Renew Address (deprecated) |renewaddress |/renew_fio_address |Not eligible |
|Buy bundled transactions |addbundles |/add_bundled_transactions |Not eligible |
|Transfer Address |xferaddress |/transfer_fio_address |Not eligible |
|Burn Address |burnaddress |/burn_fio_address |1 |
|Register Domain |regdomain |/register_fio_domain |Not eligible |
|Renew Domain |renewdomain |/renew_fio_domain |Not eligible |
|Make Domain public |setdomainpub |/set_fio_domain_public |Not eligible |
|Transfer Domain |xferdomain |/transfer_fio_domain |Not eligible |
|Map NFT Signature to a FIO Crypto Handle |addnft |/add_nft |2 |
|Remove NFT Signature from FIO Crypto Handle |remnft |/remove_nft |1 |
|Remove ALL NFT Signatures from FIO Crypto Handle |remallnfts |/remove_all_nfts |1 |
|Stake FIO Tokens |stakefio |/stake_fio_tokens |1 |
|Unstake FIO Tokens |unstakefio |/unstake_fio_tokens |1 |
|Vote on block producers |voteproducer |/vote_producer |1 |
|Proxy votes to registered proxy |voteproxy |/proxy_vote |1 |
|Register as a proxy |regproxy |/register_proxy |Not eligible |
|Unregister as a proxy |unregproxy |/unregister_proxy |Not eligible |
|Register as block producer |regproducer |/register_producer |Not eligible |
|Unregister as block producer |unregprod |/unregister_producer |Not eligible |
|Set fee ratios* |setfeevote |/submit_fee_ratios |Not eligible |
|Set fee multiplier* |setfeemult |/submit_fee_multiplier |Not eligible |
|Compute fees |computefees |/compute_fees |Not eligible |
|Set bundled transaction count* |bundlevote |/submit_bundled_transaction |Not eligible |
|Pay rewards to TPIDs |tpidclaim |/pay_tpid_rewards |Not eligible |
|Claim BP rewards* |bpclaim |/claim_bp_rewards |Not eligible |
|Burn expired FIO Crypto Handles and Domains |burnexpired |/burn_expired |Not eligible |
|msig_propose |propose | |Not eligible, charged per 1,000 bytes |
|msig_approve |approve | |Not eligible |
|msig_unapprove |unapprove | |Not eligible |
|msig_cancel |cancel | |Not eligible |
|msig_exec |exec | |Not eligible |
|msig_invalidate |invalidate | |Not eligible |
|auth_delete |deleteauth | |Not eligible |
|auth_link |linkauth | |Not eligible |
|auth_unlink |unlinkauth | |Not eligible |
|auth_update |updateauth | |Not eligible, charged per 1,000 bytes |

*Restricted call

---
### Current fees

See [https://www.alohaeos.com/tools/fiofees​](https://www.alohaeos.com/tools/fiofees){:rel="nofollow noopener noreferrer" target="_blank"}

---
### Fee Distribution

|Share |Recipient|
|---|---|
|60% |Block Producers |
|25% |Staking reward pool |
|10% |Entity facilitating transaction (TPID) or, if not provided, block producers |
|5% |Foundation |

<br>
Block producer shares are distributed as follows:

|Share |Recipient|
|---|---|
|60% |Distributed among top 42 BPs, based on share of votes |
|40% |21 active BPs scheduled when fees are distributed, divided equally |

Although most fees are distributed within the same day, the block producer share of FIO Domain and **FIO Crypto Handle registration/renewal fees are paid out over 365 days** to properly incentivize block producers which will be processing bundled transactions over the full validity period.

#### New User Bounties 

New user bounties are paid to the entity facilitating new FIO Crypto Handles or FIO Domain registration. This bounty is paid automatically and in addition to normal fee distribution and is available to any entity that integrates the FIO Protocol and creates new user engagement. 
The new user bounties are currently set to 40% of the new registration fee collected by the facilitating entity (meaning total payout will be 10% standard + 40% bounty = 50%) and will be paid until New User Bounty pool is exhausted.

#### Example

![Image]({{ site.baseurl }}/assets/img/tpid.png)

---
### Third Party Payment of FIO Blockchain Fees

Registration fees for FIO Crypto Handles and FIO Domains must be paid with FIO Tokens, but the smart contract involved does not care about the originator of those tokens. This enables users and services to pay in part, or entirely, on the behalf of others.

This also enables users to pay for a FIO Crypto Handle or FIO Domains through a crypto payment processor or instant exchange, which can convert a variety of different cryptocurrencies into a necessary FIO Tokens needed for renewal (and potentially even fiat).

The Foundation itself runs a portal which enables the ability for FIO Crypto Handles and FIO Domains to be paid with a variety of cryptocurrencies.  The software for this portal is open source and any third party may establish their own registration sites.  

It is important to note that such third party registration sites never have access to the registrants' FIO Private Key.  Rather, they receive the FIO Public key from the user and pay for registration of the FIO Crypto Handle or Domain they desire on chain and assign it to their FIO Public Key.

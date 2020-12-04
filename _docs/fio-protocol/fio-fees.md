---
title: FIO Fees
description: FIO Fees
---
# FIO Fees

All blockchain altering transactions are subject to a fee though some transactions may be eligible to be covered by bundled transactions, which come with every FIO Address.

## Fee Setting

The FIO Protocol is designed such that fees charged to participants within the ecosystem are based on market forces and benchmarked against costs of running block producing infrastructure. It is therefore likely that the amount of FIO Tokens required for different fees will change based on the market value of the FIO Token and cost of running a node such that the human perceived cost of a FIO Address or transaction of the FIO Chain will likely remain more constant even though the human perceived value of the FIO token likely will change over time. 

To accommodate this, fee amounts are set based on bids from block producers in the following way: 

* Each of the 21 scheduled BPs submits their desired fee amount of FIO Tokens for each blockchain interaction and amount of bundled transactions to be included with every FIO Address.
* Amounts submitted by active block producers are analyzed, and the fee is set at median of all submitted amounts.

**Fee Types**

|End point |Bundled tx used|
|---|---|
|register_fio_domain |Not eligible |
|renew_fio_domain |Not eligible |
|transfer_fio_domain |Not eligible |
|register_fio_address |Not eligible |
|renew_fio_address |Not eligible |
|burn_fio_address |1 |
|add_pub_address |1 |
|remove_pub_address |1 |
|remove_all_pub_addresses |1 |
|set_fio_domain_public |Not eligible |
|transfer_tokens_pub_key |Not eligible |
|new_funds_request |2 |
|reject_funds_request |1 |
|cancel_funds_request |1 |
|record_obt_data |2 |
|register_producer |Not eligible |
|unregister_producer |Not eligible |
|vote_producer |1 |
|register_proxy |Not eligible |
|unregister_proxy |Not eligible |
|proxy_vote |1 |
|claim_bp_rewards* |Not eligible |
|pay_tpid_rewards |Not eligible |
|burn_expired |Not eligible |
|submit_fee_ratios* |Not eligible |
|submit_fee_multiplier* |Not eligible |
|submit_bundled_transaction* |Not eligible |
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

### Current fees

See [https://www.alohaeos.com/tools/fiofees​](https://www.alohaeos.com/tools/fiofees)






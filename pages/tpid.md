---
title: Technology Provider ID
sidebar_label: Technology Provider ID
layout: sidenav
sidebar: sidebars
---

To increase the adoption of the FIO Protocol among existing blockchain ecosystem participants, every interaction with the FIO blockchain can be tagged with an optional Technology Provider ID (tpid), which is a valid FIO Address. When submitted, this Address will receive a portion of fees collected from the transactions with that TPID. TPIDs will not get paid when a transaction is processed as a bundled transaction and no fee was charged.

## Default proxy

If a valid FIO Address is passed as tpid argument on any signed call and the actor on that call has never executed /proxy_vote call or /vote_producer, FIO tokens held by that actor (account) are automatically proxied to the supplied tpid, provided the tpid is registered as a proxy using /register_proxy call. That right is irrevocably eliminated once that actor executes /proxy_vote call or /vote_producer.

Once an account which has been proxied to a tpid is seen attached to a new tpid, for example because the user restored a seed phrase in a different wallet, the proxy will be changed to the new tpid. In other words, tokens are proxied to the last seen tpid.

Wallets can then use these tokens to vote in FIO governance on the user’s behalf.

## Payouts to TPIDs

All TPIDs virtual accounts get incremented every time a qualifying fee is paid. A TPID which has accrued 100 FIO or more at the time when /pay_tpid_rewards endpoint is called gets paid the entire balance via a transfer to their FIO Address (FIO Public key mapped to the FIO Address at the time when /pay_tpid_rewards is called. The /pay_tpid_rewards processes 100 payments at a time. It is expected that these functions will be performed by BPs, although any member of the community can perform them. Those calls are free to call and only modify blockchain if there are transactions that need processing. This call will only trigger action if made at least 60 seconds after previous time it was called.

Special handling at time of fee payment:

* Specified TPID is not a valid FIO Address (e.g. never registered or expired and was burned) - ignore TPID

Special handling at time of fee payout:

* Specified TPID is not a valid FIO Address (e.g. expired and was burned since fees were accrued) - transfer balance to current day BP payout bucket

### New User Bounties

New user bounties are additional tokens which will be minted and allocated to TPIDs to further incentivize the adoption of the FIO Protocol. The limit for user bounties is set at 125,000,000 FIO tokens and is distributed as follows:

* If a transaction is collecting a fee and TPID is present in that transaction, that TPID will receive a bonus payout equal to 40% of the transaction being collected.
* Example:
  * Transaction is collecting 40 FIO fee and it gets distributed as follows:
     * 2 FIO (5% of collected fee) to Foundation
     * 4 FIO (10% of collected fee) to TPID
     * 34 FIO (85% of collected fee) to BP Pool
  * New tokens are minted
     * FIO (40% of collected fee) to TPID
  * The TPID will receive a total of 20 FIO (4 regular payout, 16 bonus)
* Once 125,000,000 tokens have been minted for the purpose of the bonus, it will no longer be paid.

## Knowledge Base articles

[Fee Setting and Distribution](https://kb.fioprotocol.io/fio-chain/fees)


---
layout: page-fio
title: Earn FIO with your TPID
description: Earn FIO with your TPID
redirect_from:
    - /docs/integration-guide/tpid
---

# Earn FIO with your Technology Provider ID

To increase the adoption of the FIO Protocol among existing blockchain ecosystem participants, every interaction with the FIO blockchain can be tagged with a **Technology Provider ID (TPID)**, which is a valid FIO Crypto Handle (aka FIO Address). The TPID FIO Crypto Handle receives a portion of [fees]({{site.baseurl}}/docs/fio-protocol/fio-fees) collected from all transactions with that mapped TPID.

In the example below, the owner of rewards@wallet will receive a portion of the fees payed by the user to register purse@alice.

```
{
  "fio_address": "purse@alice",
  "owner_fio_public_key": "FIO8PRe4WRZJj5mkem6qVGKyvNFgPsNnjNN6kPhh6EaCpzCVin5Jj",
  "max_fee": 30000000000,
  "tpid": "rewards@wallet",
  "actor": "aftyershcu22"
}
```

*TPIDs are not paid when a transaction is processed as a bundled transaction and no fee was charged.*

## Payouts to TPIDs

TPIDs *virtual* accounts get incremented every time a qualifying fee is paid. An integrator TPID which has accrued 100 FIO or more can call the [/pay_tpid_rewards]({{site.baseurl}}/pages/api/fio-api/#options-tpidclaim) endpoint to claim their rewards. When called, the entire balance from the virtual account is transferred to the TPID FIO Crypto Handle.

The [/pay_tpid_rewards]({{site.baseurl}}/pages/api/fio-api/#options-tpidclaim) endpoint processes payments across all TPIDs each time it is called. If a TPID has accrued 100 FIO or more in rewards, the reward will be paid out. It is expected that Block Producers will call [/pay_tpid_rewards]({{site.baseurl}}/pages/api/fio-api/#options-tpidclaim) on a regular basis, although any member of the community can call the endpoint and initate the payout. The call is free and only modifies the blockchain if there are transactions that need processing. This call will only trigger an action if it is made at least 60 seconds after the previous time it was called.

If a TPID virtual account does not reference a valid FIO Crypto Handle (e.g. the Address has expired and was burned since the fees were accrued) the payout will transfer to the current day's BP rewards bucket.

TPIDs can check reward accrual by examining [the fio.tpid > tpids table on bloks.io](https://fio.bloks.io/contract?tab=Tables&account=fio.tpid&scope=fio.tpid&limit=100&table=tpids){:rel="nofollow noopener noreferrer" target="_blank"}.

## New User Bounties

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




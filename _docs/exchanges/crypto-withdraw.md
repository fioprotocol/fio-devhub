---
title: Withdraw Crypto using FIO Crypto Handles and FIO Requests
description: Withdraw Crypto using FIO Crypto Handles and FIO Requests
redirect_from:
    - /docs/exchanges/exchange-token-withdraw
---

# Withdraw Crypto using FIO Crypto Handles & FIO Requests

[FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) (aka FIO Addresses) are human-readable wallet identifiers (such as john@edge or alice@gold) which eliminate the need to see, or even know of, blockchain public addresses. Enabling withdrawals using [FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) give exchange users friendly interwallet operability, making withdrawals easy and near error-free, dramatically reducing support tickets.

---
## Using a FIO Crypto Handle (FIO Send)

To enable withdrawals using a FIO Crypto Handle, an exchange would would first ask for the FIO Crypto Handle of the user receiving the funds. Next, the corresponding public address for that chain is looked-up using [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) and the transfer is executed by the Exchange on the native chain.

---
## Using a FIO Request

If users of the exchange were assigned unique [FIO Crypto Handles]({{site.baseurl}}/docs/fio-protocol/fio-address) or if users provided the exchange, ahead of time, with a list of FIO Crypto Handles which the user owns, they could also [send a FIO Request]({{site.baseurl}}/docs/how-to/fio-request) from their wallet to the exchange’s FIO Crypto Handle (either generic, e.g. `withdrawals@myexchange`, or unique, e.g. `alice@myexchange`).

The user would then login to the exchange and approve the [FIO Request]({{site.baseurl}}/docs/how-to/fio-request). Once approved, the exchange would execute the transfer on the native chain.

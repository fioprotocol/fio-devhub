---
title: Withdraw Crypto using FIO Addresses and FIO Requests
description: Withdraw Crypto using FIO Addresses and FIO Requests
redirect_from:
    - /docs/exchanges/exchange-token-withdraw
---

# Withdraw Crypto using FIO Addresses & FIO Requests

[FIO Addresses]({{site.baseurl}}/docs/fio-protocol/fio-address) are human-readable wallet identifiers (such as john@edge or alice@gold) which eliminate the need to see, or even know of, blockchain public addresses. Enabling withdrawals using [FIO Addresses]({{site.baseurl}}/docs/fio-protocol/fio-address) gives exchange users friendly interwallet operability, making withdrawals easy and near error-free, dramatically reducing support tickets.

As a first step, **Exchanges should register a custom [FIO Domain]({{site.baseurl}}/docs/fio-protocol/fio-address#fio-domains) (e.g., @myexchange)**. Exchange users will then be able to register FIO Addresses on that custom domain (e.g., alice@myexchange).

---
## Using a FIO Address (FIO Send)

To enable withdrawals using a FIO Address, an exchange would would first ask for the FIO Address of the user receiving the funds. Next, the corresponding public address for that chain is looked-up using [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) and the transfer is executed by the Exchange on the native chain.

---
## Using a FIO Request

If users of the exchange were assigned unique [FIO Addresses]({{site.baseurl}}/docs/fio-protocol/fio-address) or if users provided the exchange, ahead of time, with a list of FIO Addresses which the user owns, they could also [send a FIO Request]({{site.baseurl}}/docs/how-to/fio-request) from their wallet to the exchange’s FIO Address (either generic, e.g. `withdrawals@myexchange`, or unique, e.g. `alice@myexchange`).

The user would then login to the exchange and approve the [FIO Request]({{site.baseurl}}/docs/how-to/fio-request). Once approved, the exchange would execute the transfer on the native chain.

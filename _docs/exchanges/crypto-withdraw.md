---
title: Withdraw Crypto using FIO Addresses and FIO Requests
description: Withdraw Crypto using FIO Addresses and FIO Requests
---

# Withdraw Crypto using FIO Addresses & Requests

### Using a FIO Address

With this option, the user’s withdrawal area on the exchange would ask for a FIO Address and the amount of withdrawals of any token. Once FIO Address is entered, the corresponding public address for that chain is looked-up using [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) and the transfer is executed on the native chain.

### Using a FIO Request

If users of exchange were assigned unique FIO Addresses or if users provided the exchange, ahead of time, with a list of FIO Addresses which the user owns, they could send a FIO Request from their wallet to the exchange’s FIO Address (either generic, e.g. `withdrawals@myexchange`, or unique, e.g. `alice@myexchange`).

The user would then login to the exchange and approve the FIO Request. Once approved, the exchange would execute the transfer on the native chain.


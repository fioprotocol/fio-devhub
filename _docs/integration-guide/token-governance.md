---
layout: page-int
title: Participate in governance
description: Participate in governance
redirect_from:
    - /docs/how-to/governance
---
# Participate in governance by voting your user's tokens

## Enable auto-proxy of user's tokens

Wallets can participate in FIO governance by voting on their user’s behalf. This is accomplished by *auto-proxying* a user's votes to the wallet's TPID Address when the user executes a transaction. If a user has never directly voted for a producer or proxied their vote (by executing [/proxy_vote]({{site.baseurl}}/pages/api/fio-api/#options-voteproxy) or [/vote_producer]({{site.baseurl}}/pages/api/fio-api/#options-voteproducer)), **their vote is automatically proxied to the TPID FIO Crypto Handle.**

If a wallet has set up their TPID correctly, the first time a wallet user executes a transaction, such as transferring FIO tokens, that user's votes are automatically proxied to the wallet's TPID FIO Crypto Handle. In the example below, the first time Alice transfers FIO using her FIO Public Key, her votes are automatically proxied to rewards@wallet.

```
{
  "payee_public_key": "FIO8PRe4WRZJj5mkem6qVGKyvNFgPsNnjNN6kPhh6EaCpzCVin5Jj",
  "amount": "1000000000",
  "max_fee": 250000000,
  "tpid": "rewards@wallet",
  "actor": "aftyershcu22"
}
```

{% include alert.html type="warning" title="Register TPID Address as a proxy" content="To participate, wallets must register their TPID FIO Crypto Handle as a proxy using /register_proxy" %}

If a user subsequently executes /proxy_vote or /vote_producer, their vote will no longer be auto-proxied to the wallet. In addition, if a user restores their seed phrase in a different wallet, the proxy will be changed to the new TPID. In other words, tokens are auto-proxied to the last seen TPID.

## Vote for producers

Once a wallet has registered their TPID Address as a proxy, they then need to [review the performance of block producers](https://snap.blockpane.com/proxy.html){:target="_blank"} and [vote]({{site.baseurl}}/docs/contribute/govern-voting).
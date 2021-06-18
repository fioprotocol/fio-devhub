---
title: FIO Token
description: FIO Token
---
# FIO Token

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ
* [Brand Assets](https://fioprotocol.io/brand-assets/)

### Obtaining token supply in real-time

The Foundation operates API end-points which return token supply statistics, specifically:

|Statistic |Description |End-point|
|---|---|---|
|Total supply	|All tokens that were ever minted. Maximum token supply is capped at 1,000,000,000 FIO.	|<https://fioprotocol.io/supply>{:target="_blank"} |
|Circulating supply	|Total supply less locked tokens.	|<https://fioprotocol.io/circulating>{:target="_blank"} |
|Locked tokens	|Tokens which are locked and cannot be transferred.	|<https://fioprotocol.io/locked>{:target="_blank"} |

Data returned includes 9 decimal points, e.g. 705906876.848960519

To return data in Smallest Units of FIO (SUFs), add /suf to end point, e.g. <https://fioprotocol.io/supply/suf>{:target="_blank"}

To return the data as json, add ?json=true top end point, e.g. <https://fioprotocol.io/supply?json=true>{:target="_blank"}
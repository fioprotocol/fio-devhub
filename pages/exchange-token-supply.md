---
title: Token supply
sidebar_label: Token supply
layout: sidenav
sidebar: sidebars
---

## Obtaining token supply in real-time

The Foundation operates API end-point which returns token supply statistics, specifically:

|---|---|---|
|Statistic	|Description	|End-point|
|Total supply	|All tokens that were ever minted. Maximum token supply is capped at 1,000,000,000 FIO.	|https://fioprotocol.io/supply|
|Circulating supply	|Total supply less locked tokens.	|https://fioprotocol.io/circulating|
|Locked tokens	|Tokens which are locked and cannot be transferred.	|https://fioprotocol.io/locked|

Data returned includes 9 decimal points, e.g. 705906876.848960519

To return data in Smallest Units of FIO (SUFs), add /suf to end point, e.g. https://fioprotocol.io/supply/suf

To return the data as json, add ?json=true top end point, e.g. https://fioprotocol.io/supply?json=true


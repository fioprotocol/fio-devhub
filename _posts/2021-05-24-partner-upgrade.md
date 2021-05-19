---
title:  FIO Release 3.0 Mandatory Upgrade Checklist
date:   2021-05-24
categories: release
badges:
 - type: warning
   tag: release
---

###### FIO Chain release v3.0.0 is a mandatory update for all wallets and exchanges running a FIO API Node. This post outlines the steps FIO integration partners must take to upgrade their FIO API node from v2.0.x to v3.0.0. All nodes must be upgraded by June 25, 2001.

<!--more-->

Nodes that are not upgraded by **June 25, 2001**. will return "No request found" for the following API getters:

* /get_obt_data
* /get_pending_fio_requests
* /get_sent_fio_requests
* /get_cancelled_fio_requests

## Upgrade Checklist

### Step 1. Review chain release 3.0.0

FIO wallets and exchanges that have integrated FIO functionality should first [review the v3.0.0 updates]({% post_url 2021-04-20-release-300-chain %}). Many new features are available that FIO integration partners may want to take advantage of. In addition, some existing API endpoints have been updated to return more data. While this should not break existing integrations, it is important to understand the changes in case wallet or exchange functionality is affected by the upgrade.

### Step 2. Upgrade your API node

If you are a wallet or exchange running your own FIO API node you will need to follow the [FIO Node Upgrade process]({{site.baseurl}}/docs/chain/node-build) to install FIO chain version 3.0.0. 

### Step 3. Additional validation for version 3.0.0

Release v3.0.0 changes how FIO Request and OBT record data is stored. Information on FIO Requests and OBT Data is returned by the get_sent_fio_requests, get_pending_fio_requests, and get_obt_data API endpoints. If your FIO integration uses these API endpoints, it is recommended that you manually test them after upgrading to version 3.0.0.

### Step 4. Notify your FIO account manager

To help FIO track the upgrade, please send an email to **nnn@fioprotocol.io** or post a message to your shared Discord/Telegram FIO channel with the following information:
* 
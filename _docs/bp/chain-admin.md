---
layout: page-bp
title: Chain Admin
description: Chain administration tasks
---
# Chain Administration

FIO provides some user actions that require more work than can be completed in a single transaction. Instead of having the user call an action multiple times, FIO has created some "maintenance calls" that execute some of these longer running tasks. It is envisioned that these maintenance calls will be made by BPs as good stewards of the blockchain and to free-up state file.

### Burn expired Domains
[burnexpired]({{site.baseurl}}/pages/api/fio-api/#options-burnexpired) is a maintenance call and is intended to burn FIO Domains which have passed their expiration date and need to be removed from state. When a domain is burned, all FIO Crypto Handles and any NFT Signatures attached to those Crypto Handles are also burned.

### Burn NFT Signatures that have been removed
[burnnfts]({{site.baseurl}}/pages/api/fio-api/#options-burnnfts) is a maintenance call and is intended to burn FIO NFT Signatures that were removed using the remallnfts action.




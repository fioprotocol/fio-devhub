---
title:  FIO Release 3.0
date:   2021-04-20
categories: release
badges:
 - type: warning
   tag: release
---

## v3.0 release summary (Testnet Release)

*(This release is currently in Testnet)*

It has been awhile since we have posted out a development update. The reason is we have been heads down working on our next v3.0 chain release. V3 includes a lot of new API endpoints for recent FIO Improvement Proposals as wells as performance improvements for accessing FIO Request data. A few statistics on the FIO v3.0 release:

* Includes features for 11 FIPs (https://github.com/fioprotocol/fips) including: FIP-1.b (xfer address), FIP-6 (xfer locked tokens), FIP-7 (Burn FIO Address), FIP-9 (Vote and proxy without FIO Address), FIP-10 (Redesign fee computations), FIP-11.a (Add bundled transactions), FIP-13 (Retrieve all pub addresses), FIP-16 (clio enhancements), FIP-18 (Chain level public addresses), FIP-19 (Retrieve all received FIO Requests), FIP-25 (Return bundle transaction count in get_fio_names)
* 8 new API endpoints
* Modifications to 14 API endpoints

The following gives an overview of the changes included in the release:

<!--more-->

For more information refer to the [Version 3.0 Release Notes](https://github.com/fioprotocol/fio.contracts/releases/tag/v2.3.0){:target="_blank"}.

### Detailed Overview

#### FIO Request and OBT Data performance improvements


#### [FIP-1(b)](https://github.com/fioprotocol/fips/blob/master/fip-0001.md){:target="_blank"} - Transfer FIO Address

Both FIO Domains and FIO Addresses are non-fungible tokens (NFTs) that are owned by a FIO Public Key. FIP-1(b) enables users to transfer their FIO Address (e.g., myname@mydomain) to a new owner. This release adds a new **/transfer_fio_address** endpoint for the [xferaddress](/pages/api/fio-api/#options-xferaddress) action.

#### [FIP-6](https://github.com/fioprotocol/fips/blob/master/fip-0006.md){:target="_blank"} - Transfer locked tokens

Previously, there was no way for individuals to lock tokens for themselves as savings or for security reasons. In addition, there are certain cases where the FIO Foundation, or other groups or individuals, may want to grant or sell locked tokens. 

This release adds a new **/transfer_locked_tokens** endpoint for the [trnsloctoks](/pages/api/fio-api/#options-trnsloctoks) action. 

When the transfer of locked tokens is initiated, the target account (hashed from the provided FIO Public Key) is created, the specified amount of FIO Tokens are transferred to the account, and a lock for that amount is attached to the account. The account can function normally--funds may be transferred in and out of the account--except that the original amount of locked tokens remain locked until unlock periods are reached. 

#### [FIP-7](https://github.com/fioprotocol/fips/blob/master/fip-0007.md){:target="_blank"} - Provide ability to burn FIO Address

An owner should be able to burn their FIO Address ahead of expiration if they no longer wish to use it and want to purge all associated data. There are many reasons why someone would want to burn their FIO Address including business/personal requirements, cost effectiveness, or spam prevention. 

This release adds a new **/burn_fio_address** endpoint for the [burnaddress](/pages/api/fio-api/#options-burnaddress) action.

#### [FIP-9](https://github.com/fioprotocol/fips/blob/master/fip-0009.md){:target="_blank"} - Allow voting and proxying without a FIO Address

Currently voting for a block producer or assigning your votes to a proxy requires that a user have a FIO Address. The FIO Address is needed to allow payment with bundled transactions instead of FIO tokens. FIP-9 makes voting and proxying votes easier for FIO users by allowing voting and proxying even when the token holder does not have a FIO Address. The FIO Address field can now be left blank when calling vote_producer and proxy_vote.

This release updates the [/vote_producer](/pages/api/fio-api/#options-voteproducer) and [/proxy_vote](/pages/api/fio-api/#options-voteproxy) endpoints to allow a blank FIO Address.

#### [FIP-10](https://github.com/fioprotocol/fips/blob/master/fip-0010.md){:target="_blank"} - Redesign fee computations

It is critical that fees associated with transactions on the FIO blockchain are set appropriately. Fee setting can be difficult for FIO Block Producers, who are in charge of fee setting for the protocol, due to fluctuations in the price of the FIO Token. FIP-10 updates the FIO fee voting functionality and enables Block Producers to set fee ratios (the relative cost of different transactions on the FIO blockchain) and fee multipliers (a single number that can be adjusted to track the price of the FIO Token). Subsequently, the multiplier can be adjusted in response to FIO Token price fluctuations.

This release updates the [/submit_fee_vote](/pages/api/fio-api/#options-setfeevote), [/submit_fee_multiplier](/pages/api/fio-api/#options-setfeemult), and [/submit_bundled_transaction](/pages/api/fio-api/#options-bundlevote) endpoints and adds a new /compute_fees endpoint to simplify fee setting for Block Producers.

#### [FIP-11(a)](https://github.com/fioprotocol/fips/blob/master/fip-0011.md){:target="_blank"} - Enhance bundled transaction usability

Bundled transactions make it easier for everyday users to interact with the FIO Protocol. Users pay a single annual fee for the FIO Address and get with it enough bundled transactions to cover an average amount of annual interaction with the FIO Chain. Currently, users who process more transactions than the annual amount of bundled transactions can either pay a per transaction fee for all additional transactions or renew their FIO Address early, which adds new bundle of transactions and extends FIO Address expiration date. However, heavy users have to run multiple Address renewals in sequence to increase their bundle count. 

This release adds a new **/add_bundled_transactions** endpoint for the [addbundles](/pages/api/fio-api/#options-addbundles) action.

#### [FIP-13](https://github.com/fioprotocol/fips/blob/master/fip-0013.md){:target="_blank"} - Ability to retrieve all public addresses for a FIO Address

Currently, the [/get_pub_address](/pages/api/fio-api/#post-/get_pub_address) API method returns only the public address for specific chain and token code. This works great for a look-up of a specific token code, but it's not practical for a wallet wanting to fetch and display all public address mappings to the owner of the FIO Address. Even though the mappings can be fetched using /get_table_rows, this call requires index computation, and therefore a native API method is desirable.

This release adds a new **/get_pub_addresses** endpoint that returns all mapped public addreses for a specified FIO Address.

#### [FIP-16](https://github.com/fioprotocol/fips/blob/master/fip-0016.md){:target="_blank"} - CLIO Enhancements

This release addresses enhancements to the FIO Protocol command line utility known as CLIO including:

* Create additional subcommands to support FIO actions
* Cleanup and repair of existing subcommands
* Handling of additional FIO error codes

#### [FIP-18](https://github.com/fioprotocol/fips/blob/master/fip-0018.md){:target="_blank"} - Chain-level public address

Previously, mapping other blockchain public keys to a FIO Address required a unique chain code and token code mapping for every key. This created unnecessary overhead in cases where multiple tokens on a particular chain share a single address (e.g., ERC20 tokens). 

This release updates the [/add_pub_address](/pages/api/fio-api/#options-addaddress), [/get_pub_address ](/pages/api/fio-api/#post-/get_pub_address), [/remove_pub_address](/pages/api/fio-api/#options-remaddress) endpoints to allow a generic "*" token code to be used indicating all tokens for that chain are mapped to the same blockchain public key.

#### [FIP-19](https://github.com/fioprotocol/fips/blob/master/fip-0019.md){:target="_blank"} - Add ability to retrieve all received FIO Requests

Currently it is possible to retrieve:
* Received FIO Requests in the *pending* status using [/get_pending_fio_requests](/pages/api/fio-api/#post-/get_pending_fio_requests)
* All sent FIO Requests using [/get_sent_fio_requests](/pages/api/fio-api/#post-/get_sent_fio_requests)

But, there is no getter to fetch all received FIO Requests irrespective of status. It is possible to use [/get_table_rows](/pages/api/fio-api/#post-/get_table_rows) to retrieve received requests, but this requires hashing of values and potentially a multi-table look-up.

This release adds a new **/get_received_fio_requests** endpoint that enables the retrieval of all received FIO Requests, irrespective of status.

#### [FIP-25](https://github.com/fioprotocol/fips/blob/master/fip-0025.md){:target="_blank"} - Return bundle transaction count in get_fio_names

It is currently difficult to obtain the remaining bundled transaction count for a FIO Address. It can be fetched using [/get_table_rows](/pages/api/fio-api/#post-/get_table_rows), but this requires converting the FIO Address to a hash which is the last 16 bytes of a sha1 hash (of the string), as big-endian hex.

This release updates the [/get_fio_names](/pages/api/fio-api/#post-/get_fio_names) endpoint to return an additional bundle count parameter.
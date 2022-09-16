---
layout: page-fio
title: History API
description: History API
---
# History node
## Building history node

Refer to [Building a node]({{site.baseurl}}/docs/chain/node-build) for information on configuring your node with the history_api_plugin (V1 History) feature.

## History API

### Get transaction
```
curl -s -XPOST https://fiotestnet.blockpane.com/v1/history/get_transaction -d '{
  "id": "7a467640c8db74e578da6f4a8ea03343aa7a73e770665564292eef548fda8b87"
}'
```

### Get block transactions

curl -s -XPOST https://fiotestnet.blockpane.com/v1/history/get_block_txids -d '{"block_num": 123}'

#### Get transactions by account

This provides action traces, not just transaction history which has several implications:

* Multiple actions can be submitted in a single transaction, so several (different) actions can have the same transaction ID
* Not all of the actions may be been performed by the account being queried (triggering internal actions within a contract for example.) It may or may not be beneficial to only show the actions directly performed by the account being queried, for example filtering out internal actions that have a different actor may result in missing some important FIO transactions, such as rewards payouts.

Note: there are some peculiarities in how paging works on this endpoint, this is not a FIO specific issue. We haven’t diverged from how EOS works in this case to avoid unexpected behavior for block explorers etc.

The getactions endpoint does allow a negative position for finding the most recent actions, but if a negative number is specified, the following caveats apply:

* it will only start at the most recent transaction, only -1 is valid, cannot specify a lower offset.
* it will not allow paging
* it will always return 10 records.

Because of this limitation, getting the last 100 transactions for an account (for example) requires a call with the negative offset to find the highest position (using the last action in the returned array,) and then paging through the actions using positive pos and offset values. accountactionseq is the transaction count for the account, and is what should be used for paging.

Example using jq to print the highest action.
```
curl -s -XPOST https://fiotestnet.blockpane.com/v1/history/get_actions -d '{
  "account_name": "zbwprrzymskb",
  "pos": -1
}'|jq .actions[-1].account_action_seq
```

which was 345, offset counts from 0, so to get last 100 transactions it would be …
```
curl -s -XPOST https://fiotestnet.blockpane.com/v1/history/get_actions -d '{
  "account_name": "zbwprrzymskb",
  "pos": 246, "offset": 99
}'
```

#### API endpoints

* Testnet History API Node: `https://fiotestnet.blockpane.com/v1/history/`
* Mainnet History API Nodes: See [Github](https://github.com/fioprotocol/fio.mainnet#history-v1){:target="_blank"}

#### Additional Resources

* [Account balances and history]({{site.baseurl}}/docs/general-functions/txn-history)


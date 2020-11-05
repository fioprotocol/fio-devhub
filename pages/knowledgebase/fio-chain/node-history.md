---
id: history
title: History node
sidebar_label: History node
---

History node

Building history node

Debian packages are available in Github.

Note the history plugin still needs to be enabled in /etc/fio/nodeos/config.ini.

The fastest way to bring a history node online:

# assumes root user
wget https://bin.fioprotocol.io/mainnet/fioprotocol-2.0.x-latest-ubuntu-18.04-amd64.deb
apt-get install ./fioprotocol-2.0.x-latest-ubuntu-18.04-amd64.deb
cat >> /etc/fio/nodeos/config.ini << EOF
plugin = eosio::history_plugin
plugin = eosio::history_api_plugin
filter-on = *
filter-out = eosio:onblock:
history-per-account = 10000
EOF
systemctl enable fio-nodeos.service
systemctl start fio-nodeos.service
History node example calls

Get transaction

curl -s -XPOST https://testnet.fio.dev/v1/history/get_transaction -d '{
  "id": "7a467640c8db74e578da6f4a8ea03343aa7a73e770665564292eef548fda8b87"
}'
Get block transactions

curl -s -XPOST https://testnet.fio.dev/v1/history/get_block_txids -d '{"block_num": 123}'
Get transactions by account

This provides action traces, not just transaction history which has several implications:

Multiple actions can be submitted in a single transaction, so several (different) actions can have the same transaction ID
Not all of the actions may be been performed by the account being queried (triggering internal actions within a contract for example.) It may or may not be beneficial to only show the actions directly performed by the account being queried, for example filtering out internal actions that have a different actor may result in missing some important FIO transactions, such as rewards payouts.
Note: there are some peculiarities in how paging works on this endpoint, this is not a FIO specific issue. We haven’t diverged from how EOS works in this case to avoid unexpected behavior for block explorers etc.

The getactions endpoint does allow a negative position for finding the most recent actions, but if a negative number is specified, the following caveats apply:

it will only start at the most recent transaction, only -1 is valid, cannot specify a lower offset.
it will not allow paging
it will always return 10 records.
Because of this limitation, getting the last 100 transactions for an account (for example) requires a call with the negative offset to find the highest position (using the last action in the returned array,) and then paging through the actions using positive pos and offset values. accountactionseq is the transaction count for the account, and is what should be used for paging.

Example using jq to print the highest action.

curl -s -XPOST https://testnet.fio.dev/v1/history/get_actions -d '{
  "account_name": "zbwprrzymskb",
  "pos": -1
}'|jq .actions[-1].account_action_seq
which was 345, offset counts from 0, so to get last 100 transactions it would be …

curl -s -XPOST https://testnet.fio.dev/v1/history/get_actions -d '{
  "account_name": "zbwprrzymskb",
  "pos": 246, "offset": 99
}'
API endpoints

Testnet History API

http://testnet.fioprotocol.io/v1/history/
Mainnet History API

See Github

Additional Resources

Account balances and history


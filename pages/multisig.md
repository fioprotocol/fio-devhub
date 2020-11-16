---
id: multisig
title: Multisig
sidebar_label: Multisig
layout: sidenav
sidebar: sidebars
---

## Overview

The following is a step-by-step guide for how to convert a regular FIO account into a “2 out of 3” multisig (any 2 signatures of the 3 provided accounts are required to execute a transaction) on the FIO Chain. All transactions in the steps below are submitted using /push_transaction API method.

## Step 1: Change owner permissions of account

This call with replace owner permission with 3 different accounts. Please note that those accounts had to been previously created on the FIO Chain by sending funds to them or registering a FIO Address.
```

  {
    "action": "updateauth",
    "json": {
      "account": "aewgyixsunjo",
      "permission": "owner",
      "parent": "",
      "auth": {
        "threshold": 2,
        "keys": [],
        "waits": [],
        "accounts": [
          {
            "permission": {
              "actor": "ianyjw312vbg",
              "permission": "active"
            },
            "weight": 1
          },
          {
            "permission": {
              "actor": "rcwh3tqbqcpu",
              "permission": "active"
            },
            "weight": 1
          },
          {
            "permission": {
              "actor": "w5bhllejse2f",
              "permission": "active"
            },
            "weight": 1
          }
        ]
      },
      "max_fee": 10000000
    }
  }

```
## Step 2: Change active permissions of account

This call with replace active permission with 3 different accounts. Please note that those accounts had to been previously created on the FIO Chain by sending funds to them or registering a FIO Address.
```

  {
    "action": "updateauth",
    "json": {
      "account": "aewgyixsunjo",
      "permission": "active",
      "parent": "owner",
      "auth": {
        "threshold": 2,
        "keys": [],
        "waits": [],
        "accounts": [
          {
            "permission": {
              "actor": "ianyjw312vbg",
              "permission": "active"
            },
            "weight": 1
          },
          {
            "permission": {
              "actor": "rcwh3tqbqcpu",
              "permission": "active"
            },
            "weight": 1
          },
          {
            "permission": {
              "actor": "w5bhllejse2f",
              "permission": "active"
            },
            "weight": 1
          }
        ]
      },
      "max_fee": 10000000
    }
  }

```

## Step 3: Propose a multisig transaction

This call proposes a transaction of spending funds.
```

  {
    "code": "eosio.msig",
    "action": "propose",
    "args": {
      "proposer": "ianyjw312vbg",
      "proposal_name": "propcwh3",
      "requested": [
        {
          "actor": "w5bhllejse2f",
          "permission": "active"
        },
        {
          "actor": "rcwh3tqbqcpu",
          "permission": "active"
        }
      ],
      "trx": {
        "chain_id": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
        "expiration": "2019-12-15T21:48:47",
        "ref_block_num": 266016,
        "ref_block_prefix": 102118591,
        "max_net_usage_words": 0,
        "max_cpu_usage_ms": 0,
        "delay_sec": 0,
        "context_free_actions": [],
        "actions": [
          {
            "account": "fio.token",
            "name": "trnsfiopubky",
            "authorization": [
              {
                "actor": "aewgyixsunjo",
                "permission": "active"
              }
            ],
            "data": "3546494f385052653457525a4a6a356d6b656d367156474b79764e466750734e6e6a4e4e366b50686836456143707a4356696e354a6a40420f000000000080b2e60e0000000040dfd4b83bcfb83200"
          }
        ],
        "transaction_extensions": []
      },
      "max_fee": 10000000
    }
  }

```

## Step 4: Account 1 approves transaction

This call approves the transaction of spending funds.
```

  {
    "code": "eosio.msig",
    "action": "approve",
    "args": {
      "proposer": "ianyjw312vbg",
      "proposal_name": "propcwh3",
      "level": {
        "actor": "w5bhllejse2f",
        "permission": "active"
      },
      "max_fee": 10000000
    }
  }

```

## Step 5: Account 2 approves transaction

This call approves the transaction of spending funds.
```

  {
    "code": "eosio.msig",
    "action": "approve",
    "args": {
      "proposer": "ianyjw312vbg",
      "proposal_name": "propcwh3",
      "level": {
        "actor": "rcwh3tqbqcpu",
        "permission": "active"
      },
      "max_fee": 10000000
    }
  }

```

## Step 6: Transaction is executed

This call executes the transaction of spending funds.
```

  {
    "code": "eosio.msig",
    "action": "exec",
    "args": {
      "proposer": "ianyjw312vbg",
      "proposal_name": "propcwh3",
      "executer": "ianyjw312vbg",
      "max_fee": 10000000
    }
  }

```

---
layout: page-int
title: Get transaction fee
description: Get transaction fee
---

# Retrieving Fee from Transaction Digest

The actual FIO fees paid for transactions (versus the [max_fee]({{site.baseurl}}/docs/general-functions/transactions#consideration-choosing-the-max_fee)) can be found in the [get_transaction]({{site.baseurl}}/docs/chain/node-history#get-transaction) digest. Within the transaction digest there will be multiple traces. 

First, search for the traces where the "receiver" is the account that executed the transaction. 

For example, if the account `u2u1kziq1ywd` executed a trnsfiopubky action there would be two receipts with:

**"receiver": "u2u1kziq1ywd"**

One will be the receipt for the `trnsfiopubky` action. In this case the fee paid can be found in `traces.receipt.response.fee_collected` field.

For example:

```
{
    "receipt": {
        "receiver": "u2u1kziq1ywd",
        "response": "{\"status\": \"OK\",\"fee_collected\":2171749877}",
        "act_digest": "da54ce7402dfa43b095221e98771f384a0ecf792866596b7edecd8786867c6ca",
        "global_sequence": 177008799,
        "recv_sequence": 20,
        "auth_sequence": [
            [
                "u2u1kziq1ywd",
                23
            ]
        ],
        "code_sequence": 10,
        "abi_sequence": 4
    },
    "receiver": "u2u1kziq1ywd",
    "act": {
        "account": "fio.token",
        "name": "trnsfiopubky",
        "authorization": [
            {
                "actor": "u2u1kziq1ywd",
                "permission": "active"
            }
        ],
        "data": {
            "payee_public_key": "FIO7LqQr15yw9XJFAXkFVfqMe8Ekskr18Z41jBXwMMUZh4RgkHT84",
            "amount": 100000000,
            "max_fee": 2500000000,
            "actor": "u2u1kziq1ywd",
            "tpid": ""
        },
        "hex_data": "3546494f374c7151723135797739584a4641586b465666714d6538456b736b7231385a34316a4258774d4d555a683452676b4854383400e1f5050000000000f902950000000090b80fd67d18b4d000"
    },
    "context_free": false,
    "elapsed": 3,
    "console": "",
    "trx_id": "aa447d93a778117da3d3904f86767949fa45d9c24adea023acdcbebe1a63626f",
    "block_num": 156317799,
    "block_time": "2022-09-16T12:18:04.500",
    "producer_block_id": "095138674753df53d3cfd224808c6fbe780063dc21da0937cbca6d5a0baf617b",
    "account_ram_deltas": [],
    "except": null,
    "error_code": null,
    "action_ordinal": 6,
    "creator_action_ordinal": 1,
    "closest_unnotified_ancestor_action_ordinal": 1
}
```

There will be a second receipt with `"receiver": "u2u1kziq1ywd"` for the payment of the fee to the fio.treasury account. In this case the fee paid can be found in `traces.act.data.quantity` field.

For example:

```
{
    "receipt": {
        "receiver": "u2u1kziq1ywd",
        "response": "",
        "act_digest": "ff517e500fc72009fa5ccabede3d06b24b0ac8e10fcbfade93799521793f98eb",
        "global_sequence": 177008802,
        "recv_sequence": 21,
        "auth_sequence": [
            [
                "eosio",
                165730914
            ]
        ],
        "code_sequence": 10,
        "abi_sequence": 4
    },
    "receiver": "u2u1kziq1ywd",
    "act": {
        "account": "fio.token",
        "name": "transfer",
        "authorization": [
            {
                "actor": "eosio",
                "permission": "active"
            }
        ],
        "data": {
            "from": "u2u1kziq1ywd",
            "to": "fio.treasury",
            "quantity": "2.171749877 FIO",
            "memo": "FIO fee: transfer_tokens_pub_key"
        },
        "hex_data": "90b80fd67d18b4d0e0afc646dd0ca85bf5457281000000000946494f000000002046494f206665653a207472616e736665725f746f6b656e735f7075625f6b6579"
    },
    "context_free": false,
    "elapsed": 3,
    "console": "",
    "trx_id": "aa447d93a778117da3d3904f86767949fa45d9c24adea023acdcbebe1a63626f",
    "block_num": 156317799,
    "block_time": "2022-09-16T12:18:04.500",
    "producer_block_id": "095138674753df53d3cfd224808c6fbe780063dc21da0937cbca6d5a0baf617b",
    "account_ram_deltas": [],
    "except": null,
    "error_code": null,
    "action_ordinal": 12,
    "creator_action_ordinal": 2,
    "closest_unnotified_ancestor_action_ordinal": 2
}
```

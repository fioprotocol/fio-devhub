---
layout: page-dev
title: Calculating RAM
description: Calculating RAM
---

# Calculating the RAM for new actions

FIO does not require users to purchase RAM. Instead, each FIO action increments RAM independently. Because of the [FIO modifications to RAM limits]({{ site.baseurl }}/docs/chain/resources#ram-limit) developers must determine the "RAM Bump" for each action.

In general:
* Only include a RAM bump for actions that increase memory allocation
* Actions that remove content from memory do NOT need a RAM bump

There are three use cases for allocating RAM:
* Determining RAM for a new action that accepts multiple, similar data fields
* Determining RAM for a new action with a fixed set of data fields
* Determining RAM for actions where the size is uncertain

---
## Determining RAM for a new action that accepts multiple, similar data fields

Examples: addaddress, addnft

**1) Add maximum sized content for all variables**

**2) Create a transaction for the new action using the max size content for parameters**
 
In this example `addnft` is called with maximum content in the parameters. The `addnft` action can be called with up to 3 NFTs in a single call. Because each NFT has the same set of parameters, we will use the RAM estimate when adding a single NFT and, in the contract code, bump different multiples of the RAM bump amount depenging on how many NFTs are added. This, if a user adds 3 NFTs in a single call, they would get allocated addnft RAM bump value x 3.


./clio -u http://localhost:8889 push action -j fio.address addnft '{"fio_address":"12345678901234567890123456789012345678901234567890123@1234567890","nfts":[{"chain_code":"ETH4567890","contract_address":"J1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567","token_id":"J234567890123456789012345678901234567890123456789012345678901234","url":"http://longurl.com/jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkl","hash":"16E4561A0B5352DB93C7B2705FEFC6A632994CC874ABF0F2D64F2DC72D820CB1","metadata":"J234567890123456789012345678901234567890123456789012345678901234"}],"max_fee":40000000000,"actor":"o2ouxipw2rt4","tpid":"12345678901234567890123456789012345678901234567890123@1234567890"}' -p o2ouxipw2rt4@active

<br>

**3) Note the account_ram_deltas > delta size in the transaction response**

In this example `"delta": 1367` is returned

```
{
  "transaction_id": "884a0a9be9fb2c986cfb6ec20a5eeaed2180b8652dc7c56ca22fbf61a9263f6c",
  "processed": {
    "id": "884a0a9be9fb2c986cfb6ec20a5eeaed2180b8652dc7c56ca22fbf61a9263f6c",
    "block_num": 25012,
    "block_time": "2021-09-30T21:41:26.500",
    "producer_block_id": null,
    "receipt": {
      "status": "executed",
      "cpu_usage_us": 4606,
      "net_usage_words": 81
    },
    "elapsed": 4606,
    "net_usage": 648,
    "scheduled": false,
    "action_traces": [{
        "receipt": {
          "receiver": "fio.address",
          "response": "{\"status\": \"OK\",\"fee_collected\":0}",
          "act_digest": "e847dce232d9a574c3fa3f72086a5e1f5555c7cf04b63ccd92ac2a402300a39b",
          "global_sequence": 25881,
          "recv_sequence": 98,
          "auth_sequence": [[
              "o2ouxipw2rt4",
              17
            ]
          ],
          "code_sequence": 2,
          "abi_sequence": 2
        },
        "receiver": "fio.address",
        "act": {
          "account": "fio.address",
          "name": "addnft",
          "authorization": [{
              "actor": "o2ouxipw2rt4",
              "permission": "active"
            }
          ],
          "data": {
            "fio_address": "12345678901234567890123456789012345678901234567890123@1234567890",
            "nfts": [{
                "chain_code": "ETH4567890",
                "contract_address": "J1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567",
                "token_id": "J234567890123456789012345678901234567890123456789012345678901234",
                "url": "http://longurl.com/jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkl",
                "hash": "16E4561A0B5352DB93C7B2705FEFC6A632994CC874ABF0F2D64F2DC72D820CB1",
                "metadata": "J234567890123456789012345678901234567890123456789012345678901234"
              }
            ],
            "max_fee": 40000000000,
            "actor": "o2ouxipw2rt4",
            "tpid": "12345678901234567890123456789012345678901234567890123@1234567890"
          },
          "hex_data": ...
        },
        "context_free": false,
        "elapsed": 3803,
        "console": "TRX SIZE604\n",
        "trx_id": "884a0a9be9fb2c986cfb6ec20a5eeaed2180b8652dc7c56ca22fbf61a9263f6c",
        "block_num": 25012,
        "block_time": "2021-09-30T21:41:26.500",
        "producer_block_id": null,
>       "account_ram_deltas": [{
>           "account": "o2ouxipw2rt4",
>           "delta": 1367
          }
        ],
```

**4) Multiply the amount by 1.5 to add a buffer**

```
1367 * 1.5 = 2050
```

**5) Round to the nearest value that is divisible by 512**

```
round(2050 / 512) = round(4.01) = 4

addnft RAM = 4 * 512 = 2048
```

So, **2048** would be the suggested RAM bump for each NFT added using addnft.

---
## Determining RAM for a new action with a fixed set of data fields

Examples: trnsfiopubky, newfundsreq

Determining RAM for a new action with a fixed set of data fields is similar to the above example except that the same RAM bump is always allocated regardless of what data is sent in. 

---
## Determining RAM for actions where the size is uncertain
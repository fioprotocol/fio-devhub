---
title: Calculating RAM
description: Calculating Ram
---

# Calculating the RAM for new actions

FIO does not require users to purchase RAM. Instead, each FIO action increments RAM independently. Because of the [FIO modifications to RAM limits]({{ site.baseurl }}/docs/chain/resources#ram-limit) developers must determine the "RAM Bump" for each action.

In general:
* Only include a RAM bump for actions that increase memory allocation
* Actions that remove content from memory do NOT need a RAM bump

---
## Determining RAM for a new action:

**1) Add maximum sized content for all variables**

**2) Create a transaction for the new action using the max size content for parameters**
 
In this example `addnft` is called with maximum content in the parameters:


./clio -u http://localhost:8889 push action -j fio.address addnft '{"fio_address":"adam@dapixdev","nfts":[{"chain_code":"ETH","contract_address":"0xb5cf0289855982a93525e6bab6b399d4f766af6","token_id":200,"url":"http://longurl.com/jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkl","hash":"16E4561A0B5352DB93C7B2705FEFC6A632994CC874ABF0F2D64F2DC72D820CB1","metadata":"jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkl"},{"chain_code":"ETH","contract_address":"0xb5cf0289855982a93525e6bab6b399d4f766af6","token_id":201,"url":"http://longurl.com/jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkl","hash":"16E4561A0B5352DB93C7B2705FEFC6A632994CC874ABF0F2D64F2DC72D820CB1","metadata":"jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjk"},{"chain_code":"ETH","contract_address":"0xb5cf0289855982a93525e6bab6b399d4f766af6","token_id":203,"url":"http://longurl.com/jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkl","hash":"16E4561A0B5352DB93C7B2705FEFC6A632994CC874ABF0F2D64F2DC72D820CB1","metadata":"jasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjkljasdfghjk"}],"max_fee":40000000000,"actor":"htjonrkf1lgs","tpid":"adam@16E4561A0B5352DB93C7B2705FEFC6A632994CC874ABF0F2D64F2DC72D8"}' -p htjonrkf1lgs@active

<br>

**3) Note the account_ram_deltas > delta size in the transaction response**

In this example `"delta": 3466` is returned

```
{
{
  "transaction_id": "824fccb03c121a08e747e88d2b7b7990d63c25f869c1d7f07848a7122a9ea43f",
  "processed": {
    "id": "824fccb03c121a08e747e88d2b7b7990d63c25f869c1d7f07848a7122a9ea43f",
    "block_num": 1118,
    "block_time": "2021-09-30T02:48:11.000",
    "producer_block_id": null,
    "receipt": {
      "status": "executed",
      "cpu_usage_us": 4485,
      "net_usage_words": 116
    },
    "elapsed": 4485,
    "net_usage": 928,
    "scheduled": false,
    "action_traces": [{
        "receipt": {
          "receiver": "fio.address",
          "response": "{\"status\": \"OK\",\"fee_collected\":0}",
          "act_digest": "5c3c967aacc9dedee1a35375a10ccf86a0b32281b853890d27c29d7e05c6b62e",
          "global_sequence": 3116,
          "recv_sequence": 345,
          "auth_sequence": [
            ...
          ],
          "code_sequence": 2,
          "abi_sequence": 2
        },
        "receiver": "fio.address",
        "act": {
         ...
        },
        "context_free": false,
        "elapsed": 4020,
        "console": "TRX SIZE883\n",
        "trx_id": "824fccb03c121a08e747e88d2b7b7990d63c25f869c1d7f07848a7122a9ea43f",
        "block_num": 1118,
        "block_time": "2021-09-30T02:48:11.000",
        "producer_block_id": null,
>       "account_ram_deltas": [{
>           "account": "htjonrkf1lgs",
>           "delta": 3466
          }
        ],
        ...
```

**4) Multiply the amount by 1.5 to add a buffer**

```
3466 * 1.5 = 5184
```

**5) Round to the nearest value that is divisble by 512 (1 byte)**

```
round(5184 / 512) = round(10.25) = 10

addnft RAM = 10 * 512 = 5120
```

So, **5120** would be the suggested RAM bump for addnft.

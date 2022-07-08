---
layout: page-int
title: Pre-compute transaction ID
description: Pre-compute transaction ID
---

# Pre-compute the transaction ID

To calculate the `transaction_id` for a FIO transaction prior to sending it to the blockchain, you perform a SHA-256 hash of the `packed_trx`.

For example, here is a typical transaction you might pass to `push_transaction`:

```shell
txn:  { signatures:
   [ 'SIG_K1_Km62xn9thv3LYQv356PJMj9bP5ZwHRWZ2CgGan75sbcMfeZ7gtLrD1yukDiLgmdPVLZV3tpH4FW4A96ZKs5U42uAsnuyDb' ],
  compression: 0,
  packed_context_free_data: '',
  packed_trx:
   '1958cb60285764a002ba0000000001003056372503a85b0000c6eaa6645232013059393021cea2d800000000a8ed32326812656274657374314066696f746573746e657402034243480342434818626974636f696e636173683a617364666173646661736466044441534804444153481764617368616464726573736173646661736466617364660046c323000000003059393021cea2d80000' }
```

If you plug the `packed_trx` hex into the Binary hash field of a calculator and check the SHA-256 result:

```
https://www.fileformat.info/tool/hash.htm?hex=1958cb60285764a002ba0000000001003056372503a85b0000c6eaa6645232013059393021cea2d800000000a8ed32326812656274657374314066696f746573746e657402034243480342434818626974636f696e636173683a617364666173646661736466044441534804444153481764617368616464726573736173646661736466617364660046c323000000003059393021cea2d80000
```

You will see the transaction ID that was returned by `push_transaction`:

```shell
{ transaction_id:
   'dd1b46351b45d1231693358f54b1c5442fb37aba02dd59b2d12759cac1936ab7',
  processed:
   { id:
      'dd1b46351b45d1231693358f54b1c5442fb37aba02dd59b2d12759cac1936ab7',
     block_num: 73422967,
     block_time: '2021-06-17T14:11:29.000',
     producer_block_id: null,
     receipt:
      { status: 'executed', cpu_usage_us: 7525, net_usage_words: 25 },
     elapsed: 7525,
     net_usage: 200,
     scheduled: false,
     action_traces: [ [Object] ],
     account_ram_delta: null,
     except: null,
     error_code: null } }
```

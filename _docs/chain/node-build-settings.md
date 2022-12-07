---
layout: page-fio
title: FIO Node Settings
description: FIO Node Settings
---

# FIO Node Settings

Recommendations and trouble shooting tips for FIO Node settings.

## Troubleshooting errors

#### Transaction exceeded the current CPU usage

**Problem**

When running an internal FIO API Node you sometimes receive the following `500` error when executing FIO transfers:

```
Transaction exceeded the current CPU usage limit imposed on the transaction: transaction was executing for too long
```

**Solution**

This may be caused by setting the node's `max-transaction-time` too high. The global maximum for a node is set to "max_transaction_cpu_usage": 150000 microseconds, which is 150 milliseconds. If `max-transaction-time` is greater than 150 it can cause timeout errors.

The recommended setting is:

```
max-transaction-time = 100
```

We also recommend confirming the following setting is set correctly:

```
max-scheduled-transaction-time-per-block-ms = 100
```

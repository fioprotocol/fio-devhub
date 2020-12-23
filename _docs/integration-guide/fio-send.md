---
title: Send to FIO Address
description: Send to FIO Address
---

# Send to FIO Address

The most basic level of integration with FIO Protocol is to enable sending of crypto currency using human-readable FIO Address instead of long cryptic native blockchain public addresses (NBPAs).

This level typically requires updates to the Send crypto currency screen to allow for a FIO Address to be entered in addition to NBPA. FIO Address can be easily identified by looking for a @ (at sign) in the string.

Once a FIO Address is entered, it can be resolved to NBPA on a specific blockchain using /get_pub_address API method.

Once the NBPA is obtained, the wallet Send transaction should execute as if the user entered or scanned the NBPA.

### Multi-level addressing

It is important to note, that the native blockchain public addresses returned by /get_pub_address can have additional parameters appended to it like this:

`NBPA_string?parameter_name=value`

For example: `rGVV5nh9UjJckufycb6WZAGUsZGFvPsTpX?dt=test.do.not.send.funds`

The parameters represent additional information required to execute a send, for example a destination tag for XRP. Therefore the string has to be parsed for uri-like parameters.

Please review [Multi-level Addressing]({{site.baseurl}}/docs/integration-guide/mapping#multi-level-addressing) section of the Integration Guide for more details.

---
layout: page-int
title: Send to FIO Crypto Handle
description: Send to FIO Crypto Handle
redirect_from:
    - /docs/integration-guide/fio-send
---

# Send to FIO Crypto Handle

The most basic level of integration with FIO Protocol is to enable sending of crypto currency using human-readable FIO Crypto Handle (aka FIO Address) instead of long cryptic native blockchain public addresses (NBPAs).

This level typically requires updates to the Send crypto currency screen to allow for a FIO Crypto Handle to be entered in addition to NBPA. FIO Crypto Handle can be easily identified by looking for a @ (at sign) in the string.

Once a FIO Crypto Handle is entered, it can be resolved to NBPA on a specific blockchain by passing the [FIO Crypto Handle]({{site.baseurl}}/docs/fio-protocol/fio-address) and a [chain and a token code](https://github.com/fioprotocol/fips/blob/master/fip-0015.md){:target="_blank"} into the [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) API method.
docs/fio-protocol/fio-address

Once the NBPA is obtained, the wallet Send transaction should execute as if the user entered or scanned the NBPA.
## UX/UI Considerations
FIO Send should be accessible from each cryptocurrency wallet page.  So, for example, if I want to send BTC, I should be able to go to the BTC wallet and do a FIO send.

Example:
![Image]({{ site.baseurl }}/assets/img/ux/send.png)

In the address field, users should be able to input both crypto address and FIO Crypto Handle, with some indication that both of these would work in the field.

Example:
![Image]({{ site.baseurl }}/assets/img/ux/sendto.png)

The confirmation page should showcase both crypto address and FIO Crypto Handle.
## Multi-level addressing

It is important to note, that the native blockchain public addresses returned by [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) can have additional parameters appended to it like this:

`NBPA_string?parameter_name=value`

For example: `rGVV5nh9UjJckufycb6WZAGUsZGFvPsTpX?dt=test.do.not.send.funds`

The parameters represent additional information required to execute a send, for example a destination tag for XRP. Therefore the string has to be parsed for uri-like parameters.

Please review [Multi-level Addressing]({{site.baseurl}}/docs/integration-guide/handle-mapping#multi-level-addressing) section of the Integration Guide for more details.

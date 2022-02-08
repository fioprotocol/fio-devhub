---
layout: page-fio
title: Validating your API Node
description: Validating your API Node
---

# Validating your API Node

First, query `get_info` against your node and confirm the `server_version_string` shows the correct version.

```shell
/usr/local/bin/clio -u http://localhost:8888 get info
```

Next, confirm some of the other [FIO API]({{site.baseurl}}/pages/api/fio-api/#tag--Getters) getter calls.

If you are running a V1 History node, confirm access to past transactions through `get_actions`:

```shell
curl --request POST \
     --url http://localhost:8888/v1/history/get_actions \
     --data '{"account_name": "o3vozszmxmto"}'
```

There is also an advanced FIO table browsing tool called Cryptonym that is useful for testing. You can [download Cryptonym](https://github.com/blockpane/cryptonym){:target="_blank"} from the Blockpane repository.


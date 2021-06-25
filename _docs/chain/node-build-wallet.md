---
title: Enabling fio-wallet
description: Enabling fio-wallet
---

# Enabling fio-wallet (optional, usually not used on a full node)

{% include alert.html type="info" title="Optional"  content="Enabling the fio-wallet is only necessary if you are using fio-wallet to manage your user's keys." %}

Most users won't need to run the fio-wallet wallet, which can set to run as a system-controlled daemon running under apparmor confinement, or as a dynamically launched daemon for each user when using the `clio wallet` commands.

To enable `fio-wallet` daemon at boot time, running under the `fio` account, and then start the daemon:

```shell
sudo systemctl enable fio-wallet
sudo systemctl start fio-wallet
```

When running under systemctl, the wallet files will be located in `/var/lib/fio/eosio-wallet/fio-wallet` (the location can be changed in `/var/lib/fio/fio-wallet/config.ini`, but when starting via systemd apparmor will confine the daemon, possibly causing problems with file permissions.)

Some users might rely on fio-wallet to store a large number of keys. Although this is not recommended, some specific settings might be necessary when launching a node: 

```shell
max-body-size=(2048x2048)
http-max-bytes-in-flight-mb=5000
```

When dynamically launched via clio commands the wallet will default to `$HOME/fio-wallet`

For more information refer to the [fio-wallet overview]({{site.baseurl}}/docs/chain/fio-wallet).


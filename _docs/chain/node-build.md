---
title: Building a node
description: Building a node
---
# Building a node

There are a number of paths to set up a FIO Node. This guide walks through several paths for different types of users. We encourage you to ask questions about block production, running an API node, and any other node-related questions in the [FIO Mainnet Telegram channel](https://t.me/fiomainnet){:target="_blank"} to get information.


## Manual Node installation

The following setup is for a manual FIO API Node installation directly in the OS. 

{% include alert.html type="info" content="The manual node installation requires a sync from genesis which can take several hours." %}

### Packages for Ubuntu 18.04

These are designed for quickly bringing up a node, and have systemd integration, logrotate, apparmor, compsec enabled, and have reasonable defaults in the config. They differ greatly from the packages Block One provides for EOSIO. 

* Official releases: <https://github.com/fioprotocol/fio/releases>{:target="_blank"} (not all releases have .deb files since they are primarily contract updates)

### Set up

The FIO GPG signing key is available on keybase:

```shell
curl -s 'https://keybase.io/fiosec/pgp_keys.asc?fingerprint=0cfee764b06d009f7574a253c0e61f8441b6aad4' | gpg --import

```

Releases can be pulled either from the [Github release page](https://github.com/fioprotocol/fio/releases) or the latest version is available at the following URLs:

```shell
curl -sO https://bin.fioprotocol.io/mainnet/fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb
curl -sO https://bin.fioprotocol.io/mainnet/fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb.asc
```

 Signature verification:

```shell
gpg --verify fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb.asc fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb

```

Should result in output similar to:

```shell
gpg: Signature made Thu 27 Aug 2020 08:22:06 PM UTC
gpg:                using RSA key 0CFEE764B06D009F7574A253C0E61F8441B6AAD4
gpg: Good signature from "FIO Security <security@fio.foundation>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0CFE E764 B06D 009F 7574  A253 C0E6 1F84 41B6 AAD4
```

### Install and configure

```shell
sudo apt install ./fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb
```

Edit the settings for nodeos

```shell
sudo vi /etc/fio/nodeos/config.ini
```

P2P nodes are updated more frequently than the .deb package, if there are a large number of P2P nodes that are unreachable, it's possible to get a list of healthy nodes from the [FIO Mainnet Health page.](https://health.fioprotocol.io/)

Enable nodeos daemon at runtime, and start:

```shell
sudo systemctl enable fio-nodeos
sudo systemctl start fio-nodeos
```

Sync status will show in the logs:

```shell
tail -f /var/log/fio/nodeos.log
```

#### V1 History 

If the light-history (v1 history) feature is needed, add the following lines:

```
plugin = eosio::history_plugin
plugin = eosio::history_api_plugin
filter-on = *
filter-out = eosio:onblock:
history-per-account = 9223372036854775807
history-index-state-db-size-mb = 1000000
history-state-db-size-mb = 4000000
```

{% include alert.html type="warning" content="Without the history-index-state-db-size-mb and history-state-db-size-mb settings nodes may stop with the warning: Database has reached an unsafe level of usage, shutting down to avoid corrupting the database. Please increase the value set for *chain-state-db-size-mb* and restart the process!" %}

{% include alert.html type="info" content="The `history-per-account` setting will truncate the number of actions stored for an account Given the number of potential internal-actions called in each trace, it may be desirable to decrease this number if the history indexes become too large. Otherwise, keeping it at the max is recommended." %}

## Validating your API Node

First, query `get_info` against your node and confirm the `server_version_string` shows the correct version.

Next, confirm some of the other [FIO API]({{site.baseurl}}/pages/api/fio-api/#tag--Getters) getter calls.

There is also an advanced FIO table browsing tool called Cryptonym that is useful for testing. You can [download Cryptonym](https://github.com/blockpane/cryptonym){:target="_blank"} from the Blockpane repository.


## Enabling fio-wallet (optional, usually not used on a full node)

Most users won't need to run the fio-wallet (keosd) wallet, which can set to run as a system-controlled daemon running under apparmor confinement, or as a dynamically launched daemon for each user when using the `clio wallet ...` commands.

To enable keosd daemon at boot time, running under the `fio` account, and then start the daemon:

```shell
sudo systemctl enable fio-keosd
sudo systemctl start fio-keosd
```

When running under systemctl, the wallet files will be located in `/var/lib/fio/eosio-wallet/fio-wallet` (the location can be changed in `/var/lib/fio/eosio-wallet/config.ini`, but when starting via systemd apparmor will confine the daemon, possibly causing problems with file permissions.)

When dynamically launched via clio commands the wallet will default to `$HOME/eosio-wallet`


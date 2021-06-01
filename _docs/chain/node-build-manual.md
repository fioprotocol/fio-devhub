---
title: Manual installation using pre-built packages
description: Manual installation using pre-built packages
---

# Manual installation using pre-built packages

The following setup is for a manual FIO API Node installation using pre-built packages.

#### Packages for Ubuntu 18.04

These are designed for quickly bringing up a node, and have systemd integration, logrotate, apparmor, compsec enabled, and have reasonable defaults in the config. 

* Official releases: <https://github.com/fioprotocol/fio/releases>{:target="_blank"} 

#### Download, validate, and install packages

The FIO GPG signing key is available on keybase:

```shell
curl -s 'https://keybase.io/fiosec/pgp_keys.asc?fingerprint=0cfee764b06d009f7574a253c0e61f8441b6aad4' | gpg --import

```

Releases can be pulled either from the [Github release page](https://github.com/fioprotocol/fio/releases){:target="_blank"}  or the latest version is available at the following URLs:

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

Install the release:

```shell
sudo apt install ./fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb
rm fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb
```

This will install the following files:

|Directory | File |
|---|---|
|/etc/apparmor.d/ |usr.local.bin.fio-nodeos  |
|/etc/apparmor.d/ |usr.local.bin.fio-wallet  |
|/etc/fio/nodeos/ |default-logging.json |
|/etc/fio/nodeos/ |genesis-mainnet.json |
|/etc/fio/nodeos/ |genesis-testnet.json |
|/etc/fio/nodeos/ |mainnet-config.ini |
|/etc/fio/nodeos/ |testnet-config.ini |
|/etc/logrotate.d/ |fio-nodeos |
|/etc/logrotate.d/ |fio-wallet |
|/lib/systemd/system/ | fio-nodeos.service|
|/lib/systemd/system/ | fio-wallet.service|
|/usr/local/bin/ |fio-nodeos |
|/usr/local/bin/ |fio-nodeos-run |
|/usr/local/bin/ |fio-wallet |
|/usr/local/share/fio/ |README |
|/var/lib/fio/fio-wallet/ |config.ini |
|/var/log/fio/ |nodeos.log |

#### Update keosd wallet environment 

*(Skip this step if you are not using keosd to manage FIO keys for your users.)*

{% include alert.html type="warning" title="keosd has been renamed to fio-wallet"  content="This step is required if you are using keosd to manage FIO keys. keosd has been renamed to fio-wallet for Release 3.0.0. If you are using fio-wallet (keosd) to manage keys, you must update your server and scripts to use the new `/fio-wallet` directory and `fio-wallet.sock` naming." %}

Rename the v2.0.0 wallet directory. The location of your eosio-wallet may be different depending on server configuration.

```shell
clio wallet stop
mv ~/eosio-wallet ~/fio-wallet
```

#### Replay from a snapshot, blocks.log, or V1 History archive (optional)

{% include alert.html type="info" content="This step is optional to save time when syncing a node. If it is skipped, the node will sync from genesis and can take several hours." %}

To save time on startup, you can bootstrap your node with a snapshot of data from a running node. Refer to [nodeos Replays]({{site.baseurl}}/docs/chain/node-build-replay) for instructions on replaying from a snapshot, blocks.log, or V1 History archive.

#### Configure nodeos settings

Edit the settings for nodeos:

```shell
sudo vi /etc/fio/nodeos/config.ini
```

P2P nodes are updated more frequently than the .deb package, if there are a large number of P2P nodes that are unreachable, it's possible to get a list of healthy nodes from the [FIO Mainnet Health page.](https://health.fioprotocol.io/){:target="_blank"} 

##### V1 History configuration (optional)

If the light-history (v1 history) feature is needed, follow the [V1 History configuration]({{site.baseurl}}/docs/chain/node-build-history) instructions.

#### Run nodeos

Enable nodeos daemon at runtime, and start:

```shell
sudo systemctl enable fio-nodeos
sudo systemctl start fio-nodeos
```

Sync status will show in the logs:

```shell
tail -f /var/log/fio/nodeos.log
```

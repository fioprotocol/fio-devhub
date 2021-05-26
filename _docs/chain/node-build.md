---
title: Building a node
description: Building a node
---
# Building a node

There are a number of paths to set up a FIO Node. This guide walks through several paths for different types of users. We encourage you to ask questions about block production, running an API node, and any other node-related questions in the [FIO Mainnet Telegram channel](https://t.me/fiomainnet){:target="_blank"} to get information.

This page contains the following content:

|Content  |Summary |
|---|---|
| [Building from source]({{site.baseurl}}/docs/chain/node-build#build-fio-from-source) | Describes how to compile and build a node from source. Building from source is only recommended for Producers and other advanced developers. |
| [Docker installation]({{site.baseurl}}/docs/chain/node-build#docker-installation) | This is the fastest method for installing a FIO API node. It leverages Docker to install FIO .deb files. |
| [Manual installation]({{site.baseurl}}/docs/chain/node-build#manual-installation-using-pre-built-packages) | This is the simplest method for installing a FIO API node. This install method does not require Docker and describes how to manually install and sync a FIO API node. |
| [Validating your node]({{site.baseurl}}/docs/chain/node-build#validating-your-api-node) |Information on validating your node once you have it up and running. |
| [Enabling fio-wallet]({{site.baseurl}}/docs/chain/node-build#enabling-fio-wallet-optional-usually-not-used-on-a-full-node) |Important information if you use the fio-wallet (keosd) to manage your user's keys. |

It also includes information on setting up a V1 History node and provides information on validating your API node installation. Lastly it provides details on the *optional* step of setting up a local fio-wallet for key management.

---
## Build FIO from Source

{% include alert.html type="warning" title="Building FIO is for Advanced Developers" content="If you are new to FIO, it is recommended that you install the FIO prebuilt binaries using the Docker or Manual installations described below instead of building from source." %}

#### Download FIO Source

To download the FIO source code, clone the fio repo and its submodules. It is advised to create a home fio folder first and download all the FIO related software there:

```shell
mkdir -p ~/fioprotocol && cd ~/fioprotocol
git clone --recursive https://github.com/fioprotocol/fio
```

**Update Submodules**

If a repository is cloned without the `--recursive` flag, the submodules must be updated before starting the build process:

```shell
cd ~/fioprotocol/fio
git submodule update --init --recursive
```

**Pull Changes**

When pulling changes, especially after switching branches, the submodules must also be updated. This can be achieved with the git submodule command as above, or using git pull directly:

```shell
[git checkout <branch>]  (optional)
git pull --recurse-submodules
```

#### Build FIO Binaries

The build script first installs all dependencies and then builds FIO. The script supports these Operating Systems. To run it, first change to the `~/fioprotocol/fio` folder, then launch the script:

```shell
cd ~/fioprotocol/fio/scripts
./fio_build.sh -P
```

The build process writes temporary content to the `fio/build` folder. After building, the program binaries can be found at `fio/build/programs`.

{% include alert.html type="danger" title="FIO build requires clang 8" content="FIO chain requires clang v8 as part of the LLVM requirements. FIO recommends using a '-P' pinned build to ensure the correct LLVM versions are used." %}

To confirm your clang version, first get the install directory for nodeos (e.g., `/usr/local/bin/nodeos`): 

```shell
ps -ef | grep nodeos
```

Next, insert your nodeos dir in the following command:

```shell
strings /usr/local/bin/nodeos |grep -i clang |head -10
```

#### Install FIO Binaries

For ease of contract development, content can be installed at the `~/fio` folder using the fio_install.sh script within the `fio/scripts` folder. Adequate permission is required to install on system folders:

```shell
cd ~/fioprotocol/fio/scripts
./fio_install.sh
```

{% include alert.html type="info" title="FIO Installation Recommended" content="After building FIO successfully, it is highly recommended to install the FIO binaries from their default build directory. This copies the FIO binaries to a central location, such as ~/fio/x.y/bin, where x.y is the FIO release version" %}

---
## Docker installation

*(Thanks to [blockpane](https://github.com/blockpane){:target="_blank"} for the original version of these scripts.)*

{% include alert.html type="warning" title="keosd wallet users"  content="If you use keosd to manage FIO keys, you should use the 'Manual Installation' below." %}

**Warning: These images always use the _latest_ published builds, which might include release-candidates, 
check the FIO [Github](https://github.com/fioprotocol/fio/releases){:target="_blank"} to see what this will be downloading**

These are simple docker-compose configs for bringing up a FIO node. There are two configs for each network
(mainnet and testnet). The `v1history` will start a light-history node, it's highly recommended to use this
image if not using a state-history or hyperion node, the extra overhead is minimal (this is not the EOSIO
v1 history plugin, it is the Greymass light history implementation, only requiring about 200mb with an 8gb
blocks.log.)

These images pull a **full archive** of the blocks, and a snapshot if using the standard node. The history image
pulls a complete archive, including the state database, history files, and blocks. This download takes a long
time, expect 30 minutes or more, but is much faster than waiting for a node to sync from genesis (a day or more).

{% include alert.html type="info" content="The API is exposed on 8888, and P2P is on 3856 for all images. Edit the docker-compose if your needs differ." %}

#### Data:

Each container will store the chain data in a volume, allowing for easy upgrades without data loss.

#### Usage:

Install docker (ubuntu)

```
sudo apt-get install -y docker.io python3 python3-pip git
sudo pip3 install docker-compose
sudo usermod -a -G docker $(whoami)
newgrp
```

Clone the fio-docker repository:

```
git clone https://github.com/fioprotocol/fio-docker.git
```

Start a node:

```
cd fio-docker/testnet-v1history
docker-compose up -d
```

Upgrade an existing node:

```
docker-compose --no-cache build
docker-compose up -d
```

Destroy a node:

```
docker-compose down -v
```

---
## Manual installation using pre-built packages

The following setup is for a manual FIO API Node installation using pre-built packages.

#### Packages for Ubuntu 18.04

These are designed for quickly bringing up a node, and have systemd integration, logrotate, apparmor, compsec enabled, and have reasonable defaults in the config. 

* Official releases: <https://github.com/fioprotocol/fio/releases>{:target="_blank"} 

#### Download, validate, and install packages

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

Install the release:

```shell
sudo apt install ./fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb
rm fioprotocol-3.0.x-latest-ubuntu-18.04-amd64.deb
```

#### Update keosd wallet environment 

*(Skip this step if you are not using keosd to manage FIO keys for your users.)*

{% include alert.html type="warning" title="keosd has been renamed to fio-wallet"  content="This step is required if you are using keosd to manage FIO keys. keosd has been renamed to fio-wallet for Release 3.0.0. If you are using fio-wallet (keosd) to manage keys, you must update your server and scripts to use the new `/fio-wallet` directory and `fio-wallet.sock` naming." %}

Rename the v2.0.0 wallet directory. The location of your eosio-wallet may be different depending on server configuration.

```shell
clio wallet stop
mv ~/eosio-wallet ~/fio-wallet
```

Rename the fio.wallet:

```shell
mv ~/fio-wallet/fio.wallet ~/fio-wallet/fio.wallet
```

#### Download latest history archive

{% include alert.html type="info" content="This step is optional to save time when syncing a V1 history node. If it is skipped, the archive will sync from genesis and can take several hours." %}

Remove old history files. The location of the history files may be different depending on server configuration.

```shell
cd /var/lib
rm -fr fio/data fio/history fio/history_index
```

Download and install latest history archive:

```shell
apt install pixz
wget https://snap.blockpane.com/mainnet-latest-history.txz
tar -xS -I'pixz' -C /var/lib/fio -f mainnet-latest-history.txz
rm -f mainnet-latest-history.txz
chown -R fio:fio fio
```

#### Configure nodeos settings

Edit the settings for nodeos:

```shell
sudo vi /etc/fio/nodeos/config.ini
```

P2P nodes are updated more frequently than the .deb package, if there are a large number of P2P nodes that are unreachable, it's possible to get a list of healthy nodes from the [FIO Mainnet Health page.](https://health.fioprotocol.io/)

##### V1 History configuration

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

{% include alert.html type="info" content="The `history-per-account` setting will truncate the number of actions stored for an account. Given the number of potential internal-actions called in each trace, it may be desirable to decrease this number if the history indexes become too large. Otherwise, keeping it at the max is recommended." %}

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

---
## Validating your API Node

First, query `get_info` against your node and confirm the `server_version_string` shows the correct version.

Next, confirm some of the other [FIO API]({{site.baseurl}}/pages/api/fio-api/#tag--Getters) getter calls.

There is also an advanced FIO table browsing tool called Cryptonym that is useful for testing. You can [download Cryptonym](https://github.com/blockpane/cryptonym){:target="_blank"} from the Blockpane repository.

---
## Enabling fio-wallet (optional, usually not used on a full node)

Most users won't need to run the fio-wallet wallet, which can set to run as a system-controlled daemon running under apparmor confinement, or as a dynamically launched daemon for each user when using the `clio wallet ...` commands.

To enable keosd daemon at boot time, running under the `fio` account, and then start the daemon:

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


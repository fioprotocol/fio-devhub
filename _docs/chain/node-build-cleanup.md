---
layout: page-fio
title: Install Cleanup
description: Remove a FIO installation and cleanup leftover FIO install artifacts
---
# Uninstall FIO package

The following instructions will remove FIO artifacts installed during a Manual install. For a listing of those files, see [FIO Manual Node Build]({{site.baseurl}}/docs/chain/node-build-manual#Install the release).

## APT Remove

To remove a package installed with dpkg, apt, or apt-get, execute the corresponding command, e.g. `dpkg --remove <package>`. In the following instructions `apt` will be used, however, note that whichever command is used, it only partially cleans up an install and additional steps must be taken.

`apt remove` should remove everything except configuration and data. Configuration would include users, groups, ini and json files, and data would include state, history, etc.

```sh
sudo apt remove fioprotocol
```

`apt purge` should remove everything including configuration, and data!

```sh
sudo apt purge fioprotocol
```

## FIO Installation artifact cleanup
However, currently both remove and purge do not do exactly what is implied. Note: purge appears to remove /var/log/fio/nodeos.log but does not remove any log backups (rotated logs).

Directories/files/configuration that should be removed when using `apt remove` include:
* /etc/fio/genesis.json
* /usr/local/bin/cleos
* /usr/local/bin/fio-cleos
* /usr/local/bin/nodeos

In addition to the items above, directories/files/configuration that should be removed when using `apt purge` include:
* /var/lib/fio
* /var/log/fio
* fio-nodeos service
* fio-wallet service
* fio user
* fio group

To fully cleanup an installation, execute the following commands:
{% include alert.html type="warning" title="Destructive" content="Use of 'sudo' and 'rm' is for Advanced users! Use the following commands with care!" %}

```sh
sudo apt remove fioprotocol

sudo rm -rf /etc/fio
sudo rm -f /usr/local/bin/cleos
sudo rm -f /usr/local/bin/fio-cleos
sudo rm -f /usr/local/bin/nodeos

sudo rm -rf /var/lib/fio
sudo rm -rf /var/log/fio

sudo systemctl stop fio-nodeos
sudo systemctl disable fio-nodeos

sudo systemctl -q stop fio-wallet
sudo systemctl -q disable fio-wallet

sudo /usr/sbin/deluser --system --remove-home --group fio fio
```

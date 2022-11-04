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
#!/usr/bin/env bash

# Stop and disable fio-nodeo application
sudo systemctl stop fio-nodeos
sleep 5
sudo systemctl disable fio-nodeos
sleep 1

# Stop and disable fio-wallet application
sudo systemctl -q stop fio-wallet
sleep 5
sudo systemctl -q disable fio-wallet
sleep 1

# Remove installed package
sudo apt remove fioprotocol

# Remove leftover artifacts from fio package install
sudo rm -f /usr/local/bin/cleos
sudo rm -f /usr/local/bin/fio-cleos
sudo rm -f /usr/local/bin/clio
sudo rm -f /usr/local/bin/nodeos
sudo rm -f /usr/local/bin/fio-nodeos
sudo rm -f /usr/local/bin/fio-wallet

# ********************************** WARNING ***********************************
# The following commands remove runtime data that is critical for node execution
# Only proceed if cleanup of an outdated install is desired
# ******************************************************************************
# Remove configuration, blocks log, history, state
sudo rm -ir /etc/fio
sudo rm -ir /var/lib/fio
sudo rm -ir /var/log/fio

# Remove the fio user
# This step is useful if not re-installing/upgrading the fio package
#sudo /usr/sbin/deluser --system --remove-home --group fio fio


```

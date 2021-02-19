---
title: Building a node
description: Building a node
---
# Building a node
## Packages for ubuntu 18.04

These are designed for quickly bringing up a node, and have systemd integration, logrotate, apparmor, compsec enabled, and have reasonable defaults in the config. They differ greatly from the packages Block One provides for eosio, so at least one of the block producers are maintaining another set of packages that more closely match what block one provides. Inquire in the FIO Mainnet channel to get information.

* Official releases: <https://github.com/fioprotocol/fio/releases>{:target="_blank"} (not all releases have .deb files since they are primarily contract updates)
* Quick setup example: <https://github.com/fioprotocol/fio.package/tree/master/deb#distribution>{:target="_blank"}

## CryptoLions from-source build instructions

(note: their .deb files are out of date)

* <https://github.com/fioprotocol/fio.start#12-fio—installing-from-sources>{:target="_blank"}
* Until the greymass history patch is merged into the mainstream release, a seperate branch is available
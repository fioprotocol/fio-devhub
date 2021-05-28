---
title: FIO Docker installation
description: FIO Docker installation
---

# FIO Docker installation

*(Thanks to [blockpane](https://github.com/blockpane){:target="_blank"} for the original version of these scripts.)*

{% include alert.html type="warning" title="keosd wallet users"  content="If you use keosd to manage FIO keys, you should use 'Manual Installation' to set up your node." %}

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

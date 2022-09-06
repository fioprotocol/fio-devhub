---
layout: page-fio
title: FIO Docker installation
description: FIO Docker installation
---

# FIO Docker installation

*(Thanks to [blockpane](https://github.com/blockpane){:target="_blank"} for the original version of these scripts.)*

{% include alert.html type="warning" title="fio-wallet users"  content="If you use fio-wallet (keosd) to manage FIO keys, you should use 'Manual Installation' to set up your node." %}

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

### Data:

Each container will store the chain data in a volume, allowing for easy upgrades without data loss.

### Usage:

##### Install docker (ubuntu)

```shell
echo "Remove any old docker packages..."
sudo apt-get -y remove docker docker-engine docker.io containerd runc
echo
echo "Update apt package index..."
sudo apt-get update
echo
echo "Updating ubuntu repos..."
sudo apt-get -y install ca-certificates curl gnupg lsb-release
echo
echo "Add Docker’s official GPG key..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo
echo "Set up the Docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg]\
 https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"\
 | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
echo
echo "Install docker and jq..."
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -a -G docker $(whoami)
newgrp -
```

##### Clone the fio-docker repository:

```
git clone https://github.com/fioprotocol/fio.docker.git
```

##### Start a node:

```
cd fio-docker/testnet-v1history
docker-compose up -d
```

This will perform the following actions:

1. Download and install the latest FIO packaged deb file (e.g., https://bin.fioprotocol.io/mainnet/fioprotocol-3.4.x-latest-ubuntu-18.04-amd64.deb)
2. Fetch the latest blocks.log archive (this can take 30+ minutes)
3. Start nodeos on port 8888 (if you use the default port)


**Confirm your node is running:**

```shell
curl --url http://localhost:8888/v1/chain/get_info
```

**Sync status will show in the Docker logs:**

```shell
cd fio-docker/testnet-v1history
docker-compose logs -f --tail 20
```

**List your running Docker containers:**

```shell
docker ps

CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                                                                                  NAMES
4756dc0abf5e   testnet_nodeos   "/usr/local/bin/fio-…"   22 minutes ago   Up 22 minutes   0.0.0.0:3856->3856/tcp, :::3856->3856/tcp, 0.0.0.0:8888->8888/tcp, :::8888->8888/tcp   testnet_nodeos_1
```

**Access Docker container to run commands:**

```
docker exec -it testnet_nodeos_1 /bin/bash
```

##### Upgrade an existing node:

```
docker-compose --no-cache build
docker-compose up -d
```

##### Destroy a node:

```
docker-compose down -v
```

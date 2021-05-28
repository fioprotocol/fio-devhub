---
title: nodeos Replays
description: nodeos Replays
---

# nodeos Replays

Nodeos provides various options for replaying blockchain blocks. This can be useful if, for example, a node has downloaded a blocks.log file from the internet (as a faster alternative to synchronizing from the p2p network) and the node wants to use it to quickly catch up with the network, or if you want to know the chain state at specified points in a blockchain's life.

Replaying data can be done in two ways:
* Replay from a snapshot and `blocks.log` file - 
* Replay for a V1 History node

### How to Replay from a snapshot and `blocks.log` file

Snapshot files can be created from a running `nodeos` instance. The snapshot contains the chain state for the block referenced when created. It is recommended to use snapshot files created from blocks that are irreversible. Using a snapshot file to replay allows you to quickly start a `nodeos` instance which has a full and correct chain state at a specified block number.

If you want a full history of transactions up to that block number, you will also need to install the `blocks.log` file that contains all irreversible transactions on the blockchain. All instances of `nodeos` write irreversible blocks to the `blocks.log` file, which is located at the `data/blocks` directory relative to the `nodeos` directory. Using a `blocks.log` file to replay will allow you to start a `nodeos` instance, which recreates the entire history of the blockchain locally, without adding unnecessary load to the network.

When replaying from a snapshot and a `blocks.log` file, the `blocks.log` file must at least contain blocks up to the snapshotted block and may contain additional blocks that will be applied as part of startup. If a `blocks.log` file is included, but does not contain blocks up to and/or after the snapshotted block then replaying from a snapshot will create an exception. 

1) Remove the existing contents of the data, history, and history_index directories. Make sure you back up any existing contents if you wish to keep them.

```shell
cd /var/lib
sudo rm -fr fio/data fio/history fio/history_index
```

2) Otain a copy of the snapshot and `blocks.log` files which you wish to replay the blockchain from. Several BPs maintain FIO snapshots for both Testnet and Mainnet. It is important that you trust the source of the snapshot before downloading. We will use the [Blockpain history archive](https://snap.blockpane.com/index.html){:target="_blank"} in our examples.

```shell
wget https://snap.blockpane.com/mainnet-latest-blocks.txz
```

3) Extract the snapshot to your `data/snapshots` directory, your `blocks.log` file to your `data/blocks` directory, and update the permissions on `fio` directory:

```shell
sudo tar -xS -C /var/lib/fio -f mainnet-latest-blocks.txz
rm -f mainnet-latest-blocks.txz
cd /var/lib
sudo chown -R fio:fio fio
```

4) Confirm the correct `blocks-dir` directory in the `config.ini` file:

```shell
blocks-dir = "blocks"
```

5) Enable nodeos daemon at runtime, and start from snapshot:

```shell
sudo systemctl enable fio-nodeos
sudo systemctl start fio-nodeos
```

Sync status will show in the logs:

```shell
tail -f /var/log/fio/nodeos.log
```

### How to Replay from a Snapshot

It is not possible to rebuild state from a snapshot for a V1 History node. But, you can bootstrap a history node by downloading a complete tar file of a node. 
---
layout: page-fio
title: Summary Script
description: Script to run manually to perform a manual installation
---

The following script encapsulates the workflow and commands from [FIO Manual Node Build]({{site.baseurl}}/docs/chain/node-build-manual) and [FIO Nodeos Replay]({{site.baseurl}}/docs/chain/node-build-replay). It is offered as a means to quickly build and run a node. As such details on how to connect, and register as a FIO BlockChain node are not provided. In addition assumptions have been made as to the local environment as well as FIO package  URLs, package versioning and authenticity, etc., which may have to be verified and/or updated for the following script to function properly. Please refer to the aforementioned pages for detailed information.

```shell
#!/usr/bin/env bash

# Utility functions
function pause(){
 read -s -n 1 -p "Press any key to continue..."
 echo ""
}

# Main script functionality
echo
echo FIO Package Install...
echo
echo "Before proceeding it is recommended to clean up any previous installs. Go to"
echo "[Installation Removal]({{site.baseurl}}/docs/chain/node-build-cleanup) for details."
echo
pause

type=""
echo
read -N 1 -p "Is this an install of TestNet (y/N)? " answer
if [ "${answer,,}" == "y" ]
then
  type="testnet"
else
  echo
  echo
  read -N 1 -p "Is this an install of MainNet (y/N)? " answer
  if [ "${answer,,}" == "y" ]
  then
    type="mainnet"
  fi
fi
if [[ -z "${type}" ]]; then
  echo
  echo
  echo "Neither install type of TestNet nor MainNet was selected! Aborting install..."
  echo
  exit 1
fi
echo
echo
read -N 1 -p "You have chosen a '${type}' install. Correct (y/N)? " answer
if [ "${answer,,}" != "y" ]
then
  echo
  echo
  echo Aborting install!
  echo
  exit 1
fi

# FIO package download examples
# https://bin.fioprotocol.io/testnet/fioprotocol-3.3.x-latest-ubuntu-18.04-amd64.deb
# https://bin.fioprotocol.io/mainnet/fioprotocol-3.3.x-latest-ubuntu-18.04-amd64.deb
# https://github.com/fioprotocol/fio/releases/download/v3.3.0/fioprotocol-3.3.0-ubuntu-18.04-amd64.deb

# Release
#release=3.4.0-rc1 # FIO release package name
#release=3.4.x-latest # S3 release package name
#release=3.4.0 # fio.releases release package name
release=""
echo
echo "The release package version is required and must match a release package located at"
echo " - https://github.com/fioprotocol/fio/releases"
echo "Examples include:"
echo " - 3.4.0-rc1"
echo " - 3.4.0"
echo
read -p "Enter the release package version " answer
if [ "${answer,,}" != "" ]
then
  release="${answer}"
  echo
  read -N 1 -p "You input '${release}'. Correct (y/N)? " answer
  if [ "${answer,,}" != "y" ]
  then
    echo
    echo
    echo Aborting install!
    echo
    exit 1
  fi
else
  echo
  echo
  echo "No release package name entered, Aborting install!"
  echo
  exit 1
fi

# Package download options
# S3 Bucket
#host="https://bin.fioprotocol.io"
#path="${type}"

# FIO GitHub Releases Page
host="https://github.com/fioprotocol/fio"
path="releases/download/v${release}"

# Package filename
filename="fioprotocol-${release}-ubuntu-18.04-amd64.deb"

# FIO package URL
url="${host}/${path}/${filename}"

echo
echo
echo "Install package will be downloaded from the FIO Releases repository located at ${host}"
pause

# Clean any previous downloads
rm -f $filename

# Check that file is at uri/filename
status=$( curl -L -o /dev/null --silent -Iw '%{http_code}' "${url}" )
if [[ ${status} -ne 200 ]]; then
  echo
  echo "File, ${filename}, was not found at URL ${url}!"
  echo Exiting...
  echo
  exit 1
else
  echo "Downloading FIO installation package..."
  curl -L -sO "${url}"
fi

echo
read -N 1 -p "Install package (y/N)? " answer
if [ "${answer,,}" == "y" ]
then
  echo
  echo "Installing FIO package..."
  sudo apt install ./${filename}
fi

echo
if [[ "testnet" == "${type}" ]]; then
  echo
  echo "Updating fio-nodeos configuration for TestNet"
  sudo cp /etc/fio/nodeos/testnet-config.ini /etc/fio/nodeos/config.ini
  sudo rm /etc/fio/nodeos/genesis.json
  sudo ln -s /etc/fio/nodeos/genesis-testnet.json /etc/fio/nodeos/genesis.json
  echo
  echo "Note: Before starting fio-nodeos, verify that the nodeos configuration is"
  echo "appropriate for a ${type} install. Parameters may still be set for MainNet"
  echo "or may not be set at all, e.g. producer-name."
  echo "See /etc/fio/nodeos/config.ini, /etc/fio/nodeos/genesis.json"
fi

echo
echo "Momentarily you will be asked to install snapshot, blocks or history. Things to note are:"
echo "  Doing so will remove any existing state, history, etc."
echo "  It is not recommended to do both"

# Install blocks and snapshot
backup_installed=false
echo
echo Installation of the lastest FIO snapshot will:
echo "  Remove any existing history, snapshots, state and blocks located in '/var/lib/fio'"
echo "  Download the latest snapshot archive from blockpane and install it into 'var/lib/fio"
echo "  Update ownership to be accessible by the fio-nodeos process"
echo "  Remove the downloaded snapshot."
echo
read -N 1 -p "Install snapshot (y/N)? " answer
if [ "${answer,,}" == "y" ]
then
  echo
  echo "Downloading FIO snapshot backup..."
  wget https://snap.blockpane.com/${type}-latest-snap.txz
  echo "Cleaning target directory '/var/lib/fio'..."
  sudo rm -rf /var/lib/fio/data /var/lib/fio/history /var/lib/fio/history_index
  echo "Exracting archives to target directory..."
  sudo tar -xS -I'pixz' -C /var/lib/fio -f ${type}-latest-snap.txz
  sudo mkdir -p /var/lib/fio/history /var/lib/fio/history_index
  sudo chown -R fio:fio /var/lib/fio

  rm -i ${type}-latest-snap.txz
  rm -i ${type}-latest-blocks.txz

  backup_installed=true
else
  echo
  echo Installation of the lastest FIO snapshot and blocks log will:
  echo "  Remove current history, snapshots, state and blocks located in '/var/lib/fio'"
  echo "  Download the latest snapshot and blocks log archives from blockpane and install it into 'var/lib/fio"
  echo "  Update ownership to be accessible by the fio-nodeos process"
  echo "  Remove the downloaded snapshot and blocks archives."
  echo
  read -N 1 -p "Install snapshot/blocks (y/N)? " answer
  if [ "${answer,,}" == "y" ]
  then
    echo
    echo "Downloading FIO snapshot and blocks backups..."
    wget https://snap.blockpane.com/${type}-latest-snap.txz
    wget https://snap.blockpane.com/${type}-latest-blocks.txz
    echo "Cleaning target directory '/var/lib/fio'..."
    sudo rm -rf /var/lib/fio/data /var/lib/fio/history /var/lib/fio/history_index
    echo "Exracting archives to target directory..."
    sudo tar -xS -I'pixz' -C /var/lib/fio -f ${type}-latest-snap.txz
    sudo tar -xS -I'pixz' -C /var/lib/fio -f ${type}-latest-blocks.txz
    sudo mkdir -p /var/lib/fio/history /var/lib/fio/history_index
    sudo chown -R fio:fio /var/lib/fio

    rm -i ${type}-latest-snap.txz
    rm -i ${type}-latest-blocks.txz

    backup_installed=true
  else
    # v1 History
    echo
    echo Installation of the latest v1 history will:
    echo "  Remove current history, snapshots, state and blocks located in '/var/lib/fio'"
    echo "  Download the latest history archive from blockpane and install it into 'var/lib/fio"
    echo "  Update ownership to be accessible by the fio-nodeos process"
    echo "  Remove the downloaded history archive."
    echo
    read -N 1 -p "Install v1 history (y/N)? " answer
    echo
    if [ "${answer,,}" == "y" ]
    then
      echo
      echo "Downloading FIO history backup..."
      wget https://snap.blockpane.com/${type}-latest-history.txz
      echo "Cleaning target directory '/var/lib/fio'..."
      sudo rm -rf /var/lib/fio/data /var/lib/fio/history /var/lib/fio/history_index
      echo "Exracting archive to target directory..."
      sudo tar -xS -I'pixz' -C /var/lib/fio -f ${type}-latest-history.txz
      sudo chown -R fio:fio /var/lib/fio

      rm -i ${type}-latest-history.txz

      backup_installed=true
    fi
  fi
fi

if $backup_installed; then
  # Add/Uncomment the following configuration in the nodeos config.ini for history processing
  echo
  echo "Blocks, Snapshots and/or history were installed. Add/uncomment the following configuration"
  echo "in the fio-nodeos config.ini located in /etc/fio/nodeos"
  echo
  echo chain-state-db-size-mb = 8192
  echo reversible-blocks-db-size-mb = 1024
  echo
  echo plugin = eosio::history_plugin
  echo plugin = eosio::history_api_plugin
  echo filter-on = *
  echo filter-out = eosio:onblock:
  echo history-per-account = 9223372036854775807
  echo history-index-state-db-size-mb = 1000000
  echo history-state-db-size-mb = 4000000
  echo
  read -N 1 -p "Edit the nodeos config.ini (y/N)? " answer
  if [ "${answer,,}" == "y" ]
  then
    sudo vi /etc/fio/nodeos/config.ini
  fi
fi

echo
pause

# Start fio-nodeos
echo
read -N 1 -p "Start service 'fio-nodeos' (y/N)? " answer
if [ "${answer,,}" == "y" ]
then
  sudo systemctl enable fio-nodeos
  sudo systemctl start fio-nodeos
fi

echo
echo
echo "fio-wallet: The following step will start the fio-wallet service. Things to note are:"
echo "  This service is not required to run fio-nodeos."
echo "  This service is not needed unless background management of keys is required."
echo "    If so, please note that this service is NOT an enterprise application and no"
echo "    gaurantee is stated or implied!"
echo "  The fio-wallet service may be started anytime or run on demand when necessary"
echo "    either stand-alone or via the clio command."
echo
read -N 1 -p "Start service 'fio-wallet' (y/N)? " answer
if [ "${answer,,}" == "y" ]
then
  sudo systemctl enable fio-wallet
  sudo systemctl start fio-wallet
fi
echo
echo "Review '/var/log/fio/nodeos' for relevant blockchain logging."
echo
echo "FIO installation complete."
echo


```
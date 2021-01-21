---
title: New FIO Contracts
description: Information about adding new FIO contracts to the development environment
---

# Adding new contracts to FIO Protocol Dev Environment

It is recommend to branch from develop on all repositories when developing to stay on pace with code updates

## 1 - Set_code and set_abi permissions:

The contract name must be added to the authorization lists for set_abi and set_code actions.
FIO Contracts - https://github.com/fioprotocol/fio.contracts

### Create new contract account entry
https://github.com/fioprotocol/fio.contracts/blob/develop/contracts/fio.common/fio.accounts.hpp#L40
 
### Insert account authorization
Authorization: https://github.com/fioprotocol/fio.contracts/blob/develop/contracts/fio.system/src/fio.system.cpp#L177


### 2 - Set_code authorizations are defined in the fio core library

FIO Core library - https://github.com/fioprotocol/fio/libraries/chain

### Add your contract name here:

https://github.com/fioprotocol/fio/blob/develop/libraries/chain/include/eosio/chain/eosio_contract.hpp#L40

### Add the contract name as an authorizer 

https://github.com/fioprotocol/fio/blob/develop/libraries/chain/eosio_contract.cpp#L246

## 3 - Update fio.devtools

FIO Devtools launcher - https://github.com/fioprotocol/fio.devtools

### Add a new account for the contract

https://github.com/fioprotocol/fio.devtools/blob/master/scripts/launch/04_create_accounts.sh#L13
You can use the same public keys that are already loaded for testing. A new private key can be used ass well, just import here:
https://github.com/fioprotocol/fio.devtools/blob/develop/scripts/launch/02_import_keys.sh

### System Contracts
If you need a contract loaded at chain genesis, add as the final step of script 05_bind_contracts.sh
https://github.com/fioprotocol/fio.devtools/blob/develop/scripts/launch/05_bind_contracts.sh#L17

### New feature contracts

Deploy the contract on 19_bind_dev_contracts.sh. It should be the final contract loaded in the list and by the launcher:
https://github.com/fioprotocol/fio.devtools/blob/develop/scripts/launch/19_bind_dev_contracts.sh#L17


## 4 - Action list 

### System Contracts
If the new contract is a system contract and is loaded in 05_bind_contracts.sh of fio.devtools and needs to be initialized at genesis, the call to add the contract action will need to be added to the chain controller:
https://github.com/fioprotocol/fio/blob/develop/libraries/chain/controller.cpp#L1345

### New feature contracts
Simply call addaction for the new contract action (can be called before or after contract has been loaded.)
https://github.com/fioprotocol/fio.devtools/blob/develop/scripts/launch/12_add_actions.sh#L54

## 5 - Wrapping up

Rebuild the FIO blockchain with scripts/fio_build.sh, and install with fio_install.sh

Run fio.devtools options 3 to clear existing configuring, option 2 to build the contract changes, and then finally option 1 to initialize the new chain with the changes supporting the new contract


### Notes:
On the FIO Testnet and Mainnet, the contract owner will always be an multisig account controlled by all active block producers. On the development and test environments, these accounts are simply loaded into the local wallet in fio.devtools.



---
layout: page-dev
title: New FIO Contracts
description: Information about adding new FIO contracts to the development environment
redirect_from:
    - /docs/developers/contract

---

# Adding new contracts to the FIO Protocol Dev Environment
This page identifies the files that should be modified in order to properly add a new smart contract into the FIO protocol. Files are identified as well as the changes that must be completed to properly add your contract into a FIO development environment.

**Note:** When developing or making changes, be sure to branch from develop on all repositories to stay on pace with code updates.
 
## Add Your Contracts Account Name and Contract Name to System Contracts

The first step is to add your contracts account name and contract name to the FIO system contracts. To do this you must edit the fio.common.hpp file and add these two pieces of information. The following is an example of the information added to this file for the staking contract development.

```
static const name StakingContract =   name("fio.staking");

static const name STAKINGACCOUNT =   name("fio.staking”);

```


For your contract, follow this template:

```

static const name YourContractNameContract =   name(“YourContractAccountname”);

static const name YourContractNameACCOUNT =   name(“YourContractContractname”);

```
##  Update System Contracts Authorization Checks

Next, add your new account name to the system contracts authorization checks. Edit the Native.hpp file, and add your account name to the list of FIO system accounts within the updateauth action. 


Add your account to the relevant if statemetn.  An example follows: 

```
if(!(account == fioio::MSIGACCOUNT ||

     account == fioio::WRAPACCOUNT ||

     account == fioio::SYSTEMACCOUNT ||

     account == fioio::ASSERTACCOUNT ||

     account == fioio::REQOBTACCOUNT ||

     account == fioio::FeeContract ||

     account == fioio::AddressContract ||

     account == fioio::TPIDContract ||

     account == fioio::TokenContract ||

     account == fioio::TREASURYACCOUNT ||

     account == fioio::FIOSYSTEMACCOUNT ||

     account == fioio::STAKINGACCOUNT ||

     account == fioio::FIOACCOUNT )

    ) {

```

## Ensure that the New Contract gets Loaded at Chain Startup

Next modify the fio.devtools repository so that your new contract gets loaded at chain startup.

Modify the 04_create_account.sh file. Add the creation of your new system account. 

```
./clio -u http://localhost:8879 create account eosio fio.staking FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS
```
## Bind Your New Contract

Modify the 19_bind_dev_contracts.sh to bind your new contract. 

```
./clio -u http://localhost:8879 set contract fio.staking $fio_staking_name_path fio.staking.wasm fio.staking.abi
```
## Add New Contract's Actions to the FIO Protocol

Modify the 12_add_actions.sh to add your new contract’s actions to the FIO protocol. 
```
./clio -u http://$host push action eosio addaction '{"action":"stakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"unstakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"incgstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"incgrewards","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"recorddaily","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"decgstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"incacctstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"decacctstake","contract":"fio.staking","actor":"eosio"}' --permission eosio
```



##  Wrapping up

Rebuild the FIO blockchain with scripts/fio_build.sh, and install with fio_install.sh

Run fio.devtools option 3 to clear existing configuring, option 2 to build the contract changes, and then finally option 1 to initialize the new chain with the changes supporting the new contract.


### **Notes:**

On the FIO Testnet and Mainnet, the contract owner will always be an multisig account controlled by all active block producers. On the development and test environments, these accounts are simply loaded into the local wallet in fio.devtools.



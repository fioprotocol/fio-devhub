---
layout: page-dev
title: New FIO Contracts
description: Adding new contracts to a local development environment
redirect_from:
    - /docs/developers/contract

---

# Adding new contracts to a local development environment

This page identifies the files that should be modified in order to properly add a new smart contract into the FIO protocol. 

There are two steps to add a new system contract. The first step is to add your system contract information to `fio.contracts`. The next step is to make various chain calls to ensure that the new contract functions properly in the local development, testnet, or mainnet environment. This page focuses on the changes needed to properly add your contract into a local development environment.

{% include alert.html type="info" title="FIO Github Repository" content="When developing or making changes, be sure to branch from `develop` on all repositories to stay on pace with code updates." %}

## Update fio.contracts

#### Add account name and contract name to system contracts

The first step is to add the new account name and contract name to `fio.common.hpp`: 

```
static const name YourContractNameContract =   name(“YourContractAccountname”);

static const name YourContractNameACCOUNT =   name(“YourContractContractname”);
```

The following is an example of adding a new system contract for staking contract:

```
static const name StakingContract =   name("fio.staking");

static const name STAKINGACCOUNT =   name("fio.staking”);
```

####  Update system contracts authorization checks

Next, add the new account name to the system contracts authorization checks. Edit the `native.hpp` file and add the account name to the list of FIO system accounts within the updateauth action. For example: 

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

    ) 

```

## Update fio.devtools

The following outlines the updates to fio.devtools needed to bootstrap the new contract in a local development environment. 

{% include alert.html type="info" title="System contract permissions" content="In FIO Testnet and Mainnet, the contract owner will always be an multisig account controlled by all active block producers. In the local development and test environments, the system contracts and accounts are controlled by a known public/private key." %}

#### Create the contract account

Modify the 04_create_account.sh file to create the new system account:

```
./clio -u http://localhost:8879 create account eosio fio.staking FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS
```

#### Load the new contract

Modify the 19_bind_dev_contracts.sh to load the new contract:

```
./clio -u http://localhost:8879 set contract fio.staking $fio_staking_name_path fio.staking.wasm fio.staking.abi
```

#### Whitelist the new contract's actions

Modify the 12_add_actions.sh to add your new contract’s actions:

```
./clio -u http://$host push action eosio addaction '{"action":"stakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio

./clio -u http://$host push action eosio addaction '{"action":"unstakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio
```

####  Build the contracts and run a local test node

Rebuild the FIO blockchain with scripts/fio_build.sh, and install with fio_install.sh

Run fio.devtools option 3 to clear existing configuring, option 2 to build the contract changes, and then finally option 1 to initialize the new chain with the changes supporting the new contract.


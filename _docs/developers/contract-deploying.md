---
title: Deploying FIO Contracts
description: Deploying FIO contracts 
redirect_from:
   - /docs/developers/contract

---

# Deploying FIO Contracts
This document describes the important commands that must be included in a deployment bundle when a FIO smart contract developer is preparing to deliver changes for release to testnet and mainnet. The document also attempts to provide examples of the commands that are frequently used in the deployment bundle for projects delivering new contracts to the FIO protocol.

## Set Up Development Environment
In order to begin the process of release testing, the developer must first set up a development environment in a configuration that matches the present mainnet release. The developer must use a branch of fio.devtools which they have used for development, but this branch must be further modified for releasing to testnet.

- The developer must pull from the GitHub,  the mainnet versions of the following repositories:
    - FIO
    - FIO.contracts
- First, build the above versions, then archive/save the fio.contracts repository to a working directory fio.contracts.mainnet.

## Build and Stage Your Delivery for Testing
 Now the developer must pull the development version of their delivery and build this and stage it for use in release testing.

- First, pull your development version of contracts, and build this. 
- Archive/save this to a working directory called fio.contracts.staking.
- Next rename the fio.contracts.mainnet directory to be fio.contracts.
- Now, start up your local dev environment.
- Run any smoke tests necessary to verify that the local dev environment is up and running.

## Sample Commands
Once the changes have been tested, the developer can discover, or perform the set of commands used to deploy their changes onto the mainnet blockchain.

**Note:** The following sequence of commands is for example purposes. The commands necessary are different for any project being delivered and these commands must be discovered and verified by the smart contract developer who develops the changes for the project to be delivered.

The first set of commands necessary to upgrade the mainnet chain performs the adding of new contract actions, and adds their associated fees to the mainnet chain. Please be sure to list out in your release guide any new actions defined in your contract and any new user-facing API endpoints that will require a FIO fee.

```
Addaction and createfee
Add new actions for staking
../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"stakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"unstakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"incgstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"incgrewards","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"recorddaily","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"decgstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"incacctstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"decacctstake","contract":"fio.staking","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"paystake","contract":"fio.treasury","actor":"eosio"}' --permission eosio

../fio/build/bin/clio -u http://localhost:8889 push action eosio addaction '{"action":"modgenlocked","contract":"eosio","actor":"eosio"}' --permission eosio

Create the new fees
../fio/build/bin/clio -u http://localhost:8879 push action -f fio.fee createfee '{"end_point":"stake_fio_tokens","type":"1","suf_amount":"3000000000"}' --permission fio.fee@active

../fio/build/bin/clio -u http://localhost:8879 push action -f fio.fee createfee '{"end_point":"unstake_fio_tokens","type":"1","suf_amount":"3000000000"}' --permission fio.fee@active

```
 

After adding your new actions and fees to the protocol, it is common to next deploy modified contracts to the mainnet chain. Be sure you understand all of the contracts impacted by your changes, and the order in which they must be deployed. Specify the set of commands to be executed to deliver all contract modifications. 

**Note:** You may need to create a new contract account before doing this and add your new contract to the mainnet protocol (your needs will be unique to your project).


 ## Deploy contracts

Deploy the changes to the system contract to permit the new contract as a fio system contract. 

**Note:** This command deploys the changes to locks, and the changes to add the new fio.staking account as a new fio account.

```
../fio/build/bin/clio -u http://localhost:8889 set contract -j eosio /home/ubuntu/fio.contracts.staking/build/contracts/fio.system fio.system.wasm fio.system.abi --permission eosio@active

```

### Create new contract/account and deploy the contract
If adding a new contract you will need to add the new owning account of the contract, and deploy the new contract:

```
#create the new account

../fio/build/bin/clio -u http://localhost:8879 create account eosio fio.staking FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS -p eosio@active

#set the account permissions

../fio/build/bin/clio -u http://localhost:8879 set account permission fio.staking active '{"threshold": 1,"keys": [{"key": "FIO7isxEua78KPVbGzKemH4nj2bWE52gqj8Hkac3tc7jKNvpfWzYS","weight": 1}],"accounts": [{"permission":{"actor":"fio.staking","permission":"eosio.code"},"weight":1}]}}' 4000000000 owner -p fio.staking@owner

#set the account to be privileged.

../fio/build/bin/clio -u http://localhost:8879 push action eosio setpriv '["fio.staking",1]' -p eosio@active
```
### Remove RAM Limits on a New Account
When making a new contract account you need to remove ram limits on the account

**Note:** This may be called by eosio, and fio.system only!

```
#remove RAM limits on the new account

../fio/build/bin/clio -u http://localhost:8889 push action eosio setnolimits '{"account":"fio.staking"}' --permission eosio@active

#set the contract on the new account

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.staking /home/ubuntu/fio.contracts.staking/build/contracts/fio.staking fio.staking.wasm fio.staking.abi --permission fio.staking@active
```
 

### Set all other contracts

After setting up the new contract account you might then deploy the rest of the affected contracts. Your project needs will be unique and the lead developer must identify the order of these events that are necessary to deploy your project onto mainnet.
```
#now deploy the rest of the contracts affected by staking integration.

#eosio.msig - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j eosio.msig /home/ubuntu/fio.contracts.staking/build/contracts/eosio.msig eosio.msig.wasm eosio.msig.abi --permission eosio.msig@active

#fio.address - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.address /home/ubuntu/fio.contracts.staking/build/contracts/fio.address fio.address.wasm fio.address.abi --permission fio.address@active

#fio.fee - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.fee /home/ubuntu/fio.contracts.staking/build/contracts/fio.fee fio.fee.wasm fio.fee.abi --permission fio.fee@active

#fio.request.obt - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.reqobt /home/ubuntu/fio.contracts.staking/build/contracts/fio.request.obt fio.request.obt.wasm fio.request.obt.abi --permission fio.reqobt@active

#fio.token - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.token /home/ubuntu/fio.contracts.staking/build/contracts/fio.token fio.token.wasm fio.token.abi --permission fio.token@active

#fio.tpid - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.tpid /home/ubuntu/fio.contracts.staking/build/contracts/fio.tpid fio.tpid.wasm fio.tpid.abi --permission fio.tpid@active

#fio.treasury - Local WASM:

../fio/build/bin/clio -u http://localhost:8889 set contract -j fio.treasury /home/ubuntu/fio.contracts.staking/build/contracts/fio.treasury fio.treasury.wasm fio.treasury.abi --permission fio.treasury@active
```
---
layout: page-bp
title: FIO Mutlisigs
description: Block Producer release tasks
---
## Creating Chain Multisigs

This document outlines the process for creating and approving transactions that required the approval of the top 21 block producers. These transactions are submitted as multisig transactions which are sent to the block producers for approval. Once 15/21 block producers have approved the multisig, it may be executed.

### Cryptolions MSIG tool

We will use the [Cryptolions MSIG tool](https://github.com/CryptoLions/MSIG_console_manager){:target="_blank"} to build the msig. 

##### 1. Clone the repository

```
git clone https://github.com/cryptolions/MSIG_console_manager
cd MSIG_console_manager
```

##### 2. Edit `0_CONFIG.json`

Next, edit `0_CONFIG.json` and update the path to your clio binary and include the information for your msig. The `approver` and `proposer` should be set to the account of the user building the msig. 

For example, the following config file can be used to submit `addaction` transactions:

```json
{
    "proposer": "un3emex141fp",
    "proposalName": "addact",
    "approver": "un3emex141fp",
    "msig_expiration_h": 720,
    "actions_list_file": "1_actions_list",
    "requireBPsapprove": 1,
    "approvers_list": "{\"actor\": \"acc1\", \"permission\": \"active\"},{\"actor\": \"acc2\", \"permission\": \"active\"}",
    
    "clio": "/home/ubuntu/fio.devtools/bin/clio",
    "walletHost": "http://127.0.0.1:8900",
    "nodeHost": "https://fiotestnet.greymass.com",

    "feePropose": 1000000000000,
    "feeApprove": 4000000000,
    "feeCancel": 10000000000,
    "feeExec": 4000000000
}
```

##### 3. Add clio transactions to `1_actions_list`

Next, add the relevant transaction calls to the `1_actions_list` file. For example:

```
./clio.sh push action eosio addaction '{"action":"clrgenlocked","contract":"eosio","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"wraptokens","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"unwraptokens","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"regoracle","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"unregoracle","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"setoraclefee","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"wrapdomain","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
./clio.sh push action eosio addaction '{"action":"unwrapdomain","contract":"fio.oracle","actor":"eosio"}' -p eosio@active
```

The table below lists examples of other frequently used FIO transactions:

|Action | clio command |
|---|---|
|addaction | ./clio.sh push action eosio addaction '{"action":"wraptokens","contract":"fio.oracle","actor":"eosio"}' -p eosio@active |
|createfee | ./clio.sh push action fio.fee createfee '{"end_point":"wrap_fio_tokens","type":"0","suf_amount":"390000000"}' -p fio.fee@active |
|regoracle | ./clio.sh push action fio.oracle regoracle '{"oracle_actor": "xzbyelnseqx3", "actor": "eosio"}' -p fio.oracle |
|set contract | ./clio.sh set contract fio.address /opt/FIO/bin/Contracts/last/fio.address/ -p fio.address |

**clio notes:**
* Use the permissions of the system contract that contains the action

##### 4. Set up fio-wallet

Depending on how you are accessing your FIO keys, you may need to update your fio-wallet. For example, in the config file we set the wallet config as:

```
"walletHost": "http://127.0.0.1:8900"
```

The MSIG script will be looking for the wallet at that port. If you are unsure if the wallet is running you can restart it with following:

```
pkill fio-wallet
./fio-wallet --http-server-address=127.0.0.1:8900 &
```

Next, you will need to import the key associated with your `proposer` account into a local wallet. In the example below I create a new "msigwallet" wallet and import my key:

```
./clio wallet create -n msigwallet --to-console
./clio wallet import -n msigwallet
```

Make sure you capture the private key for the new wallet from the console in case you need it in the future. When you are done submitting the msig you can delete this temporary wallet.

##### 5. Create and submit the msig using `2_propose_msig.sh`

The next step is to build and submit the msig by running `2_propose_msig.sh`. A successful run will look something like:

```
ubuntu@ip-172-31-28-246:~/MSIG_console_manager$ ./2_propose_msig.sh
executed transaction: e93bee5e099297efc58191ae9dc86340991078ed2580b6b9911152595ddf1a7f  680 bytes  7041 us
#    eosio.msig <= eosio.msig::propose          {"proposer":"un3emex141fp","proposal_name":"crtfeeoratst","requested":[{"actor":"5du5xkgkki5x","perm...
#       fio.fee <= fio.fee::bytemandfee         {"end_point":"msig_propose","account":"un3emex141fp","max_fee":1000000000000,"bytesize":638}
#     fio.token <= fio.token::transfer          {"from":"un3emex141fp","to":"fio.treasury","quantity":"0.632469037 FIO","memo":"FIO fee: msig_propos...
#  un3emex141fp <= fio.token::transfer          {"from":"un3emex141fp","to":"fio.treasury","quantity":"0.632469037 FIO","memo":"FIO fee: msig_propos...
#  fio.treasury <= fio.token::transfer          {"from":"un3emex141fp","to":"fio.treasury","quantity":"0.632469037 FIO","memo":"FIO fee: msig_propos...
#  fio.treasury <= fio.treasury::bprewdupdate   {"amount":442728325}
#   fio.staking <= fio.staking::incgrewards     "8bad6c0900000000"
#  fio.treasury <= fio.treasury::fdtnrwdupdat   {"amount":31623451}
#         eosio <= eosio::incram                {"accountmn":"un3emex141fp","amount":1024}
warning: transaction executed locally, but may not be confirmed by the network yet         ] 
```

Note, if you want to test out the script before submitting a transaction you can:
* Comment out the `./clio.sh multisig propose_trx ...` line
* Comment out the `rm trx.json` line
* Run the script and examine the `trx.json` file


##### 6. Confirm your transaction

If you have submitted your transaction to FIO Testnet, you can confirm it by visiting the [multisig page on bloks.io](https://fio-test.bloks.io/msigs){:target="_blank"}

### Errors

##### No available wallet

If you have created a local wallet and imported your key and get the following error:

```
Error 3120006: No available wallet
Ensure that you have created a wallet and have it open
Error Details:
You don't have any wallet!
```

You may need to unlock your wallet:

```
./clio wallet unlock -n msigwallet
```

##### jq: error (at input.json:1): break

If you get the following error when running `2_propose_msig.sh`:

```
ubuntu@ip-172-31-28-246:~/MSIG_console_manager$ ./2_propose_msig.sh
jq: error (at input.json:1): break
```

You may be using `./clio` instead of `./clio.sh` in your `1_actions_list` file.
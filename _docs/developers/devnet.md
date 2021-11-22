---
title: Devnet Testing
description: Devnet Testing
---

# Devnet Testing

## Contract upgrade testing (fio.contracts)

The first step is to test the deployment of the new contracts and action.

**1) Launch devnet with current production release from `fio` and `fio.contracts`**

{% include alert.html type="info" title="Use a clean fio.devtools build" content="The fio.devtools branch used to launch the nodes should NOT contain any addaction, createfee, or other contract updates for the actions in the new release." %}

**2) Confirm fio.test runs cleanly**

**3) Add new actions**

```
./clio -u http://localhost:8889 push action eosio addaction '{"action":"stakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio
./clio -u http://localhost:8889 push action eosio addaction '{"action":"unstakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio
```

**4) Create the new fees**

```
./clio -u http://localhost:8879 push action -f fio.fee createfee '{"end_point":"stake_fio_tokens","type":"1","suf_amount":"3000000000"}' --permission fio.fee@active
./clio -u http://localhost:8879 push action -f fio.fee createfee '{"end_point":"unstake_fio_tokens","type":"1","suf_amount":"3000000000"}' --permission fio.fee@active
```

**5) Update contracts to new release branch**

Next, update any contracts that have been modified. If you are deploying a NEW FIO system contract, you should refer to the more detailed [Adding New FIO Contracts]({{site.baseurl}}/docs/developers/newcontracts) instructions.

```
./clio -u http://localhost:8889 set contract -j fio.address fio.address fio.address.wasm fio.address.abi --permission fio.address@active
```

**6) Confirm fio.test runs cleanly**


## Fork Testing (if deploying new chain code)

The next step is to test the upgrade of the chain code to ensure that no forking occurs during the upgrade. 

1) Build the new chain release

Checkout the upgrade branch you’re attempting to test, build and install using the scripts provided inside the fio/scripts directory. Once the new fio core has been installed you are ready to begin upgrading node groups.

2) Update fio chain code for 6 out of 21 nodes and confirm no forking occurs

```
./devnet -f a.yml -bin ~/fio/3.0/bin/nodeos upgrade
./devnet -f a.yml register
```

## Reference Notes

This command will stop, update, start and resync the node. To verify syncing, check the nodeos log file located on each node. 

```
./devnet -f a.yml -out nodeos.log log
tail nodeos.log
```
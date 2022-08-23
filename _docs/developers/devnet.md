---
layout: page-dev
title: Devnet Testing
description: Devnet Testing
---

# Devnet Testing

There are several categories of Devnet testing:

1. Local update testing - Testing the addaction, createfee, and contract updates in a local environments to develop scripts to support devnet testing.
2. Contract testing - Testing all new contract actions associated with the rollout of the release
3. Fork testing - Testing the incremental rollout of chain code
4. Performance testing - Testing feature performance in a full environment
5. QA testing - Running regression tests in a full environment

## Local testing

The goal of local testing is to go through the contract testing steps to develop scripts that can be used when doing testing on Devnet. 

1. Install the current production release
2. Run fio.test production tests to confirm the tests run cleanly
3. Perform ALL of the Contract testing steps listed below
4. Run fio.test regression tests for the new release to confirm the update was successful

## Contract testing (fio.contracts)

There are several steps associated with rolling out new actions and contracts for a release. 

1. Add new actions using `addaction`
2. Create new fees for new actions using `createfee`
3. Add new contracts (only needed if a new system contract is being added)
   1. See [Deploying FIO Contracts]({{site.baseurl}}/docs/developers/contract-deploying) for commands needed to deploy a new contract
4. Set all contracts that have new code

The first step is to test the deployment of the new contracts and action.

**1) Launch devnet with current production release from `fio` and `fio.contracts`**

{% include alert.html type="info" title="Use a clean fio.devtools build" content="The fio.devtools branch used to launch the nodes should NOT contain any addaction, createfee, or other contract updates for the actions in the new release." %}

**2) Confirm fio.test runs cleanly**

**3) Add new actions**

All new actions must be added to the actions table whitelist PRIOR to updating the contracts. The following shows an example of using `addaction` to add the action to the actions table:

```
./clio -u http://localhost:8889 push action eosio addaction '{"action":"stakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio
./clio -u http://localhost:8889 push action eosio addaction '{"action":"unstakefio","contract":"fio.staking","actor":"eosio"}' --permission eosio
```

**4) Create the new fees**

All new actions require fees. The following shows an example call to `createfee` to sett fees for new endpoints:

```
./clio -u http://localhost:8879 push action -f fio.fee createfee '{"end_point":"stake_fio_tokens","type":"1","suf_amount":"3000000000"}' --permission fio.fee@active
./clio -u http://localhost:8879 push action -f fio.fee createfee '{"end_point":"unstake_fio_tokens","type":"1","suf_amount":"3000000000"}' --permission fio.fee@active
```

**5) Update contracts**

Next, update any contracts that have been modified. If you are deploying a NEW FIO system contract, you should refer to the more detailed [Deploying FIO Contracts]({{site.baseurl}}/docs/developers/contract-deploying) instructions.

The following is an example of calling `set contract` to deploy the fio.address system contract:

```
./clio -u http://localhost:8889 set contract -j fio.address fio.address fio.address.wasm fio.address.abi --permission fio.address@active
```

**6) Confirm fio.test runs cleanly**


## Fork Testing (fio)

The following steps are used to test the upgrade of the chain code to ensure that no forking occurs during the upgrade:

1) Install the latest production build on Devnet

Information and installing and updating devenet are on the [fio-devnet private repository](https://github.com/dapixio/fio-devnet){:target="_blank"}

2) Build the new chain release

Checkout the upgrade branch you’re attempting to test, build and install using the scripts provided inside the fio/scripts directory. Once the new fio core has been installed you are ready to begin upgrading node groups.

3) Update fio chain code for 6 out of 21 nodes and confirm no forking occurs

The original 3 nodes plus 6 new nodes, for a total of 9 nodes, will now be upgraded.

4) Update fio chain code for and additiona 6 nodes and confirm no forking occurs

The original 3 nodes plus 12 nodes, for a total of 15 nodes, should now be upgraded.

## Performance testing

Some projects have devnet-level performance test considerations. When a release includes the need for performance testing then tests must be run and findings published to the wiki for the release.

## QA testing

QA regression tests should be run against the devnet for each release. 

## Reference Notes

This command will stop, update, start and resync the node. To verify syncing, check the nodeos log file located on each node. 

```
./devnet -f a.yml -out nodeos.log log
tail nodeos.log
```

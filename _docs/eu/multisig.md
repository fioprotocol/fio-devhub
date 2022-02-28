---
layout: page-eu
title: Multisig
description: Multisig
redirect_from:
    - /docs/how-to/
---
# Multisig

The following is a step-by-step guide for how to convert a regular FIO account into a “2 out of 3” multisig (any 2 signatures of the 3 provided accounts are required to execute a transaction) on the FIO Chain. All transactions in the steps below are submitted using /push_transaction API method.

{% include alert.html type="warning" title="This transaction is potentially dangerous"  content="Updating the permissions on an account can cause loss of access to the funds in the account if not done accurately. Please make sure you have access to the private keys for all accounts to which you are delegating permissions." %}


## Step 1: Change account and owner permissions of account

This `updateauth` call will replace permissions for the `wh2oxdvbebor` account with active permissions from 3 different accounts. Please note that those accounts must have been previously created on the FIO Chain by sending funds to them or by registering a FIO Crypto Handle.

Both the "account" or "owner" permissions will need to be updated. The following code updates the "active" permission.

{% include alert.html type="info" title="Alphabetical Ordering of Accounts"  content="When manually calling push_transaction with the updateauth action the actor names must be in alphabetical order inside of the accounts array." %}

```

  {
    "action": "updateauth",
    "json": {
      "account": "wh2oxdvbebor",
      "permission": "active", 
      "parent": "",
      "auth": {
        "threshold": 2,
        "keys": [],
        "waits": [],
        "accounts": [
          {
            "permission": {
              "actor": "1jynjfoswglg",
              "permission": "active"
            },
            "weight": 1
          },
          {
            "permission": {
              "actor": "qhdo4r2pltdr",
              "permission": "active"
            },
            "weight": 1
          },
          {
            "permission": {
              "actor": "tsksksw1jxrb",
              "permission": "active"
            },
            "weight": 1
          }
        ]
      },
      "max_fee": 10000000000
    }
  }

```

#### Using bloks.io and Anchor wallet to change the owner permissions for an account

An easy way to interact with FIO Protocol is by using the FIO block explorer at bloks.io with [Anchor Wallet](https://greymass.com/en/anchor/){:rel="nofollow noopener noreferrer" target="_blank"}. The following demonstrates how to set up the active and owner permissions using bloks.io.

**a) Import into Anchor the private key for the account you want to update.**

<br>

**b) Go to <https://fio.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"} and go to the account that you want to update. Click on Login and select Anchor.**

<br>

**c) Make sure the correct account is selected in Anchor.**

<br>

**d) You should now be logged in:**

![Image]({{ site.baseurl }}/assets/img/msig/loggedin.png)

<br>

**e) Click on the “Wallet” tab, then on “Keys and Permissions”, then on the "Advanced" tab.**

<br>

**f) We will first update the "active" permission. Click on "permission #2: active" and select:**

* Permission Name: active
* Parent: owner
* Threshold: 2

<br>

**g) Next, remove the permission for the existing key by clicking on the "X" in the keys panel.**

![Image]({{ site.baseurl }}/assets/img/msig/keyspanel.png)

<br>

**h) Add the three msig accounts in the Accounts panel (select "active" for all permissions)**

Your permissions should look like the following:

![Image]({{ site.baseurl }}/assets/img/msig/permissions.png)

<br>

**i) Click the “Save” button on the top right.** 

<br>

**j) Sign the transaction in Anchor wallet.** 

![Image]({{ site.baseurl }}/assets/img/msig/sign.png)

<br>

**k) Repeat the process for the owner permission.**

* You will need to leave "Parent" blank
* Select "owner" for the msig account permissions. 

<br>

**l) The final permissions should look something like:**

![Image]({{ site.baseurl }}/assets/img/msig/final.png)

<br>

## Step 2: Propose a multisig transaction

This call proposes a "2 out of 3" multisig transaction for sending FIO tokens:
```

  {
    "code": "eosio.msig",
    "action": "propose",
    "args": {
      "proposer": "qhdo4r2pltdr",
      "proposal_name": "fiopayment",
      "requested": [
        {
          "actor": "1jynjfoswglg",
          "permission": "active"
        },
        {
          "actor": "qhdo4r2pltdr",
          "permission": "active"
        },
        {
          "actor": "tsksksw1jxrb",
          "permission": "active"
        }
      ],
      "trx": {
        "chain_id": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
        "expiration": "2019-12-15T21:48:47",
        "ref_block_num": 266016,
        "ref_block_prefix": 102118591,
        "max_net_usage_words": 0,
        "max_cpu_usage_ms": 0,
        "delay_sec": 0,
        "context_free_actions": [],
        "actions": [
          {
            "account": "fio.token",
            "name": "trnsfiopubky",
            "authorization": [
              {
                "actor": "aewgyixsunjo",
                "permission": "active"
              }
            ],
            "data": "3546494f385052653457525a4a6a356d6b656d367156474b79764e466750734e6e6a4e4e366b50686836456143707a4356696e354a6a40420f000000000080b2e60e0000000040dfd4b83bcfb83200"
          }
        ],
        "transaction_extensions": []
      },
      "max_fee": 10000000000
    }
  }

```

#### Using bloks.io and Anchor wallet to propose a multisig transaction

The following demonstrates how to use bloks.io and Anchor wallet to propose a "2 out of 3" multisig transaction for sending FIO tokens.

<br>

**a) In bloks.io, select an account that is one of the Active authorized signers of the multisig account and log into Anchor. Make sure that you *change the account to “mulit-sig mode”* by selecting the account on the top right and toggling the radio button to “multi-sig mode”**

![Image]({{ site.baseurl }}/assets/img/msig/login-multisig.png)

<br>

**b) Click on the “Wallet” tab and enter the amount and the FIO Public Key for the account where the funds are to be sent. Then click "Transfer FIO".**

The screen below will appear. Enter the following:

* Contract: fio.token
* Action: trnsfiopubky
* Authorization: (Use the information for the multisig account)
  * Authorization: wh2oxdvbebor
  * Permission: active 
* payee_public_key: The FIO Public Key for the account that will receive the funds
* amount: Amount of FIO to send
* actor: wh2oxdvbebor (The account name for the multisig account)
* Proposal Name: fiopayment

Other information should be filled in automatically.

![Image]({{ site.baseurl }}/assets/img/msig/msig-proposal.png)

<br>

**c) Click “Propose” at the bottom of the screen. You should see a “Success” box as shown below.**

![Image]({{ site.baseurl }}/assets/img/msig/propose-success.png)

<br>

**d) Click on the "Check proposal at fiopayment" link and you will see the multisig proposal.**

![Image]({{ site.baseurl }}/assets/img/msig/proposal.png)

<br>

## Step 3: Approve multisig transaction

2 out of the 3 msig accounts will need to approve the transaction. In the call below, account `qhdo4r2pltdr` approves the transaction:

```

  {
    "code": "eosio.msig",
    "action": "approve",
    "args": {
      "proposer": "qhdo4r2pltdr",
      "proposal_name": "fiopayment",
      "level": {
        "actor": "qhdo4r2pltdr",
        "permission": "active"
      },
      "max_fee": 10000000000
    }
  }

```

#### Using bloks.io and Anchor wallet to approve a multisig transaction

The following demonstrates how to approve the multisig transaction that was previously created.

<br>

**a) Log into Anchor wallet from bloks.io using the account that will be approving the msig transaction.**

For this example we are connecting to the `qhdo4r2pltdr` active account in our Anchor wallet.

<br>

**b) Go to the fiopayment proposal.**

<br>

**c) Click on the "Approve" button in the upper right corner of the proposal and sign the transaction using Anchor.**

You should see a Success message with a link to the transaction:

![Image]({{ site.baseurl }}/assets/img/msig/approve-success.png)

<br>

**d) Repeat the approval process with a second msig account**

Once 2 out of 3 accounts have approved the msig, it is ready to execute.

<br>

## Step 4: Execute multisig transaction

This call executes the transaction of spending funds.
```

  {
    "code": "eosio.msig",
    "action": "exec",
    "args": {
      "proposer": "qhdo4r2pltdr",
      "proposal_name": "fiopayment",
      "executer": "1jynjfoswglg",
      "max_fee": 10000000
    }
  }

```

#### Using bloks.io and Anchor wallet to execute a multisig transaction

The following demonstrates how to execute the previously approved multisig transaction using block.io and the Anchor wallet.

<br>

**a) Go to bloks.io and connect to your Anchor Wallet.**

For this example, we are connecting using the account `1jynjfoswglg`.

<br>

**b) Go to the fiopayment proposal.**

<br>

**c) Click on the "Execute" button in the upper right corner of the msig proposal and sign the transaction using Anchor.**

![Image]({{ site.baseurl }}/assets/img/msig/execute-sign.png)

<br>

**d) You will see a Success message.**

![Image]({{ site.baseurl }}/assets/img/msig/execute-success.png)

<br>

**e) Click on the transaction id to view the transaction.**

![Image]({{ site.baseurl }}/assets/img/msig/transaction.png)

<br>

**f) Go to the msig account on bloks.io to view the FIO Transfer transaction under the transactions history**

![Image]({{ site.baseurl }}/assets/img/msig/fio-transfer.png)
---
title: clio
description: clio
---

# clio

Table of contents

Overview
Download clio
Manage wallet
Msig
Vote using clio
Push action
Overview

command line interface for Fio (clio) is a tool which allows for some commands to be ran from command line.

Download clio

You can download it in a standalone FIO Ready package on Github

Manage wallet

Create a wallet

clio wallet create -n PICK_WALLET_NAME --to-console
Generate private/public keys

clio create key --to-console
Import private key into wallet

clio wallet import --private-key YOUR_PRIVATE_KEY -n PICK_WALLET_NAME
Remove key from wallet

clio wallet remove_key YOUR_PUBLIC_KEY -n PICK_WALLET_NAME --password YOUR_WALLET_PASSWORD
Unlock wallet

clio wallet unlock -n PICK_WALLET_NAME --password YOUR_WALLET_PASSWORD
Msig

Propose 1 FIO transfer msig

clio -u https://API_NODE_URL multisig propose NAME_YOUR_MSIG '[{"actor": "ACCOUNT_OF_FIRST_SIGNER", "permission": "active"},{"actor": "ACCOUNT_OF_SECOND_SIGNER", "permission": "active"}]' '[{"actor": "ACCOUNT_OF_MSIG", "permission": "active"}]' fio.token trnsfiopubky '{"payee_public_key":"PUBLIC_KEY_WHERE_FUNDS_ARE_SENT", "amount":1000000000, "max_fee":2000000000, "actor":"ACCOUNT_OF_MSIG", "tpid":""}' 1000000000 -p ACCOUNT_OF_MSIG@active
Approve msig

clio -u https://API_NODE_URL multisig approve ACCOUNT_OF_MSIG_PROPOSER NAME_YOUR_MSIG '{"actor": "ACCOUNT_OF_SIGNER", "permission": "active"}' 400000000 -p ACCOUNT_OF_SIGNER@active
Execute msig

clio -u https://API_NODE_URL multisig exec ACCOUNT_OF_MSIG_PROPOSER NAME_YOUR_MSIG 400000000 -p ACCOUNT_OF_SIGNER@active
Vote using clio

See Voting for block producers using clio

Push action

Using clio you can push any action to the blockchain as follows

clio -u https://API_NODE_URL push action CONTRACT ACTION DATA -p ACCOUNT_OF_SIGNER@active
Where:

CONTRACT and ACTION are specified for every API call in FIO Protocol API Spec. For example CONTRACT and ACTION for /register_fio_domain is fio.address and regdomain respectively.
DATA is specified for every API call in FIO Protocol API Spec. For example DATA for /register_fio_domain is:
{
  "fio_domain": "alice",
  "owner_fio_public_key": "FIO8PRe4WRZJj5mkem6qVGKyvNFgPsNnjNN6kPhh6EaCpzCVin5Jj",
  "max_fee": 2000000000,
  "tpid": "rewards@wallet",
  "actor": "aftyershcu22"
}
Registering FIO Address

For full description of fields see /register_fio_address

clio -u https://API_NODE_URL push action fio.address regaddress '{"fio_address": "YOUR_ADDRESS", "owner_fio_public_key": "", "max_fee": 40000000000, "tpid": "", "actor": "ACCOUNT_OF_SIGNER"
}' -p ACCOUNT_OF_SIGNER@active
Setting domain public

For full description of fields see /set_fio_domain_public

clio -u https://API_NODE_URL push action fio.address setdomainpub '{"fio_domain": "YOUR_DOMAIN", "is_public": 1, "max_fee": 2000000000, "tpid": "", "actor": "ACCOUNT_OF_DOMAIN_OWNER"
}' -p ACCOUNT_OF_DOMAIN_OWNER@active
Transferring tokens

For full description of fields see /transfer_tokens_pub_key

clio -u https://API_NODE_URL push action fio.token trnsfiopubky '{"payee_public_key": "RECIPIENT_FIO_PUBLIC_KEY", "amount": 1000000000, "max_fee": 2000000000, "tpid": "", "actor": "ACCOUNT_OF_PAYER"
}' -p ACCOUNT_OF_PAYER@active


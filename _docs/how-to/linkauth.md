---
title: Adding permissions with linkauth
description: Adding permissions with linkauth
redirect_from:
    - /docs/recipes/linkauth
---

# Adding permissions with linkauth

## Overview

linkauth allows secondary account to execute a specific action on behalf of the primary account. For example if Account Domain Owner owns a domain and that domain is private, it can authorize Account Registrar to register FIO Crypto Handles on that domain, without making it public. Here’s an example of how this can be acomplished.

## Add new permission

First start by adding a new permission, let’s call it regaddress, to the account which owns the domain.

{% include alert.html type="warning" title="Setting multiple accounts in updateauth" 

content = "If multiple auth accounts are included (e.g., when creating a multisig account) the entries in the accounts array must be ordered alphabetically by actor name."

%}
```
{
	"account": "eosio",
	"name": "updateauth",
	"authorization": [{
			"actor": "account_name_of_domain_owner",
			"permission": "active"
		}
	],
	"data":
	{
		"account": "account_name_of_domain_owner",
		"permission": "regaddress",
		"parent": "active",
		"auth": {
			"threshold": 1,
			"keys": [],
			"waits": [],
			"accounts": [{
					"permission": {
						"actor": "account_name_of_registrar",
						"permission": "active"
					},
					"weight": 1
				}
			]
		},
		"max_fee": 1000000000
	}

}
```

[Click here to see the full updateauth javascript example.](https://github.com/fioprotocol/fiosdk_typescript-examples/blob/main/eosio-updateauth.js){:target="_blank"}.

## Link the new permission

Once the new permission is created, we link it to the Register FIO Crypto Handle action.
```
{
	"account": "eosio",
	"name": "linkauth",
	"authorization": [{
			"actor": "account_name_of_domain_owner",
			"permission": "active"
		}
	],
	"data": {
		"account": "account_name_of_domain_owner",
		"code": "fio.address",
		"type": "regaddress",
		"requirement": "regaddress",
		"max_fee": 1000000000
	}

}
```

## Register FIO Crypto Handle on behalf of owner

You can now register FIO Crypto Handle, but you have to do so with the owner’s actor and the new permission as authorization and signature of the active permission of registrar.
```
{
	"account": "fio.address",
	"name": "regaddress",
	"authorization": [{
			"actor": "account_name_of_domain_owner",
			"permission": "regaddress"
		}
	],
	"data": {
		"fio_address": "bob@privatedomain",
		"owner_fio_public_key": "",
		"max_fee": 40000000000,
		"tpid": "",
		"actor": "account_name_of_domain_owner"
	}
}
```
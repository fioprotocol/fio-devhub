---
title: Accounts and permissions
description: Accounts and permissions
---
# Accounts and permissions



## FIO Accounts

FIO keys are tied to FIO accounts. FIO uses a [custom hash function]({{ site.baseurl }}/docs/integration-guide/generating-actor), which when applied to a FIO Public Key, produces a FIO account name (a FIO account is equivalent to a FIO actor). There is no way to create a custom name for an account.

In order to make it easier for developers to be able to integrate with the FIO Blockchain, FIO accounts are created automatically in the following instances:

* FIO tokens are sent to a FIO public key using /transfer_tokens_pub_key and the supplied recipient’s public key is not associated to an account.
* A FIO Address or FIO Domain is registered and the supplied "owner’s public key" does not belong to an existing account.

## Permissions

When a FIO Account is ceated, the corresponding FIO Public Key is assigned the owner and active permissions. The implicit default permission linked to all actions is *active*, which sits one level below the *owner* permission within the hierarchy structure. The active permission can do anything the owner permission can, except changing the keys associated with the owner. 

FIO Chain uses the [same permission model as EOSIO](https://developers.eos.io/welcome/latest/protocol/accounts_and_permissions){:target="_blank"}, except that:

* Only one public key can be specified for any one account
* “waits” are not supported
* Custom permissions are not currently supported by the SDKs, so some wallets may not handle accounts with custom permissions.
* It is important to note that the only way to send tokens is to use /transfer_tokens_pub_key (trnsfiopubky) which will *always send the funds to the account which is a hash of the public key*. This is true even if that key is set as permission on other accounts.

`linkauth` can be used to set custom permissions. Refer to the [linkauth code example]({{ site.baseurl }}/docs/recipes/linkauth) which shows how to create a custom permission that can be used to register a FIO Address on a private FIO Domain.

---
title: Accounts, public keys and permissions
description: Accounts, public keys and permissions
---
# Accounts, public keys and permissions

## FIO Accounts
FIO Chain inherits [EOSIO Accounts and Permission scheme](https://developers.eos.io/welcome/latest/protocol/accounts_and_permissions){:target="_blank"}. However, a number of modifications were made with the goal of making the interaction with the FIO Chain more seamless to the users.

Specifically, it was deemed that an explicit step to create and pay for an account before one can interact with the FIO Chain was intrusive and that a better approach would be to allow a user to simply generate a public key and have the account created automatically on first interaction.

To achieve this objective on FIO Chain:
* Account is created automatically when certain actions are triggered with a supplied public key for which an account has not yet been created. This allows the user to generate a FIO Public Key off-chain and provide that as a valid public address akin to UTXO chains.
* When an account is created:
  * Its name is set to the hash of the supplied public key using [custom hash function]({{site.baseurl}}/docs/recipes/actor-account).
  * Its _owner_ and _active_ permissions are set to the supplied public key.
* The account cannot be explicitly created with a custom name to avoid collisions with a hashed public key. _newaccount_ is not a supported action.

The following actions automatically create an account:
|Contract|Action|Endpoint|Description|
|---|---|---|---|
|fio.token|[trnsfiopubky]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky)|/transfer_tokens_pub_key|When transferring tokens to a public key, for which an account has not yet been created.|
|fio.token|[trnsloctoks]({{site.baseurl}}/pages/api/fio-api/#options-trnsloctoks)|/transfer_locked_tokens|When transferring locked tokens to a public key, for which an account has not yet been created.|
|fio.address|[regaddress]({{site.baseurl}}/pages/api/fio-api/#options-regaddress)|/register_fio_address|When registering a FIO Address for a public key, for which an account has not yet been created.|
|fio.address|[regdomain]({{site.baseurl}}/pages/api/fio-api/#options-regdomain)|/register_fio_domain|When registering a FIO Domain for a public key, for which an account has not yet been created.|
|fio.address|[xferaddress]({{site.baseurl}}/pages/api/fio-api/#options-xferaddress)|/transfer_fio_address|When transferring a FIO Address to a public key, for which an account has not yet been created.|
|fio.address|[xferdomain]({{site.baseurl}}/pages/api/fio-api/#options-xferdomain)|/transfer_fio_domain|When transferring a FIO Domain to a public key, for which an account has not yet been created.|

The fees for the above actions reflect the potential of increased resource usage associated with acount creation.

## Permissions

When a FIO Account is ceated, the corresponding FIO Public Key is assigned the owner and active permissions. The implicit default permission linked to all actions is *active*, which sits one level below the *owner* permission within the hierarchy structure. The active permission can do anything the owner permission can, except changing the keys associated with the owner. 

FIO Chain inherits [EOSIO Accounts and Permission scheme](https://developers.eos.io/welcome/latest/protocol/accounts_and_permissions){:target="_blank"} with some important differences:

* Only one public key can be specified for any one account
* “waits” are not supported
* Custom permissions are not currently supported by the SDKs, so some wallets may not handle accounts with custom permissions.
* It is important to note that the only way to send tokens is to use [/transfer_tokens_pub_key]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky)(trnsfiopubky) which will *always send the funds to the account which is a hash of the public key*. This is true even if that key is set as permission on other accounts.

`linkauth` can be used to set custom permissions. Refer to the [linkauth code example]({{ site.baseurl }}/docs/recipes/linkauth) which shows how to create a custom permission that can be used to register a FIO Address on a private FIO Domain.


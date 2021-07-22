---
title: Accounts and permissions
description: Accounts and permissions
---
# Accounts and permissions

## FIO Accounts
FIO Chain inherits [EOSIO Accounts and Permission scheme](https://developers.eos.io/welcome/latest/protocol/accounts_and_permissions){:target="_blank"}. However, a number of modifications were made with the goal of making the interaction with the FIO Chain more seamless to the users.

Specifically, it was deemed that an explicit step to create and pay for an account before one can interact with the FIO Chain was intrusive and that a better approach would be to allow a user to simply generate a public key and have the account created automatically on first interaction.

To achieve this objective on FIO Chain:
* Account is created automatically when certain actions are triggered with a supplied public key for which an account has not yet been created. This allows the user to generate a FIO Public Key off-chain and provide that as a valid public address akin to UTXO chains.
* When an account is created:
  * Its name is set to the hash of the supplied public key using [custom hash function]({{site.baseurl}}/docs/recipes/actor-account).
  * Its _owner_ and _active_ permissions are set to the supplied public key.
  * The supplied public key is permanently stored in [fio.address->accountmap](https://fio.bloks.io/contract?tab=Tables&account=fio.address&scope=fio.address&limit=100&table=accountmap) table and can be queried to lookup the original FIO Public Key, even if permissions were modified.
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

The fees for the above actions reflect the potential of increased resource usage associated with account creation.

[More information about FIO Public Keys]({{site.baseurl}}/docs/fio-protocol/keys)

## Permissions
When a FIO Account is created, the corresponding FIO Public Key is assigned as the owner and active permission. The implicit default permission linked to all actions is *active*, which sits one level below the *owner* permission within the hierarchy structure. The active permission can do anything the owner permission can, except changing the keys associated with the owner. 

As FIO Chain inherits [EOSIO Permission scheme](https://developers.eos.io/welcome/latest/protocol/accounts_and_permissions){:target="_blank"}, permissions in FIO Chain can be modified. However, please consider the following.

### Limitations
* Only one public key can be specified for a single permission, e.g. active cannot have 2 public keys. It can however, have multiple accounts, which may be helpful for setting up a [multisig]({{site.baseurl}}/docs/fio-protocol/multisig).
* “waits” are not supported.

### Custom permissions impacts
* Custom permissions are not currently supported by the SDKs. This means that if an account's default permissions are changed and the user imports their private key to a wallet which supports FIO using the SDK, that account may not work correctly as the wallet would not be able to properly sign transactions. This does not mean you should not allow for custom permissions in your application, it means you should consider disclosing portability of the account to your users.
* Many actions (e.g. [trnsfiopubky]({{site.baseurl}}/pages/api/fio-api/#options-trnsfiopubky), [regaddress]({{site.baseurl}}/pages/api/fio-api/#options-regaddress)) and getters (e.g. [/get_fio_balance]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_balance), [/get_fio_addresses]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_addresses)) accept FIO Public Key as an input parameter. It is important to understand that the supplied FIO Public Key will always be converted to the default [hashed]({{site.baseurl}}/docs/recipes/actor-account) account and the action or getter will be executed against that account even if the permissions on it have been modified.
* When a FIO Address is created, the FIO Public Key which [hashes]({{site.baseurl}}/docs/recipes/actor-account) to the account which will own the FIO Address is [automatically mapped to it]({{site.baseurl}}/docs/how-to/mapping#fio-public-key-mapping). This occurs irrespective of the permissions which are set on the account. This ensures that funds sent to the FIO Address will always go to the owner account. The mapped FIO Public Key is also used to [encrypt and decrypt FIO Request and FIO Data]({{site.baseurl}}/docs/how-to/encryption).

### Custom permission example
Refer to the [linkauth code example]({{site.baseurl}}/docs/recipes/linkauth) which shows how to create a custom permission that can be used to register a FIO Address on a private FIO Domain.

---
title: Keys, accounts, and permissions
description: Keys, accounts, and permissions
---
# Keys, accounts, and permissions

## FIO Private/Public Keys

FIO Chain’s is registered at index 235/0x800000eb on the [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md){:target="_blank"}.

FIO Private Keys follow standard Wallet Import Format (WIF) standard and public keys follow well-known base58 encoding with FIO prefix, for example:

`FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G`

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

The derivation path for FIO is:

`"44'/235'/0'/0/0"`

To test your FIO key derivation, use this mnemonic phrase:

`valley alien library bread worry brother bundle hammer loyal barely dune brave`

This is the expected Private Key:

`5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu`

This is the expected Public Key:

`FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o`

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

`linkauth` can be used to set custom permissions. Refer to the [linkauth code example]({{ site.baseurl }}/docs/recipes/linkauth/) which shows how to create a custom permission that can be used to register a FIO Address on a private FIO Domain.

---
id: keys
title: Keys, accounts, and permissions
sidebar_label: Keys, accounts, and permissions
layout: sidenav
sidebar: sidebars
---

## Private/Public Keys

FIO Chain’s is registered at index 235/0x800000eb on the [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md){:target="_blank"}.

FIO Private Keys follow standard Wallet Import Format (WIF) standard and public keys follow well-known base58 encoding with FIO prefix, e.g.

FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

### FIO Key Derivation Path:

`"44'/235'/0'/0/0"`

### FIO Key Generation Testing

Using this mnemonic phrase:

`valley alien library bread worry brother bundle hammer loyal barely dune brave`

This is the expected Private Key:

5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu``

This is the expected Public Key:

`FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o`

## Automatic account creation

Inherited from EOSIO, FIO Chain has the notion of accounts. In order to make it easier for developers to be able to integrate with the FIO Blockchain, the FIO accounts are created automatically in the following instances:

* FIO tokens are being sent to a FIO public key using /transfer_tokens_pub_key and the supplied recipient’s public key is not associated to an account.
* FIO Address or FIO Domain is being registered using /register_fio_domain or /register_fio_address and the supplied owner’s public key is not associated to an account.

There is no other way to create an account, but to send tokens to a public key or register address/domain to a public key.

## Account names

FIO Chain uses a [custom hash function](), which when applied to a public key, produces an EOSIO-compliant default account name. There is no way to create a custom name for an an account.

## Custom permissions

When an account is ceated automatically the corresponding public key is inserted as owner and active permission. FIO Chain uses the same permission model as EOSIO, except that:

Only one public key can be specified for any one account
“waits” are not supported
Custom permissions are not currently supported by the SDKs, so some wallets may not handle accounts with custom permissions.
It is important to note that the only way to send tokens is to use /transfer_tokens_pub_key which will always send the funds to the account which is a hash of the public key, even if that key is set as permission on other accounts.

### linkauth

[Example of how to use linkauth](/pages/recipes/linkauth/) to allow specific account to register FIO Addresses on private domain.

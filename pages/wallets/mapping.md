---
id: mapping
title: Mapping Public Addresses
sidebar_label: Mapping Public Addresses
layout: sidenav
sidebar: sidebars
---

Mapping Public Addresses

Overview

One of the key utilities of the FIO Protocol is the ability to send crypto using a FIO Address, instead of complicated Native Blockchain Public Address (NBPA) such as 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B on Ethereum.

A wallet can very easily look-up the NBPA using the /get_pub_address method.

However, before this can happen the wallet hosting the FIO Address must first map the NBPA to the FIO Address.

Mapping NBPAs to FIO Address

To map NBPA to a FIO Address use the /add_pub_address method.

You may pass up to 5 public addresses in a single call. The call is eligible for bundled transactions, so in most cases there will not be a fee to the user.

Each NBPA is identified with:

chain_code identifies the blockchain, such as Bitcoin (BTC), or Ethereum (ETH).
token_code identifies the token on that blockchain, for example USDC represents ERC20 token on Ethereum.
For blockchains that only have one token use the same value for blockchain and token, e.g. for Bitcoin use chaincode: BTC, tokencode: BTC.

FIO maintains a list of chain and token codes that are being used by other FIO Protocol integrators. It is recommended that you follow this standard any time you submit a transaction on the FIO Protocol. If you are using different codes please map them to those published.

If you are using codes which are not yet part of the standard, please submit a pull request to the list to ensure other FIO Protocol integrators are using the same codes.

Multi-level Addressing

Certain blockchains, or accounts on those blockchains, require the use of Multi-level Addressing, when, in addition to public address, additional piece of information is required to properly route a transaction.

The following are examples:

Destination Tags on Ripple
Memos on Stellar
Payment ID on Monero
There is not a clear standard on how to properly communicate these additional properties. The FIO Protocol will support both integrated addresses as well as URI Scheme as follows:

Integrated Address - an integrated address may be passed in just like standard public address. The FIO protocol does not perform validation on the passed string.
URI Scheme - the FIO Protocol will support the formatting of public addresses using URI Schemes, where certain attributes are appended to the public address following a ‘?’ and delimited with ‘&’.
URI Parameters

FIO maintains a list of uri parameters that are being used by other FIO Protocol integrators. It is recommended that you follow this standard any time you submit a transaction on the FIO Protocol.

If you are using parameters which are not yet part of the standard, please submit a pull request to the list to ensure other FIO Protocol integrators are using the same parameters.

See example of a FIO Address which has public addresses with parameters.

What should a wallet do?

When resolving a FIO Address, expect that the returned public address will contain URI parameters.
Most common is memo. If you receive a memo, insert it into the memo (or equivalent) parameter for the native transaction on that blockchain.
If you receive any of the other parameters above, insert it into corresponding parameter for the native transaction on that blockchain.
If you do not support ability to accept returned parameters, consider warning the user that the FIO Address they used contains information which will not be used.
Privacy

Currently NBPA mappings are stored on the FIO Chain unencrypted. It is therefore possible for an observer to connect multiple NBPAs via their parent FIO Address.

It is therefore important that integrating wallets clearly communicate this to their users, so that they can make an educated decision on which NBPAs to map. In addition users should understand that due to the nature of blockchain once NBPA has been published on the blockchain it will be accessible indefinitely, even if it is later “removed” from current mappings.

For inspiration, please review sample Wallet UX screens for Connecting NBPAs.

Changing or removing NBPAs

NBPA mappings can be changed using the same /add_pub_address method.

Specific NBPA mappings can be removed using /remove_pub_address method.

All NBPA mappings can be removed using /remove_all_pub_address method. FIO token mapping will not be removed.

FIO Public Key mapping

The FIO Public key which was used to register FIO Address is automatically added to that address’ mapping for chaincode: FIO, tokencode: FIO.

This mapping serves two distinct purposes:

When another user wants to send FIO tokens to that FIO Address, the mapped public key will be returned in /get_pub_address to enable that transfer.
When another user is sending new_funds_request or record_obt_data to that FIO Address, the mapped public key will be used to encrypt the data. It is therefore critical that:
The associate private key is accessible and available in the wallet to decrypt that data. Wallets should not allow users to map a random FIO Public Key.
If a user tries to remove FIO Public key mapping, they should be advised that they will not be able to receive a FIO Request or Record OBT Data in the future until a valid FIO Public key is added back.
Mapping FIO Address to bank accounts

FIO Address can also be mapped to bank account information required to route fiat transactions. For this purpose chain_code: FIAT should be used and token_code should correspond to the banking standard used.

For example to map FIO Address to a ACH bank account:

{
	"chain_code": "FIAT",
	"token_code": "ACH",
	"public_address": "{'aba':'102000076','acc':'1234567890'}"
}
To map FIO Address to an IBAN bank account:

{
	"chain_code": "FIAT",
	"token_code": "IBAN",
	"public_address": "{'iban':'DE89370400440532013000'}"
}


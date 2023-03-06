---
layout: page-int
title: Mapping Public Addresses
description: Mapping Public Addresses
redirect_from:
    - /docs/integration-guide/mapping
---

# Mapping Public Addresses

One of the key utilities of the FIO Protocol is the ability to send crypto using a [FIO Crypto Handle](https://kb.fioprotocol.io/fio-protocol/fio-addresses){:rel="nofollow noopener noreferrer" target="_blank"} (aka FIO Address), instead of complicated Native Blockchain Public Address (NBPA) such as 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B on Ethereum.

A wallet can very easily look-up the NBPA using the [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) method. However, before this can happen the wallet hosting the FIO Crypto Handle must first map the NBPA to the FIO Crypto Handle.

---
## How Does a FIO Crypto Handle map to public addresses?

Applications that enable users to manage their private keys (such as crypto wallets) which integrate the FIO Protocol have two options on enabling mapping of associated public addresses to the human readable FIO Crypto Handle.  First, the product may automatically map all public addresses enabled in the product to the FIO Crypto Handle by signing a mapping transaction on the FIO blockchain.  Second, the product may enable users to select which chains to map to their FIO Crypto Handle through a radio button or similar interface.  In either of these implementations users never have to see nor interact with their public addresses to accomplish mapping.

---
## Mapping Native Public Blockchain Addresses (NBPA) to a FIO Crypto Handle

To map NBPA to a FIO Crypto Handle use the [addaddress]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) method.

You may pass up to 5 public addresses in a single call. The call is eligible for [bundled transactions](https://kb.fioprotocol.io/fio-protocol/fio-addresses/bundling-and-fees){:rel="nofollow noopener noreferrer" target="_blank"}, so in most cases there will not be a fee to the user.

Each NBPA is identified with:

* *chain_code* identifies the blockchain, such as Bitcoin (BTC), or Ethereum (ETH).
* *token_code* identifies the token on that blockchain, for example USDC represents [ERC20 token on Ethereum](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48){:rel="nofollow noopener noreferrer" target="_blank"}.

For blockchains that only have one token use the same value for blockchain and token, e.g. for Bitcoin use chaincode: BTC, tokencode: BTC.

FIO [maintains a list of chain and token codes](https://github.com/fioprotocol/fips/blob/master/fip-0015.md){:rel="nofollow noopener noreferrer" target="_blank"} that are being used by other FIO Protocol integrators. It is recommended that you follow this standard any time you submit a transaction on the FIO Protocol. If you are using different codes please map them to those published.

If you are using codes which are not yet part of the standard, please submit a pull request to the list to ensure other FIO Protocol integrators are using the same codes.

[See example of a Testnet FIO Crypto Handle which has many NBPAs mapped](https://fio-test.bloks.io/address/map1@mappedaddresses){:rel="nofollow noopener noreferrer" target="_blank"}.

### Chain-level Public Addresses

 By specifying `*` for the `token_code` you can map all tokens for that chain to the same address. For example, you may want to map all of your ETH tokens to the same public address:

 ```
{
  "fio_address": "purse@alice",
  "public_addresses": [
    {
      "chain_code": "BTC",
      "token_code": "BTC",
      "public_address": "1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs"
    },
    {
      "chain_code": "ETH",
      "token_code": "*",
      "public_address": "0xab5801a7d398351b8be11c439e05c5b3259aec9b"
    }
  ],
  "max_fee": 0,
  "tpid": "rewards@wallet",
  "actor": "aftyershcu22"
}
 ```

 In this case, a user doing a [/get_pub_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_pub_address) lookup for the ETH USDC (or any ETH token) address for `purse@alice` would get the `0xab5801a7d398351b8be11c439e05c5b3259aec9b` public address returned.

 It is also possible to map both a `*` and a specific `token_code` to a single `chain_code`. For example: 

  ```
{
  "fio_address": "purse@alice",
  "public_addresses": [
    {
      "chain_code": "ETH",
      "token_code": "USDC",
      "public_address": "0xa635801a7d398351b8bb945439e05c5b3259b4d2"
    },
    {
      "chain_code": "ETH",
      "token_code": "*",
      "public_address": "0xab5801a7d398351b8be11c439e05c5b3259aec9b"
    }
  ],
  "max_fee": 0,
  "tpid": "rewards@wallet",
  "actor": "aftyershcu22"
}
 ```

 In this case, a user doing a `/get_pub_address` lookup for ETH USDC would get the first `public_address` returned. For any other ETH token, the second address would be returned.
 
 See [FIP-18](https://github.com/fioprotocol/fips/blob/master/fip-0018.md) for a more detailed description of chain-level public address functionality.

### Multi-level Addressing

Certain blockchains, or accounts on those blockchains, require the use of Multi-level Addressing, when, in addition to public address, additional piece of information is required to properly route a transaction.

The following are examples:

* Destination Tags on Ripple
* Memos on Stellar
* Payment ID on Monero

There is not a clear standard on how to properly communicate these additional properties. The FIO Protocol will support both integrated addresses as well as URI Scheme as follows:

* **Integrated Address** - an integrated address may be passed in just like standard public address. The FIO protocol does not perform validation on the passed string.
* **URI Scheme** - the FIO Protocol will support the formatting of public addresses using URI Schemes, where certain attributes are appended to the public address following a ‘?’ and delimited with ‘&’.

Please refer to the proposed [Chain and Token Code Standard](https://github.com/fioprotocol/fips/blob/master/fip-0015.md){:rel="nofollow noopener noreferrer" target="_blank"} for the proposed standard way to code chain and token codes as well as multi-level addressing parameters in FIO Protocol.

#### URI Parameters

FIO [maintains a list of uri parameters](https://github.com/fioprotocol/fips/blob/master/fip-0015.md){:rel="nofollow noopener noreferrer" target="_blank"} that are being used by other FIO Protocol integrators. It is recommended that you follow this standard any time you submit a transaction on the FIO Protocol.

If you are using parameters which are not yet part of the standard, please submit a pull request to the list to ensure other FIO Protocol integrators are using the same parameters.

[See example of a Testnet FIO Crypto Handle which has public addresses with parameters](https://fio.bloks.io/address/multilevel@fiotest){:rel="nofollow noopener noreferrer" target="_blank"}.

### Changing or removing NBPAs

NBPA mappings can be changed using the same [addaddress]({{site.baseurl}}/pages/api/fio-api/#options-addaddress) method.

Specific NBPA mappings can be removed using [remaddress]({{site.baseurl}}/pages/api/fio-api/#options-remaddress) method.

All NBPA mappings can be removed using [remalladdr]({{site.baseurl}}/pages/api/fio-api/#options-remalladdr) method. FIO token mapping will not be removed.

### FIO Public Key mapping

The FIO Public key which was used to register FIO Crypto Handle is automatically added to that address’ mapping for chaincode: FIO, tokencode: FIO.

This mapping serves two distinct purposes:

* When another user wants to send FIO tokens to that FIO Crypto Handle, the mapped public key will be returned in /get_pub_address to enable that transfer.
* When another user is sending [newfundsreq]({{site.baseurl}}/pages/api/fio-api/#options-newfundsreq) or [recordobt]({{site.baseurl}}/pages/api/fio-api/#options-recordobt) to that FIO Crypto Handle, the mapped public key will be used to encrypt the data. It is therefore critical that:
   * **The associate private key is accessible and available in the wallet to decrypt that data.** Wallets should not allow users to map a random FIO Public Key.
   * **If a user tries to remove FIO Public key mapping, they should be advised that they will not be able to receive a FIO Request or Record OBT Data in the future until a valid FIO Public key is added back.**

### Mapping FIO Crypto Handles to bank accounts

FIO Crypto Handle can also be mapped to bank account information required to route fiat transactions. For this purpose *chain_code*: FIAT should be used and *token_code* should correspond to the banking standard used.

For example to map FIO Crypto Handle to a ACH bank account:
```
{
	"chain_code": "FIAT",
	"token_code": "ACH",
	"public_address": "{'aba':'102000076','acc':'1234567890'}"
}
```

To map FIO Crypto Handle to an IBAN bank account:
```
{
	"chain_code": "FIAT",
	"token_code": "IBAN",
	"public_address": "{'iban':'DE89370400440532013000'}"
}
```

---
## Privacy

Currently NBPA mappings are stored on the FIO Chain unencrypted. It is therefore possible for an observer to connect multiple NBPAs via their parent FIO Crypto Handle.

It is therefore important that integrating wallets clearly communicate this to their users, so that they can make an educated decision on which NBPAs to map. In addition users should understand that due to the nature of blockchain once NBPA has been published on the blockchain it will be accessible indefinitely, even if it is later “removed” from current mappings.

---
## UX/UI Considerations

* When resolving a FIO Crypto Handle, expect that the returned public address will contain URI parameters.
* Most common is memo. If you receive a memo, insert it into the memo (or equivalent) parameter for the native transaction on that blockchain.
* If you receive any of the other parameters above, insert it into corresponding parameter for the native transaction on that blockchain.
* If you do not support ability to accept returned parameters, consider warning the user that the FIO Crypto Handle they used contains information which will not be used.
* **Note:** The application should direct users to mapping their tokens after registering a FIO Handle (or unmapping if the platform maps all tokens automatically).

---
## Quality Assurance Checklist

The following lists the items that should be tested to confirm support for FIO Mapping of blockchain addresses:
-  User is able to connect their FIO Crypto Handle to their crypto/tokens
-  User is able to disconnect their FIO Crypto Handle
-  Disconnecting the main FIO wallet is disabled (see [Mapping Public Addresses]({{site.baseurl}}/docs/integration-guide/handle-mapping))

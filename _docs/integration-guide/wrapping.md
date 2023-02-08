---
layout: page-int
title: FIO Token and Domain Wrapping Developer Guide
description: FIO Token and Domain Wrapping Developer Guide
---

# FIO Token and Domain Wrapping Developer Guide
## Overview
[FIP-17a](https://github.com/fioprotocol/fips/blob/master/fip-0017a.md){:target="_blank"} and [FIP-17b](https://github.com/fioprotocol/fips/blob/master/fip-0017b.md){:target="_blank"} introduce **FIO Token and Domain Wrapping** which enables the wrapping of FIO tokens and FIO domain NFTs to non-FIO chains.

FIO Wrapping opens up new use cases for FIO Tokens and Domains such as:
* Enables FIO Domains to be traded on NFT trading sites such as Open Sea as ERC-721s.
* Enables FIO tokens to be used in a rapidly growing Defi ecosystem such as Uniswap which rewards token holders for providing liquidity to decentralized exchanges.

This guide is intended to help integrators with FIO Wrapping integration into their products.

### Wrapping Contracts

FIO wrapping is enabled by a multisig oracle application run in a decentralized environment on FIO Block Producer (validator) nodes. The FIO Wrapping contracts are opensource modified ERC-20 and ERC-721 contracts.

|Protocol|Source Code |Mainnet Contract Address |
|---|---|---|
|WFIO on Ethereum|<https://github.com/fioprotocol/fio.erc20>{:target="_blank"} |[0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5](https://etherscan.io/address/0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5){:target="_blank"}|
|Wrapped Domains on Polygon|<https://github.com/fioprotocol/fio.erc721>{:target="_blank"} |[0x3AB00687AE60EeA770498b59685174E3FC81C424](https://polygonscan.com/address/0x3AB00687AE60EeA770498b59685174E3FC81C424){:target="_blank"}|

---
## How FIO Token Wrapping works

### Wrapping and unwrapping FIO Tokens

Token wrapping is accomplished using the [wraptokens]({{site.baseurl}}/pages/api/fio-api/#options-wraptokens) action on the FIO chain and passing in the amount of FIO Tokens to wrap. Wrapped tokens may be unwrapped by calling the `unwrap` action on the Ethereum wfio ERC20 contract. Note that wrapping and unwrapping cannot be accomplished entirely inside the FIO Protocol and requires FIO oracle middleware software and an ERC20 contract on the Ethereum chain.

The following gives an overview of the token wrapping process:

* Alice wants to wrap 100 FIO tokens to her Ethereum public address on the Ethereum chain.
* Alice fetches the Oracle fee using `/get_oracle_fees`.
* Alice executes the [wraptokens]({{site.baseurl}}/pages/api/fio-api/#options-wraptokens) action and passes in:
  * amount: 100000000000  *(the amount of FIO to be wrapped, in SUFs)*
  * public_address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"  *(the Ethereum address where tokens should be delivered)*
  * chain_code: "ETH"  *(For the initial version, only token wrapping to the ETH chain is supported)*
  * max_oracle_fee: 2000000000  *(maximum amount of FIO user A is willing to pay the Oracles)*
  * max_fee: 1000000000  *(maximum amount of FIO user A is willing to pay for the FIO chain fee)*
  * tpid: "rewards@wallet"
  * actor: "aftyershcu22"
* 100 FIO tokens are transferred from Alice to the wrapping smart contract account on the FIO chain.
* Oracle fee is transferred from Alice and distributed evenly to all registered Oracles.
* Oracles monitor every block looking for the `wraptoken` action.
* Once detected Oracles trigger minting of wrapped `WFIO` tokens to Alice's public address on the Ethereum chain.

The following gives an overview of the token unwrapping process:

* Alice wants to unwrap 50 WFIO tokens from Ethereum to her crypto handle on FIO Chain.
* Alice executes the `unwrap` action on the Ethereum contract.
* Oracles monitor unwrap events on the Ethereum contract.
* Once detected each Oracle executes the `unwraptoken` action on the FIO chain and passes in:
  * amount: 50000000000  (the amount of FIO to be unwrapped, in SUFs)
  * fio_address: "alice@wallet" (The crypto handle which will recieve the unwrapped tokens)
* Once the last Oracle executes `unwraptokens` action, the tokens are transferred to Alice's FIO account.


### Wrapping and unwrapping FIO Domains

Domain wrapping is accomplished using the [wrapdomain]({{site.baseurl}}/pages/api/fio-api/#options-wrapdomain) action. Wrapped domains may be unwrapped by calling the `unwrapnft` action on the Polygon fionft ERC721 contract. Note that wrapping and unwrapping cannot be accomplished entirely inside the FIO Protocol and requires FIO oracle middleware software and an ERC721 contract on the Polygon chain.

The following gives an overview of the domain wrapping process:

* Alice wants to wrap her `alice` domain to her public address on the Polygon chain.
* Alice fetches the Oracle fee using `/get_oracle_fees`.
* Alice executes the [wrapdomain]({{site.baseurl}}/pages/api/fio-api/#options-wrapdomain) action and passes in:
  * domain: "alice"  *(the amount of FIO to be wrapped, in SUFs)*
  * public_address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"  *(the Polygon address where domain should be delivered)*
  * chain_code: "MATIC"  *(For the initial version, only domain wrapping to the Polygon "MATIC" chain is supported)*
  * max_oracle_fee: 2000000000  *(maximum amount of FIO user A is willing to pay the Oracles)*
  * max_fee: 1000000000  *(maximum amount of FIO user A is willing to pay for the FIO chain fee)*
  * tpid: "rewards@wallet"
  * actor: "aftyershcu22"
* The domain is transferred from Alice to the wrapping smart contract account on the FIO Chain.
* Oracle fee is transferred from Alice and distributed evenly to all registered Oracles.
* Oracles monitor every block looking for the `wrapdomain` action.
* Once detected Oracles trigger minting of a FIO Domain NFT to Alice's public address on the Polygon chain.

The following gives an overview of the domain unwrapping process:

* Alice wants to unwrap her `alice` domain from Polygon to her crypto handle on FIO Chain.
* Alice executes the `unwrapnft` action on the Polygon contract.
* Oracles monitor unwrapnft events on the Polygon contract.
* Once detected each Oracle executes the `unwrapdomain` action on the FIO chain and passes in:
  * fio_domain: "alice"  (the amount of FIO to be unwrapped, in SUFs)
  * fio_address: "alice@wallet" (The crypto handle which will recieve the unwrapped domain)
* Once the last Oracle executes `unwrapdomain` action, the domain ownership is transferred to Alice's FIO account.

### Getting information about wrapped tokens and domains

Once your FIO tokens are wrapped to WFIO on Ethereum, you can view them by adding the WFIO token to any Ethereum wallet. For example, to add the WFIO token to Metamask:

* In Metamask > Assets, scroll to bottom and click on Add Token
* Add the WFIO Etherem token wrapping contract address.
* Token Symbol and Token Decimal should get filled in automatically.

FIO Domains can be viewed in Ethereum wallets that support NFTs or you can view them in NFT applications like Opensea. For example, to view in OpenSea:
* Go to: https://opensea.io/
* Connect your Metamask wallet that contains the key used for the wrapped domain
* Any NFTs associated with that key will now show up. You may have to go into Opensea > More > Hidden to view the NFT (which you can then unhide)

### Testnet Wrapping

FIO Token and Domain Wrapping can be tested using the [FIO Testnet]({{site.baseurl}}/docs/chain/testnet) and the following 

|Protocol|Source Code |Testnet Contract |
|---|---|---|
|WFIO on Ethereum Goerli Testnet|<https://github.com/fioprotocol/fio.erc20>{:target="_blank"} |[0xb622F030Be649aAAa9f32faa2b0C0E02986D75F2](https://goerli.etherscan.io/address/0xb622F030Be649aAAa9f32faa2b0C0E02986D75F2){:target="_blank"}|
|Wrapped Domains on Polygon Mumbai Testnet|<https://github.com/fioprotocol/fio.erc721>{:target="_blank"} |[0x3EB054ed86087fE9Eb724895127A24D27cD8466F](https://mumbai.polygonscan.com/address/0x3EB054ed86087fE9Eb724895127A24D27cD8466F){:target="_blank"}|

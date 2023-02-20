---
layout: page-int
title: FIO Token Support
description: FIO Token Support
---

# WFIO ERC20 Token Support

This page provides information for integration partners looking to list the WFIO token.

---
## Overview

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO and WFIO are expressed in SUFs.

Token holders wanting to use their FIO tokens in the Ethereum Defi ecosystem may wrap their tokens using the [FIO Dashboard](https://dashboard.fioprotocol.io){:target="_blank"} or directly through the [wraptokens]({{site.baseurl}}/pages/api/fio-api/#options-wraptokens) action. Wrapped tokens can be used to provide liquidity in decentralized exchanges such as [Uniswap](https://info.uniswap.org/#/pools/0x937d916a12de773043139e79e58da8a4b93623ed){:target="_blank"}.

FIO Token wrapping is enabled by a multisig oracle application run in a decentralized environment on FIO Block Producer (validator) nodes. The FIO token wrapping contract is a modified ERC-20 opensource contract.

|Protocol|Source Code |Mainnet Contract |
|---|---|---|
|WFIO on Ethereum|<https://github.com/fioprotocol/fio.erc20>{:target="_blank"} |[0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5](https://etherscan.io/address/0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5){:target="_blank"}|

### Transferring WFIO

WFIO tokens on the Ethereum chain are transferred using the [transferFrom](https://etherscan.io/address/0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5#writeContract#F14){:target="_blank"} action. The action requires an Ethereum Address for the payer (the person sending the funds), the payee (the person receiving the funds), and an amount, in SUFs.

### Checking token balance

Token balance can be obtained by passing a user's Ethereum address to [balanceOf](https://etherscan.io/address/0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5#readContract#F6){:target="_blank"} contract method.

### Retrieving account balances and transaction history

WFIO token transaction history will conform to other ERC20 tokens supported in your wallet or exchange. Centralized Ethereum API services such as [Infura](https://docs.infura.io/infura/tutorials/ethereum/track-erc-20-token-transfers){:target="_blank"} and [Alchemy](https://docs.alchemy.com/docs/how-to-get-transaction-history-for-an-address-on-ethereum){:target="_blank"} enable the retrieval of transaction history for a smart contract or a user.
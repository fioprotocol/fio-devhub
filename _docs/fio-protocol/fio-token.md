---
layout: page-fio
title: FIO Token
description: FIO Token
---
# FIO Token

The FIO Protocol is powered by a utility token (FIO). The FIO Token is used to pay for transactions processed through the FIO Chain. To hold a token or a FIO Crypto Handle/Domain, a user only needs a private/public key pair, and all transfers can be achieved using a FIO public key. This allows support of FIO Tokens without any special functionality. 

FIO Tokens support the SLIP-44 (FIO index at position 235) standard. When a user chooses to restore seed phrases from one wallet to another, the FIO Tokens as well as FIO Crypto Handles and Domains will be restored. 

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

* Ticker: FIO
* Symbol: ᵮ
* [Brand Assets](https://fioprotocol.io/brand-assets/)

## WFIO Token

Token holders wanting to use their FIO tokens in the Ethereum Defi ecosystem may wrap their tokens using the [FIO Dashboard](https://dashboard.fioprotocol.io){:target="_blank"}  or directly through the [wraptokens]({{site.baseurl}}/pages/api/fio-api/#options-wraptokens) action. Wrapped tokens can be used to provide liquidity in decentralized exchanges such as [Uniswap](https://info.uniswap.org/#/pools/0x937d916a12de773043139e79e58da8a4b93623ed){:target="_blank"}.

FIO Token wrapping is enabled by a multisig oracle application run in a decentralized environment on FIO Block Producer (validator) nodes. The FIO token wrapping contract is a modified ERC-20 opensource contract.

|Protocol|Source Code |Mainnet Contract |
|---|---|---|
|WFIO on Ethereum|<https://github.com/fioprotocol/fio.erc20>{:target="_blank"} |[0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5](https://etherscan.io/address/0xbEA269038Eb75BdAB47a9C04D0F5c572d94b93D5){:target="_blank"}|

For information on integrating token wrapping into your application, refer to the [wrapping developers guide]({{site.baseurl}}/docs/integration-guide/wrapping).
## Token Economics

* Maximum Total Supply: 1,000,000,000 FIO (38,506,000 of which are permanently locked)
* Each token is divisible into 1,000,000,000 Smallest Units of FIO (SUF)
* No inflation beyond the Maximum Total Supply

Demand for FIO Tokens arises from: 

1. Users needing tokens for utility of the FIO Protocol (e.g. registering FIO Crypto Handles/Domains as well as other transaction fees) 
2. Individuals and entities desiring tokens for the purposes of voting towards block production
3. The possibility that some wallets or exchanges may choose to compensate their users for holding FIO tokens which they can then vote towards block production

The market-based fees element of the FIO Protocol ensures that the actual token charges to users continually adjust based on roughly the current human perceived value of a FIO Token. So, for example, as the FIO Token value goes up, the charge for a specific utility like registering a FIO Crypto Handle will go down in absolute number of FIO Tokens being charged.

Fees collected for FIO Crypto Handle/Domain registration are not immediately distributed, but rather locked and distributed evenly every day over a period of one year. This ensures Block Producers processing bundled transactions are properly compensated.

## Obtaining token supply in real-time

The Foundation operates API end-points which return token supply statistics, specifically:

|Statistic |Description |End-point|
|---|---|---|
|Total supply	|All tokens that were ever minted. Maximum token supply is capped at 1,000,000,000 FIO.	|<https://fioprotocol.io/supply>{:target="_blank"} |
|Circulating supply	|Total supply less locked tokens at Mainnet launch.	 Tokens locked post Mainnet via BP Pool or FIP-6 locks are considered circulating.|<https://fioprotocol.io/circulating>{:target="_blank"} |
|Locked tokens	|Tokens which are locked and cannot be transferred.	|<https://fioprotocol.io/locked>{:target="_blank"} |

Data returned includes 9 decimal points, e.g. 705906876.848960519

To return data in Smallest Units of FIO (SUFs), add /suf to end point, e.g. <https://fioprotocol.io/supply/suf>{:target="_blank"}

To return the data as json, add ?json=true top end point, e.g. <https://fioprotocol.io/supply?json=true>{:target="_blank"}
## Quality Assurance Checklist

The following lists the items that should be tested to confirm support for FIO Token Support:
-  Receive FIO Tokens to wallet using FIO Public Key
-  Send FIO Tokens using FIO Public Key
-  FIO transaction history is avaialable including sent FIO (including fees) received FIO
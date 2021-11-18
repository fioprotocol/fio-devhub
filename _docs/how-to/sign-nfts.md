---
title: Signing NFTs using FIO Address
description: Signing NFTs using FIO Address
redirect_from:
    - /docs/integration-guide/sign-nfts
---

# Sign NFTs
## Overview
[FIP-27](https://github.com/fioprotocol/fips/blob/master/fip-0027.md) has introduced the ability to use FIO Address to sign NFTs. An NFT is considered signed, when the owner of the FIO Address maps the NFT's contract address and token ID on specific chain to their FIO Address. This acts as an attestation that they created the NFT. If the FIO Address is known, e.g. artist publishes it on their twitter, website, etc., the attestation can act as a signature of the specific NFT.

In addition, the artist can also append the hash of the asset (e.g. image, video, etc.) to ensure that the NFT points to the actual art work. This is important given that the files associated with the NFT are not always recorded on a permanent and verifable storage.

## How to sign an NFT
To sign an NFT, use the [addnft]({{site.baseurl}}/pages/api/fio-api/#options-addnft) action and supply:
|parameter|description|
|---|---|
|chain_code|Alphanumeric chain code as described in [FIP-15](https://github.com/fioprotocol/fips/blob/master/fip-0015.md), e.g. ETH for Ethereum|
|contract_address|Public address of the smart contract which has minted the NFT, e.g. 0x12f28e2106ce8fd8464885b80ea865e98b465149 for Beeple Special Edition contract.|
|token_id|Token ID of the specific token on the smart contract provided, e.g. 100010001. It may be left blank to "sign" all tokens of that contract.|
|url|NFT asset url, e.g. link to the image.|
|hash|SHA256 hash of the NFT asset.|
|metadata|Currently only creator url is supported, e.g. artist’s website, in a JSON format like this: "{\"creator_url\":\"https://yahoo.com/\"}"|

## How to change NFTs
To change chain_code, contract_address, or token_id, first remove the NFT, the add it back in. To change any other value, resubmit [addnft]({{site.baseurl}}/pages/api/fio-api/#options-addnft) action with new parameters.

## How to remove NFTs
To remove NFTs association from FIO Address use the [remnft]({{site.baseurl}}/pages/api/fio-api/#options-remnft) to remove individual NFTs or [remallnfts]({{site.baseurl}}/pages/api/fio-api/#options-remallnfts) to remove all NFTs.

# Fetch NFT signatures
The following getter methods are available to fetch NFT signatures
|Method|Description|
|---|---|
|[/get_nfts_fio_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_nfts_fio_address)|Returns a list of NFTs which were signed by the supplied FIO Address. It's best used to display all NFTs signed by a known FIO Address, e.g. FIO Address advertised by an artist as theirs.|
|[/get_nfts_contract]({{site.baseurl}}/pages/api/fio-api/#post-/get_nfts_contract)|Returns a list of NFTs which match the supplied chain_code, contract_address, and token_id. It's best used to return a list of signatures for a specific token on a specific chain and smart contract, e.g. to validate it has been signed by a known FIO Address. Currently, if an NFT is signed with blank token_id, querying for a specific token ID will not return that signature. It's therefore advisable to query both for specific token_id as well as blank token_id to return any signatures at the smart contract level.  Please note that multiple signatures may be returned for the same NFT.|
|[/get_nfts_hash]({{site.baseurl}}/pages/api/fio-api/#post-/get_nfts_hash)|Returns a list of NFTs which contain the supplied NFT asset hash. It's best used to see if a specific image has been signed as an NFT and which specific NFT contains it.|

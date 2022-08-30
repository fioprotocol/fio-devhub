---
layout: page-int
title: Signing NFTs using FIO Crypto Handle
description: Signing NFTs using FIO Crypto Handle
redirect_from:
    - /docs/integration-guide/sign-nfts
---

# Sign NFTs

## Overview

[FIP-27](https://github.com/fioprotocol/fips/blob/master/fip-0027.md) has introduced the ability to use a FIO Crypto Handle (aka FIO Address) to sign NFTs. An NFT is considered signed when the owner of the FIO Crypto Handle maps the NFT's contract address and token ID on specific chain to their FIO Crypto Handle. This acts as an attestation that they created the NFT. If the FIO Crypto Handle is known, for example an artist may publish their Crypto Handle on their twitter account or website, then the attestation can act as a signature of the specific NFT.

For example, if an NFT has been signed and a user wants to know if their NFT is legitmate, they could verify the NFT signature by passing in the chain code, contract address, and token ID to the FIO chain:

```
curl -s -XPOST https://fiotestnet.blockpane.com/v1/chain/get_nfts_contract -d '{
    "chain_code": "MATIC",
    "contract_address": "0xF5193f7c4312cA0759C91080e94E957F77669116",
    "token_id": "10"
}'
```

This returns `"fio_address":"1969@woodstock` thus verifying that the NFT was signed by the owner of the `1969@woodstock` crypto handle.


In addition, the artist can also append the hash of the asset (e.g. image, video, etc.) to ensure that the NFT points to the actual art work. This is important given that the files associated with the NFT are not always recorded on permanent and verifable storage. For example, if the json for an NFT points to a generic URL for the image (e.g., http://shiftynfts.com/mynftimage.jpg) then there is a risk that the image of the NFT could get swapped out by a bad actor. In this case you may want to include the hash of your NFT in the signature. For example:

```
/add_nft
{
  "fio_address": "1969@woodstock",
  "nfts": [
    {
      "chain_code": "MATIC",
      "contract_address": "0xF5193f7c4312cA0759C91080e94E957F77669116",
      "token_id": "22",
      "url": "http://shiftynfts.com/mynftimage.jpg",
      "hash": "f83b5702557b1ee76d966c6bf92ae0d038cd176aaf36f86a18e2ab59e6aefa4c",
      "metadata": ""
    }
  ],
  "max_fee": 10000000000,
  "actor": "aftyershcu22",
  "tpid": "rewards@wallet"
}
```

This verifies that at the time this NFT was signed, the hash of `mynftimage.jpg` was `f83b5702557b1ee76d966c6bf92ae0d038cd176aaf36f86a18e2ab59e6aefa4c`. If another user acquires the NFT, they can get the hash of the image currently at http://shiftynfts.com/mynftimage.jpg and verify the signature:

```
curl -s -XPOST https://fiotestnet.blockpane.com/v1/chain/get_nfts_hash -d '{
    "hash": "f83b5702557b1ee76d966c6bf92ae0d038cd176aaf36f86a18e2ab59e6aefa4c"
}'
```

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

#### Signing all NFTs on a contract

In certain cases you may want to sign every NFT (every Token ID) minted on a contract so it can be verified. This can be done by creating a "generic" contract-level signature where the token ID and other details of the NFT are not included. For example:

```
/add_nft
{
  "fio_address": "1969@woodstock",
  "nfts": [
    {
      "chain_code": "MATIC",
      "contract_address": "0xF5193f7c4312cA0759C91080e94E957F77669116",
      "token_id": "",
      "url": "",
      "hash": "",
      "metadata": ""
    }
  ],
  "max_fee": 10000000000,
  "actor": "aftyershcu22",
  "tpid": "rewards@wallet"
}
```

In this case, every token ID associated with this MATIC contract is considered signed by the 1969@woodstock Crypto Handle.

## How to change NFT signature information

- To change chain_code, contract_address, or token_id, first remove the NFT, then add it back in. 
- To change any other value, resubmit [addnft]({{site.baseurl}}/pages/api/fio-api/#options-addnft) action with new parameters.

## How to remove an NFT signature

To remove NFTs association from FIO Crypto Handle use the [remnft]({{site.baseurl}}/pages/api/fio-api/#options-remnft) to remove individual NFTs or [remallnfts]({{site.baseurl}}/pages/api/fio-api/#options-remallnfts) to remove all NFTs.

## Fetching NFT signature information

The following getter methods are available to fetch NFT signature information:

|Method|Description|
|---|---|
|[/get_nfts_fio_address]({{site.baseurl}}/pages/api/fio-api/#post-/get_nfts_fio_address)|Returns a list of NFTs which were signed by the supplied FIO Crypto Handle. It's best used to display all NFTs signed by a known FIO Crypto Handle, e.g. FIO Crypto Handle advertised by an artist as theirs.|
|[/get_nfts_contract]({{site.baseurl}}/pages/api/fio-api/#post-/get_nfts_contract)|Returns a list of NFTs which match the supplied chain_code, contract_address, and token_id. It's best used to return a list of signatures for a specific token on a specific chain and smart contract, e.g. to validate it has been signed by a known FIO Crypto Handle. Currently, if an NFT is signed with blank token_id, querying for a specific token ID will not return that signature. It's therefore advisable to query both for specific token_id as well as blank token_id to return any signatures at the smart contract level.  Please note that multiple signatures may be returned for the same NFT.|
|[/get_nfts_hash]({{site.baseurl}}/pages/api/fio-api/#post-/get_nfts_hash)|Returns a list of NFTs which contain the supplied NFT asset hash. It's best used to see if a specific image has been signed as an NFT and which specific NFT contains it.|

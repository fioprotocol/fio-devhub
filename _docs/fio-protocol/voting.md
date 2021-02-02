---
title: Voting for block producers
description: Voting for block producers
---
# Voting for block producers
Token holders are encouraged to vote for a proxy or directly vote for block producers. There are several ways to vote.

## Voting using clio

 Examples below require a url to an API endpoint. For Mainnet, you can find the list of current API nodes here: [https://github.com/fioprotocol/fio.mainnet](https://github.com/fioprotocol/fio.mainnet){:rel="nofollow noopener noreferrer" target="_blank"}

### 1) Download Clio

[Download clio executable](https://github.com/fioprotocol/fio.ready){:rel="nofollow noopener noreferrer" target="_blank"} for MAC with latest OS installed.

You will have to grant an exception for a blocked app by clicking the Open Anyway button in the General pane of Security & Privacy preferences. This button is available for about an hour after you try to open the app.

To open this pane on your Mac, choose Apple menu > System Preferences, click Security & Privacy, then click General.

### 2) Derive private key from seed phrase

*If you already have a private key, skip this step*

If you only have seed phrases you will need to derive your private key from the seed phrases.

Please make sure you do this on a secure computer, ideally not connected to the internet.

**bip39 tool**

The easiest way to derive your public key from a seed phrase is to [download the latest bip39 standalone tool](https://github.com/iancoleman/bip39/releases){:rel="nofollow noopener noreferrer" target="_blank"}.

* Enter BIP39 Mnemonic
* Select FIO Coin
* See Derived Addresses

**Typescript SDK**

You can also use [Typescript SDK]({{ site.baseurl }}/docs/sdk-typescript/sdk-js-using/) to derive your public key from a seed phrase.

Once you install Typescript SDK run

`node index.js`

Where index.js is:

```
const fio = require('@fioprotocol/fiosdk');
const mnemonic = 'valley alien library bread worry brother bundle hammer loyal barely dune brave'

async function genKeysFromMnemonic () {

  console.log("")
  console.log("From This Mnemonic:")
  console.log(mnemonic)
  console.log("")

  const privateKeyRes = await fio.FIOSDK.createPrivateKeyMnemonic(mnemonic)
  console.log("private key generated:")
  console.log((privateKeyRes.fioKey))
  console.log("")

  const publicKeyRes = fio.FIOSDK.derivedPublicKey(privateKeyRes.fioKey)
  console.log("public key generated")
  console.log((publicKeyRes.publicKey))
  console.log("")
}

genKeysFromMnemonic()
```

### 3) Create wallet

`./clio wallet create -n nameforyourwallet --to-console`

Make sure you save the automatically generated password. You will need it in the future to unlcok your wallet:

`./clio wallet unlock -n nameforyourwallet`

### 4) Import your private key

`./clio wallet import --private-key privatekeytoimport -n nameforyourwallet`

### 5) Display list of producers

`./clio -u https://APINODEURL system listproducers`

### 6) Vote for producers

`./clio -u https://APINODEURL system voteproducer prods voter@fio myactorname 600000000 bp1@producer bp2@producer`

Where:

* **voter@fio** is your FIO Address.
* **myactorname** is your account name on FIO Chain. If not sure what this is paste your FIO public key on the Chain Explorer Page and you will see the associated account name. You can also type:
  
`./clio convert fiokey_to_account FIOPUBLICKEY`

* **bp1@producer bp2@producer** list of FIO Addresses of producers delimited by space. You can list up to 30 block producers. Each producer will receive the same amount of votes equal to number of tokens in your account.

## Signing offline using clio

If you do not want your private key to reside on a computer connected to the internet and prefer to sign on an air-gapped computer, you can skip Import your private key step above and break the Vote for producer step into a few smaller steps as follows.

### On computer connected to the internet

Create a transaction

`./clio -u https://APINODEURL system voteproducer prods voter@fio myactorname 600000000 bp1@producer bp2@producer -d -s -x 1000`

Copy the returned transaction and transfer it to the air gapped computer.

### On air gapped computer

Sign the transaction
```
./clio sign '{
  "expiration": "2020-03-24T19:56:06",
  "ref_block_num": 47854,
  "ref_block_prefix": 2830093167,
  "max_net_usage_words": 0,
  "max_cpu_usage_ms": 0,
  "delay_sec": 0,
  "context_free_actions": [],
  "actions": [{
      "account": "eosio",
      "name": "voteproducer",
      "authorization": [{
          "actor": "gr1aogzftpll",
          "permission": "active"
        }
      ],
      "data": "010e6774674066696f746573746e65740f766f74654066696f746573746e65741063cdeb336ac2650046c32300000000"
    }
  ],
  "transaction_extensions": [],
  "signatures": [],
  "context_free_data": []
}'  -k YOURPRIVATEKEY -c CHAINID
```

Where:

* **YOURPRIVATEKEY** is your private key
* **CHAINID** is the Mainnet chain id which you can obtain by calling /get_info

Copy the returned transaction and transfer it to the computer connected to the internet.

### On computer connected to the internet

Pack the transaction

```
./clio -u https://APINODEURL convert pack_transaction '{
  "expiration": "2020-03-24T19:56:06",
  "ref_block_num": 47854,
  "ref_block_prefix": 2830093167,
  "max_net_usage_words": 0,
  "max_cpu_usage_ms": 0,
  "delay_sec": 0,
  "context_free_actions": [],
  "actions": [{
      "account": "eosio",
      "name": "voteproducer",
      "authorization": [{
          "actor": "gr1aogzftpll",
          "permission": "active"
        }
      ],
      "data": "010e6774674066696f746573746e65740f766f74654066696f746573746e65741063cdeb336ac2650046c32300000000"
    }
  ],
  "transaction_extensions": [],
  "signatures": [
    "SIG_K1_JxxUhhDRVw7eXHqYcd9TEBaDEjMo3bBs669tUbt2Fpu74neTJZGsTxva1dpWZukhn8VBQiHHYfhdwhJYdoaBLsYwa7McWV"
  ],
  "context_free_data": []
}'
```

Submit the transaction to the chain using curl.

```
curl -d '{
  "signatures": [
    "SIG_K1_JxxUhhDRVw7eXHqYcd9TEBaDEjMo3bBs669tUbt2Fpu74neTJZGsTxva1dpWZukhn8VBQiHHYfhdwhJYdoaBLsYwa7McWV"
  ],
  "compression": "none",
  "packed_context_free_data": "",
  "packed_trx": "d6657a5eeeba6fcbafa800000000010000000000ea30557015d289deaa32dd011063cdeb336ac26500000000a8ed323230010e6774674066696f746573746e65740f766f74654066696f746573746e65741063cdeb336ac2650046c3230000000000"
}' https://APINODEURL/v1/chain/push_transaction
```

If your transaction was successful you will receive a transaction ID and confirmation inside a Signed transaction response.

## Voting using Typescript SDK + air gapped signing

Download and install [fioprotocol.localsign repo](https://github.com/fioprotocol/fio.localsign){:rel="nofollow noopener noreferrer" target="_blank"}. It contains instructions on how to configure the script to:

* Build the voting transaction
* Sign the transaction on an air gapped computer
* Broadcast transaction to blockchain

## Voting using Anchor Wallet

### Download Anchor Wallet

Download the [latest release of the Anchor Wallet](https://greymass.com/en/anchor/){:rel="nofollow noopener noreferrer" target="_blank"}.

### Enable FIO Blockchain

Select FIO from the list of available blockchains and click Enable blockchain.

### Import your private key

* Click the newly create FIO blockchian icon
* Click Existing Account
* Click Import Private Key
* You will be prompted to set wallet password. Make sure you save the password. You will need it in the future to unlcok your wallet.
* Enter your private key
* When prompted select active account
* Click Import Accounts

Please note that the imported key has to have a previously registered FIO Address associated with it before it can be imported.

### Vote for producers

* Click governance tab on the left
* You should now see a list of all active block producers
* Click unlock wallet and type your wallet password
* Pick up to 30 block producers by clicking icon on left side of their name. Each producer will receive the same amount of votes equal to number of tokens in your account.
* Once you are satisfied with your selection, click Submit Votes
* Confirm your transaction
* You will see transaction ID for your vote


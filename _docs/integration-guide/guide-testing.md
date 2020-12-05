---
title: Testing your integration
description: Testing your integration
---

# Testing your integration

## Testing with FIO Testnet
Most Signed API calls charge fees and require a FIO address that is associated with the user making the call. 

#### Creating a test account with FIO tokens
When running a test you will want to register addresses and transfer funds. But, registering a new address for the first time requires FIO tokens. Therefore, some manual setup is required to associate FIO tokens with a FIO public key. To set up a FIO public key with FIO tokents in a test environment:
 
1. Manually create two private/public FIO key pairs 
	1. Navigate to the website: https://monitor.testnet.fioprotocol.io
	2. Select the 'Create Keypair' button (top left of the website)
	3. Copy the keypairs and FIO Internal Account 
2. Manually register a FIO address for both of these FIO key pairs. 
	1. Navigate to the website: https://monitor.testnet.fioprotocol.io
	2. Select the 'Register Address' button
	3. Type in a FIO address 
	4. Paste in one of the public keys (created above)
	5. Select the 'Create' button
	6. Do this for each public key pair (twice).  The created FIO address will be in this format, "mytest:fiotestnet"
3. Manually transfer funds into these FIO addresses.
	1. Navigate to the website: https://monitor.testnet.fioprotocol.io
	2. Select the 'Faucet' button
	3. Paste in one of the public keys (created above)
	4. Select the 'Send Coins' button
	5. Do this for each public key pair (twice)
4. These FIO public addresses now have funds available for making Signed API calls.
5. Edit the test script to add these FIO addresses and the private/public FIO key pairs
	1. Edit the privateKey, publicKey, privateKey2, publicKey2, testFioAddressName, testFioAddressName2 variables in the testnet.spec file (/fiofoundation-io-fiosdk/tests/testnet.spec)
6. Run the tests: 
	npm test

## Testing with Cryptonym

https://github.com/blockpane/cryptonym. Recommend using it against a local node, otherwise it can seem slow.

## Testing with Anchor


---
title: Validating a FIO Public Key
description: Validating a FIO Public Key

sampletext: An FIO private key is WIF encoded, but with a small caveat. So to get the raw private key from an EOS private key, simply Base58 decode the key. Once decoded, you will find a prefix byte on the front (0x80) which is the same as Bitcoin. The last 4 bytes of this decoded data is a checksum which is made up of a SHA256(SHA256(decoded data minus the last 4 bytes)). So to get the raw private key, Base58 decode, trim the first byte and the last 4 bytes and you should be left with a 32 byte raw private key.
---

# Validating a FIO Public Key

Integrators will need to validate the FIO Public Keys used for sending and receiving FIO and interacting with the FIO blockchain. 

### Format

A FIO Address consists of a username and a domain delimited by an @ symbol, there are not specific requirements around a FIO Address username, but there are format restrictions around the FIO Address as a whole, and then separate requirements for a FIO Domain in particular.

| |FIO Address (username@domain) |FIO Domain |
|---|---|---|
|Min. Chars | 3 | 1 |
|Max Chars | 64 (including FIO Domain) | 62 |
|Characters allowed	|ASCII a-z 0-9 - (dash) with single @ (at sign) |ASCII a-z 0-9 - (dash)|


### Validation using regex

Regex validation may be used. For example, the following regex may be used to validate a FIO Address: 

`^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))@[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))$)`

### Using the Typescript SDK

This is an example, of how to instantiate the FIOSDK and validate a FIO public key. [Use the FIO Testnet Monitor to register your Testnet private/public keys and fund your Testnet account]({{site.baseurl}}/docs/chain/testnet#integration-testing-with-fio-testnet).


```javascript
const { Ecc } = require('@fioprotocol/fiojs');
const ecurve = require('ecurve');
const secp256k1 = ecurve.getCurveByName('secp256k1');

const validPublicKey = 'FIO5ReMUvFM9X12eSuAR4QKjHsGJ6qponQP36xtV7WZLPBG35dJTr'
const invalidPublicKey = 'FIO5ReMUvFM9X12eSufe4QKjHsGJ6qponQP36xtV7WZLPBG35dJTr'
const invalidPublicKey2 = 'FIO5ReMUvFM9X12eSufe4QKjHsGJ6qponQP36xtWZLPBG35dJTr'

async function main () {

	console.log("\n1. Check if valid:", validPublicKey)

	let isValid = await isPubKeyValid(validPublicKey)

	console.log ("Validation result:", isValid)


	console.log("\n2. Check if valid:", validPublicKey)

	isValid = await isPubKeyValid(invalidPublicKey)

	console.log ("Validation result:", isValid)


	console.log("\n3. Check if valid:", invalidPublicKey2)

	isValid = await isPubKeyValid(invalidPublicKey2)

	console.log ("Validation result:", isValid)
}

async function isPubKeyValid(publicKey) {

	if (publicKey.length !== 53) return false

	// return Ecc.isValidPublic(publicKey)

	const PUB_KEY_PREFIX = 'FIO'
	if (publicKey.substr(0, 3) !== PUB_KEY_PREFIX) return false

	const base58Substr = publicKey.substr(PUB_KEY_PREFIX.length);
	try {
		const buffer = Ecc.key_utils.checkDecode(base58Substr)
		ecurve.Point.decodeFrom(secp256k1, buffer)
	} catch (e) {
		console.error(e);
		return false
	}

	return true
}

main()
```
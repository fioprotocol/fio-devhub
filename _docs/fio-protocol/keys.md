---
title: Public/Private Keys
description: Public/Private Keys
---

# FIO Public/Private Keys

FIO Chain is registered at index 235/0x800000eb on the [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md){:rel="nofollow noopener noreferrer" target="_blank"}.

FIO Private Keys follow standard Wallet Import Format (WIF) standard and public keys follow well-known base58 encoding with FIO prefix, for example:

`FIO7tkpmicyK2YWShSKef6B9XXqBN6LpDJo69oRDfhn67CEnj3L2G`

For those who have integrated EOSIO, FIO public keys follows the same format, except the prefix is FIO instead of EOS.

The derivation path for FIO is:

`"44'/235'/0'/0/0"`

To test your FIO key derivation, use this mnemonic phrase:

`valley alien library bread worry brother bundle hammer loyal barely dune brave`

This is the expected Private Key for address_index 0:

`5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu`

This is the expected Public Key for address_index 0:

`FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o`

To obtain a private key from a seed phrase, you can use [the BIP 39 tool by Ian Coleman](https://github.com/iancoleman/bip39#standalone-offline-version){:rel="nofollow noopener noreferrer" target="_blank"} as described in [this video](https://www.youtube.com/watch?v=eAXdLEZFbiw){:rel="nofollow noopener noreferrer" target="_blank"}.

## FIO Public Key Format

FIO, like EOSIO, uses the base58 cryptographic hash function to encode raw public keys. 

### FIO Public Key checksum validation

1. Start with a FIO Public Key Key.

	`FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o`

2. Strip off the initial "FIO" string.

	`5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o`

3. Base58 decode the public key.

	`0271195c66ec2799e436757a70cd8431d4b17733a097b18a5f7f1b6b085978ff0f343fc54e`

4. Trim off the last 4 checksum bytes and you are left with a 33 byte compressed public key.

	`0271195c66ec2799e436757a70cd8431d4b17733a097b18a5f7f1b6b085978ff0f`

	`343fc54e`

5. Perform a RIPEMD-160 hash on the key.

	`343fc54e7a93a7328cdf47bdad878bef36049315`

6. Take the first 4 bytes of the hash, this is the checksum.

	`343fc54e`

7. Make sure the checksum in steps 4 and 6 match.


### FIO Public Key checksum validation example

The following is a JavaScript implementation of this checksum algorithm and may be used to checksum FIO Public keys

```javascript
const assert = require('assert')
const base58 = require('bs58')
const createHash = require('create-hash')

// 1. Start with a FIO Public Key Key.
let publicKey = 'FIO5kJKNHwctcfUM5XZyiWSqSTM5HTzznJP9F3ZdbhaQAHEVq575o';

// 2. Strip off the initial "FIO" string.
publicKey = publicKey.slice(3)

// 3. Base58 decode the public key.
publicKey = base58.decode(publicKey);

// 4. Trim off the last 4 checksum bytes and you are left with a 33 byte compressed public key.
checksum1 = publicKey.slice(-4)
publicKey = publicKey.slice(0,-4)

// 5. Perform a RIPEMD-160 hash on the key.
publicKey = createHash('rmd160').update(publicKey).digest()

// 6. Take the first 4 bytes of the hash, this is the checksum.
checksum2 = publicKey.slice(0,4)

// 7. Make sure the checksum in steps 3 and 6 match.
assert(checksum2 = checksum1, 'Checksum failed!')
```

### FIO Public Key checksum validation using regex

Regex validation may be used. For example, the following regex may be used to validate a FIO Address: 

`^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))@[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))$)`

### FIO Public Key checksum validation using the fiojs library

This example uses the fiojs library to validate a FIO public key.

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

## FIO Private Key Wallet Import Format (WIF)

FIO private keys are [Wallet Import Format (WIF)](https://en.bitcoin.it/wiki/Wallet_import_format){:rel="nofollow noopener noreferrer" target="_blank"} encoded. WIF is an encoding for a private EDSA key. FIO uses the same version, checksum, and encoding scheme as the Bitcoin WIF addresses and should be compatible with existing libraries.

This is an example of a FIO WIF Private Key:

`5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsreAbuatmU`

This encoding is good for:

* Copy and Pasting private keys (ensures the entire key is copied)
* Including keys in text or user editable file formats
* Shortening the key-length

This encoding is not good for:

* Writing keys down by hand (even a single upper / lowercase mistake can cause a major problem)
* Binary or computer storage where code handles the key and data is already checked

Considerations:

* If a key could be written down or re-keyed, the BIP39 Mnemonic Code standard is a better option to use.
* It is a good idea to always label a WIF key using the word "Private" or "Private Key".

### WIF encoded FIO Private Key checksum validation

1. Start with the WIF encoded Private Key.

	`5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu`

2. Base58 decode the WIF string (shown as HEX here).

	`80ea8eb60b7e5868e218f248e032769020b4fea5dcfd02f2992861eaf4fb534854163733c6`

3. Slice the decoded WIF into the versioned key and the checksum (last 4 bytes).

	`80ea8eb60b7e5868e218f248e032769020b4fea5dcfd02f2992861eaf4fb534854`

	`163733c6`

4. Perform a binary SHA-256 hash on the versioned key.

	`a34bb90a0d35e01df7901fb9cd32688a65349086a00cbde4106fff7b60b43ecc`

5. Perform another binary SHA-256 hash on result of SHA-256 hash.

	`163733c6bdfb1a755b2498ba7f03d47be5f04823738541b889a8f26777e2cf93`

6. Take the first 4 bytes of the second SHA-256 hash, this is the checksum.

	`163733c6`

7. Make sure the checksum in steps 3 and 6 match.

### WIF encoded FIO Private Key checksum validation example

The following is a JavaScript implementation of this checksum algorithm and may be used to checksum FIO WIF private keys

```javascript
const assert = require('assert')
const base58 = require('bs58')
const createHash = require('create-hash')

// 1. Start with the Wallet Import Private Key.
let privateKey = '5Kbb37EAqQgZ9vWUHoPiC2uXYhyGSFNbL6oiDp24Ea1ADxV1qnu';

// 2. Base58 decode the WIF string (shown as HEX here). Returns a buffer.
privateKey = base58.decode(privateKey);

// 3. Slice the decoded WIF into the versioned key and the checksum (last 4 bytes).
checksum1 = privateKey.slice(-4)
privateKey = privateKey.slice(0,-4)

// 4. Perform a binary SHA-256 hash on the versioned key.
privateKey = createHash('sha256').update(privateKey).digest()

// 5. Perform another binary SHA-256 hash on result of SHA-256 hash.
privateKey = createHash('sha256').update(privateKey).digest()

// 6. Take the first 4 bytes of the second SHA-256 hash, this is the checksum.
checksum2 = privateKey.slice(0,4)

// 7. Make sure the checksum in steps 3 and 6 match.
assert(checksum2 = checksum1, 'Checksum failed!')
```
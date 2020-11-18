---
title: Validating a FIO Public Key
sidebar_label: Validating a FIO Public Key
layout: sidenav
sidebar: sidebars

sampletext: An FIO private key is WIF encoded, but with a small caveat. So to get the raw private key from an EOS private key, simply Base58 decode the key. Once decoded, you will find a prefix byte on the front (0x80) which is the same as Bitcoin. The last 4 bytes of this decoded data is a checksum which is made up of a SHA256(SHA256(decoded data minus the last 4 bytes)). So to get the raw private key, Base58 decode, trim the first byte and the last 4 bytes and you should be left with a 32 byte raw private key.
---

Integrators will need to validate the FIO Public Keys used for sending and receiving FIO and interacting with the FIO blockchain. 

### Format

A FIO Address consists of a username and a domain delimited by an @ symbol, there are not specific requirements around a FIO Address username, but there are format restrictions around the FIO Address as a whole, and then separate requirements for a FIO Domain in particular.

|---|---|---|
| |FIO Address (username@domain) |FIO Domain |
|Min. Chars | 3 | 1 |
|Max Chars | 64 (including FIO Domain) | 62 |
|Characters allowed	|ASCII a-z 0-9 - (dash) with single @ (at sign) |ASCII a-z 0-9 - (dash)|


### Validation using regex

Regex validation may be used. For example, the following regex may be used to validate a FIO Address: 

`^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))@[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))$)`

### Validation using checksum

More rigorous checksum code may also be used to validate a FIO Address. This validation process consists of:

1. Confirming the first three characters of the key are 'FIO'
2. Base58 decoding of the char
3. ...

[NEED TO COMPLETE, include JS and C++ sample code]

---
title: FIO Address
description: FIO Address
---

# FIO Addresses

FIO Addresses act as the human-readable wallet identifier for users on the FIO Protocol. They are necessary for users to utilize all the capabilities of the FIO Protocol, but also serve as a replacement for complicated public addresses across all tokens and coins in the user's wallet.

FIO Addresses have the construct of username@domain.  Examples of a FIO Address include:

**john@edgewallet**

or

**alice@crypto**

Registration of a FIO Address is done directly through a FIO-enabled application, or through a hosted registration site that is open to the community.

The FIO Address itself and all subsequent interactions with the FIO Protocol are controlled via a FIO private key. Loss of access to this private key suffers the same consequences as with any crypto asset - the FIO Address will no longer be usable by the original owner, nor can it be retrieved.

## Format of a FIO Address

A FIO Address consists of a username and a domain delimited by an @ symbol, there are not specific requirements around a FIO Address username, but there are format restrictions around the FIO Address as a whole, and then separate requirements for a FIO Domain in particular.

| |FIO Address (username@domain) |FIO Domain |
|---|---|---|
|Min. Chars | 3 | 1 |
|Max Chars | 64 (including FIO Domain) | 62 |
|Characters allowed	|ASCII a-z 0-9 - (dash) with single @ (at sign) |Domains may contain ASCII a-z 0-9 - (dash) |

** *The dash can not be the first or last character of the username or domain* 

### FIO Address validation using regex

Regex validation may be used. For example, the following regex may be used to validate a FIO Address: 

`^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))@[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))$)`
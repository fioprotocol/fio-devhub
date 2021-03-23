---
title: FIO Address
description: FIO Address
---

# FIO Address

A FIO Address consists of a username and a domain delimited by an @ symbol, there are not specific requirements around a FIO Address username, but there are format restrictions around the FIO Address as a whole, and then separate requirements for a FIO Domain in particular.

| |FIO Address (username@domain) |FIO Domain |
|---|---|---|
|Min. Chars | 3 | 1 |
|Max Chars | 64 (including FIO Domain) | 62 |
|Characters allowed	|ASCII a-z 0-9 - (dash) with single @ (at sign) |ASCII a-z 0-9 - (dash)|

### FIO Address validation using regex

Regex validation may be used. For example, the following regex may be used to validate a FIO Address: 

`^(?:(?=.{3,64}$)[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))@[a-zA-Z0-9]{1}(?:(?!-{2,}))[a-zA-Z0-9-]*(?:(?<!-))$)`
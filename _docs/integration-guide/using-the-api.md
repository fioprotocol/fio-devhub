---
title: Using the FIO API
description: Using the FIO API

snippet1: /push_transaction

# {% assign snippet = 'snippet1' %}
# {% include api-snippet.html snippet = snippet %}

---

# Using the FIO API

There are several ways to interact with the FIO Chain. You may directly call the FIO API, you may integrate one of the FIO SDKs which handles interfacing to the API, or you may interact through a third-party application. 

## Using the SDK

The simplest method for accessing the FIO chain is by embedding one of the FIO SDKs. Three SDKs are currently supported:

* [React native / Typescript](https://github.com/fioprotocol/fiosdk_typescript)
* [Kotlin / Java](https://github.com/fioprotocol/fiosdk_kotlin)
* [Swift / iOS](https://github.com/fioprotocol/fiosdk_ios)

## API details

#### Testnet Chain API

`http://testnet.fioprotocol.io/v1/chain/`

#### Mainnet Chain API

[See Github](https://github.com/fioprotocol/fio.mainnet){:target="_blank"}

#### Testnet Registration Site API

`https://reg.az.fio.dev/public-api/`

### Mainnet Registration Site API

`https://reg.fioprotocol.io/public-api/`

### Testnet History API

`http://testnet.fioprotocol.io/v1/history/`

### Mainnet History API

See Github

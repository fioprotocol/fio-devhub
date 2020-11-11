---
id: reg
title: FIO registration site
sidebar_label: FIO registration site
layout: sidenav
sidebar: sidebars
---

## Overview 

Foundation for Interwallet Operability has developed, is hosting and will open-source shortly a website which allows for registration of FIO Addresses and Domains in exchange for payment in Bitcoin, Bitcoin Cash, DAI, Ethereum, Litecoin, and USD Coin.

Wallets wanting to offer their customers ability to purchase FIO Addresses with currencies other than FIO, can use the site.

## Integration options

### 1. Link off to registration site

The easiest integration option is to simply link off to the registration site and pass the user’s FIO Public Key. URL formats are as follows:

**Link to FIO Domain/FIO Address selection Page**

`https://reg.fioprotocol.io/ref/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

**Link to FIO Domain selection Page**

`https://reg.fioprotocol.io/address/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

### 2. Obtain payment information via API

If you prefer to have full control over the payment process, you can simply obtain the crypto currency payment address and amount in different currencies and build payment screens inside the wallet. Once the payment is received, the FIO Domain/Address is automatically registered.

See Registration API spec for more details

### 3. Run an instance of the registration site

`See https://github.com/fioprotocol/fio-registrations`

## Getting set-up

Before you can get started with option 1 or 2, a profile for your wallet has to be established. Please submit support request with the following information:

* Name of your wallet
* Link to logo
* FIO Address you would like to use as your TPID. This address will receive portion of the payment for the FIO Address or Domain.
* Which domains you would like to allow to be used for FIO Address registration. **Please note: that the designated domains have to be set to public. See Domain Owner Abilities for more information or Setting Domain to public for instructions.**
* Would you like to allow users to register domains as well. **Please note: that hosted website does not support ability to register FIO Addresses on private domains so users cannot easily add a FIO Address to the domain they register.**

## Example

![Image](/assets/img/integration/reg-example.png)



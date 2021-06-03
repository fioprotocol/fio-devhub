---
title: Enable FIO Addresses
description: Enable FIO Addresses
---

## Enable FIO Addresses for your users

Most FIO Protocol functionality requires a user to have a FIO Address. A FIO Address is an NFT owned by owner FIO Public Key and consists of a username and a domain delimited by an @:

`username@domain`

The easiest way to facilitate a FIO Address registration is to redirect the users to a Foundation for Interwallet Operability website which enables registration and payment with common crypto currencies, such as Bitcoin. A FIO Public Key needs to be passed to the website, so that the FIO Address can be properly assigned to the owner. To learn more see FIO registration site.

### Assigning or Enabling Users to Register FIO Addresses

An exchange may set-up a unique FIO Address for each user of the exchange, and display it in their deposit area, e.g. alice@myexchange.

To deposit tokens of any supported cryptocurrency to their account the user would simply send tokens from a FIO-enabled wallet to their FIO Address (e.g. alice@myexchange) and would not have to deal with Public Keys, memo fields or even having to log into the exchange.

Each FIO Address may be mapped using /add_pub_address to either the same Public Address for all users or a unique Public Address for each user.

#### Register FIO Addresses using the FIO Registration Site
Foundation for Interwallet Operability has developed and is hosting a website which allows for registration of FIO Addresses and Domains in exchange for payment in Bitcoin, Bitcoin Cash, DAI, Ethereum, Litecoin, and USD Coin.

Wallets wanting to offer their customers ability to purchase FIO Addresses with currencies other than FIO, can use the site. There are several ways to enable FIO Address and Domain registration including linking to the registration site, accessing the registration API, and hosting an internal instance of the registration site.

#### Linking to the FIO Registration Site

The easiest integration option is to simply link off to the registration site and pass the user’s FIO Public Key. URL formats are as follows:

**Link to FIO Domain/FIO Address selection Page**

`https://reg.fioprotocol.io/ref/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

**Link to FIO Domain selection Page**

`https://reg.fioprotocol.io/address/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

#### Using the Registration API

If you prefer to have full control over the payment process, you can simply obtain the crypto currency payment address and amount in different currencies and build payment screens inside the wallet. Once the payment is received, the FIO Domain/Address is automatically registered.

See the [Registration API]({{ site.baseurl }}/pages/api/fio-reg-a


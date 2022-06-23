---
layout: page-int
title: FIO Crypto Handle Reg
description: FIO Crypto Handle Reg
---

# FIO Crypto Handle

Most FIO Protocol functionality requires a user to have a FIO Crypto Handle (aka FIO Address). A FIO Crypto Handle is an NFT owned by owner FIO Public Key and consists of a username and a domain delimited by an @:

`username@domain`

FIO Crypto Handles require a registration fee and, once registered, never expire. To support FIO Crypto Handles, wallets and exchanges must generate and store a FIO Private/Public key pair. See [Private/Public Keys]({{site.baseurl}}/docs/fio-protocol/keys) for more information including testing examples.

#### Fetching user’s FIO Crypto Handles

FIO Crypto Handles currently owned by the user (even if registered outside of the wallet) may be fetched using [/get_fio_names]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_names) API method.

Please note that a user may have multiple FIO Crypto Handles owned by a single key, the UX should accommodate that.

## FIO Crypto Handle Registration

There are a number of ways for a user to obtain a FIO Crypto Handle. The easiest way to facilitate a FIO Crypto Handle registration is to redirect the users to a Foundation for Interwallet Operability Registration website which enables registration and payment with common crypto currencies, such as Bitcoin. 

A FIO Public Key needs to be passed to the website, so that the FIO Crypto Handle can be properly assigned to the owner. 

### FIO Crypto Handle registration using the FIO Registration Site

Foundation for Interwallet Operability has developed and is hosting a website which allows for registration of FIO Crypto Handles and Domains in exchange for payment in Bitcoin, Bitcoin Cash, DAI, Ethereum, Litecoin, and USD Coin.

Wallets wanting to offer their customers ability to purchase FIO Crypto Handles with currencies other than FIO, can use the site. There are several ways to enable FIO Crypto Handle and Domain registration including linking to the registration site, accessing the registration API, and hosting an internal instance of the registration site.

##### Linking to the FIO Registration Site

The easiest integration option is to simply link off to the registration site and pass the user’s FIO Public Key. URL formats are as follows:

**Link to FIO Domain/FIO Crypto Handle selection Page**

`https://reg.fioprotocol.io/ref/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

**Link to FIO Domain selection Page**

`https://reg.fioprotocol.io/address/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

Example of the FIO registration site UI:

![Image]({{ site.baseurl }}/assets/img/integration/reg-example.png)

##### Using the Registration API

If you prefer to have full control over the payment process, you can simply obtain the crypto currency payment address and amount in different currencies and build payment screens inside the wallet. Once the payment is received, the FIO Crypto Handle is automatically registered.

See the [Registration API]({{site.baseurl}}/pages/api/fio-reg-api/) for more details

### Getting set-up to use the registration site

Before you can get started with option using the FIO registraiton site, a profile for your wallet has to be established. Please submit support request with the following information:

* Name of your wallet
* Link to logo
* FIO Crypto Handle you would like to use as your TPID. This address will receive portion of the payment for the FIO Crypto Handle or Domain.
* Which domains you would like to allow to be used for FIO Crypto Handle registration. **Please note: that the designated domains have to be set to public. See Domain Owner Abilities for more information or Setting Domain to public for instructions.**
* Would you like to allow users to register domains as well. **Please note: that hosted website does not support ability to register FIO Crypto Handles on private domains so users cannot easily add a FIO Crypto Handle to the domain they register.**

---
## FIO Crypto Handle Registration using the FIO API

For wallets desiring full control over the registration user experience or wanting to support FIO Crypto Handle registrations on custom FIO Domains, a full suite of FIO Crypto Handle registration and bundle renewal API methods are available.

#### Registering FIO Crypto Handles and adding bundles

FIO Crypto Handles can be registered using [regaddress]({{site.baseurl}}/pages/api/fio-api/#options-regaddress) action and additional bundles can be added using [addbundles]({{site.baseurl}}/pages/api/fio-api/#options-addbundles) action.

#### Fetching user’s FIO Crypto Handles and Domains

FIO Crypto Handles and Domains currently owned by the user may be fetched using [/get_fio_names]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_names) API method.

#### Fetching user’s FIO Crypto Handles only

FIO Crypto Handles currently owned by the user may be fetched using [/get_fio_addresses]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_addresses) API method.

#### Fetching user’s FIO Domains only

FIO Domains currently owned by the user may be fetched using [/get_fio_domains]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_domains) API method.

#### Checking FIO Crypto Handle or Domain availability

To enable the registering wallet to easily check if a FIO Crypto Handle or Domain is available for registration, [/avail_check]({{site.baseurl}}/pages/api/fio-api/#post-/avail_check) API method may be called.

#### Fees when using the FIO API

Every FIO Crypto Handle comes with a set number of bundled transactions annually. The specific number is set by the block producers and is currently 100 annually. This bundle is expected to cover most transactions executed by user except token transfer fees and certain governance or domain management fees.

In order to ensure a particular action is covered by the bundle, the wallet should execute [/get_fee]({{site.baseurl}}/pages/api/fio-api/#post-/get_fee) API method before submitting any signed transaction.

#### Technology Provider ID

Do not forget to include your [TPID]({{site.baseurl}}/docs/general-functions/tpid) in the request to earn portion of fees paid.. Please review the [Technology Provider ID page]({{site.baseurl}}/docs/general-functions/tpid) for information on how to earn a portion of the fees paid by your users and how to have your users’ tokens proxied by default.

---
## UX/UI Considerations
* If a user is attempting to use a FIO service, but the user hasn’t registered a FIO address, the platform should alert the user that a FIO registration is necessary and direct them to the right place.
* After registering a FIO Handle, the user shoud receive an alert/confirmation that the address has successfully been registered.

---
## Quality Assurance Checklist

The following lists the items that should be tested to confirm support for FIO Crypto Handles:

-  User can register a FIO Crypto Handle using FIO
-  User can register a FIO Crypto Handle using other crypto (using FIO Registration Site)
-  User can register and view more than one FIO Crypto Handle
-  User can add bundles to their existing FIO Crypto Handles (replaces Renew Crypto Handle)

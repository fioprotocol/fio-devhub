---
title: Register FIO Addresses and Domains
description: Register FIO Addresses and Domains
redirect_from:
    - /docs/integration-guide/registration
---

# Register FIO Addresses and Domains

## Register FIO Address

Most FIO Protocol functionality requires a user to have a FIO Address. A FIO Address is an NFT owned by owner FIO Public Key and consists of a username and a domain delimited by an @:

`username@domain`

The easiest way to facilitate a FIO Address registration is to redirect the users to a Foundation for Interwallet Operability website which enables registration and payment with common crypto currencies, such as Bitcoin. A FIO Public Key needs to be passed to the website, so that the FIO Address can be properly assigned to the owner. To learn more see FIO registration site.

### FIO Private/Public Key

You will require a FIO Private/Public key pair to be generated and stored inside the wallet. See Private/Public Keys for more information including testing examples.

### Fetching user’s FIO Addresses

FIO Addresses currently owned by the user (even if registered outside of the wallet) may be fetched using [/get_fio_names]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_names) API method.

Please note that a user may have multiple FIO Addresses owned by a single key, the UX should accommodate that.

### TPID

Do not forget to include your TPID in the request to earn portion of fees paid.

## FIO Registration Site
Foundation for Interwallet Operability has developed and is hosting a website which allows for registration of FIO Addresses and Domains in exchange for payment in Bitcoin, Bitcoin Cash, DAI, Ethereum, Litecoin, and USD Coin.

Wallets wanting to offer their customers ability to purchase FIO Addresses with currencies other than FIO, can use the site. There are several ways to enable FIO Address and Domain registration including linking to the registration site, accessing the registration API, and hosting an internal instance of the registration site.

### Linking to the FIO Registration Site

The easiest integration option is to simply link off to the registration site and pass the user’s FIO Public Key. URL formats are as follows:

**Link to FIO Domain/FIO Address selection Page**

`https://reg.fioprotocol.io/ref/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

**Link to FIO Domain selection Page**

`https://reg.fioprotocol.io/address/PROVIDED_REFERRER_CODE?publicKey=USERS_FIO_PUBLIC_KEY`

## Using the Registration API

If you prefer to have full control over the payment process, you can simply obtain the crypto currency payment address and amount in different currencies and build payment screens inside the wallet. Once the payment is received, the FIO Domain/Address is automatically registered.

See the [Registration API]({{site.baseurl}}/pages/api/fio-reg-api/) for more details

## Running an instance of the registration site

See the [Github registration repository](https://github.com/fioprotocol/fio-registrations){:rel="nofollow noopener noreferrer" target="_blank"}

## Getting set-up

Before you can get started with option 1 or 2, a profile for your wallet has to be established. Please submit support request with the following information:

* Name of your wallet
* Link to logo
* FIO Address you would like to use as your TPID. This address will receive portion of the payment for the FIO Address or Domain.
* Which domains you would like to allow to be used for FIO Address registration. **Please note: that the designated domains have to be set to public. See Domain Owner Abilities for more information or Setting Domain to public for instructions.**
* Would you like to allow users to register domains as well. **Please note: that hosted website does not support ability to register FIO Addresses on private domains so users cannot easily add a FIO Address to the domain they register.**

## Example

![Image]({{ site.baseurl }}/assets/img/integration/reg-example.png)

## FIO Domain Registration

### Via link-off

The easiest way to facilitate a FIO Domain registration is to redirect the users to a Foundation for Interwallet Operability website which enables registration and payment with common crypto currencies, such as Bitcoin. FIO Public Key needs to be passed to the website, so that the FIO Domain can be properly assigned to the owner. To learn more see FIO registration site.

When a new FIO Domain is registered, it is set to Private, meaning only the owner of the FIO Domain can register FIO Addresses on it. Therefore, FIO Address registrations on custom domains have to be implemented inside the wallet (not via FIO registration site). See next section for details.

### Via API

FIO Domain can be registered using [/register_fio_domain]({{site.baseurl}}/pages/api/fio-api/#options-regdomain) API method and renewed using [/renew_fio_domain]({{site.baseurl}}/pages/api/fio-api/#options-renewdomain) API method.

### TPID

Do not forget to [include your TPID]({{site.baseurl}}/docs/how-to/tpid) in the request to earn portion of fees paid.


## Register FIO Address on Custom Domain

For wallets desiring full control over the registration user experience or wanting to support FIO Address registrations on custom (set to Private) FIO Domains, a full suite of FIO Address registration and renewal API methods are available.

### Registering/renewing FIO Address

FIO Address can be registered using [/register_fio_address]({{site.baseurl}}/pages/api/fio-api/#options-regaddress) API method renewed using [/renew_fio_address]({{site.baseurl}}/pages/api/fio-api/#options-renewaddress) API method.

### Fetching user’s FIO Addresses and Domains

FIO Addresses and Domains currently owned by the user may be fetched using [/get_fio_names]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_names) API method.

### Fetching user’s FIO Addresses only

FIO Addresses currently owned by the user may be fetched using [/get_fio_addresses]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_addresses) API method.

### Fetching user’s FIO Domains only

FIO Domains currently owned by the user may be fetched using [/get_fio_domains]({{site.baseurl}}/pages/api/fio-api/#post-/get_fio_domains) API method.

### Checking FIO Address or Domain availability

To enable the registering wallet to easily check if a FIO Address or Domain is available for registration, [/avail_check]({{site.baseurl}}/pages/api/fio-api/#post-/avail_check) API method may be called.

### Paying for FIO Addresses on behalf of users

Wallets may also decide to cover the cost of FIO Address for their users. For that purpose Foundation for Interwallet Operability has develop server code which enables the wallet to run their own registration server.

### Enabling payments in other currencies

The FIO registration site allows wallets to integrate FIO Address and Domain registration via an API with payment occurring with common crypto currencies.

### Technology Provider ID

Please review the [Technology Provider ID page]({{site.baseurl}}/docs/how-to/tpid) for information on how to earn a portion of the fees paid by your users and how to have your users’ tokens proxied by default.

### Fees

FIO Address has annual fee associated with them. Fees in the FIO Chain are set by block producers.

Every FIO Address comes with a set number of bundled transactions annually. The specific number is set by the block producers and is currently 100 annually. This bundle is expected to cover most transactions executed by user except token transfer fees and certain governance or domain management fees.

In order to ensure a particular action is covered by the bundle, the wallet should execute [/get_fee]({{site.baseurl}}/pages/api/fio-api/#post-/get_fee) API method before submitting any signed transaction.



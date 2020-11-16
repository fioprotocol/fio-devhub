---
id: options
title: Integration options
sidebar_label: Integration options
layout: sidenav
sidebar: sidebars
---

It is up to the integrating wallet to decide which features of the FIO Protocol they want to implement and how. The following are common functionality groups.

|---|---|---|---|
|Functionality groups	|Dev description	|User benefit	|Dev effort|
|Send to FIO Address	|Simple rest API (send FIO Address and token code, get public address).	|User can send crypto to other FIO Addresses.	|~16 hours|
|Register FIO Address	|Link-off to external registration site for FIO Address registration and renewal.	|User can register FIO Address on external wallet-branded site and participate in FIO Address Giveaways.	|~8 hours|
|FIO Token Support	|Sending/receiving of FIO tokens and transaction history via dedicated APIs.	|User can receive, hold, send FIO tokens and see history of FIO token transactions.	|~32 hours|
|Receive to FIO Address	|Assigning public addresses to FIO Address (automatic with no UI or selected by user) via dedicated APIs.	|User can receive crypto sent to their FIO Address.	|~40 hours|
|FIO Request	|View, approve, reject incoming FIO Requests (including showing attached FIO Data and send FIO Data on Send in response to request) and send FIO Requests to other FIO users.	|User can accept FIO Requests and respond to them and initiate FIO Requests to other users and participate in contest whereby users can win prizes funded by the Foundation for sending FIO Requests to a specified FIO Address via dedicated APIs.	|~80 hours|
|FIO Data	|Send and display FIO Data when crypto sent using FIO Address.	|Cross-chain, cross-wallet memo capability for any crypto.	|~24 hours|
|FIO Domain Registration	|Registering FIO Domain (in wallet or via Link-off to external registration site).	|User can register a custom FIO Domain.	|~8 hours|
|Register FIO Address on Custom Domain	|Registering FIO Address inside wallet and on custom domains.	|Users can register a FIO Address on a custom FIO Domain and utilize it fro Sending and Receiving.	|~32 hours|

## Send to FIO Address

The most basic level of integration with FIO Protocol is to enable sending of crypto currency using human-readable FIO Address instead of long cryptic native blockchain public addresses (NBPAs).

This level typically requires updates to the Send crypto currency screen to allow for a FIO Address to be entered in addition to NBPA. FIO Address can be easily identified by looking for a @ (at sign) in the string.

Once a FIO Address is entered, it can be resolved to NBPA on a specific blockchain using /get_pub_address API method.

Once the NBPA is obtained, the wallet Send transaction should execute as if the user entered or scanned the NBPA.

### Multi-level addressing

It is important to note, that the native blockchain public addresses returned by /get_pub_address can have additional parameters appended to it like this:

`NBPA_string?parameter_name=value`

For example: `rGVV5nh9UjJckufycb6WZAGUsZGFvPsTpX?dt=test.do.not.send.funds`

The parameters represent additional information required to execute a send, for example a destination tag for XRP. Therefore the string has to be parsed for uri-like parameters.

Please review Multi-level Addressing section of the Integration Guide for more details.

### Sample UX

See Sending Bitcoin using FIO Address



## Register FIO Address

Most FIO Protocol functionality requires a user to have a FIO Address. A FIO Address is an NFT owned by owner FIO Public Key and consists of a username and a domain delimited by an @

username@domain

The easiest way to facilitate a FIO Address registration is to redirect the users to a Foundation for Interwallet Operability website which enables registration and payment with common crypto currencies, such as Bitcoin. FIO Public Key needs to be passed to the website, so that the FIO Address can be properly assigned to the owner. To learn more see FIO registration site.

### FIO Private/Public Key

You will require a FIO Private/Public key pair to be generated and stored inside the wallet. See Private/Public Keys for more information including testing examples.

### Fetching user’s FIO Addresses

FIO Addresses currently owned by the user (even if registered outside of the wallet) may be fetched using /get_fio_names API method.

Please note that a user may have multiple FIO Addresses owned by a single key, the UX should accommodate that.

### TPID

Do not forget to include your TPID in the request to earn portion of fees paid.

## FIO Token Support

### FIO token

FIO Chain’s native token is FIO. FIO is the only token present on the FIO Chain.

There are 1,000,000,000 Smallest Units of FIO (SUFs) inside 1 FIO. All transactions in FIO Protocol are expressed in SUFs.

Ticker: FIO
Symbol: ᵮ
Brand Assets

### Transferring FIO token

Tokens on the FIO Chain are transferred using /transfer_tokens_pub_key method.

The method requires payee FIO Public Key. The key is hashed down to an account name and funds are transferred to that account. If that account does not exist, it gets created automatically.

The native EOSIO transfer action is not supported.

### Transaction memo

/transfer_tokens_pub_key does not accept a memo field. To attach a memo to a FIO token transfer, a /record_obt_data transaction should be sent after the tokens are transferred and include the token transfer transaction id. /record_obt_data requires that both payer and payee have a FIO Address. If either party does not have a FIO Address transfer of memo is not supported.

### Checking token balance

Token balance can be obtained by passing FIO Public Key to /get_fio_balance API method.

### Transaction history

See History node

### TPID

Do not forget to include your TPID in the request to earn portion of fees paid.

### Additional Resources

Account balances and history

## Receive to FIO Address

In order allow others to send crypto currency using the user’s FIO Address, it has to be mapped to native blockchain public addresses (NBPAs). This has to be done from within the wallet using /add_pub_address API method as it needs to be signed with user’s private key. For now, this mapping is stored unencrypted, but a privacy mode is being worked on.

It is up to the wallet to decide if this happens automatically, behind the scenes or driven by the user via UI. If the wallet supports multiple NBPAs for the same blockchain at the same time, e.g. multiple bitcoin wallets, the decision will likely need to be made by the user via UI.

Please read Mapping Public Addresses to better understand how public address mappings work.

Please note that a user may have multiple FIO Addresses owned by a single key, the UX should accommodate that.

### Sample UX

See Connecting FIO Address to public keys

## FIO Request and FIO Data

One of the key features of FIO Protocol is the ability to request crypto using FIO Request. The user requesting funds (Payee) can send a FIO Request to a user who is asked to pay (Payer), by only using the Payer’s FIO Address.

FIO Request data, such as amount, currency, and memo field are encrypted and only readable by Payee and Payer.

NOTE: public address specified in FIO Request does not have to be the same as public_address mapped using add_pub_address.

Please read Encrypting FIO Data to better understand how encryption works.

### Submitting new FIO Request

To request funds, Payee’s wallet should submit a new FIO Request using /new_funds_request API method.

### Fetching pending FIO Requests

The Payer’s wallet can fetch all new and pending FIO Requests using /get_pending_fio_requests API method.

### Rejecting a FIO Request

The Payer’s wallet can reject a FIO Request, which will remove it from the pending list, using /reject_funds_request API Method.

### Fetching sent FIO Requests

The Payee’s wallet can fetch all sent FIO Requests and its current status using /get_sent_fio_requests API method.

### Recording FIO Data

Anytime crypto is sent using FIO Address, optional metadata such as amount, currency, and memo, may be recorded on the FIO Chain. FIO Data is encrypted and only readable by Payee and Payer.

FIO Data, can be recorded using /record_obt_data API method.

Although /record_obt_data has to be sent any time user is sending crypto currency in response to a FIO Request, it is optional when user sends crypto using FIO Address.

It is strongly encouraged that /record_obt_data is sent at least when the user populates the memo field, as it allows for transaction Memo to be reliably send across different wallets.

When sending FIO tokens using FIO Address you must submit record_obt_data following transfer_tokens_pub_key to ensure FIO Addresses are attached to the transaction. Some wallets and exchanges may be relying on this information to properly account the FIO tokens, e.g. exchange deposit.

### Retrieving FIO Data

OBT data can be retrieved using /get_obt_data

This call will return all metadata relevant to the provided FIO Public key, including:

Outbound data. Payer’s FIO Address is owned by provided FIO Public key
Inbound data. Payee’s FIO Address is owned by provided FIO Public key

### Sample UX

See Requesting Bitcoin using FIO Address and Displaying incoming FIO Requests

### Example flow

#### Alice requests 1 BTC from Bob and adds a “Invoice 123” memo

BTC public address, amount, memo and other data are encrypted
/new_funds_request is submitted to FIO Chain.
/get_sent_fio_requests will return the request just sent with the status requested and all encrypted data including “Invoice 123” memo. We recommend wallets show this request with a status of “pending”.
/get_pending_fio_requests will not return anything as this request was for Bob, not for Alice.

#### Bob checks his wallet for new requests

/get_sent_fio_requests will not return anything as this request was sent by Alice not by Bob.
/get_pending_fio_requests will return the request just sent with the status requested and all encrypted data including “Invoice 123” memo. We recommend wallets show this request for Bob to act on.

#### Bob accepts the request and pays Alice

##### Step 1

BTC public address, amount and memo are decrypted
Wallet creates a payment for 1 BTC to provided BTC public address and “Invoice 123” memo.
User has the option to modify amount or memo.
Once user approves, the transaction is broadcasted to Bitcoin blockchain.

##### Step 2

Actual amount, actual memo, transaction ID (obt_id) from Bitcoin blockchain and other data are encrypted
/record_obt_data is sent to FIO Chain

#### Alice checks payment

/get_sent_fio_requests will return the request with the status sent_to_blockchain. We recommend wallets show this request as “received”.
/get_obt_data will return important encrypted metadata wallets should attach to the request and/or the actual Bitcoin transaction including actual amount, actual memo, transaction ID (obt_id) from Bitcoin blockchain and other data. obt_id may be used to match the information with the actual Bitcoin blockchain transaction.

#### In Bob’s wallet

/get_sent_fio_requests will not return anything as Bob never sent a request.
/get_pending_fio_requests will not return anything as Bob already responded to Alice’s request.

## FIO Domain Registration

### Via link-off

The easiest way to facilitate a FIO Domain registration is to redirect the users to a Foundation for Interwallet Operability website which enables registration and payment with common crypto currencies, such as Bitcoin. FIO Public Key needs to be passed to the website, so that the FIO Domain can be properly assigned to the owner. To learn more see FIO registration site.

When a new FIO Domain is registered, it is set to Private, meaning only the owner of the FIO Domain can register FIO Addresses on it. Therefore, FIO Address registrations on custom domains have to be implemented inside the wallet (not via FIO registration site). See next section for details.

### Via API

FIO Domain can be registered using /register_fio_domain API method and renewed using /renew_fio_domain API method.

### TPID

Do not forget to include your TPID in the request to earn portion of fees paid.

## Register FIO Address on Custom Domain

For wallets desiring full control over the registration user experience or wanting to support FIO Address registrations on custom (set to Private) FIO Domains, a full suite of FIO Address registration and renewal API methods are available.

### Registering/renewing FIO Address

FIO Address can be registered using /register_fio_address API method renewed using /renew_fio_address API method.

### Fetching user’s FIO Addresses and Domains

FIO Addresses and Domains currently owned by the user may be fetched using /get_fio_names API method.

### Fetching user’s FIO Addresses only

FIO Addresses currently owned by the user may be fetched using /get_fio_addresses API method.

### Fetching user’s FIO Domains only

FIO Domains currently owned by the user may be fetched using /get_fio_addresses API method.

### Checking FIO Address or Domain availability

To enable the registering wallet to easily check if a FIO Address or Domain is available for registration, /avail_check API method may be called.

### Paying for FIO Addresses on behalf of users

Wallets may also decide to cover the cost of FIO Address for their users. For that purpose Foundation for Interwallet Operability has develop server code which enables the wallet to run their own registration server.

### Enabling payments in other currencies

The FIO registration site allows wallets to integrate FIO Address and Domain registration via an API with payment occurring with common crypto currencies.

### Technology Provider ID

Please review the Technology Provider ID section for information on how to earn a portion of the fees paid by your users and how to have your users’ tokens proxied by default.

### Fees

FIO Address has annual fee associated with them. Fees in the FIO Chain are set by block producers.

Every FIO Address comes with a set number of bundled transactions annually. The specific number is set by the block producers and is currently 100 annually. This bundle is expected to cover most transactions executed by user except token transfer fees and certain governance or domain management fees.

In order to ensure a particular action is covered by the bundle, the wallet should execute /get_fee API method before submitting any signed transaction.

### Sample UX

See In-wallet FIO Address registration


---
title: FIO Requests
description: FIO Requests
---

# FIO Requests

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


---
title: Encrypting FIO Data
description: Encrypting FIO Data
redirect_from:
    - /docs/integration-guide/encryption
---

# Encrypting FIO Data

## Overview

/new_funds_request and /record_obt_data require that certain sensitive data in those messages be encrypted using the Diffie-Hellman key exchnage scheme. This ensures that only the sender and receiver of the data can decrypt it.

The data is further serialized to reduce size. Currently there is no abi for that data, but you can find the relevant data elements inside the /new_funds_request and /record_obt_data API method specs.

## Encryption inside wallet

Because the encryption of the data requires the private key of the sender and decryption requires the private key of the receiver, it can only be done inside the wallet. This is an important component of the FIO Protocol integration.

For those unfamiliar with Diffie-Hellman encryption, [methods in fiojs SDK](https://github.com/fioprotocol/fiojs/blob/master/src/tests/encryption-fio.test.ts) make this easy.

{% include alert.html type="warning" title="Validating content data" 

content = "The FIO Chain does not see the unencrypted data, so no validation is performed on the data in the content field. It is up to the wallet to ensure the data received is properly formatted and handle any exceptions. <br> <br>

As an example, it is recommended chain_code and token_code be converted to upper case to mitigate the risk that the sending entity used lower case."

%}

![Image]({{ site.baseurl }}/assets/img/integration/wallet-encryption.png)

## Size limitations on encrypted data

Since the FIO Chain cannot see the encrypted content, it cannot enforce size limitations on the individual field. Size limitation is therefore enforced on the content field containing the encrypted string.

|Method	    |Minimum characters	|Maximum characters|
|---|---|---|
|/new_funds_request	   |64	|296|
|/record_obt_data	   |64	|432|

Once you factor encryption overhead the available characters for all parameters are:

|Method	|Maximum characters|
|---|---|
|/new_funds_request	|145|
|/record_obt_data	|260|

### FIO Request

Assuming typical FIO Request contains the following required parameters:

|Parameter	|Typical size|
|---|---|
|payee_public_address	|50|
|amount	|8|
|chain_code	|3|
|token_code	|3|

This would allow for a memo field to be as long as 81 characters. However, some blockchains can have public addresses of over 100 characters, which can severely limit the characters available for memo.

It is recommended that the memo restrictions are computed dynamically based on public address and amount entered.


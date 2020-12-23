---
title: Certification checklist
description: Certification checklist
---

# Certification checklist

The following lists the items that should be tested to confirm support for different FIO features. Some of the items may not be relevant depending on the specific requirements of the wallet or exchange.

**FIO Token support**

-  Receive FIO Tokens to wallet using FIO Public Key
-  Send FIO Tokens using FIO Public Key
-  FIO transaction history is avaialable including sent FIO (including fees) received FIO

**FIO Address**

-  User can register a new FIO Address with FIO
-  User can register a FIO address using other crypto
-  User can register additional FIO Addresses
-  User can renew their existing FIO Addresses

**FIO Send**

-  User is able to send crypto using a FIO Address (alice@wallet) for the destination address
-  User is able to attach a FIO Memo when both the sending and receving user have FIO Addresses (optional)
-  User selects an invalid FIO Address, results in error
-  User selects valid FIO Address, but the Chain or Token Code has not been mapped for that FIO Address, results in error
-  Additional parameters returned from a FIO Address mapped to a [multi-level address]({{site.baseurl}}/docs/integration-guide/mapping#multi-level-addressing) are handled as expected

**Mapping blockchain public addresses**

-  User is able to connect their FIO Address to wallets
-  User is able to disconnect their FIO Address from wallets
-  Disconnecting the main FIO wallet is disabled (see [FIP Public Key mapping]({{site.baseurl}}/docs/integration-guide/mapping))

**Receive to FIO Address**

- From a different wallet, a user is able to enter a FIO Address that has a connected Token and Chain code and send using the returned mapped address
- If the sender and receiver both have a FIO Address, a FIO memo was included, and and FIO OBT transaction was created, the receiving wallet should show the memo (optional)

**Sent FIO Requests**

-  User is able to send a FIO Request to a valid FIO Address
-  User is able to add a memo when sending a FIO Request
-  User is able to view sent FIO Requests
-  Sent Requests show the FIO Address of the recipient, the token being requested, the amount of the request, request memo, and the status of the request (requested, rejected, received)
-  User who sent Request is able to *cancel* the Request

**Received FIO Requests**

-  User is able to view pending FIO Requests
-  Pending Requests show the FIO Address of the user that sent the Request, the token being requested, the amount of the Request, and the Request memo
-  User who recieved a Request is able to *reject* the Request
-  User who recieved a Request is able to confirm and send crypto in response to the Request
-  User responding to a Request is able to change the amount of the Request (optional)
-  User responding to a Request is able to update the Request memo (optional)



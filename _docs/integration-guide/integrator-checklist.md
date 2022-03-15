---
layout: page-int
title: Certification checklist
description: Certification checklist
---

# Certification checklist

The following lists the items that should be tested to confirm support for different FIO features. Some of the items may not be relevant depending on the specific requirements of the wallet or exchange.

**FIO Token support**

-  Receive FIO Tokens to wallet using FIO Public Key
-  Send FIO Tokens using FIO Public Key
-  FIO transaction history is avaialable including sent FIO (including fees) received FIO

**FIO Crypto Handle**

-  User can register a new FIO Crypto Handle (aka FIO Address) with FIO
-  User can register a FIO Crypto Handle using other crypto
-  User can register additional FIO Crypto Handles
-  User can add bundles to their existing FIO Crypto Handles
-  User can purchase additional bundled transactions for their FIO Crypto Handles
-  User can transfer their FIO Crypto Handles

**FIO Domains**

- User can register their own custom FIO Domain
- User can set their domain as public or private
- User can register a FIO Crypto Handle on their own custom FIO domain
- User can renew their existing FIO Domains
- User can transfer their FIO Domains

**FIO Send**

-  User is able to send crypto using a FIO Crypto Handle (alice@wallet) for the destination address
-  User is able to attach a FIO Memo when both the sending and receving user have FIO Crypto Handles (optional)
-  User selects an invalid FIO Crypto Handle, results in error
-  User selects valid FIO Crypto Handle, but the Chain or Token Code has not been mapped for that FIO Crypto Handle, results in error
-  Additional parameters returned from a FIO Crypto Handle mapped to a [multi-level address]({{site.baseurl}}/docs/integration-guide/handle-mapping#multi-level-addressing) are handled as expected

**Mapping blockchain public addresses**

-  User is able to connect their FIO Crypto Handle to wallets
-  User is able to disconnect their FIO Crypto Handle from wallets
-  Disconnecting the main FIO wallet is disabled (see [Mapping Public Addresses]({{site.baseurl}}/docs/integration-guide/handle-mapping))

**Receive to FIO Crypto Handle**

- From a different wallet, a user is able to enter a FIO Crypto Handle that has a connected Token and Chain code and send using the returned mapped address
- If the sender and receiver both have a FIO Crypto Handle, a FIO memo was included, and FIO OBT transaction was created, the receiving wallet should show the memo (optional)

**Sent FIO Requests**

-  User is able to send a FIO Request to a valid FIO Crypto Handle
-  User is able to add a memo when sending a FIO Request
-  User is able to view sent FIO Requests
-  Sent Requests show the FIO Crypto Handle of the recipient, the token being requested, the amount of the request, request memo, and the status of the request (requested, rejected, received)
-  User who sent Request is able to *cancel* the Request

**Received FIO Requests**

-  User is able to view pending FIO Requests
-  Pending Requests show the FIO Crypto Handle of the user that sent the Request, the token being requested, the amount of the Request, and the Request memo
-  User who recieved a Request is able to *reject* the Request
-  User who recieved a Request is able to confirm and send crypto in response to the Request
-  User responding to a Request is able to change the amount of the Request (optional)
-  User responding to a Request is able to update the Request memo (optional)



---
title: FIO vs. EOSIO
description: description
redirect_from:
  - /fio-protocol/fio-vs-eosio
---
# FIO vs. EOSIO

|Feature|EOSIO|FIOChain|
|---|---|---|
|Active block producers|21|21|
|Paid stand-by block producers|Making 100 EOS per day|21|
|Open DAPP platform|Yes|No. FIO does not permit contracts to be deployed by users. FIO is a single Dapp. Similar to EOS, any contract updates must be agreed to by 2/3 + 1 of the block producers. FIO provides a detailed API (one chain endpoint is provided for each capability of the FIO protocol). Push transaction can be used, but we encourage the use of the API for integration to the FIO chain (this provides ease of use, more validation and error handling).|
|Account required|Yes, must be created before interaction|Yes, but automatically created by the API when transfer fio using pub key, and register address are called. Accounts are all created with limited CPU, NET, RAM. RAM limits are increased as user pay fees. A FIO account is a hash of the FIO public key. The protocol keeps a map of the single pub key associated with each account. For signing, wallets include the actor in the signed content, and signed API calls require the actor parameter. The wallets perform hashing of the pub key using SDK calls.|
|Fees|None. BPs paid by inflation. Staking required to access resources.|FIO does not require staking of tokens. All operations on the FIO protocol have an associated fee, which is collected from user. FIO has a notion of a bundled transactions: a number of transactions of certain type are included with every FIO Address. Other calls have mandatory fees. Fees are set through votes of the block producers. Each fee is represented in state in the fees table.|
|Fees shared with integrator|No|FIO has the notion of a TPID (Technology Provider ID). It is a FIO Address created by the integrator. If the TPID is included in the API call then part of the fees of that call will go to the specified TPID.|
|Default proxy|No|Yes. If the holder of FIO tokens does not explicitly vote or proxy votes, their votes are automatically proxied to the TPID.|
|Vote decay|Yes|No|
|Deferred transactions|Yes, but being deprecated|No|
|Cleos|Yes|Cleos has been modified to become specific to the FIO protocol. We have renamed the command line to be Clio (for command line fio).|

## Knowledge Base articles

[FIO Chain Overview](https://kb.fioprotocol.io/fio-chain/overview)

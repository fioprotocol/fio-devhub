---
layout: page-dev
title: EOSIO vs. FIO
description: EOSIO vs. FIO
---

This document detailes the FIO core code-level differences between FIO and EOSIO. It is a work in progress.


## Open DAPP platform 

FIO does not permit contracts to be deployed by users. FIO is a single Dapp. Similar to EOSIO, any system contract updates must be agreed to by 2/3 + 1 of the block producers. 

## API Endpoints

FIO provides a detailed API (one chain endpoint is provided for each capability of the FIO protocol). Push transaction can also be used. 

## Accounts

FIO accounts are automatically created by the API when transfer `trnsfiopubky` and `regaddress` are called. New accounts are all created with limited CPU, NET, RAM. RAM limits are increased as users pay fees. 

A FIO account is a hash of the FIO public key. The protocol keeps a map of the single pub key associated with each account. For signing, wallets include the actor in the signed content, and signed API calls require the actor parameter.

## Fees

FIO does not require staking of tokens. All operations on the FIO protocol have an associated fee, which is collected from user. FIO has a notion of a bundled transactions: a number of transactions of certain type are included with every FIO Crypto Handle. Other calls have mandatory fees. Fees are set through votes of the block producers. Each fee is represented in state in the fees table.

## Technology Providers

FIO has the notion of a TPID (Technology Provider ID). It is a FIO Crypto Handle created by the integrator. If the TPID is included in the API call then part of the fees of that call will go to the specified TPID.
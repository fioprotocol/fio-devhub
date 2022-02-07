---
title: FIO Bounty Program Scope
description: FIO Bounty Program Scope
---
# Bounty Program Scope

This page describes the scope for the FIO Bug Bounty program, providing details as to in-scope software, the types of security vulnerabilities that qualify for rewards, and the types of vulnerabilities and issues that do not qualify.  In addition to the scope lists below, be sure to be aware of the [Rules and Directions for Reporting Vulnerabilities]({{site.baseurl}}/docs//chain/bounty-howto).
## In-scope Software

Software maintained the [fioprotocol Github](https://github.com/fioprotocol/bp-tools){:target="_blank"} is intended to be in scope. 

This includes:

* fio -  https://github.com/fioprotocol/fio
* fio.contracts - https://github.com/fioprotocol/fio.contracts
* fiosdk_typescript - https://github.com/fioprotocol/fiosdk_typescript
* fiosdk_ kotlin - https://github.com/fioprotocol/fiosdk_kotlin
* fiosdk_ios - https://github.com/fioprotocol/fiosdk_ios
* fio.registrations - https://github.com/fioprotocol/fio-registrations
* fio.dashboard - https://github.com/fioprotocol/fio-dashboard
* fio.oracle - https://github.com/fioprotocol/fio.oracle
* fio.erc20 - https://github.com/fioprotocol/fio.erc20
* fio.erc721 - https://github.com/fioprotocol/fio.erc721
* ledger-hw-app-fio - https://github.com/fioprotocol/ledger-hw-app-fio
* ledgerjs-hw-app-fio - https://github.com/fioprotocol/ledgerjs-hw-app-fio
* Protocol - Vulnerabilities found in the FIO Protocol such as network level Denial of Service (DoS/DDoS) vulnerabilities

## Qualifying vulnerabilities

Any design or implementation issue that substantially affects the confidentiality or integrity of user data is likely to be in scope for the program. Common examples include:

* Blockchain structure vulnerabilities, including issues that cause forks or orphaned blocks;
* Blockchain application vulnerabilities including double spending, cryptojacking, smart contract DoS, overflow attacks, replay attacks, and balance attacks;
* P2P system vulnerabilities including DNS hijacks, BGP hijacks, eclipse attacks, majority attacks, DDoS attacks, consensus delay, timejacking attacks, and Kinney attacks;
* Vulnerabilities that permit the redirecting or stealing of FIO tokens from a FIO account;
* Vulnerabilities that interfere with the mapping between FIO Crypto Handles and other blockchain public addresses;
* Vulnerabilities that consume state RAM; and
* Vulnerabilities that create invalid, excessively large, entries in the blockchain transaction log and can subsequently cause problems during blockchain replay.

## Non-qualifying vulnerabilities, test types and bug report types

Depending on their impact, some of the reported issues may not qualify. Although we review them on a case-by-case basis, here are some of the common low-risk issues that typically do not earn a reward:

* Vulnerabilities already identified iternally or in external third-party audits.
* Vulnerabilities in 3rd party libraries.
* URL redirection. We recognize that the address bar is the only reliable security indicator in modern browsers; consequently, we hold that the usability and security benefits of a small number of well-designed and closely monitored redirectors outweigh their true risks.
* Vulnerabilities requiring exceedingly unlikely user interaction. For example, a cross-site scripting flaw that requires the victim to manually type in an XSS payload into Google Maps and then double-click an error message may realistically not meet the bar.
* Flaws affecting the users of wallets that have integrated the FIO Protocol.

The following test types are excluded from scope:

* Findings from physical testing such as office access (e.g. open doors, tailgating)
* Findings derived primarily from social engineering (e.g. phishing, vishing)
* Findings from applications or systems not listed in the ‘Scope’ section
* UI and UX bugs and spelling mistakes
* Source code formatting, stylistic suggestions, or small fixes (please submit a Github request for source code fixes)

Additionally, all of the following vulnerabilities and bug report types are not considered as in-scope in this bounty program:

* Attacks that the reporter has already exploited themselves, leading to damage.
* Attacks requiring access to leaked keys/credentials.
* Incorrect data supplied by third party oracles.
* Basic economic governance attacks (e.g. 2/3 + 1 attack)
* Best practice critiques
* Sybil attacks

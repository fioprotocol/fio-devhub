---
title: FIO Bug Bounty Program Scope
description: FIO Bug Bounty Program Scope
---
# Bug Bounty Program Scope

In principle, any software maintained the fioprotocol Github is intended to be in scope. This includes:

* Source code: Vulnerabilities found in FIO blockchain, SDK, or other source code located on the FIO Protocol Github
* API: Vulnerabilities found in the FIO Protocol API
* Protocol: Vulnerabilities found in the FIO Protocol such as network level Denial of Service (DoS/DDoS) vulnerabilities

The following test types are excluded from scope:

* Findings from physical testing such as office access (e.g. open doors, tailgating)
* Findings derived primarily from social engineering (e.g. phishing, vishing)
* Findings from applications or systems not listed in the ‘Scope’ section
* UI and UX bugs and spelling mistakes
* Source code formatting, stylistic suggestions, or small fixes (please submit a Github request for source code fixes)

## Qualifying vulnerabilities

Any design or implementation issue that substantially affects the confidentiality or integrity of user data is likely to be in scope for the program. Common examples include:

* Blockchain structure vulnerabilities, including issues that cause forks or orphaned blocks;
* Blockchain application vulnerabilities including double spending, cryptojacking, smart contract DoS, overflow attacks, replay attacks, and balance attacks;
* P2P system vulnerabilities including DNS hijacks, BGP hijacks, eclipse attacks, majority attacks, DDoS attacks, consensus delay, timejacking attacks, and Kinney attacks;
* Vulnerabilities that permit the redirecting or stealing of FIO tokens from a FIO account;
* Vulnerabilities that interfere with the mapping between FIO Crypto Handles and other blockchain public addresses;
* Vulnerabilities that consume state RAM; and
* Vulnerabilities that create invalid, excessively large, entries in the blockchain transaction log and can subsequently cause problems during blockchain replay.

## Non-qualifying vulnerabilities

Depending on their impact, some of the reported issues may not qualify. Although we review them on a case-by-case basis, here are some of the common low-risk issues that typically do not earn a reward:

* URL redirection. We recognize that the address bar is the only reliable security indicator in modern browsers; consequently, we hold that the usability and security benefits of a small number of well-designed and closely monitored redirectors outweigh their true risks.
* Bugs requiring exceedingly unlikely user interaction. For example, a cross-site scripting flaw that requires the victim to manually type in an XSS payload into Google Maps and then double-click an error message may realistically not meet the bar.
* Flaws affecting the users of wallets that have integrated the FIO Protocol.
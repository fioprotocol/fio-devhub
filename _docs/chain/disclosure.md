---
title: Vulnerability Disclosure Policy
description: Vulnerability Disclosure Policy
---
# Vulnerability Disclosure Policy
## Guidelines

We require that all researchers:

* When investigating a vulnerability, please, only ever target your own accounts. Never attempt to access anyone else’s data and do not engage in any activity that would be disruptive or damaging to your fellow users;
* Make every effort to avoid privacy violations, degradation of user experience, disruption to production systems, and destruction of data during security testing;
* Perform research only within the scope set out below;
* Use the identified communication channels to report vulnerability information to us; and
* Keep information about any vulnerabilities you’ve discovered confidential between yourself and FIO until we’ve had 90 days to resolve the issue.
* Only perform security research against a local node. Instructions for setting up a local node are available on https://github.com/fioprotocol;
* If you want to perform research against the FIO Testnet, please engage with the [FIO Testnet Telegram group](https://t.me/fiotestnet){:target="_blank"} and ask for guidance;
* If you follow these guidelines when reporting an issue to us, we commit to:

Not pursue or support any legal action related to your research;
Work with you to understand and resolve the issue quickly (including an initial confirmation of your report within a reasonable amount of time); and
Recognize your contribution (if requested), if you are the first to report the issue and we make a code or configuration change based on the issue.

## Scope

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

## How to report a security vulnerability?

If you believe you’ve found a security vulnerability in the FIO Protocol please send it to us by emailing security@fioprotocol.io Please include the following details with your report:

* Description of the location and potential impact of the vulnerability;
* A detailed description of the steps required to reproduce the vulnerability (POC scripts, screenshots, and compressed screen captures are all helpful to us); and
* Your name/handle so we can respond to your (if desired).

If you’d like to encrypt the information, please use our Keybase key: https://keybase.io/fiosec

## Rewards for security vulnerabilities

We are currently evaluating the implementation of a monetary rewards program. Until that program is in place, vulnerability reporters who work with us to resolve security bugs in our products will receive “reward points” and be credited on the FIO Hall of Fame (if desired). If we file an internal security bug, we will acknowledge your contribution on that page. Qualification for reward points are determined by a reward panel consisting members of the FIO community, including foundation members, wallet members, and block producers.

Reward points will be allocated according to:

* Volume: The more valid bug reports you’ve sent in, the more points you get. Points are deducted for spurious reports.
* Severity: For those bugs, how severe are they? Better bugs earn more points.
* Recency: The most recent bug reports receive maximum points. Bug reports older than 6 months lose an increasing proportion of their points over time.

## Frequently asked questions

**Q: What if I found a vulnerability, but I don’t know how to exploit it?**

A: We expect that vulnerability reports sent to us have a valid attack scenario to qualify for a reward, and we consider it as a critical step when doing vulnerability research. Reward points are decided based on the maximum impact of the vulnerability, and the panel is willing to reconsider a reward amount based on new information (such as a chain of bugs, or a revised attack scenario).

How do I demonstrate the severity of the bug if I’m not supposed to snoop around?

A: Please submit your report as soon as you have discovered a potential security issue. The panel will consider the maximum impact and will choose the reward accordingly. We may give higher reward points for otherwise well-written and useful submissions where the reporter didn’t notice or couldn’t fully analyze the impact of a particular flaw.

**Q: Who determines whether my report is eligible for reward points?**

A: The reward panel consists of the members of the FIO community, including foundation members, wallet members, and block producers.

**Q: What happens if I disclose the bug publicly before you had a chance to fix it?**

A: Our pledge to you is to respond promptly and fix bugs in a sensible timeframe - and in exchange, we ask for a reasonable advance notice. Reports that go against this principle will usually not qualify, but we will evaluate them on a case-by-case basis.

**Q: My report has not been resolved within the first week of submission. Why hasn’t it been resolved yet?**

A: Reports that deal with potential abuse-related vulnerabilities may take longer to assess, because reviewing our current defense mechanisms requires investigating how a real life attack would take place and reviewing the impact and likelihood requires studying the type of motivations and incentives of abusers of the submitted attack scenario against FIO.

**Q: I wish to report an issue through a vulnerability broker. Will my report still qualify for a reward?**

A: We believe that it is against the spirit of the program to privately disclose the flaw to third parties for purposes other than actually fixing the bug. Consequently, such reports will typically not qualify.

**Q: What if somebody else also found the same bug?**

A: First across the starting line. You will qualify for reward points only if you were the first person to alert us to a previously unknown flaw.

**Q: Can I report a problem privately?**

A: Sure. It is fine if you do not which to be publicly recognized. Just mention this when you submit your report.

## Legal points

This is not a competition, but rather an experimental and discretionary rewards program. You should understand that we can cancel the program at any time and the decision as to whether or not to give reward points has to be entirely at our discretion.

Of course, your testing must not violate any law, or disrupt or compromise any data that is not your own.

---
layout: page-bp
title: FIO Block Producers
description: FIO Block Producers
---
# FIO Block Producers

FIO block producers (BPs) host and manage the infrastructure necessary to run the FIO Chain. BPs also play a major role in the governance of the chain. FIO Protocol is a distributed proof-of-stake chain wherein FIO token holders choose BPs [by voting for producers]({{site.baseurl}}/docs/contribute/govern-voting) or [proxying their vote]({{site.baseurl}}/docs/contribute/govern-proxy-vote). 

Blocks are produced every 0.5 seconds by a specific block producer designated to produce a block at that time. Blocks are produced in rounds of 126 (6 blocks each times 21 producers). In FIO, block producers can modify system smart contracts with a ⅔ + 1 (15 BP) supermajority.

The [block producer API]({{site.baseurl}}/pages/api/fio-api/#tag--Block-Producer-Actions) details the transactions available for managing the FIO chain.

---
## Understanding BP performance and effectiveness

There are several tools for examining BP performance and effectiveness. While no single measure can be used to determine how well a BP is performing, there are several measures that should be considered before voting.

##### Does the BP publish information about themselves?

Websites and social media links for block producers can be found on the [bloks.io monitor](https://fio.bloks.io){:target="_blank"} and on the [AlohaEOS FIO Block Producer Research Portal](https://www.alohaeos.com/vote/fiomain){:target="_blank"}.

##### What are the performance benchmarks for the BP?

There are several BP-maintained tools that provide information on BP infrastructure and performance: 

* [Mainnet Health Monitor](https://health.fioprotocol.io){:target="_blank"} (published by [Blockpane](https://blockpane.com){:target="_blank"})
* [FIO Producer Rankings](https://snap.blockpane.com/proxy.html){:target="_blank"} (published by [Blockpane](https://blockpane.com){:target="_blank"})
* [Block Producer Reliability Tracker](https://www.alohaeos.com/tools/reliability#networkId=20&timeframeId=8&sort=rank&sortDir=asc){:target="_blank"} (published by [AlohaEOS](https://www.alohaeos.com){:target="_blank"})
* [FIO Network Monitor](http://fio.stats.eosusa.news/d/eosusa/global-home?orgId=1){:target="_blank"} (published by [EOSUSA](https://www.eosusa.io){:target="_blank"})
* [FIO Node Status](https://tools.ledgerwise.io/nodestatus/fio){:target="_blank"} (published by [Ledgerwise](https://ledgerwise.io){:target="_blank"})
* [FIO Stats Site](https://graph.fioprotocol.io/d/6du4X1SGk/current-activity?orgId=1&refresh=1m&kiosk){:target="_blank"} (maintained by [Blockpane](https://blockpane.com){:target="_blank"})

##### Does the BP participate in governance and other strategic discussions?

The principle media channels for FIO BPs are the [Mainnet](https://t.me/fiomainnet){:target="_blank"} and [Testnet](https://t.me/fiotestnet){:target="_blank"} Telegram channels. 

##### Does the BP keep up to date with releases?

FIO releases are published on the [FIO Github repository](https://github.com/fioprotocol/fio/releases){:target="_blank"}. Version information for active BPs can be found on the [FIO Mainnet Health monitor](https://health.fioprotocol.io){:target="_blank"}.

##### Does the BP build and maintain tools that benefit the protocol?

Many FIO block producers contribute to the protocol by building and maintaining helpful tools. The following are a sample of BP-maintained FIO tools:

* [FIO Tools Lounge](https://www.fio.tools){:target="_blank"} (maintained by [The Currency Hub](https://www.thecurrencyhub.io){:target="_blank"})
* [Hyperion History API for FIO](http://fio.eossweden.org/v2/docs/index.html){:target="_blank"} (published by [EOS sw/eden](https://eossweden.org){:target="_blank"})
* [Registration Helper](https://greymass.github.io/fio-register/){:target="_blank"} (published by [Greymass](https://greymass.com/en/){:target="_blank"})
* [FIO Utilities](https://fio-utils.blockpane.com/index.html#/){:target="_blank"} (published by [Blockpane](https://blockpane.com){:target="_blank"})
* [FIO Tools](https://www.alohaeos.com/tools){:target="_blank"} (published by [Aloha EOS](https://www.alohaeos.com){:target="_blank"})
* [Package Repository](https://eosswedenorg.github.io/apt/fio){:target="_blank"} (published by [EOS sw/eden](https://eossweden.org){:target="_blank"})
* [FIO Snapshots](https://snap.blockpane.com/index.html){:target="_blank"} (published by [Blockpane](https://blockpane.com){:target="_blank"})
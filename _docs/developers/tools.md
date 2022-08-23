---
layout: page-dev
title: Developer Tools
description: Developer Tools
---

# Developer Tools

This page documents some of the tools that are helpful when developing or testing against a local or testnet API node.

If you are creating test cases, the FIO core team will provide you with a pre-configured API node that can be used for local testing. If more control over the local environment is needed, please read the instructions on installing a personal locl dev environment.

If you are doing development on the `fio` or `fio.contracts` repositories, you will need to [install a local development environment]({{site.baseurl}}/docs/contribute/onboarding-devenviron) to validate your code before merging into a FIO repository.

### Tools

* [fiowatch](https://github.com/blockpane/fiowatch/releases){:rel="nofollow noopener noreferrer" target="_blank"} is a tool for monitoring transactions as the go across they wire. It needs access to both the P2P and the API ports.
* [cryptonym](https://github.com/blockpane/cryptonym){:rel="nofollow noopener noreferrer" target="_blank"} is an interactive contract browsing tool that can be used to examine table data and submit transactions to local and testnet API nodes.
* The [javascript sdk examples](https://github.com/fioprotocol/fiosdk_typescript-examples){:rel="nofollow noopener noreferrer" target="_blank"} are a common set of examples that can be run in a nodejs environment to interact with local and testnet API nodes.


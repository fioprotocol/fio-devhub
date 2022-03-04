---
layout: page-dev
title: Documenting Changes for Deployment
description: Guidelines for Documenting Changes for Deployment
redirect_from:
    - /docs/developers/contract

---
# Documenting Changes for Deployment
Smart contract developers who have developed enhancements to the FIO protocol should consider several important deliverables: 

- The developer must at a minimum document the commands necessary to be executed on the previous version of the chain in order to deliver their changes
- The developer must summarize the necessary dependancies of any modified contracts:
    - Explain what the order of delivery of the changes must be
    - Communicate any changes that can be done in any iterations of deployment that might result during test net and main net delivery. 
- The developer should also clearly communicate changes that MUST go into the chain together.

This documentation can be added to the existing design documentation: 
[https://fioprotocol.atlassian.net/wiki/spaces/FD/pages/7471298/Development+Documents+Active](https://fioprotocol.atlassian.net/wiki/spaces/FD/pages/7471298/Development+Documents+Active){:rel="nofollow noopener noreferrer" target="_blank"}   
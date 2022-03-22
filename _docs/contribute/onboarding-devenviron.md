---
layout: page-dev
title: Set Up Development Environment
description: Set Up Development Environment
redirect_from:
    - /docs/developers/onboarding
---

# Set Up Your FIO Development Environment

Welcome to the FIO community! As a technical contributor to FIO (blockchain developer, or contract specialist working on a bounty, or any developer centric project) we hope this page provides you information to help you to set up your operating environment for development purposes.

Your project needs will vary, so please determine your project needs and identify the necessary details to deliver your project in accordance with your [FIO worker proposal]({{site.baseurl}}/docs/contribute/onboarding-workerprop).

First decide on the development and testing environments you will use to develop your project. You can establish AWS servers for your uses, or you can work on physical machines of your choosing.

## Establish an AWS sandbox.  (optional)

An AWS sandbox is useful if you do not have a physical machine to use for your development or testing/demo.

An AWS sandbox is also useful to provide testers and product owners the ability to use and evaluate various deliveries you will make.

Please note, as your project approaches the release integration phase, the core team will provide AWS resources for testing and integration, so an AWS instance is NOT a requirement of all projects.

if you would like to set up an AWS instance
Work with FIO development (casey, Eric, release manager) to get a AWS DEV server provisioned. 

 

Add a section for setting up AWS instance using these images

you are responsible for the cost, spin up, spin down, and other operational details and general management of the AWS environments you use for development.

The FIO developer community, FIO release manager, and FIO Core team can help you to setup and provision your server should you deem it necessary to have one.

OR

Setup a local dev box. (Ubuntu, other). (optional)

The FIO developer community, and FIO Core team can help you to setup and provision your local dev box should you deem it necessary to have one. please consult the readme files for repositories to help you decide the OS and hardware you might use.

 

Setup for blockchain development

The following links may be useful to provide you information regarding protocol improvements, and developer facing information.

GitHub - fioprotocol/fips: FIO Improvements Proposals 

GitHub - fioprotocol/fio-devhub: FIO Developer Hub 

developer wiki

FIO Development 

developer kanban board

https://fioprotocol.atlassian.net/jira/software/c/projects/BD/boards/2

 

Build the protocol locally.
clone the following repositories according to the READMEs:

please use the develop branch, or consult the fio release manager for details of the parent branch that will best serve your project.

GitHub - fioprotocol/fio.contracts: Smart contracts that provide some of the basic functions of the FIO blockchain 

GitHub - fioprotocol/fio: The FIO Protocol is a decentralized, open-source blockchain protocol that makes it easier and less risky to use blockchain tokens and coins. 

shell scripts to start up a local fio dev env.

GitHub - fioprotocol/fio.devtools 

javascript tests you will configure for various testing purposes.

GitHub - fioprotocol/fio.test 

 



build and run a FIO node on your DEV server according to the README on fio.devtools


once your chain is running locally, you can run the fio.test environment to verify functionality. according to the readme instructions in the fio.test repo.

Here are some tools commonly used by the tech team:

|Tool|Description|
|---|---|
|[Discord](https://discord.gg/fio) |Much of the day-to-day coordination and communication is performed over discord.  |
|[Jira](https://fioprotocol.atlassian.net/jira/software/c/projects/BD/boards/2?selectedIssue=BD-3035)|The project management efforts and Worker Proposals are documented and managed in Jira.|
|[Confluence](https://fioprotocol.atlassian.net/wiki/home)|The Knowledge Hub and Wiki are on this platform|
|[Github](https://github.com/fioprotocol/)|Configuration Management is handled using Github.|

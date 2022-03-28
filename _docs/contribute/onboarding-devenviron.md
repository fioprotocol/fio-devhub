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

First decide on the development and testing environments you will use to develop your project. You can establish AWS servers for your uses, or you can work on physical machines of your choosing. (**Note that you are responsible for the cost, spin up, spin down, and other operational details and general management of the AWS environments you use for development.**)

The FIO developer community, FIO release manager, and FIO Core team can help you to setup and provision your server should you deem it necessary to have one.
## (Optional) Establish an AWS sandbox  

An AWS sandbox is useful if you do not have a physical machine to use for your development or testing/demo.

An AWS sandbox is also useful to provide testers and product owners the ability to use and evaluate various deliveries you will make.

**Note:** As your project approaches the release integration phase, the core team will provide AWS resources for testing and integration, so an AWS instance is NOT a requirement of all projects.

If you would like to set up an AWS instance, work with FIO development to get an AWS DEV server provisioned. 

### Step 1 and 2: 
 ![Image]({{ site.baseurl }}/assets/img/devenviron/AWS_ubuntu.png)

### Step 3: Configure Instance Details
 ![Image]({{ site.baseurl }}/assets/img/devenviron/AWS_interface.png)

### Step 4: Add Storage
 ![Image]({{ site.baseurl }}/assets/img/devenviron/AWS_storage.png)

 ### Step 5: Add Tags

 ![Image]({{ site.baseurl }}/assets/img/devenviron/AWS_tags.png)


## (Optional) Setup a local dev box (Ubuntu, other) 

The FIO developer community and FIO Core team can help you to setup and provision your local dev box should you deem it necessary to have one. Please consult the readme files for repositories to help you decide the OS and hardware you might use.

 
## Setup for Blockchain Development

### Resources: 

The following links provide useful information regarding protocol improvements, and developer facing information.

- [GitHub - fioprotocol/fips: FIO Improvements Proposals](https://github.com/fioprotocol/fips )
- [GitHub - fioprotocol/fio-devhub: FIO Developer Hub](https://github.com/fioprotocol/fio-devhub)
- [Developer wiki](https://fioprotocol.atlassian.net/wiki/spaces/FD/overview)
- [FIO Development ](https://fioprotocol.atlassian.net/wiki/spaces/FD/overview?homepageId=7471291)
- [Developer Kanban Board](https://fioprotocol.atlassian.net/jira/software/c/projects/BD/boards/2)

### Build the protocol locally.
First, clone the following repositories according to the READMEs:
 
Please use the develop branch, or consult the fFIOio release manager for details of the parent branch that will best serve your project.


|GitHub Branch|Description|
|---|---|
|[FIO Contracts](https://github.com/fioprotocol/fio.contracts)|Smart contracts that provide some of the basic functions of the FIO blockchain|
|[The FIO Protocol in GitHub](https://github.com/fioprotocol/fio)|The FIO Protocol is a decentralized, open-source blockchain protocol that makes it easier and less risky to use blockchain tokens and coins|
|[Shell Scripts in GitHub](https://github.com/fioprotocol//fio.devtools)|Shell scripts to start up a local FIO Development Environment|
|[JavaScript Tests in GitHub](https://github.com/fioprotocol//fio.test)|Primarily for developers) Javascript tests allow you to configure your development for various testing purposes|

### Build and run a FIO node on your DEV server according to the README on [fio.devtools](https://github.com/fioprotocol//fio.devtools)

Once your chain is running locally, you can run the fio.test environment to verify functionality, according to the readme instructions in the fio.test repo.


---
layout: page-dev
title: Git Branching and Release
description: Git Branching and Release
---

# Git Branching and Release Strategy

|Branch |Purpose |Branch from |Naming |
|---|---|---|---|
|master |The master branch should always reflect what is on Mainnet. | |master |
|develop |The develop branch serves as an integration branch for features, epics, and bugs. Before a release branch is cut, develop should have commits from master merged to capture any hotfixes to previous releases. |master  |develop  |
|release |Release branches are stable branches that are currently being released, or have been previously released to Testnet or Mainnet. The release branch is cut after code freeze to prepare for devnet and Testnet testing. The tip of this branch should be always in the production-ready state for that particular release. I.e., you should always be able to hotfix to a release branch. Release branches are created for every major and minor release. |develop  |release/v1.1.x  |
|feature/epic |A feature (or epic) branch is the main unit of work. Features are developed in separate branches, promoted to develop for testing, and then promoted to release and master branches in a continuous cycle. |develop  |feature/devname(optional)-epic#-fip#-epicname <br> (e.g., "feature/eric-BD-1580-fip6-lock-tokens")  |
|bug |Bug branches  |develop, feature  |bug/bug#-description <br> (e.g., bug/BD-1841-wallet-requests )  |
|hotfix |Hotfix branches are for critical issues that need to get into Mainnet immediately. The are branched off of the latest release branch for initial testing and the Testnet release. |release  |hotfix/bug#-description <br> (e.g., "hotfix/BD-1888-set-fee-ratio")  |

## Feature development

1. Developer creates feature branch off of develop or other target branch (e.g., feature/fip6-lock-tokens)
2. Developer frequently merge into the feature branch with the latest from develop. This will grab the latest code and reattach the feature branch to the new root of develop.
3. Developer uses [Development Milestone Checklist](https://fioprotocol.atlassian.net/wiki/spaces/FD/pages/35553326/template+FIP-nn+Development+Milestone+Checklist){:target="_blank"} to guide design, development, and unit testing of feature
4. Developer creates draft PR and requests code review from all core devs, security, release management, and QA
5. Developer hands off the feature to QA
6. QA creates system tests tests and open bugs
7. Developer fixes bugs and updates PR
8. Developer
    * Merge into feature branch from target branch (e.g., develop) and builds locally
    * Re-runs javascript tests on local build
    * Moves PR out of draft to ready for review
9. Release manager merges to target branch (e.g., develop) and runs system tests
    * Feature branch into target branch
    * Merge SDK updates (if applicable)
    * Merge fio.test updates
10. Release manager installs latest on DEV server and sends to UAT

## Feature releases (major/minor releases)

1. The develop branch is the release candidate branch and and is used for release testing
2. Merge all features and bugs into develop
3. Merge changes from master into develop
4. Create release branch from develop
5. Install release branch on DEV server
6. Run fio.test system tests
7. Create pre-release RC tag off of the head commit from release branch
    * Tag: v1.1.0-rc1
    * Title: Release Candidate - FIO v1.1.0-rc1
8.  Send release to Testnet
9.  If issues are found, fix bugs off of release branch as necessary and repeat steps with rc2, rc3, etc.
10. Complete Testnet testing
11. Create PR for release > master and require code review
12. Merge release into master
13. Create release from master
    * Tag: v1.1.0
    * Title: Release - FIO v1.1.0
14. Run fio.test system tests against release
15. Send release to Mainnet

## Hotfix/patch releases

1. Hotfixes branches are used to patch Mainnet.
2. Compare latest release branch (e.g., release/v1.1.x) with master. If there are differences, we have done something wrong.
3. Create hotfix branch off of release branch
4. Complete development and javascript tests for hotfix
5. Create PR and merge into release branch
6. Install release branch on DEV server and through QA/UAT cycle. Update release branch as necessary.
7. Create pre-release RC tag off of the head commit from release branch
    * Tag: v1.1.1-rc1
    * Title: Release Candidate - FIO v1.1.1-rc1
9.  Send release to Testnet
10. If issues are found, fix bugs off of release branch as necessary and repeat steps with rc2, rc3, etc.
11. Complete Testnet testing
12. Merge release branch into master
13. Create release from master:
    * Tag: v1.1.1
    * Title: Release - FIO v1.1.1
14. Send release to Mainnet.

## Archiving branches

When you want to keep the commit history of a branch that is old or that has been deprioritized, archive the branch as a tag and then remove the branch. Git tags aren't too different from branches. They are a point-in-time backup of a repository at a specific commit level or in the case of this workflow a specific branch.

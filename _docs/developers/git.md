---
title: Git Branching and Release
description: Git Branching and Release
---

# Git Branching and Release Strategy

|Branch |Purpose |Branch from |Naming |
|---|---|---|---|
|hotfix |Hotfix branches are for critical issues that need to get into Mainnet immediately. |release  |hotfix/<bug #>-<brief description> (e.g., "hotfix/BD-1888-set-fee-ratio")  |
|release |Release branches are stable branches that are currently released, or have been previously released to Mainnet. The tip of this branch should be always in the production-ready state for that particular release. I.e., you should always be able to hotfix to a release branch. Release branches are created for every major and minor release. |master  |release/v1.1.x  |
|master |The master branch should always reflect what is on Mainnet. |release  | |
|develop |The develop branch serves as an integration branch for features/epics. |master  |  |
|bug |Bug branches  |develop, feature  |bug/<bug #>-<brief description> (e.g., bug/BD-1841-wallet-requests )  |
|feature/epic |A feature (or epic) branch is the main unit of work. Features are developed in separate branches, promoted to testing, and then promoted to master in a continuous cycle. |develop  |feature/<dev name (optional)>-<epic #>-<fip#>-<brief epic name> (e.g., "feature/eric-BD-1580-fip6-lock-tokens")  |

## Feature development

1. Create feature branch off of develop (e.g., feature/1580-fip6-lock-tokens)
2. Frequently rebase feature branch with latest from develop. This will grab the latest code and reattach the feature branch to the new root of develop.
3. Complete development of feature, SDK updates (if applicable), and javascript tests.
4. Create draft PR:
   * Feature branch into develop.
   * SDK feature branch into SDK develop.
   * JS tests into master.
5. Send to QA.
6. QA will expand javascript tests and open bugs. 
7.  Fix bugs and update PR.
8.  Once it passes QA, install on DEV server and send to UAT.
    * Note in story which label to use for SOAP tests.
9.  UAT will expand SOAP or javascript tests and open bugs. 
10. Fix bugs and update PR.
11. Once it passes UAT it will be sent to Ready to Deploy.
12. Once a release has been identified as going into the next release:
    * Rebase feature branch from develop and build locally.
    * Re-run javascript tests on local build.
    * Move PR from draft to review.
13. Merge:
    * Feature branch into develop
    * SDK updates (if applicable)
    * fio.test updates
14. Build latest develop on DEV server and re-run JS and SOAP tests.

## Feature releases (major/minor releases)

1. The develop branch is the release candidate branch and and is used for release testing.
2. Merge all features and bugs into develop.
3. Rebase develop from master.
4. Create draft PR to master.
5. Install develop on DEV server.
6. Run fio.test system tests.
7. Create pre-release RC tag off of the head commit from develop.
    * Tag: v1.1.0-rc1
    * Title: Release Candidate - FIO v1.1.0-rc1
8.  Send release to Testnet.
9.  If issues are found, fix bugs off of develop branch as necessary and repeat steps with rc2, rc3, etc.
10. Complete Testnet testing.
11. Move PR from draft to review.
12. Merge develop into master.
13. Create release branch (e.g., release/v1.1.x)
14. Install release branch on DEV server.
15. Run javascript, SOAP, and all system tests.
16. Delete pre-release and create release from master.
    * Tag: v1.1.0
    * Title: Release - FIO v1.1.0
17. Send release to Mainnet

## Hotfix/patch releases

1. Hotfixes branches are used to patch Mainnet. 
2. Compare latest release branch (e.g., release/v1.1.x) with master. If there are differences, we have done something wrong.
3. Create hotfix branch off of release branch.
4. Complete development and javascript tests for hotfix.
5. Create PR and merge into release branch.
6. Install release branch on DEV server and through QA/UAT cycle. Update release branch as necessary.
7. Create pre-release RC tag off of the head commit from release branch.
8. Tag: v1.1.1-rc1
9. Title: Release Candidate - FIO v1.1.1-rc1
10. Send release to Testnet.
11. If issues are found, fix bugs off of release branch as necessary and repeat steps with rc2, rc3, etc.
12. Complete Testnet testing.
13. Merge release branch into master.
14. Delete pre-release and create release from master:
    * Tag: v1.1.1
    * Title: Release - FIO v1.1.1
15. Send release to Mainnet.

## Archiving branches

When you want to keep the commit history of a branch that is old or that has been deprioritized, archive the branch as a tag and then remove the branch. Git tags aren't too different from branches. They are a point-in-time backup of a repository at a specific commit level or in the case of this workflow a specific branch.
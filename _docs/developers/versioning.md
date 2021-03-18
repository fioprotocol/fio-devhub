---
title: FIO Versioning
description: FIO Versioning
---

# FIO Versioning

FIO uses [semantic versioning](https://semver.org/){:rel="nofollow noopener noreferrer" target="_blank"} rules for versioning releases across the FIO repositories. 
 
### Contracts

Version format: MAJOR.MINOR.PATCH

Increment MAJOR version (to match Blockchain MAJOR version):
* Updates to contracts breaks compatibility with clients accessing API.

Increment MINOR version:
* New, backwards compatible functionality is introduced.

Increment PATCH version
* Bug fixes (no compatibility issues).

### Blockchain

Version format: MAJOR.MINOR.PATCH

Increment MAJOR version:
* Hard fork: Blocks/transactions based on new rules are NOT considered valid by nodes running the old version of Blockchain, and vice versa.
* A replay with the new version of Blockchain will create a different STATE from a node running the old version.

Updates to Blockchain breaks compatibility with existing clients.
* Update:
  * BP nodes: Replay required. BPs that do not update the latest MAJOR version will create a hard fork.
  * API and History nodes: Resync from P2P network likely required.

Increment MINOR version:
* Soft fork: 
  * Blocks/transactions based on new rules are considered valid by nodes running the old version of Blockchain.
  * Nodes running the old Blockchain software risk trying to push invalid blocks on to the blockchain (depending on the new rules). This can lead to loss of computational resources.
* Updates to blockchain add new features that will require updates to clients using the API or SDK. Client updates are only needed to access the new features.
* Blockchain update requires Contracts with same MINOR version.
* A replay may be required if there are infrastructure updates that do not impact state.
* Update:
  * BP nodes: Restart required. BPs that do not update to the latest MINOR version may have transactions rejected leading to loss of computational resources.
  * API nodes: Restart required (or is updating optional?)
  * History nodes: Restart required. Resync may be recommended if it would create a different history (it may add new information).

Increment PATCH version:
* Bug fixes (no compatibility issues).
* Update:
  * Optional for all nodes. 

### API

Version format: /v1/chain

FIO uses URI versioning in addition to Blockchain server versioning. The URI version is incremented for breaking changes.

What is a breaking change:
* Removing, renaming or generally restructuring non-optional information in the design of existing endpoints or parameters.
* Major semantic changes in the meaning of a parameter.

What is not a breaking change:
* Adding a new endpoint. 
* Adding a new parameter to an existing endpoint.

### SDKs

Version format: MAJOR.MINOR.PATCH

Increment MAJOR version:
* New SDK is NOT backwards compatible: Clients moving to the new SDK will have to rework existing code to accommodate the new version.

Increment MINOR version:
* New, backwards compatible functionality is introduced to the public API.
* If any public API functionality is marked as deprecated.
* It MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes.

Increment PATCH version
* Patch version is incremented if only backwards compatible bug fixes are introduced. A bug fix is defined as an internal change that fixes incorrect behavior.


### Overview

Given a version number MAJOR.MINOR.PATCH, increment the:
1. MAJOR version when you make incompatible API changes
2. MINOR version when you add functionality in a backwards compatible manner
3. PATCH version when you make backwards compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

### Specification notes:

* Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.
* A pre-release version MAY be denoted by appending a hyphen and a series of dot separated identifiers immediately following the patch version. Identifiers MUST comprise only ASCII alphanumerics and hyphen [0-9A-Za-z-]. Identifiers MUST NOT be empty. Numeric identifiers MUST NOT include leading zeroes. Pre-release versions have a lower precedence than the associated normal version. A pre-release version indicates that the version is unstable and might not satisfy the intended compatibility requirements as denoted by its associated normal version. Examples: 1.0.0-alpha, 1.0.0-alpha.1, 1.0.0-0.3.7, 1.0.0-x.7.z.92.
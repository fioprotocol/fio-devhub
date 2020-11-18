---
title: Receive to FIO Address
sidebar_label: Receive to FIO Address
layout: sidenav
sidebar: sidebars
---

In order allow others to send crypto currency using the user’s FIO Address, it has to be mapped to native blockchain public addresses (NBPAs). This has to be done from within the wallet using /add_pub_address API method as it needs to be signed with user’s private key. For now, this mapping is stored unencrypted, but a privacy mode is being worked on.

It is up to the wallet to decide if this happens automatically, behind the scenes or driven by the user via UI. If the wallet supports multiple NBPAs for the same blockchain at the same time, e.g. multiple bitcoin wallets, the decision will likely need to be made by the user via UI.

Please read Mapping Public Addresses to better understand how public address mappings work.

Please note that a user may have multiple FIO Addresses owned by a single key, the UX should accommodate that.
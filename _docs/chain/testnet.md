---
title: Testnet
description: Testnet
---
# FIO Testnet
## Overview

Monitor is available at <https://monitor.testnet.fioprotocol.io/>{:rel="nofollow noopener noreferrer" target="_blank"}

Testnet Block Explorer: <https://fio-test.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"}

Testnet Block Producer Telegram Channel: <https://t.me/fiotestnet>{:rel="nofollow noopener noreferrer" target="_blank"}

## Integration testing with FIO Testnet

When running integration tests you will want to register FIO Addresses and transfer funds. But, registering a new address for the first time requires FIO tokens. Therefore, some manual setup is required to acquire a Testnet FIO public key and Testnet FIO tokens. 

To set up a FIO public key with FIO tokens in a test environment:

1. Manually generate a private/public FIO key pair
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Create Keypair' button (top left of the website)
   * Copy the keypairs and FIO Internal Account
2. Register a FIO Address
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Register Address' button
   * Type in a FIO address
   * Paste in the FIO Public Key (created above)
   * Select the 'Create' button
   * The created FIO address will be in this format, "myname@fiotestnet"
3. Transfer FIO into the FIO account
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Faucet' button
   * Paste in the FIO Public Key (created above)
   * Select the 'Send Coins' button
4. The FIO account now has a FIO Address and FIO tokens available for making Signed API calls.

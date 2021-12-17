---
title: Testnet
description: Testnet
---
# FIO Testnet

The FIO community has built several applications for interacting with the FIO Testnet chain. These are useful during integration development. For example, you will want to register FIO Crypto Handles and transfer FIO Tokens during testing. But, registering a new address for the first time requires FIO tokens. Therefore, some manual setup is required to acquire a Testnet FIO public key and Testnet FIO tokens.

The following testnet applications are availble for integration testing:
* Testnet monitor - <https://monitor.testnet.fioprotocol.io/>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet block explorer - <https://fio-test.bloks.io/>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet block producer Telegram channel - <https://t.me/fiotestnet>{:rel="nofollow noopener noreferrer" target="_blank"}
* Testnet public API nodes - <https://github.com/fioprotocol/fio.mainnet#fio-testnet-api>{:rel="nofollow noopener noreferrer" target="_blank"}

## Setting up your test environment

To set up a FIO public key with FIO tokens in a test environment:

1. Manually generate a private/public FIO key pair
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Create Keypair' button (top left of the website)
   * Copy the keypairs and FIO Internal Account
2. Register a FIO Crypto Handle (FIO Address)
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Register Address' button
   * Type in a FIO Crypto Handle
   * Paste in the FIO Public Key (created above)
   * Select the 'Create' button
   * The created FIO Crypto Handle will be in this format, "myname@fiotestnet"
3. Transfer FIO into the FIO account
   * Navigate to the testnet monitor: <https://monitor.testnet.fioprotocol.io>{:target="_blank"}
   * Select the 'Faucet' button
   * Paste in the FIO Public Key (created above)
   * Select the 'Send Coins' button
4. You now have a FIO account with a Public key, a Private key, a FIO Crypto Handle, and FIO tokens. This account can be used for testing [Signed API calls]({{site.baseurl}}/pages/api/fio-api/#tag--Transactions).


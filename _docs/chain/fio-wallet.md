---
title: fio-wallet (keosd)
description: fio-wallet (keosd)
---

# fio-wallet (keosd)

The EOSIO `keosd` wallet was renamed to `fio-wallet` to make it easier for Block Producers to run both EOSIO and FIO commands in the same environment.

`fio-wallet` is a key manager service daemon for storing private keys and signing digital messages. It provides a secure key storage medium for keys to be encrypted at rest in the associated wallet file. `fio-wallet` also defines a secure enclave for signing transaction created by cleos or a third part library.

When a wallet is unlocked with the corresponding password, clio can request `fio-wallet` to sign a transaction with the appropriate private keys.

{% include alert.html type="info" title="fio-wallet users"  content="fio-wallet is intended to be used by developers only." %}

## Starting fio-wallet

For most users, the easiest way to use `fio-wallet` is to have clio launch it automatically. Wallet files will be created in the default directory (~/fio-wallet).

{% include alert.html type="info" title="fio-wallet config file"  content="When clio starts fio-wallet automatically it does not use the fio-wallet config.ini file located in ~/fio-wallet. Running fio-wallet manually will use the settings in ~/fio-wallet." %}

`fio-wallet` can be launched manually from the terminal by running:

```
fio-wallet
```

**config.ini**

By default, `fio-wallet` creates the folder `~/fio-wallet` and populates it with a basic config.ini file. The location of the config file can be specified on the command line using the `--config-dir` argument. The configuration file contains the HTTP server endpoint for incoming HTTP connections and other parameters for cross-origin resource sharing.
<br><br>

**Wallet Location**

The location of the wallet data folder can be specified on the command line with the `--data-dir` option.
<br><br>

**IP and port**

By default `fio-wallet` starts on port `8900`. Update the `config.ini` file to change the local IP and port:

```
# The local IP and port to listen for incoming http connections; leave blank to disable. (eosio::http_plugin)
http-server-address = localhost:8900
```

**Other options**

For a list of all commands known to `fio-wallet`, simply run it with no arguments:

```
fio-wallet --help
```

## Stopping fio-wallet

The most effective way to stop `fio-wallet` is to find the `fio-wallet` process and send a SIGTERM signal to it.

## Handling large numbers of FIO keys in fio wallet

If you are using the default settings for fio-wallet, you may encounter errors when attempting to sign a transaction with wallets containing larger numbers of keys (30,000+ keys). The failure is caused because requests to the `nodeos` API are exceeding the maximum payload size allowed for incoming requests.

To prevent this failure, add the following to `/etc/fio/nodeos/config.ini` when using a large number of keys in the wallet:

```
max-body-size=10485760
http-max-bytes-in-flight-mb=5000
```

## FIO Wallet API Commands

The following commands assume you have 

##### Create new wallet

Create a new wallet locally

Parameters
* New wallet name
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/create  --request POST --data '"mywallet"'

# Returns password key needed to unlock the wallet in the future. DO NOT LOSE!
"PW5KbbHxLScNYzo7JCMEbXEgx9e9iMMscLg5o1PLezrJsru7jvZJu"
```

##### Open wallet

Open an existing wallet.

Parameters: 
* Wallet name
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/open  --request POST --data '"mywallet"'

# If the open is successsul, returns empty brackets
{}
```

##### Lock wallet

Lock wallet.

Parameters: 
* Wallet name
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/lock  --request POST --data '"mywallet"'

# If the lock is successsul, returns empty brackets
{}
```

##### Lock all wallets

Lock all unlocked wallets.

```shell
curl --url http://127.0.0.1:8900/v1/wallet/lock_all 

# If the lock is successsul, returns empty brackets
{}
```

##### Unlock wallet

Unlock wallet

Parameters
* Wallet name
* Wallet password
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/unlock  --request POST --data '["mywallet", "PW5KbbHxLScNYzo7JCMEbXEgx9e9iMMscLg5o1PLezrJsru7jvZJu"]'

# If the unlock is successsul, returns empty brackets
{}
```

##### Import key

Import FIO private key into wallet

Parameters: 
* Wallet name
* FIO private key
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/import_key  --request POST --data '["mywallet", "5K48SoNMnndG7YgEKxppq7Mrt2arfa2oCwjqCvAVxk3RciaiQZQ"]'

# If the import is successsul, returns empty brackets
{}
```

##### Remove key

Remove FIO keypair from wallet

Parameters: 
* Wallet name
* Wallet password
* FIO Public Key in WIF format to remove (required)
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/remove_key  --request POST --data '["mywallet", "PW5KbbHxLScNYzo7JCMEbXEgx9e9iMMscLg5o1PLezrJsru7jvZJu", "FIO4zHqamNrwAc55iewkuMSdQugp3s46UoYqhZjXPHbbRrzvZPXse"]'

# If the import is successsul, returns empty brackets
{}
```

##### Create key

Create FIO keypair key within wallet.

Parameters: 
* Wallet name
* Key type to create, K1 should be specified.
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/create_key  --request POST --data '["mywallet", "K1"]'

# Returns the FIO public key associated with the new private key
"FIO7HpZ1nTuFGqhfo3weMPQy1fkxUFPFdNGpBFR6694PyLh2GCNN6"
```

##### List wallets

List opened wallets, * = unlocked.
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/list_wallets

# Returns array of open wallets. Wallets that are open are marked with a '*'
["mywallet *","newwallet","newwallet2"]
```

##### List keys

List of public/private keypairs from all unlocked wallets.

Parameters: 
* Wallet name
* Wallet password
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/list_keys  --request POST --data '["mywallet", "PW5KbbHxLScNYzo7JCMEbXEgx9e9iMMscLg5o1PLezrJsru7jvZJu"]'

# Returns array of FIO Public/Private keypairs from wallet
[["FIO4zHqamNrwAc55iewkuMSdQugp3s46UoYqhZjXPHbbRrzvZPXse","5K48SoNMnndG7YgEKxppq7Mrt2arfa2oCwjqCvAVxk3RciaiQZQ"],["FIO5885K6RQavVfvPrydaRWXsNqHKqJKELLrBUXDnLNSUCAnfrPVe","5JWzNkBnRMrcPMse5WvaqxdaCFZNA5SjCXXm1dZQotXa5MRcWXT"]]
```

##### List public keys in wallet

Parameters: 
* Wallet name
* Wallet password
  
```shell
curl --url http://127.0.0.1:8900/v1/wallet/get_public_keys  --request POST --data '["mywallet", "PW5KbbHxLScNYzo7JCMEbXEgx9e9iMMscLg5o1PLezrJsru7jvZJu"]'

# Returns array of FIO Public keys from wallet
["FIO4zHqamNrwAc55iewkuMSdQugp3s46UoYqhZjXPHbbRrzvZPXse","FIO5885K6RQavVfvPrydaRWXsNqHKqJKELLrBUXDnLNSUCAnfrPVe"]
```






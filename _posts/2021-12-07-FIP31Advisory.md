---
title:  FIP-31 Advisory - FIO Addresses no longer expire
date:   2020-12-07 14:38:00
categories: release
badges:
 - type: warning
   tag: advisory
---

[FIP-31](https://github.com/fioprotocol/fips/blob/master/fip-0031.md) has been launched to Mainnet. FIO Address will no longer expire or be burned due non-payment of FIO Address renewal fee. Therefore, it will be fully functional indefinitely. FIO Address will still have limited functionality within 90 days after its FIO Domain was not renewed and will still be burned once its FIO Domain is burned. Users will still need to purchase bundled transactions or pay-per-call to continue to call actions on the FIO Address, such as adding public address mappings, creating new or responding to an existing FIO Request.

This Advisory is intended for wallets and exchanges which have integrated FIO Address registration and display functionality.

<!--more-->

## Modify copy regarding FIO Address validity
Instead of stating that FIO Addresses are valid for one year. You may now state that FIO Addresses do not have an expiration date and are valid indefinitely.

## Do not display expiration date
It is no longer necessary to display FIO Address expiration date to the user.

For backwards compatibility, expiration date is still returned in response to [/get_fio_names](https://developers.fioprotocol.io/pages/api/fio-api/#post-/get_fio_names) and [/get_fio_addresses](https://developers.fioprotocol.io/pages/api/fio-api/#post-/get_fio_addresses), but is set to 2106-02-07T06:28:15. If you are reading tables directly or accessing API node which has not been updated yet, you may still get old expiration date, but the FIO Address will not expire irrespective of what date is returned.

## Do not display renew FIO Address notifications
It is no longer necessary to display FIO Address expiration notifications to the user.

Instead, you may prompt the user to add bundled transaction if the number is low (e.g. less than 5). Bundled transactions are returned in response to [/get_fio_names](https://developers.fioprotocol.io/pages/api/fio-api/#post-/get_fio_names) and [/get_fio_addresses](https://developers.fioprotocol.io/pages/api/fio-api/#post-/get_fio_addresses)

## Consider replacing /renew_fio_address with /add_bundled_transactions
[/renew_fio_address](https://developers.fioprotocol.io/pages/api/fio-api/#options-renewaddress) will continue to function and will add 100 bundled transactions. You may continue to use this call for that purpose or consider implementing [/add_bundled_transactions](https://developers.fioprotocol.io/pages/api/fio-api/#options-addbundles), which lets the user buy more than 100 bundled transactions in one call.

## Recognize when a domain is expiring
When a FIO Domain has expired, the FIO Address on that domain will have [limited functionality](https://kb.fioprotocol.io/fio-protocol/fio-addresses/domain-address-expiry). This means that using a FIO Address on expired domain may return "FIO Domain expired" error. Recognize that error and show it to the user along with information that unless the FIO Domain is renewed, their FIO Address will be burned. Remember that FIO Domains may be renewed by anyone, not just the owner of the domain.

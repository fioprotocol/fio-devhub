---
layout: page-dev
title: Getting version info
description: Getting version info
---

# Getting version info

In the [fioprotocol repository](https://github.com/fioprotocol/fio){:target="_blank"} there are two locations which contain versioning info:

* fio/CMakeLists.txt (hardcoded value, manually input)
* fio/libraries/appbase/version.cmake.in (cmake command execution of “git describe --tags --dirty --always”) 

There two places which store version information:

* fio/eosio.version.hpp - CMake consumes versioning info from CMakeLists.txt when processing eosio.version.in
* fio/libraries/appbase/version.cpp - CMake consumes versioning info from version.cmake.in (git) during processing of version.in
* fio/main.cpp - Populated during build and used by clio client

There are three ways to get the version programmatically:
* Execute the command `nodeos --version`
* Call the rest api, `get_info`, i.e. curl `http://localhost:8889/v1/chain/get_info` and parse output for server_version_string
* Call `clio version client`

## nodeos --version

## get_info

The version returned from get_info is not the version designated in CMakeLists.txt EXCEPT when that release is a build of master AND that is only a coincidence. It is the version output from `git describe --tags --dirty --always` which is the command run during build that uses the tag information to populate the version. (see fio/libraries/appbase/version.cmake.in) 
When this command is run against the master branch, a branch whose last commit is tagged, the output is solely the tag itself; the reason why the master branch (or any BP node) will indicate its version is the version in CMakeLists.txt. When this command is run against any other branch whose last commit is not tagged, it will be some form of the last tag and the last commit hash in that branch.

## clio version client

The version retured for the clio client is retrieved from 

https://github.com/fioprotocol/fio/blob/533ed4695122456a3c69f96eae81a34ac5b1e1f7/programs/clio/main.cpp#L2616 

and is populated during build by fio/programs/clio/CMakeLists.txt


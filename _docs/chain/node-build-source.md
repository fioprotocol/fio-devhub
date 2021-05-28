---
title: Build FIO from Source
description: Build FIO from Source
---

# Build FIO from Source

{% include alert.html type="warning" title="Building FIO from source is for Advanced Developers" content="If you are new to FIO, it is recommended that you install the FIO prebuilt binaries using the Docker or Manual installations described below instead of building from source." %}

#### Download FIO Source

To download the FIO source code, clone the fio repo and its submodules. It is advised to create a home fio folder first and download all the FIO related software there:

```shell
mkdir -p ~/fioprotocol && cd ~/fioprotocol
git clone --recursive https://github.com/fioprotocol/fio
```

**Update Submodules**

If a repository is cloned without the `--recursive` flag, the submodules must be updated before starting the build process:

```shell
cd ~/fioprotocol/fio
git submodule update --init --recursive
```

**Pull Changes**

When pulling changes, especially after switching branches, the submodules must also be updated. This can be achieved with the git submodule command as above, or using git pull directly:

```shell
[git checkout <branch>]  (optional)
git pull --recurse-submodules
```

#### Build FIO Binaries

The build script first installs all dependencies and then builds FIO. The script supports these Operating Systems. To run it, first change to the `~/fioprotocol/fio` folder, then launch the script:

```shell
cd ~/fioprotocol/fio/scripts
./fio_build.sh -P
```

The build process writes temporary content to the `fio/build` folder. After building, the program binaries can be found at `fio/build/programs`.

{% include alert.html type="danger" title="FIO build requires clang 8" content="FIO chain requires clang v8 as part of the LLVM requirements. FIO recommends using a '-P' pinned build to ensure the correct LLVM versions are used." %}

To confirm your clang version, first get the install directory for nodeos (e.g., `/usr/local/bin/nodeos`): 

```shell
ps -ef | grep nodeos
```

Next, insert your nodeos dir in the following command:

```shell
strings /usr/local/bin/nodeos |grep -i clang |head -10
```

#### Install FIO Binaries

For ease of contract development, content can be installed at the `~/fio` folder using the fio_install.sh script within the `fio/scripts` folder. Adequate permission is required to install on system folders:

```shell
cd ~/fioprotocol/fio/scripts
./fio_install.sh
```

{% include alert.html type="info" title="FIO Installation Recommended" content="After building FIO successfully, it is highly recommended to install the FIO binaries from their default build directory. This copies the FIO binaries to a central location, such as ~/fio/x.y/bin, where x.y is the FIO release version" %}

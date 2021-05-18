---
layout: post
title:  "Building CyanogenMod 11 for Samsung Galaxy SII"
date:   2015-11-07 18:00:00 CET
tags:
  - android
  - howto
---
<-- markdown-link-check-disable -->
Start the container with the build environment
    gmacario@mv-linux-powerhorse:~$ cd ~/docker-cyanogenmod
    gmacario@mv-linux-powerhorse:~/docker-cyanogenmod$ ./run.sh
Logged as cmbuild@_container_:
### Install Repo
TODO
### Install Android SDK
TODO
### Create build directory
    $ mkdir -p ~/android/cm11
    $ cd ~/android/cm11
### Fetch sources
<15 CEST -->
    $ repo init -u https://github.com/CyanogenMod/android.git -b cm-11.0
    $ repo sync
Result:
```
cmbuild@c8226ae3ff79:~/android/cm11$ du -sh
25G     .
cmbuild@c8226ae3ff79:~/android/cm11$
```
### Start the build
<24 CEST -->
    $ cd ~/android/cm11
    $ source build/envsetup.sh
    $ breakfast aosp_arm-eng
Result:
```
cmbuild@c8226ae3ff79:~/android/cm11$ breakfast aosp_arm-eng
including vendor/cm/vendorsetup.sh
Trying dependencies-only mode on a non-existing device tree?
============================================
PLATFORM_VERSION_CODENAME=REL
PLATFORM_VERSION=4.4.4
CM_VERSION=
TARGET_PRODUCT=aosp_arm
TARGET_BUILD_VARIANT=eng
TARGET_BUILD_TYPE=release
TARGET_BUILD_APPS=
TARGET_ARCH_VARIANT=armv7-a
TARGET_ARCH=arm
TARGET_CPU_VARIANT=generic
HOST_ARCH=x86
HOST_OS=linux
HOST_OS_EXTRA=Linux-3.13.0-46-generic-x86_64-with-Ubuntu-14.04-trusty
HOST_BUILD_TYPE=release
BUILD_ID=KTU84Q
OUT_DIR=/home/cmbuild/android/cm11/out
============================================
cmbuild@c8226ae3ff79:~/android/cm11$
```
Start the build:
    $ brunch aosp_arm-eng
```
...
============================================
PLATFORM_VERSION_CODENAME=REL
PLATFORM_VERSION=4.4.4
CM_VERSION=
TARGET_PRODUCT=aosp_arm
TARGET_BUILD_VARIANT=eng
TARGET_BUILD_TYPE=release
TARGET_BUILD_APPS=
TARGET_ARCH_VARIANT=armv7-a
TARGET_ARCH=arm
TARGET_CPU_VARIANT=generic
HOST_ARCH=x86
HOST_OS=linux
HOST_OS_EXTRA=Linux-3.13.0-46-generic-x86_64-with-Ubuntu-14.04-trusty
HOST_BUILD_TYPE=release
BUILD_ID=KTU84Q
OUT_DIR=/home/cmbuild/android/cm11/out
============================================
Checking build tools versions...
************************************************************
You are attempting to build with an unsupported JDK.
You use OpenJDK but only Sun/Oracle JDK is supported.
Please follow the machine setup instructions at
    https://source.android.com/source/download.html
Continue at your own peril
************************************************************
************************************************************
You are attempting to build with an unsupported version
of java.
Your version is: java version "1.7.0_75".
The correct version is: Java SE 1.6 or 1.7.
Please follow the machine setup instructions at
https://source.android.com/source/download.html
************************************************************
/home/cmbuild/android/cm11/out/target/product/generic/obj/APPS/SignatureTest_intermediates
ebtables is disabled on this build
find: `src': No such file or directory
find: `bootable/recovery/res-720': No such file or directory
No private recovery resources for TARGET_DEVICE generic
build/core/tasks/kernel.mk:91: **********************************************************
build/core/tasks/kernel.mk:92: * Kernel source found, but no configuration was defined  *
build/core/tasks/kernel.mk:93: * Please add the TARGET_KERNEL_CONFIG variable to your   *
build/core/tasks/kernel.mk:94: * BoardConfig.mk file                                    *
build/core/tasks/kernel.mk:95: **********************************************************
make: *** No rule to make target `bacon'.  Stop.
cmbuild@c8226ae3ff79:~/android/cm11$
```
<37 CEST -->
Use lunch
```
$ cd ~/android/cm11
$ lunch aosp_arm-eng
$ mka
```
Result:
```
...
Copying: /home/cmbuild/android/cm11/out/target/common/obj/JAVA_LIBRARIES/core_intermediates/classes-jarjar.jar
host Prebuilt: jarjar (/home/cmbuild/android/cm11/out/host/common/obj/JAVA_LIBRARIES/jarjar_intermediates/javalib.jar)
Install: /home/cmbuild/android/cm11/out/host/linux-x86/bin/aidl
Install: /home/cmbuild/android/cm11/out/host/linux-x86/bin/aapt
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/bin/monkey)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/usr/share/bmd/RFFspeed_501.bmd)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/usr/share/bmd/RFFstd_501.bmd)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/bin/bmgr)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/bin/ime)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/bin/input)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/bin/pm)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/system/bin/svc)
target Prebuilt:  (/home/cmbuild/android/cm11/out/target/product/generic/kernel)
Install: /home/cmbuild/android/cm11/out/host/linux-x86/bin/adb
Install: /home/cmbuild/android/cm11/out/host/linux-x86/bin/dalvik
acp: missing destination file
make: *** [/home/cmbuild/android/cm11/out/target/product/generic/kernel] Error 2
make: *** Waiting for unfinished jobs....
cmbuild@c8226ae3ff79:~/android/cm11$
```
TODO
<-- markdown-link-check-enable-->
<-- EOF -->

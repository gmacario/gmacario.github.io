---
layout: post
title:  "Building Android KitKat 4.4.3 for Freescale SABRE SD"
date:   2015-05-22 17:20:00
categories: android howto development freescale sabre
---
<!-- markdown-link-check-disable -->

This blog post explains how I built the images of Android KitKat 4.4.3 for the [Freescale SABRE SD Board](http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD).

### Prerequisites

* A powerful host (local workstation or cloud instance) with
  - At least 16 GB RAM
  - At least 100 GB of free disk space
  - Fast Internet connectivity to fetch Android sources
  - OS: A 64-bit OS (tested on Ubuntu 14.04.1 LTS 64-bit) with the following installed packages:
    - [bash](http://www.gnu.org/software/bash/) (tested with bash-4.3-7ubuntu1.5)
    - [git](https://git-scm.com/) (tested with git-1:1.9.1-1ubuntu0.1)
    - [Docker](https://www.docker.com/) (tested with lxc-docker-1.6.2)
* Package containing Freescale i.MX6 BSP source code for Android KK443
  - You may download file `android_KK4.4.3_2.0.0-ga_core_source.gz`  [here](http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD&fpsp=1&tab=Design_Tools_Tab)
* Java SE Development Kit 6 for Linux/x64
  - You may download file `jdk-6u45-linux-x64.bin`  [here](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase6-419409.html)

### Preparation

Logged as user@host, checkout the [easy-build](https://github.com/gmacario/easy-build) project from GitHub

```
$ git clone https://github.com/gmacario/easy-build.git
```

Locally build the container image

```
$ cd easy-build/build-aosp
$ ./build.sh
```

Alternatively, you may pull it from Docker Hub:

```
$ docker pull gmacario/build-aosp
```

Make sure you have no older versions of the same container:

```
$ docker rm build-aosp 2>/dev/null
```

Create a subdirectory `shared` under `easy-build/build-aosp` and copy the following files:

* `android_KK4.4.3_2.0.0-ga_core_source.gz`
* `jdk-6u45-linux-x64.bin`

### Running the container

Logged as user@host, run the container

```
$ cd easy-build/build-aosp
$ ./run.sh
```

### First time preparation of the container

The first time the container is run, logged as root@container execute the following steps

```
# mkdir -p ~build/shared/myandroid && chown build ~build/shared/myandroid
# mkdir -p ~build/shared/extra  && chown build ~build/shared/extra
# mkdir -p /opt/java && cd /opt/java && ~build/shared/jdk-6u45-linux-x64.bin
# echo 'PATH=/opt/java/jdk1.6.0_45/bin:$PATH' >>~build/.profile
# chown build ~build/.profile
# su - build
```

TODO: Explain how to create the files in `~/shared/extra`

```
$ cd ~/shared/extra
$ tar xvzf ~/shared/xxx/android_KK4.4.3_2.0.0-ga_core_source.gz
```

Logged as build@container

#### Configure git

Configure git (specify your user.email and user.name)

```
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
$ git config --global color.ui auto
```

#### Clone AOSP source tree

If you have a recent backup of the AOSP source tree, extract it to `~/shared/myandroid`:

```
$ cd ~/shared/myandroid
$ tar -xvzf ~/shared/extra/bk-aosp-20150521-1620.tar.gz
$ repo sync -j16
```

otherwise fetch the AOSP source repositories via `repo` and `git`

```
$ cd ~/shared/myandroid
$ repo init -u https://android.googlesource.com/platform/manifest -b android-4.4.3_r1
$ repo sync -j16
```

(Recommended) Create a new backup of the AOSP source tree to save time on future builds

```
$ cd ~/shared/myandroid
$ tar -cvzf ~/shared/extra/bk-aosp-20150522-1755.tar.gz .
```

#### Clone uboot-imx source tree

If you have a recent backup of the uboot-imx source tree, extract it to `~/shared/myandroid/bootable/bootloader`:

```
$ cd ~/shared/myandroid
$ cp -a ~/shared/extra/uboot-imx bootable/bootloader/
```

otherwise clone the `uboot-imx` repository using git

```
TODO
```

#### Clone linux_imx source tree

If you have a recent backup of the uboot-imx source tree, extract it to `~/shared/myandroid`:

```
$ cd ~/shared/myandroid
$ cp -a ~/shared/extra/kernel_imx .
```

otherwise clone the `linux_imx` repository using git

```
TODO
```

#### Apply the Freescale patches on top of the vanilla AOSP tree

```
$ source ~/shared/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga/and_patch.sh
$ c_patch ~/shared/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga imx_KK4.4.3_2.0.0-ga 2>c_patch_err.txt >c_patch_out.txt
```

### Performing the build

Prerequisites:

* Container prepared as described in the previous section
* Logged in as build@container (`./run-NEW.sh` and `su - build`)

(2015-05-22 18:35 CEST) Start the build

```
$ cd ~/shared/myandroid
$ source build/envsetup.sh
$ lunch sabresd_6dq-eng
$ make 2>&1 | tee build_sabresd_6dq_android.log
```

Result: Build OK

```
...
Install: out/host/linux-x86/bin/e2fsck
Installed file list: out/target/product/generic/installed-files.txt
Target system fs image: out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img
+ echo 'in mkuserimg.sh PATH=out/host/linux-x86/bin/:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games'
in mkuserimg.sh PATH=out/host/linux-x86/bin/:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
+ ENABLE_SPARSE_IMAGE=
+ '[' out/target/product/generic/system = -s ']'
+ '[' 6 -ne 5 -a 6 -ne 6 ']'
+ SRC_DIR=out/target/product/generic/system
+ '[' '!' -d out/target/product/generic/system ']'
+ OUTPUT_FILE=out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img
+ EXT_VARIANT=ext4
+ MOUNT_POINT=system
+ SIZE=576716800
+ FC=out/target/product/generic/root/file_contexts
+ case $EXT_VARIANT in
+ '[' -z system ']'
+ '[' -z 576716800 ']'
+ '[' -n out/target/product/generic/root/file_contexts ']'
+ FCOPT='-S out/target/product/generic/root/file_contexts'
+ MAKE_EXT4FS_CMD='make_ext4fs  -S out/target/product/generic/root/file_contexts -l 576716800 -a system out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/generic/system'
+ echo make_ext4fs -S out/target/product/generic/root/file_contexts -l 576716800 -a system out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/generic/system
make_ext4fs -S out/target/product/generic/root/file_contexts -l 576716800 -a system out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/generic/system
+ make_ext4fs -S out/target/product/generic/root/file_contexts -l 576716800 -a system out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/generic/system
Creating filesystem with parameters:
    Size: 576716800
    Block size: 4096
    Blocks per group: 32768
    Inodes per group: 7040
    Inode size: 256
    Journal blocks: 2200
    Label:
    Blocks: 140800
    Block groups: 5
    Reserved block group size: 39
Created filesystem with 1292/35200 inodes and 79059/140800 blocks
+ '[' 0 -ne 0 ']'
Running:  mkuserimg.sh out/target/product/generic/system out/target/product/generic/obj/PACKAGING/systemimage_intermediates/system.img ext4 system 576716800 out/target/product/generic/root/file_contexts
Install system fs image: out/target/product/generic/system.img
out/target/product/generic/system.img+ maxsize=588791808 blocksize=2112 total=576716800 reserve=5947392
Import includes file: out/host/linux-x86/obj/EXECUTABLES/mkbootfs_intermediates/import_includes
host C: mkbootfs <= system/core/cpio/mkbootfs.c
Export includes file: system/core/cpio/Android.mk -- out/host/linux-x86/obj/EXECUTABLES/mkbootfs_intermediates/export_includes
host Executable: mkbootfs (out/host/linux-x86/obj/EXECUTABLES/mkbootfs_intermediates/mkbootfs)
Install: out/host/linux-x86/bin/mkbootfs
Target ram disk: out/target/product/generic/ramdisk.img
Target userdata fs image: out/target/product/generic/userdata.img
+ echo 'in mkuserimg.sh PATH=out/host/linux-x86/bin/:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games'
in mkuserimg.sh PATH=out/host/linux-x86/bin/:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
+ ENABLE_SPARSE_IMAGE=
+ '[' out/target/product/generic/data = -s ']'
+ '[' 6 -ne 5 -a 6 -ne 6 ']'
+ SRC_DIR=out/target/product/generic/data
+ '[' '!' -d out/target/product/generic/data ']'
+ OUTPUT_FILE=out/target/product/generic/userdata.img
+ EXT_VARIANT=ext4
+ MOUNT_POINT=data
+ SIZE=209715200
+ FC=out/target/product/generic/root/file_contexts
+ case $EXT_VARIANT in
+ '[' -z data ']'
+ '[' -z 209715200 ']'
+ '[' -n out/target/product/generic/root/file_contexts ']'
+ FCOPT='-S out/target/product/generic/root/file_contexts'
+ MAKE_EXT4FS_CMD='make_ext4fs  -S out/target/product/generic/root/file_contexts -l 209715200 -a data out/target/product/generic/userdata.img out/target/product/generic/data'
+ echo make_ext4fs -S out/target/product/generic/root/file_contexts -l 209715200 -a data out/target/product/generic/userdata.img out/target/product/generic/data
make_ext4fs -S out/target/product/generic/root/file_contexts -l 209715200 -a data out/target/product/generic/userdata.img out/target/product/generic/data
+ make_ext4fs -S out/target/product/generic/root/file_contexts -l 209715200 -a data out/target/product/generic/userdata.img out/target/product/generic/data
Creating filesystem with parameters:
    Size: 209715200
    Block size: 4096
    Blocks per group: 32768
    Inodes per group: 6400
    Inode size: 256
    Journal blocks: 1024
    Label:
    Blocks: 51200
    Block groups: 2
    Reserved block group size: 15
Created filesystem with 20/12800 inodes and 1982/51200 blocks
+ '[' 0 -ne 0 ']'
Running:  mkuserimg.sh out/target/product/generic/data out/target/product/generic/userdata.img ext4 data 209715200 out/target/product/generic/root/file_contexts
out/target/product/generic/userdata.img maxsize=214106112 blocksize=2112 total=209715200 reserve=2162688
Target cache fs image: out/target/product/generic/cache.img
+ echo 'in mkuserimg.sh PATH=out/host/linux-x86/bin/:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games'
in mkuserimg.sh PATH=out/host/linux-x86/bin/:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
+ ENABLE_SPARSE_IMAGE=
+ '[' out/target/product/generic/cache = -s ']'
+ '[' 6 -ne 5 -a 6 -ne 6 ']'
+ SRC_DIR=out/target/product/generic/cache
+ '[' '!' -d out/target/product/generic/cache ']'
+ OUTPUT_FILE=out/target/product/generic/cache.img
+ EXT_VARIANT=ext4
+ MOUNT_POINT=cache
+ SIZE=69206016
+ FC=out/target/product/generic/root/file_contexts
+ case $EXT_VARIANT in
+ '[' -z cache ']'
+ '[' -z 69206016 ']'
+ '[' -n out/target/product/generic/root/file_contexts ']'
+ FCOPT='-S out/target/product/generic/root/file_contexts'
+ MAKE_EXT4FS_CMD='make_ext4fs  -S out/target/product/generic/root/file_contexts -l 69206016 -a cache out/target/product/generic/cache.img out/target/product/generic/cache'
+ echo make_ext4fs -S out/target/product/generic/root/file_contexts -l 69206016 -a cache out/target/product/generic/cache.img out/target/product/generic/cache
make_ext4fs -S out/target/product/generic/root/file_contexts -l 69206016 -a cache out/target/product/generic/cache.img out/target/product/generic/cache
+ make_ext4fs -S out/target/product/generic/root/file_contexts -l 69206016 -a cache out/target/product/generic/cache.img out/target/product/generic/cache
Creating filesystem with parameters:
    Size: 69206016
    Block size: 4096
    Blocks per group: 32768
    Inodes per group: 4224
    Inode size: 256
    Journal blocks: 1024
    Label:
    Blocks: 16896
    Block groups: 1
    Reserved block group size: 7
Created filesystem with 11/4224 inodes and 1302/16896 blocks
+ '[' 0 -ne 0 ']'
Running:  mkuserimg.sh out/target/product/generic/cache out/target/product/generic/cache.img ext4 cache 69206016 out/target/product/generic/root/file_contexts
out/target/product/generic/cache.img maxsize=70654848 blocksize=2112 total=69206016 reserve=713856
build@d2086a0b7ec7:~/shared/myandroid$
```

Inspect results:

```
build@d2086a0b7ec7:~/shared/myandroid$ ls -la out/target/product/generic/*.img
-rw-r--r-- 1 build build  69206016 May 23 04:35 out/target/product/generic/cache.img
-rw-rw-r-- 1 build build    324106 May 23 04:35 out/target/product/generic/ramdisk.img
-rw-r--r-- 1 build build 576716800 May 23 04:35 out/target/product/generic/system.img
-rw-r--r-- 1 build build 209715200 May 23 04:35 out/target/product/generic/userdata.img
build@d2086a0b7ec7:~/shared/myandroid$
```

(2015-05-23 09:40 CEST) Doing it again

Result

```
CC      net/wireless/cfg80211.mod.o
LD [M]  net/wireless/cfg80211.ko
make[1]: Leaving directory `/home/build/shared/myandroid/kernel_imx'
install kernel modules:  kernel_imx/drivers/net/wireless/rtlwifi/rtl8723as/8723as.ko kernel_imx/net/wireless/cfg80211.ko kernel_imx/drivers/net/wireless/rtlwifi/rtl8821as/8821as.ko
for ubootplat in imx6q:mx6qsabresdandroid_config imx6dl:mx6dlsabresdandroid_config; do \
              UBOOT_PLATFORM=`echo $ubootplat | cut -d':' -f1`; \
              UBOOT_CONFIG=`echo $ubootplat | cut -d':' -f2`; \
      echo ; \
      echo ; \
              make -C bootable/bootloader/uboot-imx/ distclean ARCH=arm CROSS_COMPILE=`pwd`/prebuilts/gcc/linux-x86/arm/arm-eabi-4.6/bin/arm-eabi-; \
              make -C bootable/bootloader/uboot-imx/ $UBOOT_CONFIG ARCH=arm CROSS_COMPILE=`pwd`/prebuilts/gcc/linux-x86/arm/arm-eabi-4.6/bin/arm-eabi-; \
              make -C bootable/bootloader/uboot-imx/ ARCH=arm CROSS_COMPILE=`pwd`/prebuilts/gcc/linux-x86/arm/arm-eabi-4.6/bin/arm-eabi-; \
              install -D bootable/bootloader/uboot-imx/u-boot.imx out/target/product/sabresd_6dq/u-boot-$UBOOT_PLATFORM.imx; \
              install -D bootable/bootloader/uboot-imx/u-boot.imx out/target/product/sabresd_6dq/u-boot.imx; \
      done


make: *** bootable/bootloader/uboot-imx/: No such file or directory.  Stop.
make: *** bootable/bootloader/uboot-imx/: No such file or directory.  Stop.
make: *** bootable/bootloader/uboot-imx/: No such file or directory.  Stop.
install: cannot stat 'bootable/bootloader/uboot-imx/u-boot.imx': No such file or directory
install: cannot stat 'bootable/bootloader/uboot-imx/u-boot.imx': No such file or directory


make: *** bootable/bootloader/uboot-imx/: No such file or directory.  Stop.
make: *** bootable/bootloader/uboot-imx/: No such file or directory.  Stop.
make: *** bootable/bootloader/uboot-imx/: No such file or directory.  Stop.
install: cannot stat 'bootable/bootloader/uboot-imx/u-boot.imx': No such file or directory
install: cannot stat 'bootable/bootloader/uboot-imx/u-boot.imx': No such file or directory
make: *** [out/target/product/sabresd_6dq/u-boot.imx] Error 1
build@d2086a0b7ec7:~/shared/myandroid$
```

**FIX**: Install U-Boot sources (TODO: Copy in section above)

```
$ cd ~/shared/myandroid
$ cp -a ~/shared/extra/uboot-imx bootable/bootloader/
```

(2015-05-23 09:49 CEST) Start the build

```
$ cd ~/shared/myandroid
$ source build/envsetup.sh
$ lunch sabresd_6dq-eng
$ make 2>&1 | tee build_sabresd_6dq_android.log
```

Result:

```
...
Install: out/target/product/sabresd_6dq/system/etc/firmware/ath6k/AR6003/hw2.0/otp.bin.z77
Import includes file: out/host/linux-x86/obj/EXECUTABLES/mkfs.ubifs_intermediates/import_includes
host C: mkfs.ubifs <= external/mtd-utils/mkfs.ubifs/mkfs.ubifs.c
In file included from external/mtd-utils/mkfs.ubifs/mkfs.ubifs.c:23:0:
external/mtd-utils/mkfs.ubifs/mkfs.ubifs.h:48:23: fatal error: uuid/uuid.h: No such file or directory
 #include <uuid/uuid.h>
                       ^
compilation terminated.
make: *** [out/host/linux-x86/obj/EXECUTABLES/mkfs.ubifs_intermediates/mkfs.ubifs.o] Error 1
build@d2086a0b7ec7:~/shared/myandroid$
```

**FIX**: Install the missing package (should add to Dockerfile)

```
# apt-get install -y uuid-dev
```

**TIP**: To find which package provides a certain file you may use the `apt-file` command

Reference: <http://stackoverflow.com/questions/18874183/perl-module-uuid-0-05-make-failed-in-ubuntu-12-04>

```
# apt-get install -y apt-file
# apt-file update
$ apt-file search uuid/uuid.h
```

(2015-05-23 12:06) Restart the build

```
# su -l -c "cd ~/shared/myandroid && source build/envsetup.sh && \
lunch sabresd_6dq-eng && make 2>&1 | tee build_sabresd_6dq_android.log" build
```

Result:

```
...
external/mtd-utils/mkfs.ubifs/compr.c:28:23: fatal error: lzo/lzo1x.h: No such file or directory
 #include <lzo/lzo1x.h>
                       ^
compilation terminated.
make: *** [out/host/linux-x86/obj/EXECUTABLES/mkfs.ubifs_intermediates/compr.o] Error 1
root@d2086a0b7ec7:/#
```

**FIX**: Install the missing package (should add to Dockerfile)

```
# apt-file search lzo/lzo1x.h
# apt-get install -y liblzo2-dev
```

(2015-05-23 12:06) Restart the build

```
# su -l -c "cd ~/shared/myandroid && source build/envsetup.sh && \
lunch sabresd_6dq-eng && make 2>&1 | tee build_sabresd_6dq_android.log" build
```

Result:

```
host StaticLib: libbz (out/host/linux-x86/obj/STATIC_LIBRARIES/libbz_intermediates/libbz.a)
Export includes file: bootable/recovery/applypatch/Android.mk -- out/host/linux-x86/obj/EXECUTABLES/imgdiff_intermediates/export_includes
host Executable: imgdiff (out/host/linux-x86/obj/EXECUTABLES/imgdiff_intermediates/imgdiff)
Notice file: bootable/recovery/applypatch/NOTICE -- out/host/linux-x86/obj/NOTICE_FILES/src//bin/imgdiff.txt
Notice file: external/bzip2/NOTICE -- out/host/linux-x86/obj/NOTICE_FILES/src//lib/libbz.a.txt
Install: out/host/linux-x86/bin/imgdiff
Import includes file: out/host/linux-x86/obj/EXECUTABLES/bsdiff_intermediates/import_includes
host C: bsdiff <= external/bsdiff/bsdiff.c
external/bsdiff/bsdiff.c: In function 'main':
external/bsdiff/bsdiff.c:196:5: warning: 'pos' may be used uninitialized in this function [-Wmaybe-uninitialized]
Export includes file: external/bsdiff/Android.mk -- out/host/linux-x86/obj/EXECUTABLES/bsdiff_intermediates/export_includes
host Executable: bsdiff (out/host/linux-x86/obj/EXECUTABLES/bsdiff_intermediates/bsdiff)
Install: out/host/linux-x86/bin/bsdiff
Construct recovery from boot
mkdir -p out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/
PATH=out/host/linux-x86/bin:$PATH out/host/linux-x86/bin/imgdiff out/target/product/sabresd_6dq/boot.img out/target/product/sabresd_6dq/recovery.img out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/recovery_from_boot.p
chunk 0: type 0 start 0 len 6725642
chunk 1: type 2 start 6725642 len 899072
chunk 2: type 0 start 7226158 len 53242
Construct patches for 3 chunks...
patch   0 is 210 bytes (of 6725642)
patch   1 is 402849 bytes (of 500516)
patch   2 is 196 bytes (of 53242)
chunk   0: normal   (         0,    6725642)         210
chunk   1: deflate  (   6725642,    1059236)      402849  (null)
chunk   2: normal   (   7784878,      54010)         196
Install system fs image: out/target/product/sabresd_6dq/system.img
out/target/product/sabresd_6dq/system.img+out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/recovery_from_boot.p maxsize=385389312 blocksize=4224 total=377890747 reserve=3894528
root@d2086a0b7ec7:/#
```

(2015-05-23 18:00) Restart the build

```
# su -l -c "cd ~/shared/myandroid && source build/envsetup.sh && \
lunch sabresd_6dq-eng && make 2>&1 | tee build_sabresd_6dq_android.log" build
```

Result: Build OK

```
...
----- Made recovery image: out/target/product/sabresd_6dq/recovery.img --------
Installed file list: out/target/product/sabresd_6dq/installed-files.txt
Target system fs image: out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img
+ echo 'in mkuserimg.sh PATH=out/host/linux-x86/bin/:/usr/lib/jvm/java-6-sun/bin:/home/build/shared/myandroid/out/host/linux-x86/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.7/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-eabi-4.7/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/mips/mipsel-linux-android-4.7/bin:/home/build/shared/myandroid/development/emulator/qtools:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.7/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-eabi-4.7/bin:/home/build/shared/myandroid/development/scripts:/home/build/shared/myandroid/prebuilts/devtools/tools:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games'
in mkuserimg.sh PATH=out/host/linux-x86/bin/:/usr/lib/jvm/java-6-sun/bin:/home/build/shared/myandroid/out/host/linux-x86/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.7/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-eabi-4.7/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/mips/mipsel-linux-android-4.7/bin:/home/build/shared/myandroid/development/emulator/qtools:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.7/bin:/home/build/shared/myandroid/prebuilts/gcc/linux-x86/arm/arm-eabi-4.7/bin:/home/build/shared/myandroid/development/scripts:/home/build/shared/myandroid/prebuilts/devtools/tools:/opt/java/jdk1.6.0_45/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
+ ENABLE_SPARSE_IMAGE=
+ '[' out/target/product/sabresd_6dq/system = -s ']'
+ '[' 6 -ne 5 -a 6 -ne 6 ']'
+ SRC_DIR=out/target/product/sabresd_6dq/system
+ '[' '!' -d out/target/product/sabresd_6dq/system ']'
+ OUTPUT_FILE=out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img
+ EXT_VARIANT=ext4
+ MOUNT_POINT=system
+ SIZE=377487360
+ FC=out/target/product/sabresd_6dq/root/file_contexts
+ case $EXT_VARIANT in
+ '[' -z system ']'
+ '[' -z 377487360 ']'
+ '[' -n out/target/product/sabresd_6dq/root/file_contexts ']'
+ FCOPT='-S out/target/product/sabresd_6dq/root/file_contexts'
+ MAKE_EXT4FS_CMD='make_ext4fs  -S out/target/product/sabresd_6dq/root/file_contexts -l 377487360 -a system out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/sabresd_6dq/system'
+ echo make_ext4fs -S out/target/product/sabresd_6dq/root/file_contexts -l 377487360 -a system out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/sabresd_6dq/system
make_ext4fs -S out/target/product/sabresd_6dq/root/file_contexts -l 377487360 -a system out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/sabresd_6dq/system
+ make_ext4fs -S out/target/product/sabresd_6dq/root/file_contexts -l 377487360 -a system out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img out/target/product/sabresd_6dq/system
Creating filesystem with parameters:
    Size: 377487360
    Block size: 4096
    Blocks per group: 32768
    Inodes per group: 7680
    Inode size: 256
    Journal blocks: 1440
    Label:
    Blocks: 92160
    Block groups: 3
    Reserved block group size: 23
Created filesystem with 1264/23040 inodes and 64373/92160 blocks
+ '[' 0 -ne 0 ']'
Running:  mkuserimg.sh out/target/product/sabresd_6dq/system out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img ext4 system 377487360 out/target/product/sabresd_6dq/root/file_contexts
Construct recovery from boot
mkdir -p out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/
PATH=out/host/linux-x86/bin:$PATH out/host/linux-x86/bin/imgdiff out/target/product/sabresd_6dq/boot.img out/target/product/sabresd_6dq/recovery.img out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/recovery_from_boot.p
chunk 0: type 0 start 0 len 6725642
chunk 1: type 2 start 6725642 len 899072
chunk 2: type 0 start 7226158 len 53242
Construct patches for 3 chunks...
patch   0 is 210 bytes (of 6725642)
patch   1 is 402849 bytes (of 500516)
patch   2 is 196 bytes (of 53242)
chunk   0: normal   (         0,    6725642)         210
chunk   1: deflate  (   6725642,    1059236)      402849  (null)
chunk   2: normal   (   7784878,      54010)         196
Install system fs image: out/target/product/sabresd_6dq/system.img
out/target/product/sabresd_6dq/system.img+out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/recovery_from_boot.p maxsize=385389312 blocksize=4224 total=377890747 reserve=3894528
root@d2086a0b7ec7:/#
```

(2015-05-23 19:31 CEST) Restart the build

```
# su -l -c "cd ~/shared/myandroid && source build/envsetup.sh && \
lunch sabresd_6dq-eng && make 2>&1 | tee build_sabresd_6dq_android.log" build
```

Result: Build OK

Inspect results

```
```







### Known issues and workarounds

#### Errors building uim-sysfs

If you encounter the following error

```
...
target thumb C: uim-sysfs <= hardware/ti/wpan/ti_st/uim-sysfs/uim.c
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:24:0: warning: "BOTHER" redefined [enabled by default]
In file included from bionic/libc/kernel/arch-arm/asm/termbits.h:19:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:21,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/termbits.h:180:0: note: this is the location of the previous definition
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:27:0: warning: "TCGETS2" redefined [enabled by default]
In file included from bionic/libc/kernel/arch-arm/asm/ioctls.h:22:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:22,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/ioctls.h:74:0: note: this is the location of the previous definition
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:28:0: warning: "TCSETS2" redefined [enabled by default]
In file included from bionic/libc/kernel/arch-arm/asm/ioctls.h:22:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:22,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/ioctls.h:75:0: note: this is the location of the previous definition
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:73:8: error: redefinition of 'struct termios2'
In file included from bionic/libc/kernel/arch-arm/asm/termbits.h:19:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:21,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/termbits.h:37:8: note: originally defined here
make: *** [out/target/product/generic/obj/EXECUTABLES/uim-sysfs_intermediates/uim.o] Error 1
build@d2086a0b7ec7:~/shared/myandroid$
```

**WORKAROUND**: Skip building `hardware/ti/wpan/ti_st/uim-sysfs`

```
$ croot && cd hardware/ti/wpan
$ vi Android.mk (Comment out line "#include $(call first ...)")
```

FIXME: Cannot understand why this is needed -- apparently this line was already skipped because wrapped inside "ifneq ()... imx6)"

```
#wpan utilties and TI ST user space manager
ifneq ($(TARGET_BOARD_PLATFORM),imx6)
#include $(call first-makefiles-under,$(call my-dir))
endif
```

TIP: Read `device/fsl/sabresd_6dq/BoardConfig.mk`.
Search for `TARGET_BOARD_PLATFORM` ==> defined inside included file `device/fsl/imx6/BoardConfigCommon.mk`

```
gmacario@mv-linux-powerhorse:/opt/projects/gmacario/MYGIT/easy-build/build-aosp/shared/myandroid/device/fsl⟫ rgrep TARGET_BOARD_PLATFORM .
./imx6/BoardConfigCommon.mk:TARGET_BOARD_PLATFORM := imx6
./common/wifi/Android.mk:ifeq ($(TARGET_BOARD_PLATFORM),imx6)
./imx5x/BoardConfigCommon.mk:TARGET_BOARD_PLATFORM := imx5x
gmacario@mv-linux-powerhorse:/opt/projects/gmacario/MYGIT/easy-build/build-aosp/shared/myandroid/device/fsl⟫
```

Restart the build

```
$ croot
$ make 2>&1 | tee -a build_sabresd_6dq_android.log
```

Result: Build OK

### Trying project build-android-kk443-sabresd

(2015-05-24 19:57 CEST)

```
$ cd easy-build/build-android-kk443-sabresd
$ mkdir -p shared
$ cp ~/Downloads/jdk-6u45-linux-x64.bin shared/
$ cp ~/Downloads/android_KK4.4.3_2.0.0-ga_core_source.gz shared/
```

Run the container to download and patch the Android source tree

```
$ ./run.sh
```

To force building

```
# touch ~build/shared/extra/.do_build_sabresd_6dq
# exit
```

Then run the container again:

```
$ ./run.sh
```

Build result:

```
root@ceaa469dc17c:/# ls -la ~build/shared/myandroid/out/target/product/sabresd_6dq/
total 437368
drwxrwxr-x  9 build build      4096 May 25 01:40 .
drwxrwxr-x  3 build build      4096 May 24 17:28 ..
-rwxr-xr-x  1 build build    102953 May 24 17:43 .config
-rw-rw-r--  1 build build        14 May 25 01:39 android-info.txt
-rw-r--r--  1 build build   7279957 May 25 01:39 boot-imx6dl.img
-rw-r--r--  1 build build   7279400 May 25 01:39 boot-imx6q-ldo.img
-rw-r--r--  1 build build   7279400 May 25 01:39 boot-imx6q.img
-rw-r--r--  1 build build   7279400 May 25 01:39 boot.img
-rw-rw-r--  1 build build     40314 May 24 18:03 clean_steps.mk
drwxrwxr-x  4 build build      4096 May 24 19:55 data
drwxrwxr-x  2 build build      4096 May 25 00:15 fake_packages
-rwxr-xr-x  1 build build     51339 May 24 18:04 imx6dl-sabresd.dtb
-rwxr-xr-x  1 build build     50782 May 24 18:04 imx6q-sabresd-ldo.dtb
-rwxr-xr-x  1 build build     50782 May 24 18:04 imx6q-sabresd.dtb
-rw-rw-r--  1 build build     58298 May 25 01:39 installed-files.txt
-rwxr-xr-x  1 build build   6723128 May 24 18:04 kernel
drwxrwxr-x 14 build build      4096 May 25 01:39 obj
-rw-rw-r--  1 build build       463 May 24 18:03 previous_build_config.mk
-rw-rw-r--  1 build build   1059254 May 25 01:39 ramdisk-recovery.img
-rw-rw-r--  1 build build    500534 May 25 01:39 ramdisk.img
drwxrwxr-x  3 build build      4096 May 25 01:39 recovery
-rw-r--r--  1 build build   7839445 May 25 01:39 recovery-imx6dl.img
-rw-r--r--  1 build build   7838888 May 25 01:39 recovery-imx6q-ldo.img
-rw-r--r--  1 build build   7838888 May 25 01:39 recovery-imx6q.img
-rw-r--r--  1 build build   7838888 May 25 01:39 recovery.img
drwxrwxr-x  9 build build      4096 May 25 00:16 root
drwxrwxr-x  5 build build      4096 May 25 00:16 symbols
drwxrwxr-x 13 build build      4096 May 25 01:39 system
-rw-r--r--  1 build build 377487360 May 25 01:40 system.img
-rwxr-xr-x  1 build build    392192 May 24 18:07 u-boot-imx6dl.imx
-rwxr-xr-x  1 build build    392192 May 24 18:07 u-boot-imx6q.imx
-rwxr-xr-x  1 build build    392192 May 24 18:07 u-boot.imx
root@ceaa469dc17c:/#
```

(2015-05-25 08:00 CEST) Try again

```
$ cd easy-build/build-android-kk443-sabresd 
$ ./run.sh
```

Result:

```
...
Running:  mkuserimg.sh out/target/product/sabresd_6dq/system out/target/product/sabresd_6dq/obj/PACKAGING/systemimage_intermediates/system.img ext4 system 377487360 out/target/product/sabresd_6dq/root/file_contexts
Construct recovery from boot
mkdir -p out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/
PATH=out/host/linux-x86/bin:$PATH out/host/linux-x86/bin/imgdiff out/target/product/sabresd_6dq/boot.img out/target/product/sabresd_6dq/recovery.img out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/recovery_from_boot.p
chunk 0: type 0 start 0 len 6725642
chunk 1: type 2 start 6725642 len 899072
chunk 2: type 0 start 7226158 len 53242
Construct patches for 3 chunks...
patch   0 is 214 bytes (of 6725642)
patch   1 is 402874 bytes (of 500516)
patch   2 is 198 bytes (of 53242)
chunk   0: normal   (         0,    6725642)         214
chunk   1: deflate  (   6725642,    1059236)      402874  (null)
chunk   2: normal   (   7784878,      54010)         198
Install system fs image: out/target/product/sabresd_6dq/system.img
out/target/product/sabresd_6dq/system.img+out/target/product/sabresd_6dq/obj/PACKAGING/recovery_patch_intermediates/recovery_from_boot.p maxsize=385389312 blocksize=4224 total=377890778 reserve=3894528

real    13m4.581s
user    14m26.123s
sys     3m11.937s
DEBUG: startup2.sh END
root@194ba687ef36:~#
```

(NOTE: This is an incremental build)

```
root@194ba687ef36:~# ls -la ~build/shared/myandroid/out/target/product/sabresd_6dq/
total 437364
drwxrwxr-x  9 build build      4096 May 25 05:48 .
drwxrwxr-x  3 build build      4096 May 24 17:28 ..
-rwxr-xr-x  1 build build    102953 May 24 17:43 .config
-rw-rw-r--  1 build build        14 May 25 01:39 android-info.txt
-rw-r--r--  1 build build   7279957 May 25 05:48 boot-imx6dl.img
-rw-r--r--  1 build build   7279400 May 25 05:48 boot-imx6q-ldo.img
-rw-r--r--  1 build build   7279400 May 25 05:48 boot-imx6q.img
-rw-r--r--  1 build build   7279400 May 25 05:48 boot.img
-rw-rw-r--  1 build build     40314 May 25 05:35 clean_steps.mk
drwxrwxr-x  4 build build      4096 May 24 19:55 data
drwxrwxr-x  2 build build      4096 May 25 00:15 fake_packages
-rwxr-xr-x  1 build build     51339 May 25 05:39 imx6dl-sabresd.dtb
-rwxr-xr-x  1 build build     50782 May 25 05:39 imx6q-sabresd-ldo.dtb
-rwxr-xr-x  1 build build     50782 May 25 05:39 imx6q-sabresd.dtb
-rw-rw-r--  1 build build     58298 May 25 05:48 installed-files.txt
-rwxr-xr-x  1 build build   6723128 May 25 05:39 kernel
drwxrwxr-x 14 build build      4096 May 25 01:39 obj
-rw-rw-r--  1 build build       463 May 25 05:35 previous_build_config.mk
-rw-rw-r--  1 build build   1059254 May 25 05:48 ramdisk-recovery.img
-rw-rw-r--  1 build build    500534 May 25 05:48 ramdisk.img
drwxrwxr-x  3 build build      4096 May 25 05:48 recovery
-rw-r--r--  1 build build   7839445 May 25 05:48 recovery-imx6dl.img
-rw-r--r--  1 build build   7838888 May 25 05:48 recovery-imx6q-ldo.img
-rw-r--r--  1 build build   7838888 May 25 05:48 recovery-imx6q.img
-rw-r--r--  1 build build   7838888 May 25 05:48 recovery.img
drwxrwxr-x  9 build build      4096 May 25 00:16 root
drwxrwxr-x  5 build build      4096 May 25 00:16 symbols
drwxrwxr-x 13 build build      4096 May 25 01:39 system
-rw-r--r--  1 build build 377487360 May 25 05:48 system.img
-rwxr-xr-x  1 build build    392192 May 24 18:07 u-boot-imx6dl.imx
-rwxr-xr-x  1 build build    392192 May 24 18:07 u-boot-imx6q.imx
-rwxr-xr-x  1 build build    392192 May 24 18:07 u-boot.imx
root@194ba687ef36:~#
```



# OLD STUFF BELOW

Sample table

<!-- TIP: <http://www.tablesgenerator.com/markdown_tables> -->

| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |

<!-- markdown-link-check-enable -->
<!-- EOF -->

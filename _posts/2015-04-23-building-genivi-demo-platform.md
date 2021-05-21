---
layout: post
title:  "Building the GENIVI Demo Platform using the easy-build tools"
date:   2015-04-23 14:00:00
tags:   howto genivi yocto development
---
<!-- markdown-link-check-disable -->

This blog post explains the steps I tried to rebuild the [GENIVI Demo Platform](http://wiki.projects.genivi.org/index.php/GENIVI_Demo_Platform) using the [easy-build](https://github.com/gmacario/easy-build) tools.

Tested on Ubuntu 14.04.1 LTS 64-bit.

Clone the `gmacario/easy-build` project

```
git clone https://github.com/gmacario/easy-build.git
cd easy-build
```

Create a development branch (in case we need any changes to the master branch)

```
$ git checkout -b fix-issue#76
```

Build and run the Docker container that will be used to rebuild the platform

```
$ ./build.sh
$ ./run.sh
```

TODO: Merge `build.sh` as a corner case inside `run.sh`

When running inside the container

TODO

```
# Make sure that /dev/shm is writable
chmod a+w /dev/shm

# Make sure that ~build/shared directory is owned by user "build"
chown build.build ~build/shared

# Switch to user 'build'
su - build
```

TODO: Initialize the build environment

```
$ export GENIVI=~/genivi-baseline
$ source ${GENIVI}/poky/oe-init-build-env ~/shared/my-gdp-build01
$ export TOPDIR=${PWD}
```

TODO: Should use (Yocto env var) BUILDDIR rather than defining a new one TOPDIR

According to [Yocto Project Reference Manual](http://www.yoctoproject.org/docs/current/ref-manual/ref-manual.html)

* `BUILDDIR`: Points to the location of the Build Directory. You can define this directory indirectly through the oe-init-build-env and oe-init-build-env-memres scripts by passing in a Build Directory path when you run the scripts. If you run the scripts and do not provide a Build Directory path, the BUILDDIR defaults to build in the current directory.
* `TOPDIR`: The top-level Build Directory. BitBake automatically sets this variable when you initialize your build environment using either oe-init-build-env or oe-init-build-env-memres.

Note that as of Yocto 1.x (dizzy), `oe-init-build-env` does not seem to define TOPDIR any longer (only BUILDDIR).




<!--
Adapted from <http://wiki.projects.genivi.org/index.php/Hardware_Setup_and_Software_Installation/qemux86-64> -->

TODO: Clone the extra repositories for meta-genivi-demo

```
$ cd ${GENIVI}
$ [ ! -e meta-genivi-demo ]  && git clone git://git.projects.genivi.org/meta-genivi-demo
$ [ ! -e meta-ivi ]          && git clone git://git.yoctoproject.org/meta-ivi
$ [ ! -e poky ]              && git clone git://git.yoctoproject.org/poky
$ [ ! -e meta-qt5 ]          && git clone https://github.com/meta-qt5/meta-qt5
$ [ ! -e meta-openembedded ] && git clone git://git.openembedded.org/meta-openembedded
```

Verify the local repositories

```
$ cd ${GENIVI}
$ du -sh *
```

Result:

```
build@4f3caf384331:~/genivi-baseline$ du -sh *
29M     meta-genivi-demo
21M     meta-ivi
43M     meta-openembedded
3.4M    meta-qt5
175M    poky
build@4f3caf384331:~/genivi-baseline$
```

TODO: Configure the build

```
$ sh ~/configure_build.sh
```

For the time being let us do it manually
(TODO: Merge into file `configure_build.sh`)

Save a backup of file `conf/local.conf`, then adjust as follows

```
MACHINE=qemux86-64
```

Save a backup of file `conf/bblayers.conf`, then adjust as follows

```
TODO
```

Perform the build of the image

```
$ cd ${BUILDDIR}
$ bitbake -k jupiter-image
```

<!-- 2015-04-23 21:49 CEST -->

Result:

```
build@4f3caf384331:~/shared/my-gdp-build01$ ls -la tmp/deploy/images/qemux86-64/
total 306552
drwxrwxr-x 2 build build      4096 Apr 23 16:53 .
drwxrwxr-x 3 build build      4096 Apr 23 16:23 ..
-rw-r--r-- 2 build build       294 Apr 23 16:49 README_-_DO_NOT_DELETE_FILES_IN_THIS_DIRECTORY.txt
lrwxrwxrwx 1 build build        76 Apr 23 16:23 bzImage -> bzImage--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20150423134301.bin
-rw-r--r-- 2 build build   6618768 Apr 23 16:23 bzImage--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20150423134301.bin
lrwxrwxrwx 1 build build        76 Apr 23 16:23 bzImage-qemux86-64.bin -> bzImage--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20150423134301.bin
-rw-r--r-- 1 build build 277747712 Apr 23 16:53 jupiter-image-qemux86-64-20150423134301.rootfs.ext3
-rw-r--r-- 1 build build     35106 Apr 23 16:52 jupiter-image-qemux86-64-20150423134301.rootfs.manifest
-rw-r--r-- 1 build build  52936010 Apr 23 16:52 jupiter-image-qemux86-64-20150423134301.rootfs.tar.bz2
lrwxrwxrwx 1 build build        51 Apr 23 16:53 jupiter-image-qemux86-64.ext3 -> jupiter-image-qemux86-64-20150423134301.rootfs.ext3
lrwxrwxrwx 1 build build        55 Apr 23 16:53 jupiter-image-qemux86-64.manifest -> jupiter-image-qemux86-64-20150423134301.rootfs.manifest
lrwxrwxrwx 1 build build        54 Apr 23 16:53 jupiter-image-qemux86-64.tar.bz2 -> jupiter-image-qemux86-64-20150423134301.rootfs.tar.bz2
-rw-rw-r-- 2 build build  70056366 Apr 23 16:23 modules--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20150423134301.tgz
lrwxrwxrwx 1 build build        76 Apr 23 16:23 modules-qemux86-64.tgz -> modules--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20150423134301.tgz
build@4f3caf384331:~/shared/my-gdp-build01$
```

-------------------------

<!-- 2015-04-24 11:45 CEST  -->

Perform the build of the sdk

```
TODO
```

Result: TODO


------------------------

(2015-04-24 14:55 CEST)

```
$ export GENIVI=${HOME}/genivi-baseline
$ cd ${BUILDDIR}
$ ${HOME}/shared/configure_build_gdp.sh
```

Use the `bitbake-layers show-layers` command to verify:

```
build@4f3caf384331:~/shared/my-gdp-build01$ bitbake-layers show-layers
layer                 path                                      priority
==========================================================================
meta                  /home/build/genivi-baseline/poky/meta     5
meta-yocto            /home/build/genivi-baseline/poky/meta-yocto  5
meta-yocto-bsp        /home/build/genivi-baseline/poky/meta-yocto-bsp  5
meta-ivi              /home/build/genivi-baseline/meta-ivi/meta-ivi  7
meta-ivi-bsp          /home/build/genivi-baseline/meta-ivi/meta-ivi-bsp  7
meta-oe               /home/build/genivi-baseline/meta-openembedded/meta-oe  6
meta-genivi-demo      /home/build/genivi-baseline/meta-genivi-demo  7
meta-qt5              /home/build/genivi-baseline/meta-qt5      7
meta-renesas          /home/build/genivi-baseline/meta-renesas  5
build@4f3caf384331:~/shared/my-gdp-build01$
```

TODO: Should checkout layers under `${HOME}/yp/sources` rather than `${HOME}/genivi-baseline`.

Append to `conf/local.conf`:

```
MACHINE = "porter"
```



TODO: Then

```
$ bitbake genivi-demo-platform
```

Result:

```
build@4f3caf384331:~/shared/my-gdp-build01$ bitbake genivi-demo-platform
Loading cache: 100% |##############################################################################################| ETA:  00:00:00
Loaded 2019 entries from dependency cache.
NOTE: Resolving any missing task queue dependencies
ERROR: Nothing PROVIDES 'ruby-native' (but /home/build/genivi-baseline/meta-qt5/recipes-qt/qt5/qtwebkit_5.4.1.bb DEPENDS on or otherwise requires it). Close matches:
  db-native
  bc-native
  byacc-native
NOTE: Runtime target 'browser-poc' is unbuildable, removing...
Missing or unbuildable dependency chain was: ['browser-poc', 'qtwebkit', 'ruby-native']
NOTE: Runtime target 'packagegroup-gdp-browser' is unbuildable, removing...
Missing or unbuildable dependency chain was: ['packagegroup-gdp-browser', 'browser-poc', 'qtwebkit', 'ruby-native']
ERROR: Required build target 'genivi-demo-platform' has no buildable providers.
Missing or unbuildable dependency chain was: ['genivi-demo-platform', 'packagegroup-gdp-browser', 'browser-poc', 'qtwebkit', 'ruby-native']

Summary: There were 2 ERROR messages shown, returning a non-zero exit code.
build@4f3caf384331:~/shared/my-gdp-build01$
```

-------------------------
(2015-04-24 15:24 CEST)

```
# su - build
```

Logged as build@container:

```
$ ~/shared/configure_build_gdp.sh
$ cd ~/shared
$ source ~/yp/sources/poky/oe-init-build-env my-gdp-build02

$ ~/shared/configure_build_gdp.sh
$ bitbake genivi-demo-platform
```

Result:

```
...
ERROR: Nothing PROVIDES 'libxcursor' (but /home/build/yp/sources/poky/meta/recipes-qt/qt4/qt4-x11-free_4.8.6.bb DEPENDS on or otherwise requires it)
ERROR: libxcursor was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)

Build Configuration:
BB_VERSION        = "1.24.0"
BUILD_SYS         = "x86_64-linux"
NATIVELSBSTRING   = "Ubuntu-14.04"
TARGET_SYS        = "x86_64-poky-linux"
MACHINE           = "qemux86-64"
DISTRO            = "poky-ivi-systemd"
DISTRO_VERSION    = "7.0.3"
TUNE_FEATURES     = "m64 core2"
TARGET_FPU        = ""
meta
meta-yocto
meta-yocto-bsp    = "dizzy:3037db60f79a4b7e34bef14663ffa2523e9f0c03"
meta-ivi
meta-ivi-bsp      = "(detachedfrom7.0.3):7cae90ffa290cb4ab0578174abfebce5579cac48"
meta-oe           = "dizzy:2ebb8752f378c9987b0ece5a14915d703b872c1d"
meta-genivi-demo  = "master:d0f5baa9b8de89bfa392f9855a99a2053ba14be5"
meta-qt5          = "master:48ebff679e5dc084d395b861a1fc4cb21790d51b"
meta-ruby         = "dizzy:2ebb8752f378c9987b0ece5a14915d703b872c1d"
meta-renesas      = "master:5e5b52b6861fd297ac3de229e91a391a821d2df3"

NOTE: Preparing runqueue
NOTE: Executing SetScene Tasks
NOTE: Executing RunQueue Tasks
WARNING: Failed to fetch URL http://zlib.net/pigz/pigz-2.3.1.tar.gz, attempting MIRRORS if available
WARNING: Failed to fetch URL ftp://ftp.debian.org/debian/pool/main/b/base-passwd/base-passwd_3.5.29.tar.gz, attempting MIRRORS if available
WARNING: Failed to fetch URL http://downloads.sourceforge.net/project/libpng/libpng16/1.6.13/libpng-1.6.13.tar.xz, attempting MIRRORS if available
WARNING: Failed to fetch URL http://www.apache.org/dist/apr/apr-util-1.5.3.tar.gz, attempting MIRRORS if available
WARNING: Failed to fetch URL http://www.apache.org/dist/subversion/subversion-1.8.9.tar.bz2, attempting MIRRORS if available
WARNING: Use of PRINC 1 was detected in the recipe /home/build/yp/sources/poky/meta/recipes-multimedia/gstreamer/gst-plugins-base_0.10.36.bb (or one of its .bbappends)
Use of PRINC is deprecated.  The PR server should be used to automatically increment the PR.  See: https://wiki.yoctoproject.org/wiki/PR_Service.
WARNING: Use of PRINC 1 was detected in the recipe /home/build/yp/sources/poky/meta/recipes-multimedia/gstreamer/gst-plugins-base_0.10.36.bb (or one of its .bbappends)
Use of PRINC is deprecated.  The PR server should be used to automatically increment the PR.  See: https://wiki.yoctoproject.org/wiki/PR_Service.
WARNING: Use of PRINC 1 was detected in the recipe /home/build/yp/sources/poky/meta/recipes-multimedia/gstreamer/gst-plugins-base_0.10.36.bb (or one of its .bbappends)
Use of PRINC is deprecated.  The PR server should be used to automatically increment the PR.  See: https://wiki.yoctoproject.org/wiki/PR_Service.
ERROR: Command Error: exit status: 1  Output:
Applying patch 0016-xdg-shell-Add-xdg-shell-protocol-file-version-1.4.0.patch
The next patch would create the file src/3rdparty/protocol/xdg-shell.xml,
which already exists!  Applying it anyway.
patching file src/3rdparty/protocol/xdg-shell.xml
Hunk #1 FAILED at 1.
1 out of 1 hunk FAILED -- rejects in file src/3rdparty/protocol/xdg-shell.xml
Patch 0016-xdg-shell-Add-xdg-shell-protocol-file-version-1.4.0.patch does not apply (enforce with -f)
ERROR: Function failed: patch_do_patch
ERROR: Logfile of failure stored in: /home/build/shared/my-gdp-build02/tmp/work/core2-64-poky-linux/qtwayland/5.4.1-r0/temp/log.do_patch.22264
ERROR: Task 1978 (/home/build/yp/sources/meta-qt5/recipes-qt/qt5/qtwayland_5.4.1.bb, do_patch) failed with exit code '1'
NOTE: Tasks Summary: Attempted 1438 tasks of which 0 didn't need to be rerun and 1 failed.
Waiting for 0 running tasks to finish:

Summary: 1 task failed:
  /home/build/yp/sources/meta-qt5/recipes-qt/qt5/qtwayland_5.4.1.bb, do_patch
Summary: There were 13 WARNING messages shown.
Summary: There were 8 ERROR messages shown, returning a non-zero exit code.
build@4f3caf384331:~/shared/my-gdp-build02$
```


---------------------
# Build GDP

(2015-04-25 16:00 CEST)

Create a new container

```
$ cd .../easy-build/build-yocto-genivi
$ docker rm build-yocto-genivi
$ ./build.sh
$ ./run.sh
```

Logged inside the container

```
# su - build
$ rm -rf ~/shared/my-gdp-build03
$ ~/shared/configure_build_gdp.sh
$ cd ~/shared && source /home/build/shared/sources/poky/oe-init-build-env my-gdp-build03
$ ~/shared/configure_build_gdp.sh
```

<!-- (2015-04-25 18:10 CEST) -->

Review and (if necessary) adjust contents
of `conf/local.conf` and `conf/bblayers.conf`, then

```
$ time bitbake -k genivi-demo-platform
```

Result:

```
...
NOTE: Runtime target 'qt4-qt3to4-dbg' is unbuildable, removing...
Missing or unbuildable dependency chain was: ['qt4-qt3to4-dbg', 'virtual/libx11']
NOTE: Runtime target 'qt4-qml-plugins-dbg' is unbuildable, removing...
Missing or unbuildable dependency chain was: ['qt4-qml-plugins-dbg', 'virtual/libx11']
NOTE: Runtime target 'libqtpvrqwswsegl4-dbg' is unbuildable, removing...
Missing or unbuildable dependency chain was: ['libqtpvrqwswsegl4-dbg', 'virtual/libx11']
ERROR: Nothing PROVIDES 'libxft' (but /home/build/shared/sources/poky/meta/recipes-qt/qt4/qt4-x11-free_4.8.6.bb DEPENDS on or otherwise requires it)
ERROR: libxft was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)
ERROR: Nothing PROVIDES 'libxext' (but /home/build/shared/sources/poky/meta/recipes-qt/qt4/qt4-x11-free_4.8.6.bb DEPENDS on or otherwise requires it)
ERROR: libxext was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)
ERROR: libxext was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)
ERROR: Nothing PROVIDES 'libxrender' (but /home/build/shared/sources/poky/meta/recipes-qt/qt4/qt4-x11-free_4.8.6.bb DEPENDS on or otherwise requires it)
ERROR: libxrender was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)
ERROR: Nothing PROVIDES 'libxrandr' (but /home/build/shared/sources/poky/meta/recipes-qt/qt4/qt4-x11-free_4.8.6.bb DEPENDS on or otherwise requires it)
ERROR: libxrandr was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)
ERROR: Nothing PROVIDES 'libxcursor' (but /home/build/shared/sources/poky/meta/recipes-qt/qt4/qt4-x11-free_4.8.6.bb DEPENDS on or otherwise requires it)
ERROR: libxcursor was skipped: missing required distro feature 'x11' (not in DISTRO_FEATURES)

Build Configuration:
BB_VERSION        = "1.24.0"
BUILD_SYS         = "x86_64-linux"
NATIVELSBSTRING   = "Ubuntu-14.04"
TARGET_SYS        = "x86_64-poky-linux"
MACHINE           = "qemux86-64"
DISTRO            = "poky-ivi-systemd"
DISTRO_VERSION    = "7.0.3"
TUNE_FEATURES     = "m64 core2"
TARGET_FPU        = ""
meta
meta-yocto
meta-yocto-bsp    = "dizzy:3037db60f79a4b7e34bef14663ffa2523e9f0c03"
meta-ivi
meta-ivi-bsp      = "7.0:0d780d0cfd38694ae5e6f0198adcb72684b01acc"
meta-oe           = "dizzy:2ebb8752f378c9987b0ece5a14915d703b872c1d"
meta-genivi-demo  = "master:d0f5baa9b8de89bfa392f9855a99a2053ba14be5"
meta-qt5          = "dizzy:adeca0db212d61a933d7952ad44ea1064cfca747"
meta-ruby         = "dizzy:2ebb8752f378c9987b0ece5a14915d703b872c1d"
meta-renesas      = "genivi-7.0-bsp-1.8.0:6e829fe6e422793bbb05ec563c8544154c0e9bd8"

NOTE: Preparing runqueue
NOTE: Executing SetScene Tasks
NOTE: Executing RunQueue Tasks
NOTE: validating kernel config, see log.do_kernel_configcheck for details
WARNING: QA Issue: mesa: configure was passed unrecognised options: --with-llvm-shared-libs [unknown-configure-option]
WARNING: QA Issue: ELF binary '/home/build/shared/my-gdp-build03/tmp/work/core2-64-poky-linux/wayland-ivi-extension/1.3.0-r0/packages-split/wayland-ivi-extension/usr/lib/weston/ivi-controller.so' has relocations in .text [textrel]
WARNING: QA Issue: pulseaudio-module-console-kit rdepends on consolekit, but it isn't a build dependency? [build-deps]
NOTE: Tasks Summary: Attempted 4166 tasks of which 22 didn't need to be rerun and all succeeded.

Summary: There were 3 WARNING messages shown.
Summary: There were 6 ERROR messages shown, returning a non-zero exit code.

real    439m45.152s
user    838m45.354s
sys     365m21.247s
build@4f3caf384331:~/shared/my-gdp-build03$
```

Inspecting generated files:

```
build@4f3caf384331:~/shared/my-gdp-build03$ ls -la tmp/deploy/images/qemux86-64/
total 893812
drwxrwxr-x 2 build build      4096 Apr 25 23:38 .
drwxrwxr-x 3 build build      4096 Apr 25 19:32 ..
-rw-r--r-- 2 build build       294 Apr 25 23:30 README_-_DO_NOT_DELETE_FILES_IN_THIS_DIRECTORY.txt
lrwxrwxrwx 1 build build        76 Apr 25 19:32 bzImage -> bzImage--3.14.29+git0+6eddbf4787_21ba402e0a-r0-qemux86-64-20150425161842.bin
-rw-r--r-- 2 build build   6621136 Apr 25 19:32 bzImage--3.14.29+git0+6eddbf4787_21ba402e0a-r0-qemux86-64-20150425161842.bin
lrwxrwxrwx 1 build build        76 Apr 25 19:32 bzImage-qemux86-64.bin -> bzImage--3.14.29+git0+6eddbf4787_21ba402e0a-r0-qemux86-64-20150425161842.bin
-rw-r--r-- 1 build build 814274560 Apr 25 23:36 genivi-demo-platform-qemux86-64-20150425161842.rootfs.ext3
-rw-r--r-- 1 build build     43146 Apr 25 23:36 genivi-demo-platform-qemux86-64-20150425161842.rootfs.manifest
-rw-r--r-- 1 build build 180363238 Apr 25 23:36 genivi-demo-platform-qemux86-64-20150425161842.rootfs.tar.bz2
lrwxrwxrwx 1 build build        58 Apr 25 23:38 genivi-demo-platform-qemux86-64.ext3 -> genivi-demo-platform-qemux86-64-20150425161842.rootfs.ext3
lrwxrwxrwx 1 build build        62 Apr 25 23:38 genivi-demo-platform-qemux86-64.manifest -> genivi-demo-platform-qemux86-64-20150425161842.rootfs.manifest
lrwxrwxrwx 1 build build        61 Apr 25 23:38 genivi-demo-platform-qemux86-64.tar.bz2 -> genivi-demo-platform-qemux86-64-20150425161842.rootfs.tar.bz2
-rw-rw-r-- 2 build build  70066272 Apr 25 19:32 modules--3.14.29+git0+6eddbf4787_21ba402e0a-r0-qemux86-64-20150425161842.tgz
lrwxrwxrwx 1 build build        76 Apr 25 19:32 modules-qemux86-64.tgz -> modules--3.14.29+git0+6eddbf4787_21ba402e0a-r0-qemux86-64-20150425161842.tgz
build@4f3caf384331:~/shared/my-gdp-build03$
```

#### Create SDK

<!-- 2015-04-26 06:35 CEST -->

```
$ time bitbake -k genivi-demo-platform-sdk
```

Result:

```
...
WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libogg-dev-1.3.2-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: m4-dev-1.4.17-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libacl-dev-2.2.52-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libdbus-glib-1-dev-0.100.2-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: ncurses-dev-5.9-r15.1@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libglib-2.0-dev-1:2.40.0-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libusb-1.0-dev-1.0.19-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: kmod-dev-18+git0+ae58de0fcb-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libsamplerate0-dev-0.1.8-r1@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: Can't install alsa-plugins-dev-1.0.28-r1@core2_64: Can't install alsa-plugins-dev-1.0.28-r1@core2_64: no package provides alsa-plugins = 1.0.28-r1

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: group xuser does not exist - using root

NOTE: Tasks Summary: Attempted 6086 tasks of which 4170 didn't need to be rerun and all succeeded.

Summary: There were 276 WARNING messages shown.
Summary: There were 7 ERROR messages shown, returning a non-zero exit code.

real    251m55.564s
user    338m58.465s
sys     163m15.146s
build@4f3caf384331:~/shared/my-gdp-build03$
```

<!-- 2015-04-26 11:25 CEST -->

Trying again

```
$ time bitbake -k genivi-demo-platform-sdk
```

Result:

```
...
Build Configuration:
BB_VERSION        = "1.24.0"
BUILD_SYS         = "x86_64-linux"
NATIVELSBSTRING   = "Ubuntu-14.04"
TARGET_SYS        = "x86_64-poky-linux"
MACHINE           = "qemux86-64"
DISTRO            = "poky-ivi-systemd"
DISTRO_VERSION    = "7.0.3"
TUNE_FEATURES     = "m64 core2"
TARGET_FPU        = ""
meta
meta-yocto
meta-yocto-bsp    = "dizzy:3037db60f79a4b7e34bef14663ffa2523e9f0c03"
meta-ivi
meta-ivi-bsp      = "7.0:0d780d0cfd38694ae5e6f0198adcb72684b01acc"
meta-oe           = "dizzy:2ebb8752f378c9987b0ece5a14915d703b872c1d"
meta-genivi-demo  = "master:d0f5baa9b8de89bfa392f9855a99a2053ba14be5"
meta-qt5          = "dizzy:adeca0db212d61a933d7952ad44ea1064cfca747"
meta-ruby         = "dizzy:2ebb8752f378c9987b0ece5a14915d703b872c1d"
meta-renesas      = "genivi-7.0-bsp-1.8.0:6e829fe6e422793bbb05ec563c8544154c0e9bd8"

NOTE: Preparing runqueue
...
WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libc6-dev-2.20-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libogg-dev-1.3.2-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: m4-dev-1.4.17-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libacl-dev-2.2.52-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libdbus-glib-1-dev-0.100.2-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: ncurses-dev-5.9-r15.1@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libglib-2.0-dev-1:2.40.0-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libusb-1.0-dev-1.0.19-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: kmod-dev-18+git0+ae58de0fcb-r0@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: libsamplerate0-dev-0.1.8-r1@core2_64 is already installed

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: Can't install alsa-plugins-dev-1.0.28-r1@core2_64: Can't install alsa-plugins-dev-1.0.28-r1@core2_64: no package provides alsa-plugins = 1.0.28-r1

WARNING: log_check: There is a warn message in the logfile
WARNING: log_check: Matched keyword: [warn]
WARNING: log_check: warning: group xuser does not exist - using root

NOTE: Tasks Summary: Attempted 6086 tasks of which 6082 didn't need to be rerun and all succeeded.

Summary: There were 270 WARNING messages shown.
Summary: There were 6 ERROR messages shown, returning a non-zero exit code.

real    54m36.810s
user    32m41.421s
sys     15m56.593s
build@4f3caf384331:~/shared/my-gdp-build03$
```

Inspecting generated files:

```
build@4f3caf384331:~/shared/my-gdp-build03$ ls -la tmp/deploy/sdk/
total 1552860
drwxr-xr-x 2 build build       4096 Apr 26 10:19 .
drwxr-xr-x 6 build build       4096 Apr 26 07:42 ..
-rw-rw-r-- 1 build build      99772 Apr 26 09:58 oecore-x86_64-core2-64-toolchain-nodistro.0.manifest
-rwxr-xr-x 1 build build 1590010669 Apr 26 10:19 oecore-x86_64-core2-64-toolchain-nodistro.0.sh
build@4f3caf384331:~/shared/my-gdp-build03$
```


<!-- markdown-link-check-enable -->
<!-- EOF -->

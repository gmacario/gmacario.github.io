Introduction
============

This page explains how to create an [OpenWrt](https://openwrt.org/) image
suitable to work on the [Arduino Yun](http://arduino.cc/en/Main/ArduinoBoardYun).

Prerequisites
-------------

* A PC running [Docker](https://www.docker.com/) and [git](http://git-scm.com/)
(tested with [Ubuntu 14.04.1 64-bit](http://www.ubuntu.com/))
* A fast Internet connection

Installing easy-build
=====================

Install the [gmacario/easy-build](https://github.com/gmacario/easy-build)
package by opening a shell and typing the following command:

```
$ git clone https://github.com/gmacario/easy-build.git
```

Building OpenWrt images inside a container
==========================================

(Optional) Build a customized Docker image
------------------------------------------

The Docker image `gmacario/build-openwrt` is publicly available from Docker Hub.
If you are not happy with the default image you may easily customize it
as explained in this section.

```
$ cd easy-build/build-openwrt
```

Copy any local patches, custom scripts, etc
to `easy-build/build-openwrt/build.local`

```
$ ./build.sh
```

All the files under `build.local/` will then be copied inside
your custom Docker image.

Run the container
-----------------

```
$ cd easy-build/openwrt
$ ./run.sh
```

Logged as root@container, you may install additional Ubuntu packages if needed,
or just switch to the non-root user which will be used for building the
OpenWrt images.

Notice that if you have already run the container once, as an optimization
procedure the script will restart it rather than creating a new one.
If you really want to create a fresh container from the Docker image,
please read inside the `run.sh` how to handle such case.

```
root@029a53d8cd99:/# su - build
```

Usage Examples
--------------

### Build Barrier Breaker images

As of 2015-01-17, Barrier Breaker is the stable branch of OpenWrt.

The binary images for OpenWrt BB are available
[here](https://downloads.openwrt.org/barrier_breaker/14.07/).

If you want to rebuild it from sources

**TODO**

Logged as build@container

```
$ cd ~/openwrt
$ git checkout TODO
$ git pull --all --prune
$ make menuconfig
$ make
```

Result: TODO

### Build Chaos Calmer (trunk) images

As of 2015-01-17, Chaos Chalmer is the development branch of OpenWrt.

**NOTE**: MLWG2 is supported by OpenWrt trunk since
[Revision 43990](https://dev.openwrt.org/changeset/43990).

(2015-01-17 09:00 CET)
Tested with openwrt
git-svn-id: svn://svn.openwrt.org/openwrt/trunk@43990 3c298f89-4303-0410-b956-a3

Logged as build@container

```
$ cd ~/openwrt
$ git checkout master
$ git pull --all --prune
$ make menuconfig
$ make
```

The resulting files will be saved under `bin/`; for instance, the images for the
MLWG2 are in file `ramips-mt7620-mlwg2-*.bin` under `bin/ramips/openwrt/`.
You should also find a `md5sums` file containing the checksums.

You can export the generated files either by copying them (as root)
to the `/shared` directory of the container which is shared with host running
Docker. You may also want to export the OpenWrt `.config` file which
you used to build the images. Example:
```
root@9cbdcdd96eb6:/# cp ~build/openwrt/bin/ramips/{md5sums,*-mlwg2-*} /shared
root@9cbdcdd96eb6:/# cp ~build/openwrt/.config /shared/my.config
root@9cbdcdd96eb6:/# ls -la /shared
total 13424
drwxrwxr-x   2 vagrant vagrant    4096 Jan 17 09:55 .
drwxr-xr-x 130 root    root       4096 Jan 17 09:20 ..
-rw-r--r--   1 root    root       5033 Jan 17 09:55 md5sums
-rw-r--r--   1 root    root     157623 Jan 17 09:00 my.config
-rw-r--r--   1 root    root    6645302 Jan 17 09:55 openwrt-ramips-mt7620-mlwg2-initramfs-uImage.bin
-rw-r--r--   1 root    root    7077892 Jan 17 09:55 openwrt-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin
root@9cbdcdd96eb6:/#
```

Alternatively, you may use either the `scp` or `rsync` commands to deploy
the files to a remote server running ssh.


### Build a customized image based on OpenWrt trunk plus local patches

The procedure detailed below was actually used for testing the patch
before it was merged into trunk with
[Changeset 43990](https://dev.openwrt.org/changeset/43990)

(2015-01-12 00:10 CET)
Logged as build@container

```
$ cd ~/openwrt
$ git config --global user.name "John Doe"
$ git config --global user.email "john.doe@gmail.com"
$ git checkout master
$ git pull --all --prune
```

Apply incoming patch https://patchwork.ozlabs.org/patch/427530/

```
$ git checkout -b try-new-patches master
$ : >target/linux/ramips/dts/MLWG2.dts
$ git add target/linux/ramips/dts/MLWG2.dts
$ git commit -s -m "Create empty file for the next patch to apply cleanly"
$ curl https://patchwork.ozlabs.org/patch/427530/mbox/ | git am
```

You may recreate the patch series with the following command

```
$ git format-patch master..try-new-patches
```

**TIP**: If you create a script with the commands above
and save it as `openwrt-local-patches.sh` inside
`easy-build/build-openwrt/build.local` before building the Docker image,
when the container is running you may simply execute
```
$ sh ~/openwrt-local-patches.sh
```
and your local patches will automagically be applied.

Configure OpenWrt

```
$ cp ~/20150111-1715-ldpinney_latest_files/MLWG2.config .config
$ make menuconfig
```

(2015-01-12 00:54 CET) Start build

```
$ make
```

Result:

```
...
 make[3] -C feeds/packages/utils/nano compile
 make[3] -C feeds/packages/libs/expat compile
 make[3] -C feeds/packages/utils/dbus compile
 make[3] -C feeds/packages/libs/gdbm compile
 make[3] -C feeds/packages/libs/intltool host-compile
make -r world: build failed. Please re-run make with V=s to see what's going on
make: *** [world] Error 1
build@1c118a3b61d1:~/openwrt$
```

(2015-01-12 07:33 CET) Seeing what's going on:
```
build@1c118a3b61d1:~/openwrt$ make V=s
make[1]: Entering directory `/home/build/openwrt'
make[2]: Entering directory `/home/build/openwrt'
make[3]: Entering directory `/home/build/openwrt/target/linux'
make[4]: Entering directory `/home/build/openwrt/target/linux/ramips'
/home/build/openwrt/scripts/kconfig.pl  + /home/build/openwrt/target/linux/generic/config-3.14 /home/build/openwrt/target/linux/ramips/mt7620/config-3.14 > /home/build/openwrt/build_dir/target-mipsel_24kec+dsp_uClibc-0.9.33.2/linux-ramips_mt7620/linux-3.14.28/.config.target
...
make[3]: Leaving directory `/home/build/openwrt/feeds/packages/libs/gdbm'
make[3]: Entering directory `/home/build/openwrt/feeds/packages/libs/intltool'
(cd /home/build/openwrt/build_dir/host/intltool-0.40.6/; if [ -x configure ]; then cp -fpR /home/build/openwrt/scripts/config.{guess,sub} /home/build/openwrt/build_dir/host/intltool-0.40.6// &&  /bin/bash ./configure CC="gcc" CFLAGS="-O2 -I/home/build/openwrt/staging_dir/host/include -I/home/build/openwrt/staging_dir/host/usr/include" CPPFLAGS="-I/home/build/openwrt/staging_dir/host/include -I/home/build/openwrt/staging_dir/host/usr/include" LDFLAGS="-L/home/build/openwrt/staging_dir/host/lib -L/home/build/openwrt/staging_dir/host/usr/lib" SHELL="/bin/bash" --target=x86_64-linux-gnu --host=x86_64-linux-gnu --build=x86_64-linux-gnu --program-prefix="" --program-suffix="" --prefix=/home/build/openwrt/staging_dir/host --exec-prefix=/home/build/openwrt/staging_dir/host --sysconfdir=/home/build/openwrt/staging_dir/host/etc --localstatedir=/home/build/openwrt/staging_dir/host/var --sbindir=/home/build/openwrt/staging_dir/host/bin ; fi )
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for gawk... gawk
checking whether make sets $(MAKE)... yes
checking for perl... /usr/bin/perl
checking for perl >= 5.8.1... 5.18.2
checking for XML::Parser... configure: error: XML::Parser perl module is required for intltool
make[3]: *** [/home/build/openwrt/build_dir/host/intltool-0.40.6/.configured] Error 1
make[3]: Leaving directory `/home/build/openwrt/feeds/packages/libs/intltool'
make[2]: *** [package/feeds/packages/intltool/host/compile] Error 2
make[2]: Leaving directory `/home/build/openwrt'
make[1]: *** [/home/build/openwrt/staging_dir/target-mipsel_24kec+dsp_uClibc-0.9.33.2/stamp/.package_compile] Error 2
make[1]: Leaving directory `/home/build/openwrt'
make: *** [world] Error 2
build@1c118a3b61d1:~/openwrt$
```

Solution: Install XML::Parser perl module (fixed in https://github.com/gmacario/easy-build/issues/94)

Logged as root@container
```
# apt-get -y install libxml-parser-perl
```

Then login again as build@container
```
# su - build
```

(2015-01-12 07:38 CET) Continue make
```
$ cd ~/openwrt
$ make
```

NOTE: local patches applied on master
(git-svn-id: svn://svn.openwrt.org/openwrt/trunk@43942 3c298f89-4303-0410-b956-a3cf2f4a3e73)

Result: SUCCESS
```
...
 make[3] -C package/utils/busybox compile
 make[3] -C package/utils/e2fsprogs compile
 make[2] package/install
 make[3] package/preconfig
 make[2] target/install
 make[3] -C target/linux install
 make[2] package/index
build@1c118a3b61d1:~/openwrt$
```

Inspecting results
```
build@1c118a3b61d1:~/openwrt$ ls -la bin/ramips/
total 360316
drwxr-xr-x 3 build build    4096 Jan 12 07:01 .
drwxr-xr-x 3 build build    4096 Jan 12 00:58 ..
-rw-r--r-- 1 build build    4711 Jan 12 07:01 md5sums
-rw-r--r-- 1 build build 7995392 Jan 12 07:00 openwrt-ramips-mt7620-ArcherC20i-initramfs.bin
-rw-r--r-- 1 build build 7995392 Jan 12 07:01 openwrt-ramips-mt7620-ArcherC20i-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648750 Jan 12 06:59 openwrt-ramips-mt7620-Lenovo-y1-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-Lenovo-y1-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648675 Jan 12 06:59 openwrt-ramips-mt7620-Lenovo-y1s-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-Lenovo-y1s-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648662 Jan 12 06:58 openwrt-ramips-mt7620-ai-br100-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-ai-br100-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648721 Jan 12 06:59 openwrt-ramips-mt7620-dir-810l-initramfs-uImage.bin
-rw-r--r-- 1 build build 6648699 Jan 12 06:58 openwrt-ramips-mt7620-e1700-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-e1700-squashfs-factory.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-e1700-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648232 Jan 12 06:59 openwrt-ramips-mt7620-mlw221-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mlw221-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648215 Jan 12 06:59 openwrt-ramips-mt7620-mlwg2-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648540 Jan 12 06:58 openwrt-ramips-mt7620-mt7620a-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mt7620a-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648738 Jan 12 06:58 openwrt-ramips-mt7620-mt7620a_mt7530-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mt7620a_mt7530-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648445 Jan 12 06:58 openwrt-ramips-mt7620-mt7620a_mt7610e-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mt7620a_mt7610e-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648738 Jan 12 06:58 openwrt-ramips-mt7620-mt7620a_v22sg-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mt7620a_v22sg-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648603 Jan 12 06:59 openwrt-ramips-mt7620-mzk-750dhp-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-mzk-750dhp-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648888 Jan 12 06:59 openwrt-ramips-mt7620-na930-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-na930-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 5898240 Jan 12 07:00 openwrt-ramips-mt7620-root.squashfs
-rw-r--r-- 1 build build 6648629 Jan 12 06:58 openwrt-ramips-mt7620-rp_n53-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-rp_n53-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648295 Jan 12 06:59 openwrt-ramips-mt7620-rt-n14u-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-rt-n14u-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6646936 Jan 12 06:58 openwrt-ramips-mt7620-uImage-initramfs.bin
-rw-r--r-- 1 build build 1103531 Jan 12 06:58 openwrt-ramips-mt7620-uImage.bin
-rwxr-xr-x 1 build build 8693116 Jan 12 06:58 openwrt-ramips-mt7620-vmlinux-initramfs.bin
-rwxr-xr-x 1 build build 8698120 Jan 12 06:58 openwrt-ramips-mt7620-vmlinux-initramfs.elf
-rwxr-xr-x 1 build build 3223164 Jan 12 06:58 openwrt-ramips-mt7620-vmlinux.bin
-rwxr-xr-x 1 build build 3228168 Jan 12 06:58 openwrt-ramips-mt7620-vmlinux.elf
-rw-r--r-- 1 build build 6648848 Jan 12 06:59 openwrt-ramips-mt7620-whr-1166d-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-whr-1166d-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648680 Jan 12 06:59 openwrt-ramips-mt7620-whr-300hp2-initramfs-uImage.bin
-rw-r--r-- 1 build build 6648761 Jan 12 06:59 openwrt-ramips-mt7620-whr-600d-initramfs-uImage.bin
-rw-r--r-- 1 build build 6648226 Jan 12 06:59 openwrt-ramips-mt7620-wmr-300-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-wmr-300-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648193 Jan 12 06:59 openwrt-ramips-mt7620-wr8305rt-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:00 openwrt-ramips-mt7620-wr8305rt-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648256 Jan 12 06:59 openwrt-ramips-mt7620-wrtnode-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:01 openwrt-ramips-mt7620-wrtnode-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648174 Jan 12 07:00 openwrt-ramips-mt7620-wt3020-4M-initramfs-uImage.bin
-rw-r--r-- 1 build build 6648180 Jan 12 07:00 openwrt-ramips-mt7620-wt3020-8M-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077922 Jan 12 07:01 openwrt-ramips-mt7620-wt3020-8M-squashfs-factory.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:01 openwrt-ramips-mt7620-wt3020-8M-squashfs-sysupgrade.bin
-rw-r--r-- 1 build build 6648185 Jan 12 07:00 openwrt-ramips-mt7620-zbt-wa05-initramfs-uImage.bin
-rw-r--r-- 1 build build 7077892 Jan 12 07:01 openwrt-ramips-mt7620-zbt-wa05-squashfs-sysupgrade.bin
drwxr-xr-x 5 build build    4096 Jan 12 01:06 packages
build@1c118a3b61d1:~/openwrt$
```

Copy MLWG2 images out of the container
```
$ cp bin/ramips/{md5sums,*-mlwg2-*.bin} /shared/output
```

From the host, check MD5
```
$ cd ~/easy-build/build-openwrt/shared/output
$ md5sum *.bin
$ grep mlwg2 md5sums  | md5sum -c -
```

Result: OK
```
gmacario@mv-linux-powerhorse:~⟫ cd ~/easy-build/build-openwrt/shared/output
gmacario@mv-linux-powerhorse:~/easy-build/build-openwrt/shared/output⟫ md5sum *.bin
80efcbb45d7575c9f52fb22507329fe1  openwrt-ramips-mt7620-mlwg2-initramfs-uImage.bin
2eed9c4456381c04ee028d90a81b608a  openwrt-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin
gmacario@mv-linux-powerhorse:~/easy-build/build-openwrt/shared/output⟫ grep mlwg2 md5sums  | md5sum -c -
openwrt-ramips-mt7620-mlwg2-initramfs-uImage.bin: OK
openwrt-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin: OK
gmacario@mv-linux-powerhorse:~/easy-build/build-openwrt/shared/output⟫
```

### (2015-01-12 18:00 CET) Build OpenWrt (trunk@43949 + local_patches)

Tree saved as https://github.com/gmacario/my-openwrt/tree/try-new-patches

```
build@1c118a3b61d1:~/openwrt$ tig log -q
commit 17c27bda73efa8a87f36558d3888caa327c088dc
Refs: try-new-patches, <gmacario/try-new-patches>
Author: L. D. Pinney <ldpinney@gmail.com>
Date:   Sun Jan 11 16:02:17 2015 -0600

    add support for Kingston MLWG2

    This patch adds support for the Kingston Mobilelite Wireless G2 (MLWG2)

    http://wiki.openwrt.org/toh/kingston/mlwg2

    https://github.com/gmacario/kingston-mlwg2-hack/wiki/Testing-OpenWrt-on-MLWG2

    Tested-by: Gianpaolo Macario <gmacario@gmail.com>

    Signed-off-by: L. D. Pinney <ldpinney@gmail.com>

 target/linux/ramips/base-files/etc/board.d/01_leds |   4 +
 .../linux/ramips/base-files/etc/board.d/02_network |   3 +
 target/linux/ramips/base-files/etc/diag.sh         |   3 +
 target/linux/ramips/base-files/lib/ramips.sh       |   3 +
 .../ramips/base-files/lib/upgrade/platform.sh      |   1 +
 target/linux/ramips/dts/MLWG2.dts                  | 118 +++++++++++++++++++++
 target/linux/ramips/image/Makefile                 |   2 +
 7 files changed, 134 insertions(+)

commit 4ce8281ed278b92d9497213349ffc053b8492851
Author: Gianpaolo Macario <gmacario@gmail.com>
Date:   Sun Jan 11 23:44:30 2015 +0000

    Create empty file for the next patch to apply cleanly

    Signed-off-by: Gianpaolo Macario <gmacario@gmail.com>

 target/linux/ramips/dts/MLWG2.dts | 0
 1 file changed, 0 insertions(+), 0 deletions(-)

commit 6ef1cca844fc19bfb6cef8245fc01d73f861b40c
Refs: master, <gmacario/master>, <origin/HEAD>, <origin/master>
Author: cyrus <cyrus@3c298f89-4303-0410-b956-a3cf2f4a3e73>
Date:   Mon Jan 12 12:40:08 2015 +0000

    nftables: add missing patch

    Signed-off-by: Steven Barth <steven@midlink.org>

    git-svn-id: svn://svn.openwrt.org/openwrt/trunk@43949 3c298f89-4303-0410-b956-a3cf2f4a3e73

 .../utils/nftables/patches/100-disable-doc-generation.patch       | 8 ++++++++
 1 file changed, 8 insertions(+)

commit 6bcd0968d86135d03460f8a5cb478b344f1cd8b0
...
```

Compiling

```
$ make
```
Result: OK

Copy MLWG2 images out of the container
```
$ cp bin/ramips/{md5sums,*-mlwg2-*.bin} /shared/output-20150112-1805
```

From the host, check MD5
```
$ cd ~/easy-build/build-openwrt/shared/output-20150112-1805
$ md5sum *.bin
$ grep mlwg2 md5sums  | md5sum -c -
```

Result: OK
```
gmacario@mv-linux-powerhorse:~⟫ cd ~/easy-build/build-openwrt/shared/output-20150112-1805
gmacario@mv-linux-powerhorse:~/easy-build/build-openwrt/shared/output-20150112-1805⟫ md5sum *.bin
a193f29cdf4af086f3d50e42f34c1e9b  openwrt-ramips-mt7620-mlwg2-initramfs-uImage.bin
c7a3fd5f50e8053160a71af58f864300  openwrt-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin
gmacario@mv-linux-powerhorse:~/easy-build/build-openwrt/shared/output-20150112-1805⟫ grep mlwg2 md5sums  | md5sum -c -
openwrt-ramips-mt7620-mlwg2-initramfs-uImage.bin: OK
openwrt-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin: OK
gmacario@mv-linux-powerhorse:~/easy-build/build-openwrt/shared/output-20150112-1805⟫
```

You may now proceed with
[[Testing OpenWrt trunk@43949+local_patches on MLWG2]].

<!-- EOF -->

---
layout: post
title:  "Rebuilding OpenWRT for Arduino Yun"
date:   2015-01-18 18:00:00 CET
#categories: template android howto development
---
<-- markdown-link-check-disable -->
# Introduction
This page explains how to create an [OpenWrt](https://openwrt.org/) image
suitable to work on the [Arduino Yun](http://arduino.cc/en/Main/ArduinoBoardYun).
### Prerequisites
* A PC running [Docker](https://www.docker.com/) and [git](http://git-scm.com/)
(tested with [Ubuntu 14.04.1 64-bit](http://www.ubuntu.com/))
* A fast Internet connection
# Installing easy-build
Install the [gmacario/easy-build](https://github.com/gmacario/easy-build)
package by opening a shell and typing the following command:
```
$ git clone https://github.com/gmacario/easy-build.git
```
# Building OpenWrt images inside a container
### (Optional) Build a customized Docker image
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
### Run the container
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
## Usage Examples
### Build Chaos Calmer (trunk) images
Chaos Chalmer is currently the development branch of OpenWrt.
As of 2015-01-18, Arduino Yun is not officially supported by
mainline OpenWrt, but only through its [Linino](http://www.linino.org/) fork.
### Build Linino (master) images
According to the top level [README.me](https://github.com/linino/linino_distro)
> Linino is an open source distribution based on OpenWRT Attitude Adjustment 12.09.
(2015-01-18 22:00 CET)
Read http://wiki.linino.org/doku.php?id=wiki:getstartbuild
TODO: See also http://wiki.openwrt.org/toh/arduino/yun
TODO: See also https://github.com/arduino/linino
Logged as build@container
```
$ cd ~/openwrt
$ git checkout master
$ git remote add linino https://github.com/linino/linino_distro.git
$ git pull --all --prune
```
Inspect deltas
```
build@248699b6ee5a:~/openwrt$ git log --oneline remotes/origin/master..remotes/linino/master | wc -l
642
build@248699b6ee5a:~/openwrt$
```
Let us try the 'linino/master' branch
```
$ git checkout -b try-linino linino/master
```
Fetch a working OpenWrt build configuration
```
$ curl -O https://raw.githubusercontent.com/linino/linino_distro/master/.config
```
Review changes (if needed), then start build
```
$ make menuconfig
$ make
```
(2015-01-18 22:30 CET) build failed in compiling `package/linino/elfutils`
```
build@248699b6ee5a:~/openwrt$ make
make[1] world
make[2] target/compile
make[3] -C target/linux compile
make[2] package/cleanup
make[2] package/compile
make[3] -C package/toolchain compile
...
make[3] -C package/linino/elfutils compile
make -r world: build failed. Please re-run make with V=s to see what's going on
make: *** [world] Error 1
build@248699b6ee5a:~/openwrt$
```
Running `make V=s` to see what's going on
```
build@248699b6ee5a:~/openwrt$ make V=s
make[1]: Entering directory `/home/build/openwrt'
make[2]: Entering directory `/home/build/openwrt'
make[3]: Entering directory `/home/build/openwrt/target/linux'
...
make[3]: Entering directory `/home/build/openwrt/package/linino/elfutils'
(cd /home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155/./; if [ -x ./configure ]; then /usr/bin/find /home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155/ -name config.guess | xargs -r chmod u+w; /usr/bin/find /home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155/ -name config.guess | xargs -r -n1 cp /home/build/openwrt/scripts/config.guess; /usr/bin/find /home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155/ -name config.sub | xargs -r chmod u+w; /usr/bin/find /home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155/ -name config.sub | xargs -r -n1 cp /home/build/openwrt/scripts/config.sub; AR=mips-openwrt-linux-uclibc-ar AS="mips-openwrt-linux-uclibc-gcc -c -Os -pipe -mips32r2 -mtune=mips32r2 -fno-caller-saves -fhonour-copts -Wno-error=unused-but-set-variable -msoft-float -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libiconv-stub/include -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libintl-stub/include" LD=mips-openwrt-linux-uclibc-ld NM=mips-openwrt-linux-uclibc-nm CC="mips-openwrt-linux-uclibc-gcc" GCC="mips-openwrt-linux-uclibc-gcc" CXX="mips-openwrt-linux-uclibc-g++" RANLIB=mips-openwrt-linux-uclibc-ranlib STRIP=mips-openwrt-linux-uclibc-strip OBJCOPY=mips-openwrt-linux-uclibc-objcopy OBJDUMP=mips-openwrt-linux-uclibc-objdump SIZE=mips-openwrt-linux-uclibc-size CFLAGS="-Os -pipe -mips32r2 -mtune=mips32r2 -fno-caller-saves -fhonour-copts -Wno-error=unused-but-set-variable -msoft-float -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libiconv-stub/include -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libintl-stub/include " CXXFLAGS="-Os -pipe -mips32r2 -mtune=mips32r2 -fno-caller-saves -fhonour-copts -Wno-error=unused-but-set-variable -msoft-float -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libiconv-stub/include -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libintl-stub/include " CPPFLAGS="-I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/include -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/include -I/home/build/openwrt/staging_dir/toolchain-mips_r2_gcc-4.6-linaro_uClibc-0.9.33.2/usr/include -I/home/build/openwrt/staging_dir/toolchain-mips_r2_gcc-4.6-linaro_uClibc-0.9.33.2/include -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libiconv-stub/include -I/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libintl-stub/include " LDFLAGS="-L/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib -L/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/lib -L/home/build/openwrt/staging_dir/toolchain-mips_r2_gcc-4.6-linaro_uClibc-0.9.33.2/usr/lib -L/home/build/openwrt/staging_dir/toolchain-mips_r2_gcc-4.6-linaro_uClibc-0.9.33.2/lib -L/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libiconv-stub/lib -L/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/usr/lib/libintl-stub/lib "  LIBS="-largp"  ./configure --target=mips-openwrt-linux --host=mips-openwrt-linux --build=x86_64-linux-gnu --program-prefix="" --program-suffix="" --prefix=/usr --exec-prefix=/usr --bindir=/usr/bin --sbindir=/usr/sbin --libexecdir=/usr/lib --sysconfdir=/etc --datadir=/usr/share --localstatedir=/var --mandir=/usr/man --infodir=/usr/info --disable-nls   --disable-werror ; fi; )
configure: loading site script /home/build/openwrt/include/site/mips-openwrt-linux-uclibc
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for mips-openwrt-linux-strip... mips-openwrt-linux-uclibc-strip
checking for a thread-safe mkdir -p... /bin/mkdir -p
checking for gawk... gawk
checking whether make sets $(MAKE)... yes
checking whether to enable maintainer-specific portions of Makefiles... no
checking build system type... x86_64-pc-linux-gnu
checking host system type... mips-openwrt-linux-gnu
checking for mips-openwrt-linux-gcc... mips-openwrt-linux-uclibc-gcc
checking whether the C compiler works... no
configure: error: in `/home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155':
configure: error: C compiler cannot create executables
See `config.log' for more details
make[3]: *** [/home/build/openwrt/build_dir/target-mips_r2_uClibc-0.9.33.2/elfutils-0.155/.configured_] Error 77
make[3]: Leaving directory `/home/build/openwrt/package/linino/elfutils'
make[2]: *** [package/linino/elfutils/compile] Error 2
make[2]: Leaving directory `/home/build/openwrt'
make[1]: *** [/home/build/openwrt/staging_dir/target-mips_r2_uClibc-0.9.33.2/stamp/.package_compile] Error 2
make[1]: Leaving directory `/home/build/openwrt'
make: *** [world] Error 2
build@248699b6ee5a:~/openwrt$
```
The resulting files will be saved under `bin/`;
TODO
The images for the Arduino Yun are in file TODO.
You should also find a `md5sums` file containing the checksums.
You can export the generated files either by copying them (as root)
to the `/shared` directory of the container which is shared with host running
Docker. You may also want to export the OpenWrt `.config` file which
you used to build the images. Example:
```
TODO
root@9cbdcdd96eb6:/# cp ~build/openwrt/bin/ramips/{md5sums,*-mlwg2-*} /shared
root@9cbdcdd96eb6:/# cp ~build/openwrt/.config /shared/my.config
root@9cbdcdd96eb6:/# ls -la /shared
TODO
root@9cbdcdd96eb6:/#
```
Alternatively, you may use either the `scp` or `rsync` commands to deploy
the files to a remote server running ssh.
### Build a customized image based on OpenWrt trunk plus local patches
TODO
Logged as build@container
```
$ cd ~/openwrt
$ git config --global user.name "John Doe"
$ git config --global user.email "john.doe@gmail.com"
$ git checkout master
$ git pull --all --prune
```
TODO
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
TODO
Copy Arduino Yun images out of the container
```
$ TODO cp bin/ramips/{md5sums,*-mlwg2-*.bin} /shared/output
```
TODO: From the host, check MD5
```
$ cd ~/easy-build/build-openwrt/shared/output
$ md5sum *.bin
$ grep mlwg2 md5sums  | md5sum -c -
```
Result: OK
TODO
<-- markdown-link-check-enable-->
<-- EOF -->

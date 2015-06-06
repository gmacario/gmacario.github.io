---
layout: post
title:  "Trying Android Lollipop 5.0.0 on a Freescale Sabre SD"
date:   2015-06-04 16:49:00
categories: android howto development debugging
---

This blog post explains my tests of Android Lollipop 5.0.0 on a SABRE SD board.

### Download files from Freescale website

Browse <http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD>

You should sign in with your account credentials in order to be able to download the files.
If you do not have a Freescale login please create one by selecting "Register".

Select tab "Documentation". Download the following files:

* **IMX6_L500_100_ANDROID_DOCS**
  - i.MX6 Android L5.0.0_1.0.0 BSP Documentation	Supporting Information	gz	8189	L5.0.0_1.0.0	5/29/2015

Select tab "Software & Tools", then expand group "Hardware Development Tools > Programmers (Flash, etc.)". Download the following files:

* **IMX-L5.0.0-MFG-TOOL**
  - i.MX 6Family Manufacturing Toolkit for L5.0.0_1.0.0
  - Size (K): 36731 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015

Select tab "Software & Tools", then expand group "Run-time Software > Operating System Software-Board Support Packages". Download the following files:

* **IMX6-L500-100-ANDROID-SOURCE-BSP**
  - i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, i.MX 6Solo i.MX 6Sololite and i.MX6SX Android L5.0.0_1.0.0 BSP, Source Code for BSP and Codecs.
  - Size (K): 94224 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015
* **IMX6-L500-100-ANDROID-DEMO-SD-BSP**
  - i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, and i.MX 6Solo Android L5.0.0_1.0.0 BSP Binary Demo Files for the SABRE Platform and SABRE Board for Smart Devices.
  - Size (K): 783176 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015
* **IMX6-L500-100-ANDROID-DEMO-iMX6SX-BSP**
  - i.MX 6SoloX Android L5.0.0_1.0.0 BSP Binary Demo Files.
  - Size (K): 990953 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015

### Extract the downloaded files

Create a new directory to contain the extracted files

```
$ mkdir -p ~/temp/Android_L500_100_iMX6
```

Extract the documentation and the MFGTool

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_doc.tar.gz
```


The documentation will be extracted under `published/`.
Please read the following files:

* `Android_Release_Notes.pdf` - Android(TM) Release Notes
  - Document Number: ARN - Rev. L5.0.0_1.0.0-ga, 06/2015 - Format: PDF, 10 pages

* `Android_Quick_Start_Guide.pdf` - Android(TM) Quick Start Guide
  - Document Number: AQSUG - Rev. L5.0.0_1.0.0-ga, 06/2015 - Format: PDF, 28 pages

* `Android_User's_Guide.pdf` - Android(TM) User's Guide
  - Document Number: AUG - Rev. L5..0_1.0.0-ga, 06/2015 - Format: PDF, 25 pages

* ...

Extract the documentation and the MFGTool

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_tools.tar.gz
```

Extract the archive with demo images, then extract the full image for q6sabresd

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_images_6qsabresd.tar.gz
$ tar xvf android_L5.0.0_1.0.0-ga_full_image_6qsabresd.tar.gz
```

Extract the BSP sources

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_core_source.gz
```

### Create a SD-Card with L5.0.0 for Sabre SD Quad

Login to a Linux machine equipped with a SD-Card writer (in our case, gmacario@kruk)

```
$ cd /opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd
$ SDCARD=/dev/sdX SDCARD_SIZE=xxxx ./sabresd-prepare-sdcard-android.sh
```

Verify contents of

```
$ cd /opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd
$ imgtool tmp/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/SD/boot-imx6q.img extract
```

Result:

```
gmacario@kruk:/opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd$ imgtool tmp/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/SD/boot-imx6q.img extract
Boot image detected
Part            Size            Pages     Addr
Kernel:         6819456         3330    0x14008000
Ramdisk:        725617          355     0x15000000
Secondary:      51263           26      0x14f00000
Tags:       14000100
Flash Page Size: 2048 bytes
Name:
CmdLine: console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M
Extracting contents to directory: extracted
Found LZO Magic at offset 5692
Looking for device tree...
gmacario@kruk:/opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd$
```

Extract `ramdisk`:

```
$ mkdir -p extracted/ramdisk.tmp
$ cd extracted/ramdisk.tmp
$ zcat ../ramdisk | cpio -iv
```

Verify contents of `/fstab.freescale`:

```
gmacario@kruk:/opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd/extracted/ramdisk.tmp$ cat fstab.freescale
# Android fstab file.
#<src>                                                  <mnt_point>         <type>    <mnt_flags and options>                       <fs_mgr_flags>
# The filesystem that contains the filesystem checker binary (typically /system) cannot
# specify MF_CHECK, and must come before any filesystems that do specify MF_CHECK

/devices/soc0/soc.1/2100000.aips-bus/2194000.usdhc/mmc_host /mnt/media_rw/extsd vfat defaults voldmanaged=extsd:auto
/devices/soc0/soc.1/2100000.aips-bus/2184000.usb/ci_hdrc.0  /mnt/media_rw/udisk vfat defaults voldmanaged=udisk:auto
/dev/block/mmcblk2p5    /system      ext4    ro,barrier=1                                                                               wait,verify
/dev/block/mmcblk2p4    /data        ext4    nosuid,nodev,nodiratime,noatime,nomblk_io_submit,noauto_da_alloc,errors=panic    wait,encryptable=/dev/block/mmcblk2p9
/dev/block/mmcblk2p6    /cache       ext4    nosuid,nodev,nomblk_io_submit                                                    wait
/dev/block/mmcblk2p7    /device      ext4    ro,nosuid,nodev                                                                  wait
/dev/block/mmcblk2p1    /boot        emmc    defaults                                                                         defaults
/dev/block/mmcblk2p2    /recovery    emmc    defaults                                                                         defaults
/dev/block/mmcblk2p8    /misc        emmc    defaults                                                                         defaults
gmacario@kruk:/opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd/extracted/ramdisk.tmp$
```

(2015-06-04 19:03 CEST)

Power up and press "ENTER" to get the U-Boot prompt

```
U-Boot 2014.04-00201-g9d7bf9b (May 05 2015 - 10:14:54)

CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 47 C, calibration data: 0x5984fb7d
Reset cause: POR
Board: MX6-SabreSD
I2C:   ready
DRAM:  1 GiB
MMC:   FSL_SDHC: 0, FSL_SDHC: 1, FSL_SDHC: 2
*** Warning - bad CRC, using default environment

No panel detected: default to Hannstar-XGA
Display: Hannstar-XGA (1024x768)
In:    serial
Out:   serial
Err:   serial
Found PFUZE100 deviceid=10,revid=11
check_and_clean: reg 0, flag_set 0
Fastboot: Normal
flash target is MMC:1
Net:   FEC [PRIME]
Normal Boot
Hit any key to stop autoboot:  0
=>
```

Print U-Boot environment variables

```
=> printenv
baudrate=115200
bootcmd=booti mmc1
bootdelay=1
ethact=FEC
ethaddr=00:04:9f:02:b0:36
ethprime=FEC
fastboot_dev=mmc1
fdt_high=0xffffffff
initrd_high=0xffffffff
loadaddr=0x12000000
splashpos=m,m

Environment size: 215/8188 bytes
=>
```

Boot

```
=> boot
booti mmc1
kernel   @ 14008000 (6819456)
ramdisk  @ 15000000 (725617)
fdt      @ 14f00000 (51263)
kernel cmdline:
        use boot.img command line:
        console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
switch to ldo_bypass mode!
   Using Device Tree in place at 14f00000, end 14f0f83e

Starting kernel ...

Booting Linux on physical CPU 0x0
Initializing cgroup subsys cpu
Initializing cgroup subsys cpuacct
Linux version 3.10.53-06587-g4f0dd92 (b18293@scmbld4) (gcc version 4.6.x-google 20120106 (prerelease) (GCC) ) #4 SMP PREEMPT Tue May 5 10:38:30 CST 2015
CPU: ARMv7 Processor [412fc09a] revision 10 (ARMv7), cr=10c53c7d
CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
Machine: Freescale i.MX6 Quad/DualLite (Device Tree), model: Freescale i.MX6 Quad SABRE Smart Device Board
cma: CMA: reserved 384 MiB at 32000000
Memory policy: ECC disabled, Data cache writealloc
PERCPU: Embedded 8 pages/cpu @81803000 s9728 r8192 d14848 u32768
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 259840
Kernel command line: console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
PID hash table entries: 4096 (order: 2, 16384 bytes)
Dentry cache hash table entries: 131072 (order: 7, 524288 bytes)
Inode-cache hash table entries: 65536 (order: 6, 262144 bytes)
Memory: 959MB 64MB = 1023MB total
Memory: 627276k/627276k available, 421300k reserved, 0K highmem
...
```

Power up, enter U-Boot then change boot.img command line

```
=> setenv bootargs console=ttymxc0,115200 debug no_console_suspend init=/init video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
=> saveenv
=> reset
```

TODO: add `no_console_suspend`

Android is upgrading...

Swipe

Settings > About tablet
* Model number: SABRESD-MX6DQ
* Android version: 5.0.2
* Baseband version: Unknown
* Kernel version: 3.10.53-06587-g4f0dd92 b18293@scmbld4 #4 Tue May 5 10:38:30 CST 2015
* Build number: 1.0.0-ga-rc4 release-keys


TODO



TODO

### Write Android L5.0.0 on Sabre SD Quad eMMC

Follow instructions in Chapter 3 of the "Android(TM) Quick Start Guide"

TODO TODO TODO

```
$ cd ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_tools/mfgtools/
$ cd "Profiles/Linux/OS Firmware/files/android/sabresd/"
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/u-boot-imx6q.imx .
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
```

TODO

<!-- EOF -->

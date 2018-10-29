---
layout: post
title:  "Building a Yocto image for the UDOO Neo"
date:   2015-11-22 22:00:00
tags:   howto udoo imx6x yocto build embedded
---

### Introduction

In [a previous post](http://bit.ly/1Puczzk) I described how to run a prebuilt [Yocto Project](https://www.yoctoproject.org/) image on my [UDOO Neo](http://www.udoo.org/udoo-neo/).

This post explains how to build the micro SD card image directly from sources.

### References

* <https://github.com/gmacario/genivi-demo-platform/tree/dev-udooneo-fido>

## Step-by-step instructions

### Building the image from sources

* [Build log](/images/build-yocto-udooneo-34-log.txt)
  <!-- - [original](http://mv-linux-powerhorse.solarma.it:9080/job/build-yocto-udooneo/34/consoleText) -->
* [Binary image](/images/core-image-minimal-udooneo-20151114142058.rootfs.sdcard) (24 MB)
  <!-- - [original](http://mv-linux-powerhorse.solarma.it:9080/job/build-yocto-udooneo/ws/gdp-src-build/tmp/deploy/images/udooneo/core-image-minimal-udooneo-20151114142058.rootfs.sdcard) -->

### Testing the image on the target

- Download file `core-image-minimal-udooneo-20151114142058.rootfs.sdcard`

  ```
  gmacario@ITM-GMACARIO-W7 ~/Downloads
  $ md5sum core-image-minimal-udooneo-20151114142058.rootfs.sdcard
  610e75f4410cd70e32e3bb90e4edabd9 *core-image-minimal-udooneo-20151114142058.rootfs.sdcard

  gmacario@ITM-GMACARIO-W7 ~/Downloads
  $
  ```

- Write the `*.rootfs.sdcard` file (i.e. on Windows, use Win32DiskImager) onto a blank Micro SD

- Insert the Micro SD

- Watch U-Boot and Linux console messages on the debug serial

  ```
  U-Boot 2014.04 (Nov 14 2015 - 16:02:05)


  CPU:   Freescale i.MX6SX rev1.2 at 792 MHz

  CPU:   Temperature 35 C, calibration data: 0x59b50469

  Reset cause: POR

  Board: MX6SX UDOO NEO

  I2C:   ready

  DRAM:  1 GiB

  MMC:   FSL_SDHC: 0, FSL_SDHC: 1

  *** Warning - bad CRC, using default environment


  In:    serial

  Out:   serial

  Err:   serial

  Found PFUZE300! deviceid 0x30, revid 0x11

  Net:   CPU Net Initialization Failed

  No ethernet found.

  Normal Boot

  Hit any key to stop autoboot:  3  2  1  0

  mmc0 is current device

  reading uEnv.txt

  ** Unable to read file uEnv.txt **

  reading /zImage

  4399520 bytes read in 247 ms (17 MiB/s)

  Booting from mmc ...

  reading imx6sx-udoo-neo-hdmi-m4.dtb

  39414 bytes read in 19 ms (2 MiB/s)

  Kernel image @ 0x80800000 [ 0x000000 - 0x4321a0 ]

  ## Flattened Device Tree blob at 83000000

     Booting using the fdt blob at 0x83000000

     Using Device Tree in place at 83000000, end 8300c9f5

  sono entrato in ldo_mode_set

  setto i valori

  valore di vddarm 19

  switch to ldo_bypass mode!


  Starting kernel ...


  [    0.000000] Booting Linux on physical CPU 0x0
  [    0.000000] Linux version 3.14.28_1.0.0_ga-udooboard+gb15f827 (root@148b793524e5) (gcc version 4.9.1 (GCC) ) #1 SMP PREEMPT Sat Nov 14 14:51:58 UTC 2015
  [    0.000000] CPU: ARMv7 Processor [412fc09a] revision 10 (ARMv7), cr=10c53c7d
  [    0.000000] CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
  [    0.000000] Machine model: UDoo Neo (based on imx6 SoloX)
  [    0.000000] Reserved memory: reserved region for node 'm4@0x84000000': base 0x84000000, size 8 MiB
  [    0.000000] cma: CMA: reserved 320 MiB at aa000000
  [    0.000000] Memory policy: Data cache writealloc
  [    0.000000] PERCPU: Embedded 8 pages/cpu @bf63c000 s9152 r8192 d15424 u32768
  [    0.000000] Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 257794
  [    0.000000] Kernel command line: console=ttymxc0,115200 root=/dev/mmcblk0p2 rootwait rw consoleblank=0
  [    0.000000] PID hash table entries: 4096 (order: 2, 16384 bytes)
  [    0.000000] Dentry cache hash table entries: 131072 (order: 7, 524288 bytes)
  [    0.000000] Inode-cache hash table entries: 65536 (order: 6, 262144 bytes)
  [    0.000000] Memory: 690168K/1039360K available (5058K kernel code, 332K rwdata, 5656K rodata, 260K init, 384K bss, 349192K reserved, 0K highmem)
  [    0.000000] Virtual kernel memory layout:
  ...
```

  [Complete logfile](/images/20151115-1206-core-image-minimal-udooneo-20151114142058.txt)

- When getting the `udooneo login:` prompt

  ```
  Poky (Yocto Project Reference Distro) 1.7.1 udooneo /dev/ttymxc0

  udooneo login:
  ```
  login as `root` (the default image has no password)

### Some commands to inspect the target

#### df -h

```
root@udooneo:~# df -h
Filesystem                Size      Used Available Use% Mounted on
/dev/root                 6.7M      4.7M      1.6M  75% /
devtmpfs                337.0M         0    337.0M   0% /dev
tmpfs                   497.1M     88.0K    497.0M   0% /run
tmpfs                   497.1M     56.0K    497.1M   0% /var/volatile
root@udooneo:~#
```

#### cat /proc/cpuinfo

```
root@udooneo:~# cat /proc/cpuinfo
processor       : 0
model name      : ARMv7 Processor rev 10 (v7l)
Features        : swp half thumb fastmult vfp edsp neon vfpv3 tls vfpd32
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x2
CPU part        : 0xc09
CPU revision    : 10

Hardware        : Freescale i.MX6 SoloX (Device Tree)
Revision        : 0000
Serial          : 0000000000000000
root@udooneo:~#
```

#### cat /proc/version

```
root@udooneo:~# cat /proc/version
Linux version 3.14.28_1.0.0_ga-udooboard+gb15f827 (root@148b793524e5) (gcc version 4.9.1 (GCC) ) #1 SMP PREEMPT Sat Nov 14 14:51:58 UTC 2015
root@udooneo:~#
```

#### ifconfig -a

```
root@udooneo:~# ifconfig -a
eth0      Link encap:Ethernet  HWaddr 00:C0:08:8C:14:E6
          inet addr:192.168.64.107  Bcast:192.168.64.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:264 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:30071 (29.3 KiB)  TX bytes:684 (684.0 B)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

root@udooneo:~#
```

**NOTE:** The (wired) Ethernet cable was connected to my home network, so I can test Internet connection:

```
root@udooneo:~# ping -c 5 www.cisco.com
PING www.cisco.com (95.100.224.170): 56 data bytes
64 bytes from 95.100.224.170: seq=0 ttl=55 time=7.091 ms
64 bytes from 95.100.224.170: seq=1 ttl=55 time=103.499 ms
64 bytes from 95.100.224.170: seq=2 ttl=55 time=23.828 ms
64 bytes from 95.100.224.170: seq=3 ttl=55 time=7.683 ms
64 bytes from 95.100.224.170: seq=4 ttl=55 time=7.321 ms

--- www.cisco.com ping statistics ---
5 packets transmitted, 5 packets received, 0% packet loss
round-trip min/avg/max = 7.091/29.884/103.499 ms
root@udooneo:~#
```

<!-- EOF -->

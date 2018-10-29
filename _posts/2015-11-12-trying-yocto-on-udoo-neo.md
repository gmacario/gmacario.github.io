---
layout: post
title:  "Trying Yocto on the UDOO Neo"
date:   2015-11-12 22:00:00
tags:   howto udoo imx6x yocto build embedded
---

### Introduction

Here are a few notes when I tried a prebuilt [Yocto Project](https://www.yoctoproject.org/) 2.0 core-image-full-cmdline image on my [UDOO Neo](http://www.udoo.org/udoo-neo/).

### References

* Forum thread: <http://udoo.org/forum/threads/yocto-on-udoo-neo.2965/>
- Sources: <https://github.com/graugans/meta-fsl-arm-extra/tree/master-udooneo?files=1>
- Blog: <http://ch.ege.io/blog/categories/udoo/>

### Step-by-step instructions

- Download [Yocto image for UDOO NEO - 20151109191206](https://www.dropbox.com/s/a1qng0ukoqynift/core-image-full-cmdline-udooneo-20151109191206.rootfs.sdcard.gz?dl=0)

- Unzip the `*.rootfs.sdcard.gz` file
      $ gunzip core-image-full-cmdline-udooneo-20151109191206.rootfs.sdcard.gz

- Write the `*.rootfs.sdcard` file (i.e. on Windows, use Win32DiskImager) onto a blank Micro SD

- Insert the Micro SD

- Watch U-Boot and Linux console messages on the debug serial

- When getting the `udooneo login` prompt, login as `root`

  ```
  Poky (Yocto Project Reference Distro) 2.0 udooneo /dev/ttymxc0

  udooneo login: root
  root@udooneo:~#
  ```

### Some commands to inspect the target

#### df -h

```
root@udooneo:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       128M   94M   25M  80% /
devtmpfs        338M     0  338M   0% /dev
tmpfs           498M  156K  498M   1% /run
tmpfs           498M  168K  498M   1% /var/volatile
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
Linux version 3.14.28_1.0.0_ga-udooboard+gb15f827 (chris@quadros) (gcc version 5.2.0 (GCC) ) #1 SMP PREEMPT Thu Nov 5 22:02:15 CET 2015
root@udooneo:~#
```

<!-- EOF -->

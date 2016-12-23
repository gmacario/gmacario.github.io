---
layout: post
title:  "Trying GDP-11 on a Raspberry Pi 3"
date:   2016-12-22 14:00:00 CET
categories: howto genivi gdp rpi
---

### Introduction

I wrote a couple of notes trying the Release 11 of the [GENIVI Development Platform](https://at.projects.genivi.org/wiki/x/aoCw) on a [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/).

### Writing the SD-Card with GDP-11 for Raspberry Pi 3

<!-- 2016-12-22 16:00 CET -->

Browse the [GDP Download page](https://at.projects.genivi.org/wiki/x/64Kw).

Download the "GDP 11 Raspberry Pi 3 gzipped SD image"

```
wget -c http://docs.projects.genivi.org/gdp_files/v11/GDP11/raspberrypi3/final/gdp-11-rpi3-sdimg.gz
```

Result:

```
gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$ wget -c http://docs.projects.genivi.org/gdp_files/v11/GDP11/raspberrypi3/final/gdp-11-rpi3-sdimg.gz
--2016-12-22 16:33:32--  http://docs.projects.genivi.org/gdp_files/v11/GDP11/raspberrypi3/final/gdp-11-rpi3-sdimg.gz
Resolving docs.projects.genivi.org (docs.projects.genivi.org)... 38.101.164.236
Connecting to docs.projects.genivi.org (docs.projects.genivi.org)|38.101.164.236|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1249902592 (1.2G) [application/x-gzip]
Saving to: ‘gdp-11-rpi3-sdimg.gz’

gdp-11-rpi3-sdimg.gz                         100%[=============================================================================================>]   1.16G  1.08MB/s    in 18m 52s

2016-12-22 16:52:24 (1.05 MB/s) - ‘gdp-11-rpi3-sdimg.gz’ saved [1249902592/1249902592]


gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$
```

Verify the checksum of the downloaded file matches the one published on the wiki page above

```
md5sum gdp-11-rpi3-sdimg.gz
```

Result:

```
gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$ md5sum gdp-11-rpi3-sdimg.gz
70b92361b25dbb25b8642f28eb12899d *gdp-11-rpi3-sdimg.gz

gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$
```

Check what contains the downloaded image

```
gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$ zcat gdp-11-rpi3-sdimg.gz

gzip: gdp-11-rpi3-sdimg.gz: not in gzip format

gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$ file gdp-11-rpi3-sdimg.gz
gdp-11-rpi3-sdimg.gz: DOS/MBR boot sector; partition 1 : ID=0xc, active, start-CHS (0x40,0,1), end-CHS (0x2bf,3,32), startsector 8192, 81920 sectors; partition 2 : ID=0x83, start-CHS (0x2c0,0,1), end-CHS (0x3ff,3,32), startsector 90112, 2351104 sectors

gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/gdp-11-rpi3
$
```

it looks like in spite of the filename, `gdp-11-rpi3-sdimg.gz` was not gzipped (it is the raw image of the SD-card), so rename it more appropriately

```
mv gdp-11-rpi3-sdimg.gz gdp-11-rpi3.sdimg
```

Then use Win32DiskImager on your host to write file `gdp-11-rpi1.sdimg` to a blank SD-Card

Unmount the SD-Card before removing it from the laptop.

### Booting GDP-11 on the Raspberry Pi 3

1. Insert the microSD with GDP-11 image into the Raspberry Pi 3 microSD-Card slot.
2. Connect a HDMI display to the Raspberry Pi using a HDMI cable
3. Connect the Ethernet connector to your router using an Ethernet cable
4. Connect a USB Mouse to the Raspberry Pi 3
5. Connect a USB Keyboard to the Raspberry Pi 3
6. Finally, power up the Raspberry Pi 3 by connecting a power supply to its MicroUSB connector

After a few seconds you should see the GDP Home Page on the HDMI display.

### Inspect the target

Discover the IP address that was assigned by your router to the Raspberry Pi 3 (for instance, I used the [Fing](https://www.fing.io/) app from an Android phone connected via Wi-Fi to the same router). In my case, this is `192.168.12.105`

Login to the target via SSH as user `root` (default password: `root`)

```
gmacario@ITM-GPAOLO-W10 ~
$ ssh root@192.168.12.105
root@192.168.12.105's password:
Last login: Fri Dec 23 13:03:44 2016 from 192.168.12.101
root@raspberrypi3:~#
```

#### Inspect `/proc/cpuinfo`

```
root@raspberrypi3:~# cat /proc/cpuinfo
processor       : 0
model name      : ARMv7 Processor rev 4 (v7l)
BogoMIPS        : 38.40
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm crc32
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 4

processor       : 1
model name      : ARMv7 Processor rev 4 (v7l)
BogoMIPS        : 38.40
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm crc32
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 4

processor       : 2
model name      : ARMv7 Processor rev 4 (v7l)
BogoMIPS        : 38.40
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm crc32
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 4

processor       : 3
model name      : ARMv7 Processor rev 4 (v7l)
BogoMIPS        : 38.40
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm crc32
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 4

Hardware        : BCM2709
Revision        : a02082
Serial          : 0000000053213f76
root@raspberrypi3:~#
```

#### Inspect `/proc/version`

```
root@raspberrypi3:~# cat /proc/version
Linux version 4.4.16 (go@cb359f7478a8) (gcc version 5.3.0 (GCC) ) #1 SMP Fri Dec 16 03:21:28 UTC 2016
root@raspberrypi3:~#
```

#### Inspect `/proc/meminfo`

```
root@raspberrypi3:~# cat /proc/meminfo
MemTotal:         881740 kB
MemFree:          495608 kB
MemAvailable:     611700 kB
Buffers:           10896 kB
Cached:           162816 kB
SwapCached:            0 kB
Active:            98592 kB
Inactive:         116452 kB
Active(anon):      42776 kB
Inactive(anon):    40228 kB
Active(file):      55816 kB
Inactive(file):    76224 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:             0 kB
SwapFree:              0 kB
Dirty:                 0 kB
Writeback:             0 kB
AnonPages:         41268 kB
Mapped:            57896 kB
Shmem:             41676 kB
Slab:              33808 kB
SReclaimable:       9060 kB
SUnreclaim:        24748 kB
KernelStack:        1232 kB
PageTables:         1184 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:      440868 kB
Committed_AS:     338756 kB
VmallocTotal:    1179648 kB
VmallocUsed:           0 kB
VmallocChunk:          0 kB
CmaTotal:         262144 kB
CmaFree:          133780 kB
root@raspberrypi3:~#
```

#### Inspect MicroSD card layout

Result of `lsbok`

```
root@raspberrypi3:~# lsblk
NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
mmcblk0     179:0    0 14.5G  0 disk
|-mmcblk0p1 179:1    0   40M  0 part
`-mmcblk0p2 179:2    0  1.1G  0 part /
root@raspberrypi3:~#
```

Result of `fdisk -l /dev/mmcblk0`

```
root@raspberrypi3:~# fdisk -l /dev/mmcblk0
Disk /dev/mmcblk0: 14.5 GiB, 15523119104 bytes, 30318592 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x51480b57

Device         Boot Start     End Sectors  Size Id Type
/dev/mmcblk0p1 *     8192   90111   81920   40M  c W95 FAT32 (LBA)
/dev/mmcblk0p2      90112 2441215 2351104  1.1G 83 Linux
root@raspberrypi3:~#
```

Result of `mount`

```
root@raspberrypi3:~# mount
/dev/mmcblk0p2 on / type ext4 (rw,relatime,data=ordered)
devtmpfs on /dev type devtmpfs (rw,relatime,size=309560k,nr_inodes=77390,mode=755)
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
proc on /proc type proc (rw,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)
devpts on /dev/pts type devpts (rw,relatime,gid=5,mode=620,ptmxmode=000)
tmpfs on /run type tmpfs (rw,nosuid,nodev,mode=755)
tmpfs on /sys/fs/cgroup type tmpfs (ro,nosuid,nodev,noexec,mode=755)
cgroup on /sys/fs/cgroup/systemd type cgroup (rw,nosuid,nodev,noexec,relatime,xattr,release_agent=/lib/systemd/systemd-cgroups-agent,name=systemd)
cgroup on /sys/fs/cgroup/cpu,cpuacct type cgroup (rw,nosuid,nodev,noexec,relatime,cpu,cpuacct)
cgroup on /sys/fs/cgroup/memory type cgroup (rw,nosuid,nodev,noexec,relatime,memory)
cgroup on /sys/fs/cgroup/blkio type cgroup (rw,nosuid,nodev,noexec,relatime,blkio)
cgroup on /sys/fs/cgroup/devices type cgroup (rw,nosuid,nodev,noexec,relatime,devices)
cgroup on /sys/fs/cgroup/net_cls type cgroup (rw,nosuid,nodev,noexec,relatime,net_cls)
cgroup on /sys/fs/cgroup/freezer type cgroup (rw,nosuid,nodev,noexec,relatime,freezer)
mqueue on /dev/mqueue type mqueue (rw,relatime)
tmpfs on /tmp type tmpfs (rw)
debugfs on /sys/kernel/debug type debugfs (rw,relatime)
configfs on /sys/kernel/config type configfs (rw,relatime)
fusectl on /sys/fs/fuse/connections type fusectl (rw,relatime)
tmpfs on /var/volatile type tmpfs (rw,relatime)
tmpfs on /run/user/0 type tmpfs (rw,nosuid,nodev,relatime,size=88176k,mode=700)
root@raspberrypi3:~#
```

**SUMMARY**: The GDP-11 image creates two partitions on the SD-Card:

| Device         | Size | Type         | Notes  |
|----------------|------|--------------|--------|
| /dev/mmcblk0p1 | 40M  | W95 FAT32    | bootcode.bin, kernel, DTB, etc. |
| /dev/mmcblk0p2 | 1.1G | Linux (ext4) | rootfs |

#### Inspect `df -h`

```
root@raspberrypi3:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       1.1G  872M  116M  89% /
devtmpfs        303M     0  303M   0% /dev
tmpfs           431M  1.5M  430M   1% /dev/shm
tmpfs           431M   40M  392M  10% /run
tmpfs           431M     0  431M   0% /sys/fs/cgroup
tmpfs           431M     0  431M   0% /tmp
tmpfs           431M  8.0K  431M   1% /var/volatile
tmpfs            87M   72K   87M   1% /run/user/0
root@raspberrypi3:~#
```

#### Inspect DOS partition on MicroSD

```
root@raspberrypi3:~# mkdir /tmp/boot
root@raspberrypi3:~# mount -o ro /dev/mmcblk0p1 /tmp/boot
root@raspberrypi3:~# ls -la /tmp/boot
total 21582
drwxr-xr-x  4 root root   16384 Jan  1  1970 .
drwxrwxrwt 10 root root     240 Dec 23 13:32 ..
drwxr-xr-x  2 root root    2048 Dec 23 11:37 'System Volume Information'
-rwxr-xr-x  1 root root   14024 Dec 16 05:50 bcm2708-rpi-b-plus.dtb
-rwxr-xr-x  1 root root   13761 Dec 16 05:50 bcm2708-rpi-b.dtb
-rwxr-xr-x  1 root root   15107 Dec 16 05:50 bcm2709-rpi-2-b.dtb
-rwxr-xr-x  1 root root   15777 Dec 16 05:50 bcm2710-rpi-3-b.dtb
-rwxr-xr-x  1 root root       0 Dec 16 05:50 bcm2835-bootfiles-20160622.stamp
-rwxr-xr-x  1 root root   17932 Dec 16 05:50 bootcode.bin
-rwxr-xr-x  1 root root     115 Dec 16 05:50 cmdline.txt
-rwxr-xr-x  1 root root   36312 Dec 16 05:50 config.txt
-rwxr-xr-x  1 root root    6482 Dec 16 05:50 fixup.dat
-rwxr-xr-x  1 root root    2504 Dec 16 05:50 fixup_cd.dat
-rwxr-xr-x  1 root root    9717 Dec 16 05:50 fixup_db.dat
-rwxr-xr-x  1 root root    9717 Dec 16 05:50 fixup_x.dat
-rwxr-xr-x  1 root root      49 Dec 16 05:50 image-version-info
-rwxr-xr-x  1 root root 9752576 Dec 16 05:50 kernel7.img
drwxr-xr-x  2 root root    2048 Dec 16 05:50 overlays
-rwxr-xr-x  1 root root 2746552 Dec 16 05:50 start.elf
-rwxr-xr-x  1 root root  617432 Dec 16 05:50 start_cd.elf
-rwxr-xr-x  1 root root 4926264 Dec 16 05:50 start_db.elf
-rwxr-xr-x  1 root root 3877720 Dec 16 05:50 start_x.elf
root@raspberrypi3:~# umount /tmp/boot
root@raspberrypi3:~#
```

#### Inspect installed version of Qt

```
root@raspberrypi3:~# rpm -qa | grep qt | sort
kernel-module-qt1010-4.4.16+git0+26550dcfb8-r0.raspberrypi3
libqt5declarative-plugins-5.6.0+git0+563ce3888f-r0.cortexa7hf_neon_vfpv4
libqt5declarative-qmlplugins-5.6.0+git0+563ce3888f-r0.cortexa7hf_neon_vfpv4
libqt5declarative5-5.6.0+git0+563ce3888f-r0.cortexa7hf_neon_vfpv4
libqt5sensors-plugins-5.6.0+git0+0b00ee6f6c-r0.cortexa7hf_neon_vfpv4
libqt5sensors-qmlplugins-5.6.0+git0+0b00ee6f6c-r0.cortexa7hf_neon_vfpv4
libqt5sensors5-5.6.0+git0+0b00ee6f6c-r0.cortexa7hf_neon_vfpv4
libqt5svg-plugins-5.6.0+git0+e02df9c098-r0.cortexa7hf_neon_vfpv4
libqt5svg5-5.6.0+git0+e02df9c098-r0.cortexa7hf_neon_vfpv4
libqt5xmlpatterns5-5.6.0+git0+5e6acdb2ea-r0.cortexa7hf_neon_vfpv4
packagegroup-gdp-qt5-1.0-r0.all
python-pyqt-5.3.1-r1.cortexa7hf_neon_vfpv4
qtbase-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-dev-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-fonts-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-fonts-pfa-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-fonts-pfb-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-fonts-qpf-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-fonts-ttf-dejavu-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-fonts-ttf-vera-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-mkspecs-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtbase-plugins-5.6.0+git0+cec15a89d0-r0.cortexa7hf_neon_vfpv4
qtdeclarative-5.6.0+git0+26ff8f9029-r0.cortexa7hf_neon_vfpv4
qtdeclarative-plugins-5.6.0+git0+26ff8f9029-r0.cortexa7hf_neon_vfpv4
qtdeclarative-qmlplugins-5.6.0+git0+26ff8f9029-r0.cortexa7hf_neon_vfpv4
qtgraphicaleffects-qmlplugins-5.6.0+git0+6523d7c484-r0.cortexa7hf_neon_vfpv4
qtlocation-5.6.0+git0+d1f66746ab-r0.cortexa7hf_neon_vfpv4
qtlocation-plugins-5.6.0+git0+d1f66746ab-r0.cortexa7hf_neon_vfpv4
qtlocation-qmlplugins-5.6.0+git0+d1f66746ab-r0.cortexa7hf_neon_vfpv4
qtquickcontrols-qmlplugins-5.6.0+git0+01e52200e2-r0.cortexa7hf_neon_vfpv4
qtscript-5.6.0+git0+b16873afea-r0.cortexa7hf_neon_vfpv4
qtwayland-5.6.0+git0+26e27845a4-r0.cortexa7hf_neon_vfpv4
qtwayland-plugins-5.6.0+git0+26e27845a4-r0.cortexa7hf_neon_vfpv4
qtwebkit-5.6.0+git0+71136c9621-r0.cortexa7hf_neon_vfpv4
qtwebkit-qmlplugins-5.6.0+git0+71136c9621-r0.cortexa7hf_neon_vfpv4
root@raspberrypi3:~#
```

### See also

* [GENIVI Development Platform](https://at.projects.genivi.org/wiki/x/aoCw)
* [Raspberry Pi 2 and 3 setup and software installation](https://at.projects.genivi.org/wiki/x/fomw)

<!-- EOF -->

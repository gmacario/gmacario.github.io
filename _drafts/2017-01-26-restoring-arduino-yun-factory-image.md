---
layout: post
title:  "Restoring Arduino Yun factory image"
date:   2017-01-26 18:00:00 CET
# categories: arduino yun day fablab torino
---

### The problem

After a few months of uninterrupted service, my [Arduino Yun](https://www.arduino.cc/en/Main/ArduinoBoardYun) reboots every couple of minutes.

Debugging by connecting the Arduino Yun to my laptop via USB cable.

Run a terminal emulator (i.e. PuTTY) COMx:57600,8,n,1

Login as `root`

```
root@ardyungm33:/# mount
rootfs on / type rootfs (rw)
/dev/root on /rom type squashfs (ro,relatime)
proc on /proc type proc (rw,noatime)
sysfs on /sys type sysfs (rw,noatime)
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noatime,size=30560k)
tmpfs on /dev type tmpfs (rw,noatime,size=512k,mode=755)
devpts on /dev/pts type devpts (rw,noatime,mode=600)
/dev/mtdblock3 on /overlay type jffs2 (rw,noatime)
overlayfs:/overlay on / type overlayfs (rw,relatime,lowerdir=/,upperdir=/overlay)
debugfs on /sys/kernel/debug type debugfs (rw,relatime)
root@ardyungm33:/#
```

`/dev/mtd3` is the raw image of overlay

```
root@ardyungm33:/# cat /proc/mtd
dev:    size   erasesize  name
mtd0: 00040000 00010000 "u-boot"
mtd1: 00010000 00010000 "u-boot-env"
mtd2: 00e50000 00010000 "rootfs"
mtd3: 006f0000 00010000 "rootfs_data"
mtd4: 00140000 00010000 "kernel"
mtd5: 00010000 00010000 "nvram"
mtd6: 00010000 00010000 "art"
mtd7: 00f90000 00010000 "firmware"
root@ardyungm33:/#
```

After less than one minute from boot the board will restart - most likely because r/w overlay at `/dev/mtd3block` (rootfs_data) is corrupted.

```
root@ardyungm33:/#
root@ardyungm33:/# ping Jan 14 05:24:35 tinc.ninuxto[1107]: Got TERM signal
Jan 14 05:24:35 tinc.ninuxto[1107]: Terminating
10[  129.650000] Removing MTD device #3 (rootfs_data) with use count 1
[  129.670000] Res▒

U-Boot 1.1.4-dirty (Apr 10 2014 - 15:12:15)

Arduino Yun (ar9331) U-boot
...
```

Notice the error message `  129.650000] Removing MTD device #3 (rootfs_data) with use count 1`

### Try Failsafe mode

Just after the Yun reboots, press `ENTER` to stop at U-boot prompt.

```
root@ardyungm33:/#
root@ardyungm33:/# ping Jan 14 05:24:35 tinc.ninuxto[1107]: Got TERM signal
Jan 14 05:24:35 tinc.ninuxto[1107]: Terminating
10[  129.650000] Removing MTD device #3 (rootfs_data) with use count 1
[  129.670000] Res▒

U-Boot 1.1.4-dirty (Apr 10 2014 - 15:12:15)

Arduino Yun (ar9331) U-boot

DRAM:  64 MB
Top of RAM usable for U-Boot at: 84000000
Reserving 142k for U-Boot at: 83fdc000
Reserving 192k for malloc() at: 83fac000
Reserving 44 Bytes for Board Info at: 83fabfd4
Reserving 36 Bytes for Global Data at: 83fabfb0
Reserving 128k for boot params() at: 83f8bfb0
Stack Pointer at: 83f8bf98
Now running in RAM - U-Boot at: 83fdc000
Flash Manuf Id 0xef, DeviceId0 0x40, DeviceId1 0x18
flash size 16777216, sector count = 256
Flash: 16 MB
Using default environment

In:    serial
Out:   serial
Err:   serial
Net:   ag7240_enet_initialize...
No valid address in Flash. Using fixed address
No valid address in Flash. Using fixed address
: cfg1 0x5 cfg2 0x7114
eth0: 00:03:7f:09:0b:ad
eth0 up
: cfg1 0xf cfg2 0x7214
eth1: 00:03:7f:09:0b:ad
athrs26_reg_init_lan
ATHRS26: resetting s26
ATHRS26: s26 reset done
eth1 up
eth0, eth1
Hit any key to stop autoboot:  0
ar7240>
```

Type `boot` to boot Linux, then press `F` to enter failsafe mode

```
ar7240>
ar7240> boot
## Booting image at 9fea0000 ...
   Image Name:   MIPS OpenWrt Linux-3.3.8
   Created:      2014-11-14   8:00:46 UTC
   Image Type:   MIPS Linux Kernel Image (lzma compressed)
   Data Size:    1185448 Bytes =  1.1 MB
   Load Address: 80060000
   Entry Point:  80060000
   Verifying Checksum at 0x9fea0040 ...OK
   Uncompressing Kernel Image ...
...
[    4.240000] scsi0 : usb-storage 1-1.4:1.0
[    5.020000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[    5.240000] scsi 0:0:0:0: Direct-Access     Multi    Flash Reader     1.00 PQ: 0 ANSI: 0
- preinit -
Press the [f] key and hit [enter] to enter failsafe mode
f
- failsafe -
/etc/preinit: line 1: telnetd: not found


BusyBox v1.19.4 (2014-11-13 19:03:47 CET) built-in shell (ash)
Enter 'help' for a list of built-in commands.

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
-----------------------------------------------------


root@(none):/#
```

Inspect MTD partitions

```
root@(none):/# cat /proc/mtd
dev:    size   erasesize  name
mtd0: 00040000 00010000 "u-boot"
mtd1: 00010000 00010000 "u-boot-env"
mtd2: 00e50000 00010000 "rootfs"
mtd3: 006f0000 00010000 "rootfs_data"
mtd4: 00140000 00010000 "kernel"
mtd5: 00010000 00010000 "nvram"
mtd6: 00010000 00010000 "art"
mtd7: 00f90000 00010000 "firmware"
root@(none):/#
```

Inspect mounted filesystems

```
root@(none):/# mount
rootfs on / type rootfs (rw)
/dev/root on / type squashfs (ro,relatime)
proc on /proc type proc (rw,noatime)
sysfs on /sys type sysfs (rw,noatime)
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noatime,size=30560k)
tmpfs on /dev type tmpfs (rw,noatime,size=512k,mode=755)
devpts on /dev/pts type devpts (rw,noatime,mode=600)
root@(none):/#
```

OK, overlayfs was not mounted.

### Try zeroing `/dev/mtd3`

<!-- 2017-01-26 19:03 CET -->

We are then safe to erase `/dev/mtd3`


```
root@(none):/# dd if=/dev/zero of=/dev/mtd3
root@(none):/#
```

Now exit and cycle power (must disconnect and reconnect USB cable)

```
root@(none):/# exit
Please reboot system when done with failsafe network logins
```

### Retry boot after zeroing `/dev/mtd3`

```
...
[    4.240000] scsi0 : usb-storage 1-1.4:1.0
[    5.030000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[    5.240000] scsi 0:0:0:0: Direct-Access     Multi    Flash Reader     1.00 PQ: 0 ANSI: 0
- preinit -
Press the [f] key and hit [enter] to enter failsafe mode
- regular preinit -
[   13.200000] Cowardly refusing to erase blocks on filesystem with no valid JFFS2 nodes
[   13.200000] empty_blocks 0, bad_blocks 0, c->nr_blocks 111
[   14.380000] sd 0:0:0:0: [sda] Attached SCSI removable disk
switching to jffs2
- init -
[   41.710000] Loading modules backported from Linux version master-2014-05-22-0-gf2032ea
...
```

TODO: Not sure whether zeroing `/dev/mtd3` is enough - need to look inside factory image (to be loaded via TFTP)

Notice that failsafe mode still works, though.

TODO: Understand how to properly format a JFFS2 partitions.

TODO: Read <http://free-electrons.com/blog/managing-flash-storage-with-linux/>

```
[    4.240000] scsi0 : usb-storage 1-1.4:1.0
[    5.030000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[    5.240000] scsi 0:0:0:0: Direct-Access     Multi    Flash Reader     1.00 PQ: 0 ANSI: 0
- preinit -
Press the [f] key and hit [enter] to enter failsafe mode
- regular preinit -
[   13.210000] Cowardly refusing to erase blocks on filesystem with no valid JFFS2 nodes
[   13.210000] empty_blocks 0, bad_blocks 0, c->nr_blocks 111
[   14.390000] sd 0:0:0:0: [sda] Attached SCSI removable disk
```

### Reflash the OpenWrt-Yun image on the Yun

<!-- 2017-01-27 13:00 CET -->

Follow instructions at <https://www.arduino.cc/en/Tutorial/YunUBootReflash>

This procedure uses U-Boot to load kernel and openwrt-rootfs via TFTP

Download the [base images](http://arduino.cc/download_handler.php?f=/openwrtyun/1/YunImage_v1.5.3.zip) zip file.

Setup a TFTP server on kruk (Ubuntu 16.04 LTS)

Logged as user@kruk

```
sudo apt update
sudo apt install tftpd-hpa
```

When asked for the directory to use as root for the TFTP server, leave the default value `/var/lib/tftpboot`.

Unzip `~/Downloads/YunImage_v1.5.3.zip` into folder `/var/lib/tftpboot`:

```
cd /var/lib/tftpboot
sudo unzip ~/Downloads/YunImage_v1.5.3.zip
```

Power up the Yun and type a key to stop at the U-Boot prompt.

At the U-Boot prompt

```
setenv serverip 192.168.12.20;
setenv ipaddr 192.168.12.201;
```

#### Reflashing Kernel

<!-- 2017-01-27 12:24 CET -->

Download the file via FTP

```
tftp 0x80060000 openwrt-ar71xx-generic-yun-16M-kernel.bin;
```

Erase partition and copy the downloaded image

```
erase 0x9fEa0000 +0x140000;
cp.b $fileaddr 0x9fea0000 $filesize;
```

Result:

```
ar7240> setenv serverip 192.168.12.20;
ar7240> setenv ipaddr 192.168.12.201;
ar7240> tftp 0x80060000 openwrt-ar71xx-generic-yun-16M-kernel.bin;
dup 1 speed 100
Using eth0 device
TFTP from server 192.168.12.20; our IP address is 192.168.12.201
Filename 'openwrt-ar71xx-generic-yun-16M-kernel.bin'.
Load address: 0x80060000
Loading: #################################################################
         #################################################################
         #################################################################
         #################################################
done
Bytes transferred = 1245184 (130000 hex)
ar7240> erase 0x9fEa0000 +0x140000;
Erase Flash from 0x9fea0000 to 0x9ffdffff in Bank # 1
First 0xea last 0xfd sector size 0x10000                                     253
Erased 20 sectors
ar7240> cp.b $fileaddr 0x9fea0000 $filesize;
Copy to Flash... write addr: 9fea0000
done
ar7240>
```

#### Reflashing OpenWrt-Yun

<!-- 2017-01-27 12:31 CET -->

Download the file via FTP

```
tftp 0x80060000 openwrt-ar71xx-generic-yun-16M-rootfs-squashfs.bin;
```

Erase partition and copy the downloaded image

```
erase 0x9f050000 +0xE50000;
cp.b $fileaddr 0x9f050000 $filesize;
```
Result:

```
ar7240> tftp 0x80060000 openwrt-ar71xx-generic-yun-16M-rootfs-squashfs.bin;
Using eth0 device
TFTP from server 192.168.12.20; our IP address is 192.168.12.201
Filename 'openwrt-ar71xx-generic-yun-16M-rootfs-squashfs.bin'.
Load address: 0x80060000
Loading: #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         ##########################################
done
Bytes transferred = 7864320 (780000 hex)
ar7240> erase 0x9f050000 +0xE50000;
Erase Flash from 0x9f050000 to 0x9fe9ffff in Bank # 1
First 0x5 last 0xe9 sector size 0x10000                                      233
Erased 229 sectors
ar7240>  cp.b $fileaddr 0x9f050000 $filesize;
Copy to Flash... write addr: 9f050000
done
ar7240>
```

#### Rebooting

<!-- 2017-01-27 12:34 CET -->

```
bootm 0x9fea0000
```

Press "Enter" for console login

Result:

```
...
[   40.550000] Linux video capture interface: v2.00
[   40.670000] fuse init (API version 7.18)
[   47.910000] eth1: link up (100Mbps/Full duplex)



BusyBox v1.19.4 (2014-11-13 19:03:47 CET) built-in shell (ash)
Enter 'help' for a list of built-in commands.

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------


root@Arduino:/#
```

Inspect filesystem usage after factory reflash

```
root@Arduino:/# df -h
Filesystem                Size      Used Available Use% Mounted on
rootfs                    6.9M    356.0K      6.6M   5% /
/dev/root                 7.5M      7.5M         0 100% /rom
tmpfs                    29.8M    100.0K     29.7M   0% /tmp
tmpfs                   512.0K         0    512.0K   0% /dev
/dev/mtdblock3            6.9M    356.0K      6.6M   5% /overlay
overlayfs:/overlay        6.9M    356.0K      6.6M   5% /
root@Arduino:/#
```

Check `/proc/cmdline`

```
root@Arduino:/# cat /proc/cmdline
 board=Yun console=ttyATH0,250000 mtdparts=spi0.0:256k(u-boot)ro,64k(u-boot-env)ro,14656k(rootfs),1280k(kernel),64k(nvram),64k(art),15936k@0x50000(firmware) rootfstype=squashfs,jffs2 noinitrd
root@Arduino:/#
```

Check installed openwrt-yun-release

```
root@Arduino:~# cat /etc/arduino/openwrt-yun-release
built=Fri Nov 14 03:53:51 CET 2014
root@Arduino:~#
```

TODO TODO TODO

<!-- EOF -->

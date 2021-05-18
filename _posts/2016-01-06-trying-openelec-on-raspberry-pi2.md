---
layout: post
title:  "Trying OpenELEC on Raspberry Pi2"
date:   2016-01-06 18:00:00 CET
tags:   howto openelec kodi raspberry-pi2
---
<-- markdown-link-check-disable -->
This blog post explains my experiences running [OpenELEC](http://openelec.tv/) on my brand new [Raspberry Pi2](http://www.canakit.com/raspberry-pi-starter-ultimate-kit.html).
OpenELEC (Open Embedded Linux Entertainment Center) is an embedded Linux distribution specialized to implement a Media center based on [Kodi](http://kodi.tv/).
The configuration is straightforward: plug the microSD card supplied with the RPI2 Canary Ultimate kit, then power up the RPI2 and select "OpenELEC for raspberry-pi2".
Post-install configuration
* I changed the default language to Italian by doing Settings > Language
* I followed the instructions on [this blog post](http://www.htpcbeginner.com/fix-openelec-incorrect-time-raspberry-pi/) to correctly set the local time displayed at the top right on the screen
* I then configured Kodi to scan videos on my home NAS (`smb://gianpinas2.solarma.it/videos`)
* I also configured Kodi to access pictures on my home NAS (`smb://gianpinas2.solarma.it/fam_macario/photos_macario`)
For the curious, you may remotely connect to your RPI2 via SSH
(you may know the actual IP address of your device by checking "Sistema > Info sistema")
```
$ ssh root@192.168.64.104
```
The default password is `openelec`
Here is the result on my RPI2:
```
$ ssh root@192.168.64.104
root@192.168.64.104's password:
##############################################
# OpenELEC - The living room PC for everyone #
# ...... visit http://www.openelec.tv ...... #
##############################################
OpenELEC (official) Version: 5.0.8
rpi2-openelec:~ # cat /proc/version
Linux version 3.18.10 (stephan@buildserver.openelec.tv) (gcc version 4.9.2 (GCC) ) #1 SMP Tue Mar 31 14:50:33 CEST 2015
rpi2-openelec:~ # cat /proc/cpuinfo
processor       : 0
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 38.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5
processor       : 1
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 38.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5
processor       : 2
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 38.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5
processor       : 3
model name      : ARMv7 Processor rev 5 (v7l)
BogoMIPS        : 38.00
Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5
Hardware        : BCM2709
Revision        : a01041
Serial          : 00000000d458a2c0
rpi2-openelec:~ # df -h
Filesystem                Size      Used Available Use% Mounted on
devtmpfs                363.3M         0    363.3M   0% /dev
/dev/mmcblk0p5          159.8M    105.3M     54.5M  66% /flash
/dev/mmcblk0p6            6.1G    146.4M      5.6G   2% /storage
/dev/loop0               94.4M     94.4M         0 100% /
tmpfs                   368.3M         0    368.3M   0% /dev/shm
tmpfs                   368.3M      5.1M    363.2M   1% /run
tmpfs                   368.3M         0    368.3M   0% /sys/fs/cgroup
tmpfs                   368.3M    224.0K    368.1M   0% /var
tmpfs                   368.3M      4.0K    368.3M   0% /tmp
/dev/mmcblk0p1          818.2M    744.6M     73.6M  91% /var/media/RECOVERY
/dev/mmcblk0p3           27.0M      1.2M     23.5M   5% /var/media/SETTINGS
rpi2-openelec:~ #
```
That's all for the moment...
<-- markdown-link-check-enable-->
<-- EOF -->

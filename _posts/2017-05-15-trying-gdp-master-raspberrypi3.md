---
layout: post
title:  "Trying GDP master on a Raspberry Pi 3"
date:   2017-05-15 15:15:00 CEST
# categories: template android howto development
---
<-- markdown-link-check-disable -->
This blog post illustrates some tests I made running the [GENIVI Development Platform](https://at.projects.genivi.org/wiki/pages/viewpage.action?pageId=11567210) on a [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/).
### Build the GDP image from sources
Built the image using the folllowing configuration:
* HW: HP xw8600 workstation (mv-linux-powerhorse)
* OS: [Ubuntu Server](https://www.ubuntu.com/download/server) 16.04.2 LTS 64-bit
* [Docker](https://www.docker.com/) version 17.05.0-ce, build 89658be
* [docker-compose](https://docs.docker.com/compose/) version 1.7.1, build 0a9ab35
* [easy-jenkins](https://github.com/gmacario/easy-jenkins) master (commit 646daad6529074618308cb36e14be05b128c86d3)
* [my-genivi-pipelines](https://github.com/gmacario/my-genivi-pipelines) (commit b40b883f02695dc2962add20363e0038064e90ee)
Build artifacts: <http://mv-linux-powerhorse.solarma.it:9080/blue/organizations/jenkins/gmacario%2Fmy-genivi-pipelines/detail/build-gdp-master-raspberrypi3/15/artifacts>
### Prepare the microSD card
Download file `gdp-src-build/tmp/deploy/images/raspberrypi3/genivi-dev-platform-raspberrypi3-20170510130900.rootfs.rpi-sdimg` (1.2 GB)
Run [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) to write the image to a SanDisk 8 GiB microSDHC.
### Run GDP on the RPi3
Run PuTTY (COM7:115200,8,n,1) to log RPi3 serial console messages
Logfile: `Dropbox/logs/20170515-1526-gdpmaster-rpi3.txt`
Power up RPi3, wait until a login prompt appears at the serial console:
```
Yocto GENIVI Baseline (Poky/meta-ivi) 12.0.0 raspberrypi3 ttyS0
raspberrypi3 login:
```
Login as `root` (default password: `root`)
Inspect partitions
```
root@raspberrypi3:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       1.1G  807M  178M  82% /
devtmpfs        303M     0  303M   0% /dev
tmpfs           431M  172K  431M   1% /dev/shm
tmpfs           431M  9.4M  422M   3% /run
tmpfs           431M     0  431M   0% /sys/fs/cgroup
tmpfs           431M  112K  431M   1% /tmp
tmpfs           431M  8.0K  431M   1% /var/volatile
tmpfs            87M  4.0K   87M   1% /run/user/0
root@raspberrypi3:~#
```
Inspect boot commandline
```
root@raspberrypi3:~# cat /proc/cmdline
8250.nr_uarts=1 cma=256M@256M bcm2708_fb.fbwidth=720 bcm2708_fb.fbheight=480 bcm2708_fb.fbswap=1 dma.dmachans=0x7f35 bcm2709.boardrev=0xa02082 bcm2709.serial=0x53213f76 bcm2709.uart_clock=48000000 smsc95xx.macaddr=B8:27:EB:21:3F:76 vc_mem.mem_base=0x3dc00000 vc_mem.mem_size=0x3f000000  dwc_otg.lpm_enable=0 console=ttyS0,115200 root=/dev/mmcblk0p2 rootfstype=ext4 rootwait   usbhid.mousepoll=0
root@raspberrypi3:~#
```
Inspect kernel version
```
root@raspberrypi3:~# cat /proc/version
Linux version 4.4.50 (jenkins@c7f0d99588be) (gcc version 6.2.0 (GCC) ) #1 SMP Wed May 10 11:11:37 UTC 2017
root@raspberrypi3:~#
```
<-- markdown-link-check-enable-->
<-- EOF -->

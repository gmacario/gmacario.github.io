---
layout: post
title:  "Inspecting Android 4.0.x on a Freescale Sabre SD"
date:   2015-05-26 11:45:00
categories: android howto development debugging
---
<-- markdown-link-check-disable -->
Booting SABRE SD with stock "MX6Q-SDB Android r13.4.1" SD-Card inserted in slot SD3 (J507)
Start PuTTY: COM13:115200,8,n,1
PuTTY Reconfiguration: Logging All session output to file `20150604-1148-android40x-sabresd.txt`
Power up and press "ENTER" to get the U-Boot prompt.
#### Verify U-Boot delivered with stock Android 4.0.4 (2009.08)
```
U-Boot 2009.08 (Apr 10 2013 - 18:58:57)
CPU: Freescale i.MX6 family TO1.2 at 792 MHz
Temperature:   37 C, calibration data 0x5984fb7d
mx6q pll1: 792MHz
mx6q pll2: 528MHz
mx6q pll3: 480MHz
mx6q pll8: 50MHz
ipg clock     : 66000000Hz
ipg per clock : 66000000Hz
uart clock    : 80000000Hz
cspi clock    : 60000000Hz
ahb clock     : 132000000Hz
axi clock   : 264000000Hz
emi_slow clock: 29333333Hz
ddr clock     : 528000000Hz
usdhc1 clock  : 198000000Hz
usdhc2 clock  : 198000000Hz
usdhc3 clock  : 198000000Hz
usdhc4 clock  : 198000000Hz
nfc clock     : 24000000Hz
Board: i.MX6Q-SABRESD: unknown-board Board: 0x63012 [POR ]
Boot Device: SD
I2C:   ready
DRAM:   1 GB
MMC:   FSL_USDHC: 0,FSL_USDHC: 1,FSL_USDHC: 2,FSL_USDHC: 3
In:    serial
Out:   serial
Err:   serial
i2c: I2C3 SDA is low, start i2c recovery...
I2C3 Recovery success
Found PFUZE100 deviceid=10,revid=11
Net:   got MAC address from IIM: 00:04:9f:02:b0:36
FEC0 [PRIME]
Hit any key to stop autoboot:  0
MX6Q SABRESD U-Boot >
```
Print U-Boot environment variables
```
MX6Q SABRESD U-Boot > printenv
bootdelay=3
baudrate=115200
ipaddr=192.168.1.103
serverip=192.168.1.101
netmask=255.255.255.0
loadaddr=0x10800000
rd_loadaddr=0x11000000
netdev=eth0
ethprime=FEC0
fastboot_dev=mmc3
splashimage=0x30000000
splashpos=m,m
lvds_num=1
ethact=FEC0
bootcmd=booti mmc2
bootargs=console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M
stdin=serial
stdout=serial
stderr=serial
Environment size: 465/8188 bytes
MX6Q SABRESD U-Boot >
```
List MMC devices
```
MX6Q SABRESD U-Boot > mmc list
FSL_USDHC: 0
FSL_USDHC: 1
FSL_USDHC: 2
FSL_USDHC: 3
MX6Q SABRESD U-Boot >
```
Change default MMC device
```
MX6Q SABRESD U-Boot > mmc dev 2
mmc2 is current device
MX6Q SABRESD U-Boot >
```
Inspect partitions of default MMC device (mmc2)
```
MX6Q SABRESD U-Boot > mmc part
Partition Map for UNKNOWN device 2  --   Partition Type: DOS
Partition     Start Sector     Num Sectors     Type
    1                16384           16384      83
    2                32768           16384      83
    3                49152         5881856       5 Extd
    4              5931008         9568256       b
    5                49153         1048575      83
    6              1097729          524287      83
    7              1622017         4194303      83
    8              5816321           16383      83
    9              5832705           16383      83
MX6Q SABRESD U-Boot >
```
MMC2 partition 1 is actually raw
```
MX6Q SABRESD U-Boot >  ext2ls mmc 2:1 /
Failed to mount ext2 filesystem...
** Bad ext2 partition or disk - mmc 2:1 **
MX6Q SABRESD U-Boot >
```
MMC2 partition 2 is actually raw
```
MX6Q SABRESD U-Boot >  ext2ls mmc 2:2 /
Failed to mount ext2 filesystem...
** Bad ext2 partition or disk - mmc 2:2 **
MX6Q SABRESD U-Boot >
```
MMC2 partition 3 is the extended partition for logical partitions 5-9
MMC partition 4 is a DOS partition containing user data
```
MX6Q SABRESD U-Boot >  fatls mmc 2:4 /
            lost.dir/
            .android_secure/
            music/
            podcasts/
            ringtones/
            alarms/
            notifications/
            pictures/
            movies/
            download/
            dcim/
            android/
0 file(s), 12 dir(s)
MX6Q SABRESD U-Boot >
```
Cannot inspect MMC2 partition 5: U-Boot command `ext2ls mmc 2:5 /` hangs
Inspecting MMC2 partition 6
```
MX6Q SABRESD U-Boot >  ext2ls mmc 2:6 /
<DIR>       1024 .
<DIR>       1024 ..
<DIR>      12288 lost+found
MX6Q SABRESD U-Boot >
```
Inspecting MMC2 partition 7
```
MX6Q SABRESD U-Boot >  ext2ls mmc 2:7 /
<DIR>       4096 .
<DIR>       4096 ..
<DIR>      16384 lost+found
<DIR>       4096 dontpanic
<DIR>       4096 misc
<DIR>       4096 local
<DIR>       4096 data
<DIR>       4096 app-private
<DIR>       4096 app
<DIR>       4096 property
<DIR>       4096 system
<DIR>       4096 dalvik-cache
<DIR>       4096 resource-cache
<DIR>       4096 drm
<DIR>       4096 user
<DIR>       4096 backup
MX6Q SABRESD U-Boot >
```
Inspecting MMC2 partition 8
```
MX6Q SABRESD U-Boot >  ext2ls mmc 2:8 /
<DIR>       1024 .
<DIR>       1024 ..
<DIR>      12288 lost+found
<DIR>       1024 wifi
MX6Q SABRESD U-Boot >
```
Inspecting MMC2 partition 9 ==> no data
```
MX6Q SABRESD U-Boot >  ext2ls mmc 2:9 /
Failed to mount ext2 filesystem...
** Bad ext2 partition or disk - mmc 2:9 **
MX6Q SABRESD U-Boot >
```
### Boot Android
Reset to have Android 4.0.2 boot, then access the serial console
```
...
imx-ipuv3 imx-ipuv3.1: IPU DMFC NORMAL mode: 1(0~1), 5B(4,5), 5F(6,7)
mxc_mipi_csi2 mxc_mipi_csi2: i.MX MIPI CSI2 driver probed
mxc_mipi_csi2 mxc_mipi_csi2: i.MX MIPI CSI2 dphy version is 0x3130302a
MIPI CSI2 driver module loaded
Advanced Linux Sound Architecture Driver Version 1.0.24.
Bluetooth: Core ver 2.16
NET: Registered protocol family 31
Bluetooth: HCI device and connection manager initialized
Bluetooth: HCI socket layer initialized
Bluetooth: L2CAP socket layer initialized
Bluetooth: SCO socket layer initialized
max17135 2-0048: PMIC MAX17135 for eInk display
i2c-core: driver [max17135] using legacy suspend method
i2c-core: driver [max17135] using legacy resume method
Switching to clocksource mxc_timer1
NET: Registered protocol family 2
IP route cache hash table entries: 16384 (order: 4, 65536 bytes)
TCP established hash table entries: 65536 (order: 7, 524288 bytes)
TCP bind hash table entries: 65536 (order: 7, 786432 bytes)
TCP: Hash tables configured (established 65536 bind 65536)
TCP reno registered
UDP hash table entries: 256 (order: 1, 8192 bytes)
UDP-Lite hash table entries: 256 (order: 1, 8192 bytes)
NET: Registered protocol family 1
RPC: Registered named UNIX socket transport module.
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Unpacking initramfs...
Freeing initrd memory: 160K
PMU: registered new PMU device of type 0
Static Power Management for Freescale i.MX6
wait mode is enabled for i.MX6
cpaddr = d9880000 suspend_iram_base=d991c000
PM driver module loaded
IMX usb wakeup probe
i.MXC CPU frequency driver
highmem bounce pool size: 64 pages
ashmem: initialized
JFFS2 version 2.2. (NAND) Â© 2001-2006 Red Hat, Inc.
msgmni has been set to 764
io scheduler noop registered
io scheduler deadline registered
io scheduler cfq registered (default)
mxc_mipi_dsi mxc_mipi_dsi: i.MX MIPI DSI driver probed
MIPI DSI driver module loaded
mxc_sdc_fb mxc_sdc_fb.0: register mxc display driver hdmi
mxc_hdmi mxc_hdmi: Detected HDMI controller 0x13:0xa:0xa0:0xc1
fbcvt: 1920x1080@60: CVT Name - 2.073M9
imx-ipuv3 imx-ipuv3.1: IPU DMFC DP HIGH RESOLUTION: 1(0,1), 5B(2~5), 5F(6,7)
mxc_sdc_fb mxc_sdc_fb.1: Can't get fb option for mxcfb1
mxc_sdc_fb mxc_sdc_fb.2: Can't get fb option for mxcfb2
imx-sdma imx-sdma: loaded firmware 1.1
imx-sdma imx-sdma: initialized
fbcvt: 1920x1080@60: CVT Name - 2.073M9
Serial: IMX driver
imx-uart.2: ttymxc2 at MMIO 0x21ec000 (irq = 60) is a IMX
imx-uart.0: ttymxc0 at MMIO 0x2020000 (irq = 58) is a IMX
console [ttymxc0] enabled, bootconsole disabled
console [ttymxc0] enabled, bootconsole disabled
loop: module loaded
m25p80 spi0.0: unrecognized JEDEC id ffffff
vcan: Virtual CAN interface driver
CAN device driver interface
flexcan netdevice driver
FEC Ethernet Driver
fec_enet_mii_bus: probed
PPP generic driver version 2.4.2
PPP Deflate Compression module registered
PPP BSD Compression module registered
PPP MPPE Compression module registered
NET: Registered protocol family 24
PPTP driver version 0.8.5
tun: Universal TUN/TAP device driver, 1.6
tun: (C) 1999-2004 Max Krasnyansky <maxk@qualcomm.com>
ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
fsl-ehci fsl-ehci.0: Freescale On-Chip EHCI Host Controller
fsl-ehci fsl-ehci.0: new USB bus registered, assigned bus number 1
fsl-ehci fsl-ehci.0: irq 75, io base 0x02184000
fsl-ehci fsl-ehci.0: USB 2.0 started, EHCI 1.00
hub 1-0:1.0: USB hub found
hub 1-0:1.0: 1 port detected
add wake up source irq 72
fsl-ehci fsl-ehci.1: Freescale On-Chip EHCI Host Controller
fsl-ehci fsl-ehci.1: new USB bus registered, assigned bus number 2
fsl-ehci fsl-ehci.1: irq 72, io base 0x02184200
fsl-ehci fsl-ehci.1: USB 2.0 started, EHCI 1.00
hub 2-0:1.0: USB hub found
hub 2-0:1.0: 1 port detected
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
Initializing USB Mass Storage driver...
usbcore: registered new interface driver usb-storage
USB Mass Storage support registered.
usbcore: registered new interface driver usbserial
usbserial: USB Serial Driver core
USB Serial support registered for GSM modem (1-port)
usbcore: registered new interface driver option
option: v0.7.2:USB Driver for GSM modems
USB Serial support registered for Qualcomm USB modem
usbcore: registered new interface driver qcserial
ARC USBOTG Device Controller driver (1 August 2005)
android_usb gadget: Mass Storage Function, version: 2009/09/11
android_usb gadget: Number of LUNs=1
 lun0: LUN: removable file: (no medium)
Gadget Android: controller 'fsl-usb2-udc' not recognized
android_usb gadget: android_usb ready
Suspend udc for OTG auto detect
fsl-usb2-udc: bind to driver android_usb
mousedev: PS/2 mouse device common for all mice
input: gpio-keys as /devices/platform/gpio-keys/input/input0
input: max11801_ts as /devices/platform/imx-i2c.1/i2c-1/1-0048/input/input1
egalax_ts 1-0004: egalax_ts: failed to read firmware version
egalax_ts: probe of 1-0004 failed with error -5
egalax_ts 2-0004: egalax_ts: failed to read firmware version
egalax_ts: probe of 2-0004 failed with error -5
elan - Read Hello Packet Failed
elan-touch: probe of 2-0010 failed with error -22
i2c-core: driver [isl29023] using legacy suspend method
i2c-core: driver [isl29023] using legacy resume method
using rtc device, snvs_rtc, for alarms
snvs_rtc snvs_rtc.0: rtc core: registered snvs_rtc as rtc0
i2c /dev entries driver
Linux video capture interface: v2.00
ov5642_read_reg:write reg error:reg=300a
ov5642_probe:cannot find camera
ov5640_read_reg:write reg error:reg=300a
ov5640_probe:cannot find camera
mxc_v4l2_output mxc_v4l2_output.0: V4L2 device registered as video16
mxc_v4l2_output mxc_v4l2_output.0: V4L2 device registered as video17
usbcore: registered new interface driver uvcvideo
USB Video Class driver (v1.1.0)
mag3110 2-000e: check mag3110 chip ID
input: mag3110 as /devices/virtual/input/input2
mag3110 2-000e: mag3110 is probed
i2c-core: driver [mag3110] using legacy suspend method
i2c-core: driver [mag3110] using legacy resume method
input: mma845x as /devices/virtual/input/input3
imx2-wdt imx2-wdt.0: IMX2+ Watchdog Timer enabled. timeout=60s (nowayout=1)
device-mapper: uevent: version 1.0.3
device-mapper: ioctl: 4.20.0-ioctl (2011-02-02) initialised: dm-devel@redhat.com
Bluetooth: Virtual HCI driver ver 1.3
Bluetooth: HCI UART driver ver 2.2
Bluetooth: HCIATH3K protocol initialized
Bluetooth: Generic Bluetooth USB driver ver 0.6
usbcore: registered new interface driver btusb
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
mmc0: SDHCI controller on platform [sdhci-esdhc-imx.3] using DMA
mmc1: SDHCI controller on platform [sdhci-esdhc-imx.2] using DMA
mmc2: SDHCI controller on platform [sdhci-esdhc-imx.1] using DMA
mxc_vdoa mxc_vdoa: i.MX Video Data Order Adapter(VDOA) driver probed
VPU initialized
mxc_asrc registered
revserved_memory_account:viv_gpu registerd
Thermal calibration data is 0x5984fb7d
Anatop Thermal registered as thermal_zone0
anatop_thermal_probe: default cooling device is cpufreq
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
logger: created 256K log 'log_main'
logger: created 256K log 'log_events'
logger: created 256K log 'log_radio'
logger: created 256K log 'log_system'
usbcore: registered new interface driver snd-usb-audio
mxc_hdmi_soc mxc_hdmi_soc.0: MXC HDMI Audio
Cirrus Logic CS42888 ALSA SoC Codec Driver
i2c-core: driver [cs42888] using legacy suspend method
i2c-core: driver [cs42888] using legacy resume method
mmc0: new high speed DDR MMC card at address 0001
mmcblk0: mmc0:0001 SEM08G 7.39 GiB
mmcblk0boot0: mmc0:0001 SEM08G partition 1 2.00 MiB
mmcblk0boot1: mmc0:0001 SEM08G partition 2 2.00 MiB
 mmcblk0: unknown partition table
 mmcblk0boot1: unknown partition table
 mmcblk0boot0: unknown partition table
wm8962 0-001a: customer id 0 revision D
input: WM8962 Beep Generator as /devices/platform/imx-i2c.0/i2c-0/0-001a/input/input4
asoc: wm8962 <-> imx-ssi.1 mapping ok
imx_3stack asoc driver
asoc: mxc-hdmi-soc <-> imx-hdmi-soc-dai.0 mapping ok
ALSA device list:
  #0: wm8962-audio
  #1: imx-hdmi-soc
Netfilter messages via NETLINK v0.30.
nf_conntrack version 0.5.0 (12580 buckets, 50320 max)
ctnetlink v0.93: registering with nfnetlink.
NF_TPROXY: Transparent proxy support initialized, version 4.1.0
NF_TPROXY: Copyright (c) 2006-2007 BalaBit IT Ltd.
xt_time: kernel timezone is -0000
IPv4 over IPv4 tunneling driver
GRE over IPv4 demultiplexor driver
ip_tables: (C) 2000-2006 Netfilter Core Team
arp_tables: (C) 2002 David S. Miller
TCP cubic registered
NET: Registered protocol family 10
ip6_tables: (C) 2000-2006 Netfilter Core Team
IPv6 over IPv4 tunneling driver
NET: Registered protocol family 17
NET: Registered protocol family 15
can: controller area network core (rev 20090105 abi 8)
NET: Registered protocol family 29
can: raw protocol (rev 20090105)
can: broadcast manager protocol (rev 20090105 t)
Bluetooth: RFCOMM TTY layer initialized
Bluetooth: RFCOMM socket layer initialized
Bluetooth: RFCOMM ver 1.11
Bluetooth: BNEP (Ethernet Emulation) ver 1.3
Bluetooth: BNEP filters: protocol multicast
Bluetooth: HIDP (Human Interface Emulation) ver 1.2
L2TP core driver, V2.0
mmc1: new high speed SDHC card at address aaaa
mmcblk1: mmc1:aaaa SU08G 7.40 GiB
PPPoL2TP kernel driver, V2.0
L2TP IP encapsulation support (L2TPv3)
 mmcblk1: p1 p2 p3 < p5 p6 p7 p8 p9 > p4
L2TP netlink interface
L2TP ethernet pseudowire support (L2TPv3)
lib80211: common routines for IEEE802.11 drivers
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
Bus freq driver module loaded
Bus freq driver Enabled
mxc_dvfs_core_probe
DVFS driver module loaded
regulator_init_complete: PFUZE100_VGEN6: incomplete constraints, leaving on
regulator_init_complete: PFUZE100_VGEN3: incomplete constraints, leaving on
regulator_init_complete: PFUZE100_VGEN2: incomplete constraints, leaving on
regulator_init_complete: PFUZE100_VGEN1: incomplete constraints, leaving on
snvs_rtc snvs_rtc.0: setting system clock to 1970-01-02 00:18:22 UTC (87502)
Freeing init memory: 220K
 find '/system/bin/gpu_init.sh', disabling 'gpu_init'
init: cannot find '/system/etc/install-recovery.sh', disabling 'flash_recovery'
android_usb: already disabled
mtp_bind_config
input: eCompass as /devices/virtual/input/input5
root@android:/ # ERROR: v4l2 capture: slave not found
ERROR: v4l2 capture: slave not found
ERROR: v4l2 capture: slave not found
ERROR: v4l2 capture: slave not found
warning: `zygote' uses 32-bit capabilities (legacy support in use)
request_suspend_state: wakeup (3->0) at 17924585339 (1970-01-02 00:18:36.928043670 UTC)
eth0: Freescale FEC PHY driver [Generic PHY] (mii_bus:phy_addr=1:01, irq=-1)
ADDRCONF(NETDEV_UP): eth0: link is not ready
Calling CRDA to update world regulatory domain
World regulatory domain updated:
    (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp)
    (2402000 KHz - 2472000 KHz @ 40000 KHz), (300 mBi, 2000 mBm)
    (2457000 KHz - 2482000 KHz @ 20000 KHz), (300 mBi, 2000 mBm)
    (2474000 KHz - 2494000 KHz @ 20000 KHz), (300 mBi, 2000 mBm)
    (5170000 KHz - 5250000 KHz @ 40000 KHz), (300 mBi, 2000 mBm)
    (5735000 KHz - 5835000 KHz @ 40000 KHz), (300 mBi, 2000 mBm)
android_readwrite_file: ret=-2
android_readwrite_file: ret=-2
acc_open
acc_release
android_readwrite_file: ret=-2
android_readwrite_file: ret=-2
root@android:/ #
```
Inspect kernel version ==> 3.0.35
```
root@android:/ # cat /proc/version
Linux version 3.0.35-05524-g8513494-dirty (enrique@enrique-desktop) (gcc version 4.4.3 (GCC) ) #1 SMP PREEMPT Wed Apr 10 18:32:18 CDT 2013
root@android:/ #
```
Inspect kernel cmdline
```
root@android:/ # cat /proc/cmdline
console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M
root@android:/ #
```
Inspect partitions
```
root@android:/ # cat /proc/partitions
major minor  #blocks  name
 179        0    7757824 mmcblk0
 179       16       2048 mmcblk0boot1
 179        8       2048 mmcblk0boot0
 179       24    7761920 mmcblk1
 179       25       8192 mmcblk1p1
 179       26       8192 mmcblk1p2
 179       27          1 mmcblk1p3
 179       28    4784128 mmcblk1p4
 179       29     524287 mmcblk1p5
 179       30     262143 mmcblk1p6
 179       31    2097151 mmcblk1p7
 259        0       8191 mmcblk1p8
 259        1       8191 mmcblk1p9
root@android:/ #
```
Inspect mounted filesystems
```
root@android:/ # cat /proc/mounts
rootfs / rootfs ro,relatime 0 0
tmpfs /dev tmpfs rw,nosuid,relatime,mode=755 0 0
devpts /dev/pts devpts rw,relatime,mode=600 0 0
proc /proc proc rw,relatime 0 0
sysfs /sys sysfs rw,relatime 0 0
none /acct cgroup rw,relatime,cpuacct 0 0
tmpfs /mnt/asec tmpfs rw,relatime,mode=755,gid=1000 0 0
tmpfs /mnt/obb tmpfs rw,relatime,mode=755,gid=1000 0 0
tmpfs /mnt/shm tmpfs rw,relatime,size=1024k,mode=775,uid=1000,gid=1003 0 0
none /dev/cpuctl cgroup rw,relatime,cpu 0 0
/dev/block/mmcblk1p5 /system ext4 ro,relatime,user_xattr,barrier=1,data=ordered 0 0
/dev/block/mmcblk1p7 /data ext4 rw,nosuid,nodev,noatime,nodiratime,errors=panic,user_xattr,barrier=1,nomblk_io_submit,data=ordered,noauto_da_alloc,discard 0 0
/dev/block/mmcblk1p6 /cache ext4 rw,nosuid,nodev,relatime,user_xattr,barrier=1,data=ordered 0 0
/dev/block/mmcblk1p8 /device ext4 ro,nosuid,nodev,relatime,user_xattr,barrier=1,data=ordered 0 0
none /sys/kernel/debug debugfs rw,relatime 0 0
/dev/block/vold/179:28 /mnt/sdcard vfat rw,dirsync,nosuid,nodev,noexec,relatime,uid=1000,gid=1015,fmask=0702,dmask=0702,allow_utime=0020,codepage=cp437,iocharset=iso8859-1,shortname=mixed,utf8,errors=remount-ro 0 0
/dev/block/vold/179:28 /mnt/secure/asec vfat rw,dirsync,nosuid,nodev,noexec,relatime,uid=1000,gid=1015,fmask=0702,dmask=0702,allow_utime=0020,codepage=cp437,iocharset=iso8859-1,shortname=mixed,utf8,errors=remount-ro 0 0
tmpfs /mnt/sdcard/.android_secure tmpfs ro,relatime,size=0k,mode=000 0 0
root@android:/ #
```
Inspect disk usage
```
root@android:/ # df
Filesystem             Size   Used   Free   Blksize
/dev                   393M    32K   393M   4096
/mnt/asec              393M     0K   393M   4096
/mnt/obb               393M     0K   393M   4096
/mnt/shm              1024K     4K  1020K   4096
/system                275M   163M   112M   4096
/data                    1G    40M     1G   4096
/cache                 247M     6M   241M   1024
/device                  7M     1M     6M   1024
/mnt/sdcard              4G     1M     4G   32768
/mnt/secure/asec         4G     1M     4G   32768
root@android:/ #
```
Inspect root filesystem
```
root@android:/ # ls -la /
drwxr-xr-x root     root              1970-01-02 00:18 acct
drwxrwx--- system   cache             1970-01-01 01:24 cache
dr-x------ root     root              1970-01-02 00:18 config
lrwxrwxrwx root     root              1970-01-02 00:18 d -> /sys/kernel/debug
drwxrwx--x system   system            1970-01-02 00:00 data
-rw-r--r-- root     root          116 1970-01-01 00:00 default.prop
drwxr-xr-x root     root              1970-01-02 00:18 dev
drwxr-xr-x root     root              1970-01-01 01:26 device
lrwxrwxrwx root     root              1970-01-02 00:18 etc -> /system/etc
lrwxrwxrwx root     root              1970-01-02 00:18 extsd -> /mnt/extsd
-rwxr-x--- root     root        98656 1970-01-01 00:00 init
-rwxr-x--- root     root         4287 1970-01-01 00:00 init.freescale.rc
-rwxr-x--- root     root         2732 1970-01-01 00:00 init.freescale.usb.rc
-rwxr-x--- root     root         2344 1970-01-01 00:00 init.goldfish.rc
-rwxr-x--- root     root        21576 1970-01-01 00:00 init.rc
drwxrwxr-x root     system            1970-01-02 00:18 mnt
dr-xr-xr-x root     root              1970-01-01 00:00 proc
drwx------ root     root              2013-04-10 23:27 root
drwxr-x--- root     root              1970-01-01 00:00 sbin
lrwxrwxrwx root     root              1970-01-02 00:18 sdcard -> /mnt/sdcard
drwxr-xr-x root     root              1970-01-02 00:18 sys
drwxr-xr-x root     root              1970-01-01 00:00 system
lrwxrwxrwx root     root              1970-01-02 00:18 udisk -> /mnt/udisk
-rw-r--r-- root     root         2616 1970-01-01 00:00 ueventd.freescale.rc
-rw-r--r-- root     root          272 1970-01-01 00:00 ueventd.goldfish.rc
-rw-r--r-- root     root         3825 1970-01-01 00:00 ueventd.rc
lrwxrwxrwx root     root              1970-01-02 00:18 vendor -> /system/vendor
root@android:/ #
```
Connect USB mouse and keyboard
Connect HDMI display
Android: Settings > About phone
* Additional system updates
* Status - Phone number, signal, etc.
* Legal information
* Model number: SABRESD-MX6DQ
* Android version: 4.0.4
* Baseband version: Unknown
* Kernel version: 3.0.35-05524-g8513494-dirty enrique@enrique-desktop #1 SMP PREEMPT Wed Apr 10 18:32:18 CDT 2013
* Build number: UKNNOWN
Android: Settings > Developer options
* USB Debugging: No
  Debug mode when USB is connected
* Developmetn device ID
  GFHW-BJEA-LQ7C-Q
* Stay awake: Yes
  Screen will never sleep while charging
* Allow mock locations: No
  Allow mock locations
* Desktop backup password
  Desktop full backups aren't currently protected.
USER INTERFACE
* Strict mode enabled: No
  Flash screen when apps do long operations on main thread
* Pointer location: No
  Screen overlay showing current touch data
* Show touches: No
  Show visual feedbacks for touches
* Show screen updates: No
  Flash areas of screen when they update
* Show CPU usage: No
  Screen overlay showing current CPU usage
* Force GPU rendering: No
  Use 2D hardware acceleration in applications
* Window animation scale
  Animation scale 1x
* Transition animation scale
  Animation scale 1x
APPS
* Don't keep activities: No
  Destroy every activity as soon as the user leaves it
* Background process limit
  Standard limit
* Show all ANRs: No
  Show App not Responding dialog for background apps
<-- markdown-link-check-enable-->
<-- EOF -->

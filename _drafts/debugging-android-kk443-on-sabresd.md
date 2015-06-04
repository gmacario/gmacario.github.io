---
layout: post
title:  "Debugging Android KitKat 4.4.3 on a Freescale Sabre SD"
date:   2015-05-26 16:49:00
categories: android howto development debugging
---

This blog post explains how I debugged Android KK443 on a SABRE SD board.

(2015-05-26 16:49)

SD-Card created with kk443 images built from sources on 2015-05-26, 10:06 CEST:

```
gmacario@mv-linux-powerhorse:~/easy-build/build-android-kk443-sabresd⟫ ls -la shared/myandroid/build_sabresd_6dq_android.log
-rw-rw-r-- 1 massimoviolante massimoviolante 71988 May 26 10:06 shared/myandroid/build_sabresd_6dq_android.log
gmacario@mv-linux-powerhorse:~/easy-build/build-android-kk443-sabresd⟫
```

Command used for writing the SD-Card

```
TODO
```

Booting SABRE SD from SD-Card inserted in slot SD3 (J507)

Start PuTTY: COM13:115200,8,n,1

PuTTY Reconfiguration: Logging All session output


Press "ENTER" when U-Boot starts to get the U-Boot prompt:

```
U-Boot 2014.04-08637-gaffa032 (May 24 2015 - 18:06:57)

CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 38 C, calibration data: 0x5984fb7d
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

Manually boot Android kk4.4.3:

```
=> boot
booti mmc1
kernel   @ 14008000 (6723128)
ramdisk  @ 15000000 (500534)
fdt      @ 14f00000 (50782)
kernel cmdline:
	use boot.img command line:
	console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
switch to ldo_bypass mode!
   Using Device Tree in place at 14f00000, end 14f0f65d

Starting kernel ...
```

Save log as `E:\20150526-1709-android-sabresd.txt`.

Configure kernel cmdline using U-Boot `bootargs` environment variable

* TODO: Double check which FDT has been written to the SD-Card!!!
* TODO:
* TODO:
* FIXME: Replace kernel cmdline using U-Boot `bootargs` envvar
* FIXME: Change bootargs option: `video=mxcfb0:dev=ldb,bpp=32` ==> `video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32`

````
=> setenv bootargs console=ttymxc0,115200 init=/init video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
=> saveenv
=> reset
```

Boot progress:

```
...
type=1404 audit(22222.750:3): enforcing=1 old_enforcing=0 auid=4294967295 ses=4294967295
init (1): /proc/1/oom_adj is deprecated, please use /proc/1/oom_score_adj instead.
init: /dev/hw_random not found
keychord: using input dev gpio-keys.27 for fevent
init: cannot open '/initlogo.rle'
Console: switching to colour dummy device 80x30
fs_mgr: Cannot mount filesystem on /dev/block/mmcblk3p5 at /system
init: fs_mgr_mount_all returned an error
init: /dev/hw_random not found
init: Unable to open persistent property directory /data/property errno: 2
```

It looks like `/system` is loaded from `/dev/block/mmcblk3p5`

Test

```
=> setenv bootargs console=ttymxc0,115200 root=/dev/null debug kdebug
=> boot
```

Unpack `boot-imx66q.img`

```
gmacario@kruk:~/easy-build/build-android-kk443-sabresd/tmp/myandroid-kk443-sabresd$ ../android_bootimg_tools/unpackbootimg -i boot-imx6q.img
BOARD_KERNEL_CMDLINE console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M
BOARD_KERNEL_BASE 14000000
BOARD_PAGE_SIZE 2048
Press any key to continue...

gmacario@kruk:~/easy-build/build-android-kk443-sabresd/tmp/myandroid-kk443-sabresd$
```

FIXME: In `{boot.img,recovery.img}/ramdisk/fstab.freescale`
Replace "/dev/block/mmcblk3p?" with "/dev/block/mmcblk1p?"

(NOTE: With Android 4.0.x this is hardcoded in `/init.freescale.rc`)


With myandroid-kk3 SD-Card:

```
=> mmc list
FSL_SDHC: 0
 FSL_SDHC: 1
 FSL_SDHC: 2
=> mmc dev 1
mmc1 is current device
=> mmc part

Partition Map for MMC device 1  --   Partition Type: DOS

Part    Start Sector    Num Sectors     UUID            Type
  1     2048            16384           7710c2a1-01     83
  2     18432           16384           7710c2a1-02     83
  3     34816           2621440         7710c2a1-03     05 Extd
  4     2656256         28047360        7710c2a1-04     83
  5     36864           1048576         7710c2a1-05     83
  6     1087488         1048576         7710c2a1-06     83
  7     2138112         16384           7710c2a1-07     83
  8     2156544         8192            7710c2a1-08     83
=>
```

Check U-Boot with KK443:

```
U-Boot 2014.04-08637-gaffa032 (May 24 2015 - 18:06:57)

CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 31 C, calibration data: 0x5984fb7d
Reset cause: POR
Board: MX6-SabreSD
I2C:   ready
DRAM:  1 GiB
MMC:   FSL_SDHC: 0, FSL_SDHC: 1, FSL_SDHC: 2
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


------------------------------

(2015-06-04 12:05 CEST)

PuTTY Reconfiguration: Logging All session output to file `E:\20150604-1205-kk443-sabresd.txt`

```
U-Boot 2014.04-08637-gaffa032 (May 24 2015 - 18:06:57)

CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 32 C, calibration data: 0x5984fb7d
Reset cause: POR
Board: MX6-SabreSD
I2C:   ready
DRAM:  1 GiB
MMC:   FSL_SDHC: 0, FSL_SDHC: 1, FSL_SDHC: 2
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
Hit any key to stop autoboot:  1  0
booti mmc1
kernel   @ 14008000 (6723128)
ramdisk  @ 15000000 (500534)
fdt      @ 14f00000 (50782)
kernel cmdline:
	use boot.img command line:
	console=ttymxc0,115200 init=/init video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
switch to ldo_bypass mode!
   Using Device Tree in place at 14f00000, end 14f0f65d

Starting kernel ...
```

Kernel boot log:

```
Booting Linux on physical CPU 0x0
Initializing cgroup subsys cpu
Initializing cgroup subsys cpuacct
Linux version 3.10.53-88098-g1c3a910 (build@194ba687ef36) (gcc version 4.6.x-google 20120106 (prerelease) (GCC) ) #2 SMP PREEMPT Mon May 25 05:39:31 UTC 2015
CPU: ARMv7 Processor [412fc09a] revision 10 (ARMv7), cr=10c53c7d
CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
Machine: Freescale i.MX6 Quad/DualLite (Device Tree), model: Freescale i.MX6 Quad SABRE Smart Device Board
cma: CMA: reserved 384 MiB at 32000000
Memory policy: ECC disabled, Data cache writealloc
PERCPU: Embedded 8 pages/cpu @817d9000 s9728 r8192 d14848 u32768
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 259840
Kernel command line: console=ttymxc0,115200 init=/init video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
PID hash table entries: 4096 (order: 2, 16384 bytes)
Dentry cache hash table entries: 131072 (order: 7, 524288 bytes)
Inode-cache hash table entries: 65536 (order: 6, 262144 bytes)
Memory: 959MB 64MB = 1023MB total
Memory: 627664k/627664k available, 420912k reserved, 0K highmem
Virtual kernel memory layout:
    vector  : 0xffff0000 - 0xffff1000   (   4 kB)
    fixmap  : 0xfff00000 - 0xfffe0000   ( 896 kB)
    vmalloc : 0xc0800000 - 0xff000000   (1000 MB)
    lowmem  : 0x80000000 - 0xc0000000   (1024 MB)
    pkmap   : 0x7fe00000 - 0x80000000   (   2 MB)
    modules : 0x7f000000 - 0x7fe00000   (  14 MB)
      .text : 0x80008000 - 0x80e51868   (14631 kB)
      .init : 0x80e52000 - 0x80ea7600   ( 342 kB)
      .data : 0x80ea8000 - 0x80f2b740   ( 526 kB)
       .bss : 0x80f2b740 - 0x80fc02f8   ( 595 kB)
SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=4, Nodes=1
Preemptible hierarchical RCU implementation.
NR_IRQS:16 nr_irqs:16 16
L310 cache controller enabled
l2x0: 16 ways, CACHE_ID 0x410000c7, AUX_CTRL 0x32070000, Cache size: 1048576 B
sched_clock: 32 bits at 3000kHz, resolution 333ns, wraps every 1431655ms
CPU identified as i.MX6Q, silicon rev 1.2
Console: colour dummy device 80x30
Calibrating delay loop... 1581.05 BogoMIPS (lpj=7905280)
pid_max: default: 32768 minimum: 301
Security Framework initialized
SELinux:  Initializing.
Mount-cache hash table entries: 512
Initializing cgroup subsys debug
Initializing cgroup subsys freezer
CPU: Testing write buffer coherency: ok
CPU0: thread -1, cpu 0, socket 0, mpidr 80000000
Setting up static identity map for 0x807bf708 - 0x807bf760
CPU1: Booted secondary processor
CPU1: thread -1, cpu 1, socket 0, mpidr 80000001
CPU2: Booted secondary processor
CPU2: thread -1, cpu 2, socket 0, mpidr 80000002
CPU3: Booted secondary processor
CPU3: thread -1, cpu 3, socket 0, mpidr 80000003
Brought up 4 CPUs
SMP: Total of 4 processors activated (6324.22 BogoMIPS).
CPU: All CPU(s) started in SVC mode.
devtmpfs: initialized
pinctrl core: initialized pinctrl subsystem
regulator-dummy: no parameters
NET: Registered protocol family 16
DMA: preallocated 256 KiB pool for atomic coherent allocations
Use WDOG2 as reset source
syscon 20c8000.anatop: regmap [mem 0x020c8000-0x020c8fff] registered
vdd1p1: 800 <--> 1375 mV at 1125 mV
vdd3p0: 2800 <--> 3150 mV at 3000 mV
vdd2p5: 2000 <--> 2750 mV at 2425 mV
cpu: 725 <--> 1450 mV
vddpu: 725 <--> 1450 mV
vddsoc: 725 <--> 1450 mV
syscon 20e0000.iomuxc-gpr: regmap [mem 0x020e0000-0x020e0037] registered
syscon 21bc000.ocotp-ctrl: regmap [mem 0x021bc000-0x021bffff] registered
!!request miniPCIE Power On gpio
hw-breakpoint: found 5 (+1 reserved) breakpoint and 1 watchpoint registers.
hw-breakpoint: maximum watchpoint size is 4 bytes.
imx6q-pinctrl 20e0000.iomuxc: initialized IMX pinctrl driver
bio: create slab <bio-0> at 0
mxs-dma 110000.dma-apbh: initialized
usb_otg_vbus: 5000 mV
usb_h1_vbus: 5000 mV
wm8962-supply: no parameters
mipi_dsi_pwr_on: no parameters
sensor-supply: 3300 mV
i2c-core: driver [max17135] using legacy suspend method
i2c-core: driver [max17135] using legacy resume method
SCSI subsystem initialized
usbcore: registered new interface driver usbfs
usbcore: registered new interface driver hub
usbcore: registered new device driver usb
i2c i2c-0: IMX I2C adapter registered
i2c i2c-1: IMX I2C adapter registered
i2c i2c-2: IMX I2C adapter registered
Linux video capture interface: v2.00
pps_core: LinuxPPS API ver. 1 registered
pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@linux.it>
PTP clock support registered
imx-ipuv3 2400000.ipu: IPU DMFC NORMAL mode: 1(0~1), 5B(4,5), 5F(6,7)
imx-ipuv3 2800000.ipu: IPU DMFC NORMAL mode: 1(0~1), 5B(4,5), 5F(6,7)
mxc_mipi_csi2 21dc000.mipi_csi: i.MX MIPI CSI2 driver probed
mxc_mipi_csi2 21dc000.mipi_csi: i.MX MIPI CSI2 dphy version is 0x3130302a
MIPI CSI2 driver module loaded
Advanced Linux Sound Architecture Driver Initialized.
Bluetooth: Core ver 2.16
NET: Registered protocol family 31
Bluetooth: HCI device and connection manager initialized
Bluetooth: HCI socket layer initialized
Bluetooth: L2CAP socket layer initialized
Bluetooth: SCO socket layer initialized
pureg-dummy: no parameters
Switching to clocksource mxc_timer1
NET: Registered protocol family 2
TCP established hash table entries: 8192 (order: 4, 65536 bytes)
TCP bind hash table entries: 8192 (order: 4, 65536 bytes)
TCP: Hash tables configured (established 8192 bind 8192)
TCP: reno registered
UDP hash table entries: 512 (order: 2, 16384 bytes)
UDP-Lite hash table entries: 512 (order: 2, 16384 bytes)
NET: Registered protocol family 1
RPC: Registered named UNIX socket transport module.
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Trying to unpack rootfs image as initramfs...
Freeing initrd memory: 488K (85000000 - 8507a000)
hw perfevents: enabled with ARMv7 Cortex-A9 PMU driver, 7 counters available
imx6_busfreq busfreq.16: DDR medium rate not supported.
Bus freq driver module loaded
bt power gpio is:2
mxc_bt_rfkill driver success loaded
rfkill: BT RF going to : on
mxc_bt_rfkill_reset
mxc_ir consumer_ir.41: unable to request PWM.
platform consumer_ir.41: Driver mxc_ir requests probe deferral
console [pstore-1] enabled
ramoops: attached 0x100000@0x4bf00000, ecc: 0/0
mxc_ramoops device success loaded
futex hash table entries: 1024 (order: 4, 65536 bytes)
audit: initializing netlink socket (disabled)
type=2000 audit(0.480:1): initialized
VFS: Disk quotas dquot_6.5.2
Dquot-cache hash table entries: 1024 (order 0, 4096 bytes)
NFS: Registering the id_resolver key type
Key type id_resolver registered
Key type id_legacy registered
NTFS driver 2.1.30 [Flags: R/W DEBUG].
jffs2: version 2.2. (NAND) © 2001-2006 Red Hat, Inc.
fuse init (API version 7.22)
msgmni has been set to 1994
io scheduler noop registered
io scheduler deadline registered
io scheduler cfq registered (default)
imx-weim 21b8000.weim: WEIM driver registered.
mxc_mipi_dsi 21e0000.mipi: i.MX MIPI DSI driver probed
MIPI DSI driver module loaded
imx6q-pinctrl 20e0000.iomuxc: pin MX6Q_PAD_DISP0_DAT9 already requested by 2084000.pwm; cannot claim for lcd.34
imx6q-pinctrl 20e0000.iomuxc: pin-101 (lcd.34) status -22
imx6q-pinctrl 20e0000.iomuxc: could not request pin 101 on device 20e0000.iomuxc
mxc_lcdif lcd.34: Error applying setting, reverse things back
imx6q-pinctrl 20e0000.iomuxc: pin MX6Q_PAD_DISP0_DAT9 already requested by 2084000.pwm; cannot claim for lcd.34
imx6q-pinctrl 20e0000.iomuxc: pin-101 (lcd.34) status -22
imx6q-pinctrl 20e0000.iomuxc: could not request pin 101 on device 20e0000.iomuxc
mxc_lcdif lcd.34: Error applying setting, reverse things back
mxc_lcdif lcd.34: can't get/select pinctrl
mxc_lcdif: probe of lcd.34 failed with error -22
mxc_hdmi 20e0000.hdmi_video: Detected HDMI controller 0x13:0xa:0xa0:0xc1
fbcvt: 1920x1080@60: CVT Name - 2.073M9
mxc_sdc_fb fb.30: registered mxc display driver hdmi
imx-ipuv3 2400000.ipu: IPU DMFC DP HIGH RESOLUTION: 1(0,1), 5B(2~5), 5F(6,7)
Console: switching to colour frame buffer device 240x67
mxc_sdc_fb fb.31: Can't get fb option for mxcfb1!
mxc_sdc_fb fb.32: Can't get fb option for mxcfb2!
mxc_sdc_fb fb.33: Can't get fb option for mxcfb3!
imx-sdma 20ec000.sdma: no iram assigned, using external mem
imx-sdma 20ec000.sdma: loaded firmware 1.1
imx-sdma 20ec000.sdma: initialized
pfuze100-regulator 1-0008: Full lay: 1, Metal lay: 1
pfuze100-regulator 1-0008: FAB: 0, FIN: 0
pfuze100-regulator 1-0008: pfuze100 found.
SW1AB: 300 <--> 1875 mV at 1150 mV
SW1C: 300 <--> 1875 mV at 1175 mV
SW2: 800 <--> 3300 mV at 3300 mV
SW3A: 400 <--> 1975 mV at 1500 mV
SW3B: 400 <--> 1975 mV at 1500 mV
SW4: 800 <--> 3300 mV at 3150 mV
SWBST: 5000 <--> 5150 mV at 5000 mV
VSNVS: 1000 <--> 3000 mV at 3000 mV
VREFDDR: 750 mV
VGEN1: 800 <--> 1550 mV at 1500 mV
VGEN2: 800 <--> 1550 mV at 1500 mV
VGEN3: 1800 <--> 3300 mV at 2800 mV
VGEN4: 1800 <--> 3300 mV at 1800 mV
VGEN5: 1800 <--> 3300 mV at 3000 mV
VGEN6: 1800 <--> 3300 mV at 3300 mV
Serial: IMX driver
2020000.serial: ttymxc0 at MMIO 0x2020000 (irq = 58) is a IMX
console [ttymxc0] enabled
21ec000.serial: ttymxc2 at MMIO 0x21ec000 (irq = 60) is a IMX
21f4000.serial: ttymxc4 at MMIO 0x21f4000 (irq = 62) is a IMX
serial: Freescale lpuart driver
imx sema4 driver is registered.
[drm] Initialized drm 1.1.0 20060810
[drm] Initialized vivante 1.0.0 20120216 on minor 0
brd: module loaded
loop: module loaded
imx6q-pinctrl 20e0000.iomuxc: pin MX6Q_PAD_KEY_COL1 already requested by 21f4000.serial; cannot claim for 2008000.ecspi
imx6q-pinctrl 20e0000.iomuxc: pin-128 (2008000.ecspi) status -22
imx6q-pinctrl 20e0000.iomuxc: could not request pin 128 on device 20e0000.iomuxc
spi_imx 2008000.ecspi: Error applying setting, reverse things back
m25p80 spi32766.0: found mr25h256, expected m25p32
m25p80 spi32766.0: mr25h256 (32 Kbytes)
spi_imx 2008000.ecspi: probed
tun: Universal TUN/TAP device driver, 1.6
tun: (C) 1999-2004 Max Krasnyansky <maxk@qualcomm.com>
CAN device driver interface
libphy: fec_enet_mii_bus: probed
fec 2188000.ethernet eth0: registered PHC device 0
PPP generic driver version 2.4.2
PPP BSD Compression module registered
PPP Deflate Compression module registered
PPP MPPE Compression module registered
NET: Registered protocol family 24
usbcore: registered new interface driver asix
usbcore: registered new interface driver ax88179_178a
usbcore: registered new interface driver cdc_ether
usbcore: registered new interface driver net1080
usbcore: registered new interface driver cdc_subset
usbcore: registered new interface driver zaurus
usbcore: registered new interface driver cdc_ncm
ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
usbcore: registered new interface driver usb-storage
usbcore: registered new interface driver usbserial
usbcore: registered new interface driver option
usbserial: USB Serial support registered for GSM modem (1-port)
ci_hdrc ci_hdrc.0: EHCI Host Controller
ci_hdrc ci_hdrc.0: new USB bus registered, assigned bus number 1
ci_hdrc ci_hdrc.0: USB 2.0 started, EHCI 1.00
usb usb1: New USB device found, idVendor=1d6b, idProduct=0002
usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
usb usb1: Product: EHCI Host Controller
usb usb1: Manufacturer: Linux 3.10.53-88098-g1c3a910 ehci_hcd
usb usb1: SerialNumber: ci_hdrc.0
hub 1-0:1.0: USB hub found
hub 1-0:1.0: 1 port detected
ci_hdrc ci_hdrc.1: doesn't support gadget
ci_hdrc ci_hdrc.1: EHCI Host Controller
ci_hdrc ci_hdrc.1: new USB bus registered, assigned bus number 2
usb 1-1: new high-speed USB device number 2 using ci_hdrc
ci_hdrc ci_hdrc.1: USB 2.0 started, EHCI 1.00
usb usb2: New USB device found, idVendor=1d6b, idProduct=0002
usb usb2: New USB device strings: Mfr=3, Product=2, SerialNumber=1
usb usb2: Product: EHCI Host Controller
usb usb2: Manufacturer: Linux 3.10.53-88098-g1c3a910 ehci_hcd
usb usb2: SerialNumber: ci_hdrc.1
hub 2-0:1.0: USB hub found
hub 2-0:1.0: 1 port detected
mousedev: PS/2 mouse device common for all mice
usbcore: registered new interface driver xpad
usbcore: registered new interface driver usb_acecad
usbcore: registered new interface driver aiptek
usbcore: registered new interface driver gtco
usbcore: registered new interface driver hanwang
usbcore: registered new interface driver kbtab
usbcore: registered new interface driver wacom
usb 1-1: New USB device found, idVendor=05e3, idProduct=0608
usb 1-1: New USB device strings: Mfr=0, Product=1, SerialNumber=0
usb 1-1: Product: USB2.0 Hub
hub 1-1:1.0: USB hub found
hub 1-1:1.0: 4 ports detected
elan-touch 2-0010: elan - Read Hello Packet Failed
elan-touch: probe of 2-0010 failed with error -22
egalax_ts 1-0004: Failed to read firmware version
egalax_ts: probe of 1-0004 failed with error -5
usb 1-1.1: new low-speed USB device number 3 using ci_hdrc
egalax_ts 2-0004: Failed to read firmware version
egalax_ts: probe of 2-0004 failed with error -5
usb 1-1.1: New USB device found, idVendor=046d, idProduct=c315
usb 1-1.1: New USB device strings: Mfr=1, Product=2, SerialNumber=0
usb 1-1.1: Product: Logitech USB Keyboard
usb 1-1.1: Manufacturer: Logitech
input: max11801_ts as /devices/soc0/soc.1/2100000.aips-bus/21a4000.i2c/i2c-1/1-0048/input/input0
i2c-core: driver [isl29023] using legacy suspend method
i2c-core: driver [isl29023] using legacy resume method
snvs_rtc 20cc034.snvs-rtc-lp: rtc core: registered 20cc034.snvs-rtc-lp as rtc0
i2c /dev entries driver
usb 1-1.2: new low-speed USB device number 4 using ci_hdrc
ov5640_read_reg:write reg error:reg=300a
camera ov5640 is not found
usb 1-1.2: unable to read config index 0 descriptor/start: -32
usb 1-1.2: chopping to 0 config(s)
usb 1-1.2: New USB device found, idVendor=04b3, idProduct=3108
usb 1-1.2: New USB device strings: Mfr=0, Product=0, SerialNumber=0
usb 1-1.2: no configuration chosen from 0 choices
usb 1-1.2: USB disconnect, device number 4
ov5642_read_reg:write reg error:reg=300a
camera ov5642 is not found
ov5640_read_reg:write reg error:reg=300a
camera ov5640_mipi is not found
mxc_v4l2_output v4l2_out.38: V4L2 device registered as video16
mxc_v4l2_output v4l2_out.38: V4L2 device registered as video17
usbcore: registered new interface driver uvcvideo
USB Video Class driver (1.1.1)
gspca_main: v2.14.0 registered
mag3110 2-000e: check mag3110 chip ID
input: FreescaleMagnetometer as /devices/virtual/input/input1
input: eCompass as /devices/virtual/input/input2
mag3110 2-000e: mag3110 is probed
input: FreescaleAccelerometer as /devices/virtual/input/input3
mma8x5x device driver probe successfully
imx2-wdt 20c0000.wdog: IMX2+ Watchdog Timer enabled. timeout=60s (nowayout=0)
device-mapper: uevent: version 1.0.3
device-mapper: ioctl: 4.24.0-ioctl (2013-01-15) initialised: dm-devel@redhat.com
Bluetooth: Virtual HCI driver ver 1.3
Bluetooth: HCI UART driver ver 2.2
Bluetooth: HCIATH3K protocol initialized
usbcore: registered new interface driver btusb
cpuidle: using governor ladder
cpuidle: using governor menu
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
sdhci-pltfm: SDHCI platform and OF driver helper
mmc1: no vqmmc regulator found
mmc1: no vmmc regulator found
mmc1: SDHCI controller on 2194000.usdhc [2194000.usdhc] using ADMA
mmc2: no vqmmc regulator found
mmc2: no vmmc regulator found
mmc2: SDHCI controller on 2198000.usdhc [2198000.usdhc] using ADMA
mmc3: no vqmmc regulator found
mmc3: no vmmc regulator found
mmc2: new high speed SDHC card at address 0001
mmcblk2: mmc2:0001 00000 14.6 GiB
 mmcblk2: p1 p2 p3 < p5 p6 p7 p8 > p4
mmc3: SDHCI controller on 219c000.usdhc [219c000.usdhc] using ADMA
Galcore version 5.0.11.25762
mmc3: new high speed DDR MMC card at address 0001
mmcblk3: mmc3:0001 SEM08G 7.39 GiB
mmcblk3boot0: mmc3:0001 SEM08G partition 1 2.00 MiB
mmcblk3boot1: mmc3:0001 SEM08G partition 2 2.00 MiB
mmcblk3rpmb: mmc3:0001 SEM08G partition 3 128 KiB
 mmcblk3: unknown partition table
 mmcblk3boot1: unknown partition table
 mmcblk3boot0: unknown partition table
```

TODO: Why does the kernel (3.10.53) identifies the on-board 8GB MMC as mmcblk3, while Android 4.0.x identifies it as mmcblk0?

Looks like (with KK443 linux-3.10.53):

* MMC2: External SD-Card (16 GB) in slot SD3
* MMC3: On-board MMC (8 GB)

```
mxc_vdoa 21e4000.vdoa: i.MX Video Data Order Adapter(VDOA) driver probed
mxc_asrc 2034000.asrc: mxc_asrc registered
mxc_vpu 2040000.vpu: VPU initialized
hidraw: raw HID events driver (C) Jiri Kosina
input: Logitech Logitech USB Keyboard as /devices/soc0/soc.1/2100000.aips-bus/2184000.usb/ci_hdrc.0/usb1/1-1/1-1.1/1-1.1:1.0/input/input4
hid-generic 0003:046D:C315.0001: input,hidraw0: USB HID v1.10 Keyboard [Logitech Logitech USB Keyboard] on usb-ci_hdrc.0-1.1/input0
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
ashmem: initialized
logger: created 256K log 'log_main'
logger: created 256K log 'log_events'
logger: created 256K log 'log_radio'
logger: created 256K log 'log_system'
usbcore: registered new interface driver snd-usb-audio
wm8962 0-001a: customer id 0 revision D
input: WM8962 Beep Generator as /devices/soc0/soc.1/2100000.aips-bus/21a0000.i2c/i2c-0/0-001a/input/input5
imx-wm8962 sound.28:  wm8962 <-> 202c000.ssi mapping ok
imx-audio-hdmi sound-hdmi.29:  hdmi-hifi <-> hdmi_audio.17 mapping ok
NET: Registered protocol family 26
u32 classifier
    Actions configured
Netfilter messages via NETLINK v0.30.
nf_conntrack version 0.5.0 (15958 buckets, 63832 max)
ctnetlink v0.93: registering with nfnetlink.
NF_TPROXY: Transparent proxy support initialized, version 4.1.0
NF_TPROXY: Copyright (c) 2006-2007 BalaBit IT Ltd.
xt_time: kernel timezone is -0000
ip_tables: (C) 2000-2006 Netfilter Core Team
arp_tables: (C) 2002 David S. Miller
TCP: cubic registered
Initializing XFRM netlink socket
NET: Registered protocol family 10
mip6: Mobile IPv6
ip6_tables: (C) 2000-2006 Netfilter Core Team
NET: Registered protocol family 17
NET: Registered protocol family 15
can: controller area network core (rev 20120528 abi 9)
NET: Registered protocol family 29
can: raw protocol (rev 20120528)
can: broadcast manager protocol (rev 20120528 t)
can: netlink gateway (rev 20130117) max_hops=1
Bluetooth: RFCOMM TTY layer initialized
Bluetooth: RFCOMM socket layer initialized
Bluetooth: RFCOMM ver 1.11
Bluetooth: BNEP (Ethernet Emulation) ver 1.3
Bluetooth: BNEP filters: protocol multicast
Bluetooth: BNEP socket layer initialized
Bluetooth: HIDP (Human Interface Emulation) ver 1.2
Bluetooth: HIDP socket layer initialized
8021q: 802.1Q VLAN Support v1.8
Key type dns_resolver registered
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
VGEN1: disabling
SWBST: disabling
SW4: disabling
wm8962-supply: disabling
regulator-dummy: disabling
imx mcc test is registered.
file system registered
android_usb gadget: Mass Storage Function, version: 2009/09/11
android_usb gadget: Number of LUNs=1
 lun0: LUN: removable file: (no medium)
android_usb gadget: android_usb ready
input: gpio-keys.27 as /devices/soc0/gpio-keys.27/input/input6
snvs_rtc 20cc034.snvs-rtc-lp: setting system clock to 1970-01-01 00:00:01 UTC (1)
ALSA device list:
  #0: wm8962-audio
  #1: imx-hdmi-soc
Freeing unused kernel memory: 340K (80e52000 - 80ea7000)
SELinux:  Permission attach_queue in class tun_socket not defined in policy.
SELinux: the above unknown classes and permissions will be denied
type=1403 audit(1.740:2): policy loaded auid=4294967295 ses=4294967295
SELinux: Loaded policy from /sepolicy
type=1404 audit(1.760:3): enforcing=1 old_enforcing=0 auid=4294967295 ses=4294967295
hub 1-1:1.0: Cannot enable port 2.  Maybe the USB cable is bad?
hub 1-1:1.0: Cannot enable port 2.  Maybe the USB cable is bad?
hub 1-1:1.0: Cannot enable port 2.  Maybe the USB cable is bad?
init (1): /proc/1/oom_adj is deprecated, please use /proc/1/oom_score_adj instead.
init: /dev/hw_random not found
keychord: using input dev Logitech Logitech USB Keyboard for fevent
keychord: using input dev gpio-keys.27 for fevent
init: cannot open '/initlogo.rle'
Console: switching to colour dummy device 80x30
hub 1-1:1.0: Cannot enable port 2.  Maybe the USB cable is bad?
hub 1-1:1.0: unable to enumerate USB device on port 2
fs_mgr: Cannot mount filesystem on /dev/block/mmcblk3p5 at /system
init: fs_mgr_mount_all returned an error
init: /dev/hw_random not found
init: Unable to open persistent property directory /data/property errno: 2
rfkill: BT RF going to : off
init: cannot find '/system/bin/sh', disabling 'console'
type=1400 audit(24.510:4): avc:  denied  { entrypoint } for  pid=143 comm="init" path="/sbin/healthd" dev="rootfs" ino=152 scontext=u:r:healthd:s0 tcontext=u:object_r:rootfs:s0 tclass=file permissive=1
healthd: BatteryTemperaturePath not found
healthd: BatteryTechnologyPath not found
binder: 143:143 transaction failed 29189, size 0-0
init: cannot find '/system/bin/servicemanager', disabling 'servicemanager'
init: cannot find '/system/bin/vold', disabling 'vold'
init: cannot find '/system/bin/netd', disabling 'netd'
init: cannot find '/system/bin/debuggerd', disabling 'debuggerd'
init: cannot find '/system/bin/surfaceflinger', disabling 'surfaceflinger'
init: cannot find '/system/bin/app_process', disabling 'zygote'
init: cannot find '/system/bin/drmserver', disabling 'drm'
init: cannot find '/system/bin/mediaserver', disabling 'media'
init: cannot find '/system/bin/installd', disabling 'installd'
init: cannot find '/system/etc/install-recovery.sh', disabling 'flash_recovery'
init: cannot find '/system/bin/keystore', disabling 'keystore'
init: cannot find '/system/bin/rild', disabling 'ril-daemon'
init: Unable to write persistent property to temp file /data/property/.temp.4fBvWD errno: 2
init: Unable to write persistent property to temp file /data/property/.temp.zRbQ1D errno: 2
init: using deprecated syntax for specifying property 'ro.serialno', use ${name} instead
init: using deprecated syntax for specifying property 'ro.product.manufacturer', use ${name} instead
init: property 'ro.product.manufacturer' doesn't exist while expanding '$ro.product.manufacturer'
init: cannot expand '$ro.product.manufacturer' while writing to '/sys/class/android_usb/android0/iManufacturer'
init: using deprecated syntax for specifying property 'ro.product.model', use ${name} instead
init: property 'ro.product.model' doesn't exist while expanding '$ro.product.model'
init: cannot expand '$ro.product.model' while writing to '/sys/class/android_usb/android0/iProduct'
init: property 'sys.powerctl' doesn't exist while expanding '${sys.powerctl}'
init: powerctl: cannot expand '${sys.powerctl}'
init: property 'sys.sysctl.extra_free_kbytes' doesn't exist while expanding '${sys.sysctl.extra_free_kbytes}'
init: cannot expand '${sys.sysctl.extra_free_kbytes}' while writing to '/proc/sys/vm/extra_free_kbytes'
android_usb: already disabled
read descriptors
read strings
mtp_bind_config
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
```

TODO: Write internal MMC


<!-- EOF -->

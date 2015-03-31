# Upgrading OpenWrt on my Arduino Yun

Read instructions at <http://arduino.cc/en/Tutorial/YunSysupgrade>

### Required material

* Arduino Yun
* One USB-to-microUSB cable
* One microSD card
* One laptop with Arduino IDE 1.6.0 or later
* Internet connectivity to download the Yun Sysupgrade image
* A microSD card reader to plug into your laptop

### Preparation

* Insert the microSD card into the SD-card reader of the laptop. Format it to FAT32 if it was unformatted.
* Download the OpenWrt-Yun upgrade image from <http://arduino.cc/en/Main/Software>
  * Search for "OPENWRT-YUN x.y.z UPGRADE IMAGE"
  * As of 2015-03-28, this downloads `YunSysupgradeImage_v1.5.3.zip`
* Unzip the file to the root directory of the microSD card
* Insert the microSD card into the Yun

* Connect the Yun to the laptop using a USB-to-MicroUSB cable
* Launch Arduino IDE
* Configure Arduino IDE
  * Tools > Board: Arduino Yun
  * Tools > Port: COMxx (Arduino Yun)
* Open the [`YunSerialTerminal`](http://arduino.cc/en/Tutorial/YunSerialTerminal) sketch and upload it to the Yun:
  * File > Examples > Bridge > YunSerialTerminal
  * File > Upload
* Open the Serial Monitor
  * Tools > Serial Monitor
* In the Serial Monitor, type `~2` then "Enter" to set speed to 250000 bit/s

* Press the "YUN RST" button on your Yun
* Watch the Serial Monitor for your Linux boot log

#### Boot log before upgrading Yun

```
Speed set to 250000


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
Hit any key to stop autoboot:  4  3  2  1  0
## Booting image at 9fea0000 ...
   Image Name:   MIPS OpenWrt Linux-3.3.8
   Created:      2014-04-17   8:11:04 UTC
   Image Type:   MIPS Linux Kernel Image (lzma compressed)
   Data Size:    1185367 Bytes =  1.1 MB
   Load Address: 80060000
   Entry Point:  80060000
   Verifying Checksum at 0x9fea0040 ...OK
   Uncompressing Kernel Image ... OK
No initrd
## Transferring control to Linux (at address 80060000) ...
## Giving linux memsize in bytes, 67108864

Starting kernel ...

[    0.000000] Linux version 3.3.8 (jenkins@jenkins) (gcc version 4.6.3 20120201 (prerelease) (Linaro GCC 4.6-2012.02) ) #1 Fri Apr 11 07:16:38 CEST 2014
[    0.000000] bootconsole [early0] enabled
[    0.000000] CPU revision is: 00019374 (MIPS 24Kc)
[    0.000000] SoC: Atheros AR9330 rev 1
[    0.000000] Clocks: CPU:400.000MHz, DDR:400.000MHz, AHB:200.000MHz, Ref:25.000MHz
[    0.000000] Determined physical RAM map:
[    0.000000]  memory: 04000000 @ 00000000 (usable)
[    0.000000] Initrd not found or empty - disabling initrd
[    0.000000] Zone PFN ranges:
[    0.000000]   Normal   0x00000000 -> 0x00004000
[    0.000000] Movable zone start PFN for each node
[    0.000000] Early memory PFN ranges
[    0.000000]     0: 0x00000000 -> 0x00004000
[    0.000000] Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 16256
[    0.000000] Kernel command line:  board=Yun console=ttyATH0,250000 mtdparts=spi0.0:256k(u-boot)ro,64k(u-boot-env)ro,14656k(rootfs),1280k(kernel),64k(nvram),64k(art),15936k@0x50000(firmware) rootfstype=squashfs,jffs2 noinitrd
[    0.000000] PID hash table entries: 256 (order: -2, 1024 bytes)
[    0.000000] Dentry cache hash table entries: 8192 (order: 3, 32768 bytes)
[    0.000000] Inode-cache hash table entries: 4096 (order: 2, 16384 bytes)
[    0.000000] Primary instruction cache 64kB, VIPT, 4-way, linesize 32 bytes.
[    0.000000] Primary data cache 32kB, 4-way, VIPT, cache aliases, linesize 32 bytes
[    0.000000] Writing ErrCtl register=00000000
[    0.000000] Readback ErrCtl register=00000000
[    0.000000] Memory: 60936k/65536k available (2565k kernel code, 4600k reserved, 650k data, 180k init, 0k highmem)
[    0.000000] SLUB: Genslabs=9, HWalign=32, Order=0-3, MinObjects=0, CPUs=1, Nodes=1
[    0.000000] NR_IRQS:51
[    0.000000] Calibrating delay loop... 265.42 BogoMIPS (lpj=1327104)
[    0.080000] pid_max: default: 32768 minimum: 301
[    0.080000] Mount-cache hash table entries: 512
[    0.080000] NET: Registered protocol family 16
[    0.090000] gpiochip_add: registered GPIOs 0 to 29 on device: ath79
[    0.090000] MIPS: machine is Arduino Yun
[    0.530000] Setting DogStick2 GPIO
[    0.550000] bio: create slab <bio-0> at 0
[    0.550000] SCSI subsystem initialized
[    0.560000] usbcore: registered new interface driver usbfs
[    0.560000] usbcore: registered new interface driver hub
[    0.560000] usbcore: registered new device driver usb
[    0.570000] Switching to clocksource MIPS
[    0.570000] NET: Registered protocol family 2
[    0.570000] IP route cache hash table entries: 1024 (order: 0, 4096 bytes)
[    0.580000] TCP established hash table entries: 2048 (order: 2, 16384 bytes)
[    0.580000] TCP bind hash table entries: 2048 (order: 1, 8192 bytes)
[    0.580000] TCP: Hash tables configured (established 2048 bind 2048)
[    0.580000] TCP reno registered
[    0.580000] UDP hash table entries: 256 (order: 0, 4096 bytes)
[    0.590000] UDP-Lite hash table entries: 256 (order: 0, 4096 bytes)
[    0.590000] NET: Registered protocol family 1
[    0.610000] squashfs: version 4.0 (2009/01/31) Phillip Lougher
[    0.610000] JFFS2 version 2.2 (NAND) (SUMMARY) (LZMA) (RTIME) (CMODE_PRIORITY) (c) 2001-2006 Red Hat, Inc.
[    0.620000] msgmni has been set to 119
[    0.620000] Block layer SCSI generic (bsg) driver version 0.4 loaded (major 254)
[    0.620000] io scheduler noop registered
[    0.630000] io scheduler deadline registered (default)
[    0.630000] Serial: 8250/16550 driver, 16 ports, IRQ sharing enabled
[    0.640000] ar933x-uart: ttyATH0 at MMIO 0x18020000 (irq = 11) i{ a AR933X UART
[    0.640000] console [ttyATH0] enabled, bootconsole disabled
[    0.640000] console [ttyATH0] enabled, bootconsole disabled
[    0.650000] m25p80 spi0.0: found w25q128, expected m25p80
[    0.650000] m25p80 spi0.0: w25q128 (16384 Kbytes)
[    0.650000] 7 cmdlinepart partitions found on MTD device spi0.0
[    0.660000] Creating 7 MTD partitions on "spi0.0":
[    0.660000] 0x000000000000-0x000000040000 : "u-boot"
[    0.660000] 0x000000040000-0x000000050000 : "u-boot-env"
[    0.670000] 0x000000050000-0x000000ea0000 : "rootfs"
[    0.670000] mtd: partition "rootfs" set to be root filesystem
[    0.670000] mtd: partition "rootfs_data" created automatically, ofs=7A0000, len=700000
[    0.680000] 0x0000007a0000-0x000000ea0000 : "rootfs_data"
[    0.680000] 0x000000ea0000-0x000000fe0000 : "kernel"
[    0.680000] 0x000000fe0000-0x000000ff0000 : "nvram"
[    0.690000] 0x000000ff0000-0x000001000000 : "art"
[    0.690000] 0x000000050000-0x000000fe0000 : "firmware"
[    0.710000] ag71xx_mdio: probed
[    0.720000] eth0: Atheros AG71xx at 0xba000000, irq 5
[    1.270000] eth0: Found an AR7240/AR9330 built-in switch
[    2.300000] eth1: Atheros AG71xx at 0xb9000000, irq 4
[    2.850000] ag71xx ag71xx.0: eth1: connected to PHY at ag71xx-mdio.1:04 [uid=004dd041, driver=Generic PHY]
[    2.850000] ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
[    2.850000] ehci-platform ehci-platform: Generic Platform EHCI Controller
[    2.860000] ehci-platform ehci-platform: new USB bus registered, assigned bus number 1
[    2.890000] ehci-platform ehci-platform: irq 3, io mem 0x1b000000
[    2.910000] ehci-platform ehci-platform: USB 2.0 started, EHCI 1.00
[    2.910000] usb usb1: New USB device found, idVendor=1d6b, idProduct=0002
[    2.910000] usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[    2.910000] usb usb1: Product: Generic Platform EHCI Controller
[    2.920000] usb usb1: Manufacturer: Linux 3.3.8 ehci_hcd
[    2.920000] usb usb1: SerialNumber: ehci-platform
[    2.920000] hub 1-0:1.0: USB hub found
[    2.920000] hub 1-0:1.0: 1 port detected
[    2.930000] Initializing USB Mass Storage driver...
[    2.930000] usbcore: registered new interface driver usb-storage
[    2.930000] USB Mass Storage support registered.
[    2.930000] input: gpio-keys-polled as /devices/platform/gpio-keys-polled/input/input0
[    2.940000] sdhci: Secure Digital Host Controller Interface driver
[    2.940000] sdhci: Copyright(c) Pierre Ossman
[    2.940000] usbcore: registered new interface driver ushc
[    2.940000] TCP cubic registered
[    2.950000] NET: Registered protocol family 17
[    2.950000] Bridge firewalling registered
[    2.950000] 8021q: 802.1Q VLAN Support v1®8
[    2.960000] VFS: Mounted root (squashfs filesystem) readonly on device 31:2.
[    2.960000] Freeing unused kernel memory: 180k freed
[    3.250000] usb 1-1: new high-speed USB device number 2 using ehci-platform
[    3.460000] usb 1-1: New USB device found, idVendor=058f, idProduct=6254
[    3.460000] usb 1-1: New USB device strings: Mfr=0, Product=1, SerialNumber=0
[    3.470000] usb 1-1: Product: USB2.0Hub
[    3.570000] hub 1-1:1.0: USB hub found
[    3.570000] hub 1-1:1.0: 4 ports detected
[    3.990000] usb 1-1.4: new high-speed USB device number 3 using ehci-platform
[    4.200000] usb 1-1.4: New USB device found, idVendor=058f, idProduct=6366
[    4.200000] usb 1-1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[    4.200000] usb 1-1.4: Product: Mass Storage Device
[    4.200000] usb 1-1.4: Manufacturer: Generic
[    4.210000] usb 1-1.4: SerialNumber: 058F0O1111B1
[    4.280000] scsi0 : usb-storage 1-1.4:1.0
[    5.030000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[    5.280000] scsi 0:0:0:0: Direct-Access     Multi    Flash Reader     1.00 PQ: 0 ANSI: 0
- preinit -
Press the [f] key and hit [enter] to enter failsafe mode
- regular preinit -
[    9.580000] JFFS2 notice: (525) jffs2_build_xattr_subsystem: complete building xattr subsystem, 1 of xdatum (1 unchecked, 0 orphan) and 43 of xref (0 dead, 32 orphan) found.
[   10.770000] sd 0:0:0:0: [sda] Attached SCSI removable disk
switching to jffs2
- init -

Please press Enter to activate this console. [   38.170000] Loading modules backported from Linux version master-2014-01-23-0-g62c147d
[   38.180000] Backport generated by backports.git backports-20140124-0-g1256d3e
[   38.210000] cfg80211: Calling CRDA to update world regulatory domain
[   38.220000] cfg80211: World regulatory domain updated:
[   38.220000] cfg80211:  DFS Master region: unset
[   38.220000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp)
[   38.230000] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (300 mBi, 2000 mBm)
[   38.230000] cfg80211:   (2457000 KHz - 2482000 KHz @ 40000 KHz), (300 mBi, 2000 mBm)
[   38.230000] cfg80211:   (2474000 KHz - 2494000 KHz @ 20000 KHz), (300 mBi, 2000 mBm)
[   38.240000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (300 mBi, 2000 mBm)
[   38.240000] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (300 mBi, 2000 mBm)
[   38.240000] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 0 mBm)
[   39.210000] ieee80211 phy0: Atheros AR9330 Rev:1 mem=0xb8100000, irq=2
[   39.210000] cfg80211: Calling CRDA for country: US
[   39.220000] cfg80211: Regulatory domain changed to country: US
[   39.220000] cfg80211:  DFS Master region: FCC
[   39.220000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp)
[   39.220000] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (300 mBi, 2700 mBm)
[   39.230000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (300 mBi, 1700 mBm)
[   39.230000] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz), (300 mBi, 2400 mBm)
[   39.240000] cfg80211:   (5490000 KHz - 5600000 KHz @ 80000 KHz), (300 mBi, 2400 mBm)
[   39.240000] cfg80211:   (5650000 KHz - 5710000 KHz @ 40000 KHz), (300 mBi, 2400 mBm)
[   39.240000] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (300 mBi, 3000 mBm)
[   39.250000] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 4000 mBm)
[   39.660000] NTFS driver 2.1.30 [Flags: R/O MODULE].
[   39.700000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[   39.740000] loop: module loaded
[   39.870000] PPP generic driver version 2.4.2
[   39.930000] ip_tables: (C) 2000-2006 Netfilter Core Team
[   40.050000] NET: Registered protocol family 24
[   40.080000] nf_conntrack version 0.5.0 (954 buckets, 3816 max)
[   40.520000] i2c /dev entries driver
[   40.560000] Linux video capture interface: v2.00
[   40.680000] fuse init (API version 7.18)
[   50.260000] cfg80211: Calling CRDA for country: IT
[   50.260000] cfg80211: Regulatory domain changed to country: IT
[   50.260000] cfg80211:  DFS Master region: ETSI
[   50.260000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp)
[   50.270000] cfg80211:   (2402000 KHz - 2482000 KHz @ 40000 KHz), (N/A, 2000 mBm)
[   50.270000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (N/A, 2000 mBm)
[   50.270000] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz), (N/A, 2000 mBm)
[   50.280000] cfg80211:   (5490000 KHz - 5710000 KHz @ 80000 KHz), (N/A, 2700 mBm)
[   50.280000] cfg80211:   (57240000 KHz - 65880000 KHz @ 2160000 KHz), (N/A, 4000 mBm)
[   53.680000] wlan0: authenticate with 00:22:6b:6e:3a:43
[   53.690000] wlan0: send auth to 00:22:6b:6e:3a:43 (try 1/3)
[   53.690000] wlan0: authenticated
[   53.710000] ath9k ar933x_wmac: wlan0: disabling HT/VHT due to WEP/TKIP use
[   53.710000] ath9k ar933x_wmac: wlan0: disabling HT as WMM/QoS is not supported by the AP
[   53.710000] ath9k ar933x_wmac: wlan0: disabling VHT as WMM/QoS is not supported by the AP
[   53.730000] wlan0: associate with 00:22:6b:6e:3a:43 (try 1/3)
[   53.830000] wlan0: RX AssocResp from 00:22:6b:6e:3a:43 (capab=0x411 status=0 aid=8)
[   53.840000] wlan0: associated
```

### Upgrading using the terminal

ssh root@YunGmacario.local

```
gmacario@ITM-GMACARIO-W7 ~
$ ssh root@YunGmacario.local
root@yungmacario.local's password:


BusyBox v1.19.4 (2014-04-10 11:08:41 CEST) built-in shell (ash)
Enter 'help' for a list of built-in commands.

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------


root@YunGmacario:~#
```

Now execute the sysupgrade command:

```
# run-sysupgrade /mnt/sda1/openwrt-ar71xx-generic-yun-16M-squashfs-sysupgrade.bin
```

Result:

```
root@YunGmacario:~# run-sysupgrade /mnt/sda1/openwrt-ar71xx-generic-yun-16M-squashfs-sysupgrade.bin
Sending TERM to remaining processes ... uhttpd dbus-daemon dnsmasq thd ntpd uSDaemon sleep syslogd klogd hotplug2 ubusd netifd
Sending KILL to remaining processes ... uhttpd
Switching to ramdisk...
Performing system upgrade...
Unlocking firmware ...

Writing from <stdin> to firmware ...
Upgrade completed
Rebooting system...
```

The Yun will be rebooted with factory settings, so connect
to WiFi network `Arduino Yun-xxxxxxxxxxxx`, then browse
<http://arduino.local/> to configure it again.

#### Boot log after upgrading Yun

```
Speed set to 250000


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
Hit any key to stop autoboot:  4  3  2  1  0
## Booting image at 9fea0000 ...
   Image Name:   MIPS OpenWrt Linux-3.3.8
   Created:      2014-11-14   8:00:46 UTC
   Image Type:   MIPS Linux Kernel Image (lzma compressed)
   Data Size:    1185448 Bytes =  1.1 MB
   Load Address: 80060000
   Entry Point:  80060000
   Verifying Checksum at 0x9fea0040 ...OK
   Uncompressing Kernel Image ... OK
No initrd
## Transferring control to Linux (at address 80060000) ...
## Giving linux memsize in bytes, 67108864

Starting kernel ...

[    0.000000] Linux version 3.3.8 (jenkins@jenkins) (gcc version 4.6.3 20120201 (prerelease) (Linaro GCC 4.6-2012.02) ) #1 Fri Nov 14 08:57:34 CET 2014
[    0.000000] bootconsole [early0] enabled
[    0.000000] CPU revision is: 00019374 (MIPS 24Kc)
[    0.000000] SoC: Atheros AR9330 rev 1
[    0.000000] Clocks: CPU:400.000MHz, DDR:400.000MHz, AHB:200.000MHz, Ref:25.000MHz
[    0.000000] Determined physical RAM map:
[    0.000000]  memory: 04000000 @ 00000000 (usable)
[    0.000000] Initrd not found or empty - disabling initrd
[    0.000000] Zone PFN ranges:
[    0.000000]   Normal   0x00000000 -> 0x00004000
[    0.000000] Movable zone start PFN for each node
[    0.000000] Early memory PFN ranges
[    0.000000]     0: 0x00000000 -> 0x00004000
[    0.000000] Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 16256
[    0.000000] Kernel command line:  board=Yun console=ttyATH0,250000 mtdparts=spi0.0:256k(u-boot)ro,64k(u-boot-env)ro,14656k(rootfs),1280k(kernel),64k(nvram),64k(art),15936k@0x50000(firmware) rootfstype=squashfs,jffs2 noinitrd
[    0.000000] PID hash table entries: 256 (order: -2, 1024 bytes)
[    0.000000] Dentry cache hash table entries: 8192 (order: 3, 32768 bytes)
[    0.000000] Inode-cache hash table entries: 4096 (order: 2, 16384 bytes)
[    0.000000] Primary instruction cache 64kB, VIPT, 4-way, linesize 32 bytes.
[    0.000000] Primary data cache 32kB, 4-way, VIPT, cache aliases, linesize 32 bytes
[    0.000000] Writing ErrCtl register=00000000
[    0.000000] Readback ErrCtl register=00000000
[    0.000000] Memory: 60936k/65536k available (2565k kernel code, 4600k reserved, 650k data, 180k init, 0k highmem)
[    0.000000] SLUB: Genslabs=9, HWalign=32, Order=0-3, MinObjects=0, CPUs=1, Nodes=1
[    0.000000] NR_IRQS:51
[    0.000000] Calibrating delay loop... 265.42 BogoMIPS (lpj=1327104)
[    0.080000] pid_max: default: 32768 minimum: 301
[    0.080000] Mount-cache hash table entries: 512
[    0.080000] NET: Registered protocol family 16
[    0.090000] gpiochip_add: registered GPIOs 0 to 29 on device: ath79
[    0.090000] MIPS: machine is Arduino Yun
[    0.530000] Setting DogStick2 GPIO
[    0.550000] bio: create slab <bio-0> at 0
[    0.550000] SCSI subsystem initialized
[    0.560000] usbcore: registered new interface driver usbfs
[    0.560000] usbcore: registered new interface driver hub
[    0.560000] usbcore: registered new device driver usb
[    0.570000] Switching to clocksource MIPS
[    0.570000] NET: Registered protocol family 2
[    0.570000] IP route cache hash table entries: 1024 (order: 0, 4096 bytes)
[    0.580000] TCP established hash table entries: 2048 (order: 2, 16384 bytes)
[    0.580000] TCP bind hash table entries: 2048 (order: 1, 8192 bytes)
[    0.580000] TCP: Hash tables configured (established 2048 bind 2048)
[    0.580000] TCP reno registered
[    0.580000] UDP hash table entries: 256 (order: 0, 4096 bytes)
[    0.590000] UDP-Lite hash table entries: 256 (order: 0, 4096 bytes)
[    0.590000] NET: Registered protocol family 1
[    0.610000] squashfs: version 4.0 (2009/01/31) Phillip Lougher
[    0.610000] JFFS2 version 2.2 (NAND) (SUMMARY) (LZMA) (RTIME) (CMODE_PRIORITY) (c) 2001-2006 Red Hat, Inc.
[    0.620000] msgmni has been set to 119
[    0.620000] Block layer SCSI generic (bsg) driver version 0.4 loaded (major 254)
[    0.620000] io scheduler noop registered
[    0.630000] io scheduler deadline registered (default)
[    0.630000] Serial: 8250/16550 driver, 16 ports, IRQ sharing enabled
[    0.640000] ar933x-uart: ttyATH0 at MMIO 0x18020000 (irq = 11) i{ a AR933X UART
[    0.640000] console [ttyATH0] enabled, bootconsole disabled
[    0.640000] console [ttyATH0] enabled, bootconsole disabled
[    0.650000] m25p80 spi0.0: found w25q128, expected m25p80
[    0.650000] m25p80 spi0.0: w25q128 (16384 Kbytes)
[    0.650000] 7 cmdlinepart partitions found on MTD device spi0.0
[    0.660000] Creating 7 MTD partitions on "spi0.0":
[    0.660000] 0x000000000000-0x000000040000 : "u-boot"
[    0.660000] 0x000000040000-0x000000050000 : "u-boot-env"
[    0.670000] 0x000000050000-0x000000ea0000 : "rootfs"
[    0.670000] mtd: partition "rootfs" set to be root filesystem
[    0.670000] mtd: partition "rootfs_data" created automatically, ofs=7B0000, len=6F0000
[    0.680000] 0x0000007b0000-0x000000ea0000 : "rootfs_data"
[    0.680000] 0x000000ea0000-0x000000fe0000 : "kernel"
[    0.680000] 0x000000fe0000-0x000000ff0000 : "nvram"
[    0.690000] 0x000000ff0000-0x000001000000 : "art"
[    0.690000] 0x000000050000-0x000000fe0000 : "firmware"
[    0.710000] ag71xx_mdio: probed
[    0.720000] eth0: Atheros AG71xx at 0xba000000, irq 5
[    1.270000] eth0: Found an AR7240/AR9330 built-in switch
[    2.300000] eth1: Atheros AG71xx at 0xb9000000, irq 4
[    2.850000] ag71xx ag71xx.0: eth1: connected to PHY at ag71xx-mdio.1:04 [uid=004dd041, driver=Generic PHY]
[    2.850000] ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
[    2.850000] ehci-platform ehci-platform: Generic Platform EHCI Controller
[    2.860000] ehci-platform ehci-platform: new USB bus registered, assigned bus number 1
[    2.890000] ehci-platform ehci-platform: irq 3, io mem 0x1b000000
[    2.910000] ehci-platform ehci-platform: USB 2.0 started, EHCI 1.00
[    2.910000] usb usb1: New USB device found, idVendor=1d6b, idProduct=0002
[    2.910000] usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[    2.910000] usb usb1: Product: Generic Platform EHCI Controller
[    2.920000] usb usb1: Manufacturer: Linux 3.3.8 ehci_hcd
[    2.920000] usb usb1: SerialNumber: ehci-platform
[    2.920000] hub 1-0:1.0: USB hub found
[    2.920000] hub 1-0:1.0: 1 port detected
[    2.930000] Initializing USB Mass Storage driver...
[    2.930000] usbcore: registered new interface driver usb-storage
[    2.930000] USB Mass Storage support registered.
[    2.930000] input: gpio-keys-polled as /devices/platform/gpio-keys-polled/input/input0
[    2.940000] sdhci: Secure Digital Host Controller Interface driver
[    2.940000] sdhci: Copyright(c) Pierre Ossman
[    2.940000] usbcore: registered new interface driver ushc
[    2.940000] TCP cubic registered
[    2.950000] NET: Registered protocol family 17
[    2.950000] Bridge firewalling registered
[    2.950000] 8021q: 802.1Q VLAN Support v1.8
[    2.960000] VFS: Mounted root (squashfs filesystem) readonly on device 31:2.
[    2.960000] Freeing unused kernel memory: 180k freed
[    3.260000] usb 1-1: new high-speed USB device number 2 using ehci-platform
[    3.460000] usb 1-1: New USB device found, idVendor=058f, idProduct=6254
[    3.460000] usb 1-1: New USB device strings: Mfr=0, Product=1, SerialNumber=0
[    3.470000] usb 1-1: Product: USB2.0Hub
[    3.550000] hub 1-1:1.0: USB hub found
[    3.550000] hub 1-1:1.0: 4 ports detected
[    3.990000] usb 1-1.4: new high-speed USB device number 3 using ehci-platform
[    4.150000] usb 1-1.4: New USB device found, idVendor=058f, idProduct=6366
[    4.150000] usb 1-1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[    4.160000] usb 1-1.4: Product: Mass Storage Device
[    4.160000] usb 1-1.4: Manufacturer: Generic
[    4.160000] usb 1-1.4: SerialNumber: 058F0O1111B1
[    4.200000] scsi0 : usb-storage 1-1.4:1.0
[    4.990000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[    5.240000] scsi 0:0:0:0: Direct-Access     Multi    Flash Reader     1.00 PQ: 0 ANSI: 0
- preinit -
Press the [f] key and hit [enter] to enter failsafe mode
- regular preinit -
[    9.540000] JFFS2 notice: (526) jffs2_build_xattr_subsystem: complete building xattr subsystem, 1 of xdatum (0 unchecked, 0 orphan) and 13 of xref (0 dead, 2 orphan) found.
[   11.310000] sd 0:0:0:0: [sda] 31116288 512-byte logical blocks: (15.9 GB/14.8 GiB)
[   11.310000] sd 0:0:0:0: [sda] Write Protect is off
[   11.310000] sd 0:0:0:0: [sda] No Caching mode page present
[   11.320000] sd 0:0:0:0: [sda] Assuming drive cache: write through
[   11.320000] sd 0:0:0:0: [sda] No Caching mode page present
[   11.330000] sd 0:0:0:0: [sda] Assuming drive cache: write through
[   11.340000]  sda: sda1
[   11.350000] sd 0:0:0:0: [sda] No Caching mode page present
[   11.350000] sd 0:0:0:0: [sda] Assuming drive cache: write through
[   11.350000] sd 0:0:0:0: [sda] Attached SCSI removable disk
switching to jffs2
- init -

Please press Enter to activate this console. [   38.700000] Loading modules backported from Linux version master-2014-05-22-0-gf2032ea
[   38.700000] Backport generated by backports.git backports-20140320-37-g5c33da0
[   38.870000] cfg80211: Calling CRDA to update world regulatory domain
[   38.880000] cfg80211: World regulatory domain updated:
[   38.880000] cfg80211:  DFS Master region: unset
[   38.880000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
[   38.890000] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[   38.890000] cfg80211:   (2457000 KHz - 2482000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[   38.890000] cfg80211:   (2474000 KHz - 2494000 KHz @ 20000 KHz), (N/A, 2000 mBm), (N/A)
[   38.900000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (N/A, 2000 mBm), (N/A)
[   38.900000] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 2000 mBm), (N/A)
[   38.900000] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 0 mBm), (N/A)
[   39.860000] ieee80211 phy0: Atheros AR9330 Rev:1 mem=0xb8100000, irq=2
[   39.870000] cfg80211: Calling CRDA for country: US
[   39.870000] cfg80211: Regulatory domain changed to country: US
[   39.870000] cfg80211:  DFS Master region: FCC
[   39.880000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
[   39.880000] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (N/A, 3000 mBm), (N/A)
[   39.880000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (N/A, 1700 mBm), (N/A)
[   39.890000] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz), (N/A, 2300 mBm), (0 s)
[   39.890000] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 3000 mBm), (N/A)
[   39.890000] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 4000 mBm), (N/A)
[   40.320000] NTFS driver 2.1.30 [Flags: R/O MODULE].
[   40.360000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[   40.380000] loop: module loaded
[   40.520000] PPP generic driver version 2.4.2
[   40.570000] ip_tables: (C) 2000-2006 Netfilter Core Team
[   40.690000] NET: Registered protocol family 24
[   40.730000] nf_conntrack version 0.5.0 (954 buckets, 3816 max)
[   41.170000] i2c /dev entries driver
[   41.210000] Linux video capture interface: v2.00
[   41.330000] fuse init (API version 7.18)
```

After sysupgrade, this Yun runs a version of OpenWrt-Yun built on Nov 14, 2014

<!-- EOF -->

---
layout: post
title:  "Notes from the Arduino Day 2015 c/o Officine Arduino Torino"
date:   2015-03-28 14:00:00 CET
tags:   arduino day fablab torino
---
<!-- markdown-link-check-disable -->

The [Arduino Day 2015](https://day.arduino.cc/) in Torino took place at [Toolbox Coworking](http://www.toolboxoffice.it/), home of [FabLab Torino](http://fablabtorino.org/) and [Officine Arduino](http://local.arduino.cc/torino/).

I made a quick visit, mostly to attend the Arduino PRO workshop in the afternoon.

## Talks

I had some time to attend a few talks before the Arduino PRO workshop started.

### Arduino e l’Internet of Things

(14:00-14:30)

Speaker: Federico Vanzati

Guest stars: Bruce and Jasmina Sterling -- talking about Casa Jasmina.

### Il lato web di Arduino, dalle evoluzioni dei siti Arduino all’IoT

(14:30-15:10)

Speaker: Luca Cipriani

## Workshop Arduino PRO @Arduino DAY 2015

(2015-03-28 15:00-17:00 CET)

Reference: <http://www.eventbrite.it/e/biglietti-workshop-pro-arduino-day-2015-torino-16276959825>

> Dettagli evento
>
> Scopri le basi della progettazione con Arduino!
>
> Una demo per scoprire Arduino Yùn e l'IoT. con Arturo Guadalupi e Angelo Scialabba (Officine Arduino)
>
> Collega Arduino Yùn ai servizi web tramite temboo e crea la tua interfaccia web di controllo!
> La demo inizierà alle 15:00, quindi ti consigliamo di arrivare 10 minuti prima e non dimenticare di portare con te il tuo laptop per mettere subito in pratica quanto appreso!
>
> Per ogni informazione, contattare <mailto:arduinoday2015-it@arduino.cc>

### Preparation

See [my blog post](https://github.com/gmacario/gmacario.github.io/blob/master/_posts/2015-03-27-preparing-my-yun-for-the-arduino-day.md).

### Arduino PRO workshop

The worshop took place in "sala didattica" of FabLab Torino.

About 30 participants were preregisterd and brought their own laptop.

Each participant was provided with the following kit, then walked through some exercises to get familiar with the Arduino YUN and connect it to the web.

Kudos to the few instructors who were very helpful to resolve the few issues -- mainly because of each PC settings -- which some of the participants encountered during the workshop.

#### Contents of the TinkerKit box

* 1 x Laser-cut wooden box
* 1 x [Arduino YUN](http://store.arduino.cc/product/A000008)
* 1 x [Arduino Leonardo with Headers](http://store.arduino.cc/product/A000057)
* 1 x [TinkerKit Sensor Shield](TODO)
* 1 x [TinkerKit Yellow LED [10mm]](http://store.arduino.cc/product/T010117)
* 1 x [TinkerKit Green LED [10mm]](http://store.arduino.cc/product/T010116)
* 1 x [TinkerKit Red LED [5mm]](http://store.arduino.cc/product/T010114)
* 1 x [TinkerKit Yellow LED [5mm]](http://store.arduino.cc/product/T010113)
* 2 x [TinkerKit Green LED [5mm]](http://store.arduino.cc/product/T010112)
* 1 x [TinkerKit Power LED](http://store.arduino.cc/product/T010110)
* 1 x [TinkerKit Relay Module](http://store.arduino.cc/product/T010010)
* 1 x [TinkerKit Joystick](http://store.arduino.cc/product/T000030)
* 1 x [TinkerKit Linear Potentiometer](http://store.arduino.cc/product/T000150)
* 1 x [TinkerKit PushButton](http://store.arduino.cc/product/T000180)
* 1 x [TinkerKit LDR Sensor](http://store.arduino.cc/product/T000090)
* 1 x [TinkerKit Rotary Potentiometer](http://store.arduino.cc/product/T000140)
* 1 x [TinkerKit Thermistor Module](http://store.arduino.cc/product/T000200)
* 1 x [TinkerKit Tilt Sensor](http://store.arduino.cc/product/T000190)
* 1 x [TinkerKit Cable [50cm]](http://store.arduino.cc/product/T020070) (3-pin jumper on both sides)
* 1 x USB-A/MicroUSB cable l=1m

Reference: <https://www1.elfa.se/data1/wwwroot/assets/datasheets/K000001_eng_tds.pdf>

#### Architecture of the Arduino YUN

From <http://arduino.cc/en/Main/ArduinoBoardYun>

![Arduino YUN Block Diagram](http://arduino.cc/en/uploads/Main/BridgeInShort.png)


#### Restore Yun to factory settings

Let us first upload a sketch to the ATmega to be able to debug the AR9331 side of the Arduino YUN.

Start the Arduino IDE on your laptop - if you haven't installed yet, you may download it from <http://arduino.cc/en/main/software>.

Arduino:

* File > Examples > Bridge > YunSerialTerminal
* Tools > Board > Arduino YUN
* Tools > Port > COMxx (Arduino YUN)
* File > Upload
* Tools > Serial Monitor

Check settings
- Newline
- 115200 baud

Plug YUN, wait for the blue WLAN LED to blink

Press the "WiFi" button for 30 seconds to restore factory image and settings.

Console log:

```text
U-Boot 1.1.4-g15f12ddd-dirty (Oct 14 2014 - 16:01:08)

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
autoboot in 4 seconds (type 'ard' to enter u-boot console)...
## Booting image at 9fea0000 ...
   Image Name:   MIPS OpenWrt Linux-3.3.8
   Created:      2014-10-14  14:18:52 UTC
   Image Type:   MIPS Linux Kernel Image (lzma compressed)
   Data Size:    1135978 Bytes =  1.1 MB
   Load Address: 80060000
   Entry Point:  80060000
   Verifying Checksum at 0x9fea0040 ...OK
   Uncompressing Kernel Image ... OK
No initrd
## Transferring control to Linux (at address 80060000) ...
## Giving linux memsize in bytes, 67108864

Starting kernel ...

[    0.000000] Linux version 3.3.8 (federico@smilzo) (gcc version 4.6.3 20120201 (prerelease) (Linaro GCC 4.6-2012.02) ) #1 Tue Oct 14 16:17:49 CEST 2014
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
[    0.000000] Memory: 61092k/65536k available (2441k kernel code, 4444k reserved, 626k data, 176k init, 0k highmem)
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
[    0.570000] TCP established hash table entries: 2048 (order: 2, 16384 bytes)
[    0.580000] TCP bind hash table entries: 2048 (order: 1, 8192 bytes)
[    0.580000] TCP: Hash tables configured (established 2048 bind 2048)
[    0.580000] TCP reno registered
[    0.580000] UDP hash table entries: 256 (order: 0, 4096 bytes)
[    0.590000] UDP-Lite hash table entries: 256 (order: 0, 4096 bytes)
[    0.590000] NET: Registered protocol family 1
[    0.610000] squashfs: version 4.0 (2009/01/31) Phillip Lougher
[    0.610000] JFFS2 version 2.2 (NAND) (SUMMARY) (LZMA) (RTIME) (CMODE_PRIORITY) (c) 2001-2006 Red Hat, Inc.
[    0.620000] msgmni has been set to 119
[    0.620000] io scheduler noop registered
[    0.620000] io scheduler deadline registered (default)
[    0.630000] Serial: 8250/16550 driver, 1 ports, IRQ sharing disabled
[    0.630000] ar933x-uart: ttyATH0 at MMIO 0x18020000 (irq = 11) is a AR933X UART
[    0.630000] console [ttyATH0] enabled, bootconsole disabled
[    0.630000] console [ttyATH0] enabled, bootconsole disabled
[    0.640000] m25p80 spi0.0: found w25q128, expected m25p80
[    0.640000] m25p80 spi0.0: w25q128 (16384 Kbytes)
[    0.640000] 7 cmdlinepart partitions found on MTD device spi0.0
[    0.650000] Creating 7 MTD partitions on "spi0.0":
[    0.650000] 0x000000000000-0x000000040000 : "u-boot"
[    0.650000] 0x000000040000-0x000000050000 : "u-boot-env"
[    0.660000] 0x000000050000-0x000000ea0000 : "rootfs"
[    0.660000] mtd: partition "rootfs" set to be root filesystem
[    0.660000] mtd: partition "rootfs_data" created automatically, ofs=7A0000, len=700000
[    0.670000] 0x0000007a0000-0x000000ea0000 : "rootfs_data"
[    0.670000] 0x000000ea0000-0x000000fe0000 : "kernel"
[    0.670000] 0x000000fe0000-0x000000ff0000 : "nvram"
[    0.680000] 0x000000ff0000-0x000001000000 : "art"
[    0.680000] 0x000000050000-0x000000fe0000 : "firmware"
[    0.700000] ag71xx_mdio: probed
[    0.710000] eth0: Atheros AG71xx at 0xba000000, irq 5
[    1.260000] eth0: Found an AR7240/AR9330 built-in switch
[    2.290000] eth1: Atheros AG71xx at 0xb9000000, irq 4
[    2.840000] ag71xx ag71xx.0: eth1: connected to PHY at ag71xx-mdio.1:04 [uid=004dd041, driver=Generic PHY]
[    2.840000] ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
[    2.840000] ehci-platform ehci-platform: Generic Platform EHCI Controller
[    2.850000] ehci-platform ehci-platform: new USB bus registered, assigned bus number 1
[    2.880000] ehci-platform ehci-platform: irq 3, io mem 0x1b000000
[    2.900000] ehci-platform ehci-platform: USB 2.0 started, EHCI 1.00
[    2.900000] usb usb1: New USB device found, idVendor=1d6b, idProduct=0002
[    2.900000] usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[    2.900000] usb usb1: Product: Generic Platform EHCI Controller
[    2.910000] usb usb1: Manufacturer: Linux 3.3.8 ehci_hcd
[    2.910000] usb usb1: SerialNumber: ehci-platform
[    2.910000] hub 1-0:1.0: USB hub found
[    2.910000] hub 1-0:1.0: 1 port detected
[    2.920000] Initializing USB Mass Storage driver...
[    2.920000] usbcore: registered new interface driver usb-storage
[    2.920000] USB Mass Storage support registered.
[    2.920000] input: gpio-keys-polled as /devices/platform/gpio-keys-polled/input/input0
[    2.930000] sdhci: Secure Digital Host Controller Interface driver
[    2.930000] sdhci: Copyright(c) Pierre Ossman
[    2.930000] usbcore: registered new interface driver ushc
[    2.930000] TCP cubic registered
[    2.940000] NET: Registered protocol family 17
[    2.940000] 8021q: 802.1Q VLAN Support v1>8
[    2.950000] VFS: Mounted root (squashfs filesystem) readonly on device 31:2.
[    2.950000] Freeing unused kernel memory: 176k freed
[    3.290000] usb 1-1: new high-speed USB device number 2 using ehci-platform
[    3.630000] usb 1-1: New USB device found, idVendor=058f, idProduct=6254
[    3.630000] usb 1-1: New USB device strings: Mfr=0, Product=1, SerialNumber=0
[    3.630000] usb 1-1: Product: USB2.0Hub
[    3.700000] hub 1-1:1.0: USB hub found
[    3.700000] hub 1-1:1.0: 4 ports detected
[    4.110000] usb 1-1.4: new high-speed USB device number 3 using ehci-platform
[    4.280000] usb 1-1.4: New USB device found, idVendor=058f, idProduct=6366
[    4.280000] usb 1-1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[    4.280000] usb 1-1.4: Product: Mass Storage Device
[    4.280000] usb 1-1.4: Manufacturer: Generic
[    4.290000] usb 1-1.4: SerialNumber: 058F0O1111B1
[    4.300000] scsi0 : usb-storage 1-1.4:1.0
[    4.980000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[    5.300000] scsi 0:0:0:0: Direct-Access     Multi    Flash Reader     1.00 PQ: 0 ANSI: 0
- preinit -
Press the [f] key and hit [enter] to enter failsafe mode
- regular preinit -
[    9.540000] JFFS2 notice: (489) jffs2_build_xattr_subsystem: complete building xattr subsystem, 2 of xdatum (0 unchecked, 2 orphan) and 24 of xref (0 dead, 24 orphan) found.
[   10.870000] sd 0:0:0:0: [sda] Attached SCSI removable disk
switching to jffs2
- init -
[   38.190000] Loading modules backported from Linux version master-2014-05-22-0-gf2032ea
[   38.190000] Backport generated by backports.git backports-20140320-37-g5c33da0
[   38.370000] cfg80211: Calling CRDA to update world regulatory domain
[   38.370000] cfg80211: World regulatory domain updated:
[   38.370000] cfg80211:  DFS Master region: unset
[   38.370000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
[   38.380000] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[   38.380000] cfg80211:   (2457000 KHz - 2482000 KHz @ 40000 KHz), (N/A, 2000 mBm), (N/A)
[   38.380000] cfg80211:   (2474000 KHz - 2494000 KHz @ 20000 KHz), (N/A, 2000 mBm), (N/A)
[   38.390000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (N/A, 2000 mBm), (N/A)
[   38.390000] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 2000 mBm), (N/A)
[   38.390000] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 0 mBm), (N/A)
[   39.350000] ieee80211 phy0: Atheros AR9330 Rev:1 mem=0xb8100000, irq=2
[   39.360000] cfg80211: Calling CRDA for country: US
[   39.360000] cfg80211: Regulatory domain changed to country: US
[   39.360000] cfg80211:  DFS Master region: FCC
[   39.360000] cfg80211:   (start_freq - end_freq @ bandwidth), (max_antenna_gain, max_eirp), (dfs_cac_time)
[   39.370000] cfg80211:   (2402000 KHz - 2472000 KHz @ 40000 KHz), (N/A, 3000 mBm), (N/A)
[   39.370000] cfg80211:   (5170000 KHz - 5250000 KHz @ 80000 KHz), (N/A, 1700 mBm), (N/A)
[   39.370000] cfg80211:   (5250000 KHz - 5330000 KHz @ 80000 KHz), (N/A, 2300 mBm), (0 s)
[   39.380000] cfg80211:   (5735000 KHz - 5835000 KHz @ 80000 KHz), (N/A, 3000 mBm), (N/A)
[   39.380000] cfg80211:   (57240000 KHz - 63720000 KHz @ 2160000 KHz), (N/A, 4000 mBm), (N/A)
[   39.800000] NTFS driver 2.1.30 [Flags: R/O MODULE].
[   39.850000] Error: Driver 'gpio-keys-polled' is already registered, aborting...
[   39.870000] loop: module loaded
[   40.010000] PPP generic driver version 2.4.2
[   40.060000] ip_tables: (C) 2000-2006 Netfilter Core Team
[   40.180000] NET: Registered protocol family 24
[   40.210000] nf_conntrack version 0.5.0 (957 buckets, 3828 max)
[   40.660000] i2c /dev entries driver
[   40.690000] Linux video capture interface: v2.00
[   40.810000] fuse init (API version 7.18)

Please press Enter to activate this console.


BusyBox v1.19.4 (2014-10-14 16:01:45 CEST) built-in shell (ash)
Enter 'help' for a list of built-in commands.

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------


root@Arduino:/#
```

Verify default networking

```text
root@Arduino:/# ifconfig -a
eth0      Link encap:Ethernet  HWaddr 90:A2:DA:F0:1B:D4  
          BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:5

eth1      Link encap:Ethernet  HWaddr 90:A2:DA:F8:1B:D4  
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:4

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:16436  Metric:1
          RX packets:336 errors:0 dropped:0 overruns:0 frame:0
          TX packets:336 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:22848 (22.3 KiB)  TX bytes:22848 (22.3 KiB)

wlan0     Link encap:Ethernet  HWaddr 90:A2:DA:F0:1B:D4  
          inet addr:192.168.240.1  Bcast:192.168.240.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:16 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:3197 (3.1 KiB)

root@Arduino:/#
```

Look at "HWAddr" value for wlan0.

When reset from factory, the YUN creates an access point named after the wlan0 MAC address.

Connect to WiFi Network `Arduino YUN-xxxxxxxxxxxx` (in our case, this is `Arduino YUN-90A2DAF01BD4`).

Once you are successfully connected to the YUN, browse the contents of <http://arduino.local> to access the YUN configuration page.

Here I had some troubles, which I debugged as follows.

As my laptop was running MS Windows 7 and I had Cygwin installed, I used the following commands

```sh
$ ipconfig
$ ping 192.168.240.1
$ ping arduino.local
$ ssh root@arduino.local
```

Apparently in my case I was unable to get an IP address in the 192.168.240.x range from the YUN.

**TIP**: Set a static IP for your PC if you cannot get an IP address from the YUN.

Open Network and Sharing Center

* Select connection: "Wireless Network Connection (Arduino Yun-xxxxxx)" > Properties
* Select "Internet Protocol Version 4 (TCP/IPv4)" > Properties
  * Use the following IP address: TODO
  * Use the following DNS server addresses
    * Preferred DNS server: 8.8.8.8
    * Alternate DNS server: 8.8.4.4

Browse <http://192.168.240.1>

* Password: `xxxx` (default: `arduino`)

> WELCOME TO **ARDUINO**, YOUR ARDUINO YUN
> ...
>
> This Yun runs a version of OpenWrt-Yun built on oct 14,2014

Select "CONFIGURE"

> YUN BOARD CONFIGURATION

* YUN NAME: `AdayGmacario`
* Password: `sesam2015`
* Timezone: Europe/Rome

> WIRELESS PARAMETERS

* Configure a wireless network: Yes
* WIRELESS NAME: `FABLAB_TORINO` (WPA2, quality 74%)
* Security: WPA2
* Password: `xxxx`

REST API ACCESS

* WITH PASSWORD

Double check, then select "CONFIGURE & RESTART"

Watch Serial Monitor, the AR9331 will restart.

Reconnect your laptop to WiFi SSID `FABLAB_TORINO`

Make sure you reset your IPv4 properties to:

* Obtain an IP address automatically
* Obtain DNS server address automatically

Now access <http://adaygmacario.local>

* Password: (the one you chose before)

From the serial terminal

```text
root@AdayGmacario:/# ifconfig
eth1      Link encap:Ethernet  HWaddr 90:A2:DA:F8:1B:D4  
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:4

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:16436  Metric:1
          RX packets:17 errors:0 dropped:0 overruns:0 frame:0
          TX packets:17 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:1661 (1.6 KiB)  TX bytes:1661 (1.6 KiB)

wlan0     Link encap:Ethernet  HWaddr 90:A2:DA:F0:1B:D4  
          inet addr:192.168.1.246  Bcast:192.168.1.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:31543 errors:0 dropped:5586 overruns:0 frame:0
          TX packets:563 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:4217384 (4.0 MiB)  TX bytes:172166 (168.1 KiB)

root@AdayGmacario:/#
```

Look at field "inet addr" for interface "wlan0".

In my case the new IP address of my YUN (assigned by the WiFi access point which both my YUN and my laptop are now connected) is 192.168.1.246.

### How control I/O pin from the web

The Arduino YUN features a built-in webserver running on the AR9331 (Linino) which communicates through a bridge with the ATmega 32u4 (Arduino).

Example: see <http://arduino.cc/en/Tutorial/Bridge>

Arduino:

* File > Examples > Bridge > Bridge

Take the TinkerKit shield (take it off from the Arduino UNO)

Connect a LED to TinkerKit output 05 (digital output 3)

Browse <http://adaygmacario.local/>

Choose REST API ACCESS: OPEN (to avoid being asked for password every time)

Test:

* Turn off LED on TinkerKit Output 05
  * Command: <http://adaygmacario.local/arduino/digital/3/1>
  * Result: `Pin D3 set to 1`
* Turn off LED on TinkerKit Output 05
  * Command: <http://adaygmacario.local/arduino/digital/3/0>
  * Result: `Pin D3 set to 0`
* Read state of TinkerKit Output 05
  * Command: <http://adaygmacario.local/arduino/digital/3>
  * Result: `Pin D3 set to 0`

Connect the linear potentiometer to TinkerKit I0

Read <http://adaygmacario.local/arduino/analog/0>

* Min read: 10
* Max read: 855

Connect the green LED to TinkerKit O5

Change the intensity:

* Max: <http://adaygmacario.local/arduino/analog/3/255>
* 50%: <http://adaygmacario.local/arduino/analog/3/128>
* 25%: <http://adaygmacario.local/arduino/analog/3/64>
* 12%: <http://adaygmacario.local/arduino/analog/3/32>
* Off: <http://adaygmacario.local/arduino/analog/3/0>

<!-- markdown-link-check-enable -->
<!-- EOF -->

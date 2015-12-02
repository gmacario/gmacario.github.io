---
layout: post
title:  "Updating OpenWrt on Arduino YUN"
date:   2015-11-30 18:00:00 CET
categories: howto arduino yun openwrt install
---

Browse <https://www.arduino.cc/en/Guide/ArduinoYun>

Download Arduino IDE 1.6.6 from <https://www.arduino.cc/en/Main/Software> (choose the Windows installer).

Logged as gmacario@itm-gmacario-w7 (Windows 7 64-bit), double click `arduino-1.6.6-windows.exe` to install the Arduino IDE on your laptop.

Connect the MicroUSB connector of your Arduino YUN to the USB port of your laptop.

itm-gmacario-w7: Start > Computer > Properties > Device Manager > Ports (COM & LPT)

Inspect with COMxx is mapped to Arduino YUN - in my case

> Arduino Yun (COM25)

Start > Arduino IDE

Arduino IDE: Tools > Board: "Arduino Yun"

Arduino IDE: Tools > Port > COM25 (Arduino Yun)

Arduino IDE: Examples > Bridge > Yun Serial Terminal

Arduino IDE: Sketch > Upload

Arduino IDE: Tools > Serial Monitor

Exit Arduino IDE, launch a serial emulator (i.e. PuTTY)

itm-gmacario-w7: Start > PuTTY

Select COM25:115200,8,n,1

```
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

If you press <SPACE> during the boot you will get to the U-Boot prompt, otherwise Linino will boot.

Press <RETURN> to get a login from the serial console

```
[   40.690000] fuse init (API version 7.18)



BusyBox v1.19.4 (2014-11-13 19:03:47 CET) built-in shell (ash)
Enter 'help' for a list of built-in commands.

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------


root@YunGmacario:/#
```

Inspect CPU Information

```
root@YunGmacario:/# cat /proc/cpuinfo
system type             : Atheros AR9330 rev 1
machine                 : Arduino Yun
processor               : 0
cpu model               : MIPS 24Kc V7.4
BogoMIPS                : 265.42
wait instruction        : yes
microsecond timers      : yes
tlb_entries             : 16
extra interrupt vector  : yes
hardware watchpoint     : yes, count: 4, address/irw mask: [0x0000, 0x0ff8, 0x0ff8, 0x0ff8]
ASEs implemented        : mips16
shadow register sets    : 1
kscratch registers      : 0
core                    : 0
VCED exceptions         : not available
VCEI exceptions         : not available

root@YunGmacario:/#
```

Inspect kernel version

```
root@YunGmacario:/# cat /proc/version
Linux version 3.3.8 (jenkins@jenkins) (gcc version 4.6.3 20120201 (prerelease) (Linaro GCC 4.6-2012.02) ) #1 Fri Nov 14 08:57:34 CET 2014
root@YunGmacario:/#
```

Inspect disk space

```
root@YunGmacario:/# df
Filesystem           1K-blocks      Used Available Use% Mounted on
rootfs                    7104       600      6504   8% /
/dev/root                 7680      7680         0 100% /rom
tmpfs                    30560       100     30460   0% /tmp
tmpfs                      512         0       512   0% /dev
/dev/mtdblock3            7104       600      6504   8% /overlay
overlayfs:/overlay        7104       600      6504   8% /
root@YunGmacario:/#
```

Check network interfaces configuration

```
root@YunGmacario:/# ifconfig
eth1      Link encap:Ethernet  HWaddr 90:A2:DA:FB:0C:7B
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
          Interrupt:4

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:16436  Metric:1
          RX packets:672 errors:0 dropped:0 overruns:0 frame:0
          TX packets:672 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:45696 (44.6 KiB)  TX bytes:45696 (44.6 KiB)

wlan0     Link encap:Ethernet  HWaddr 90:A2:DA:F3:0C:7B
          inet addr:192.168.240.1  Bcast:192.168.240.255  Mask:255.255.255.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:17 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:3543 (3.4 KiB)

root@YunGmacario:/#
```

Check wireless network interfaces configuration

```
root@YunGmacario:/# iwconfig
lo        no wireless extensions.

eth1      no wireless extensions.

wlan0     IEEE 802.11bgn  Mode:Master  Tx-Power=16 dBm
          RTS thr:off   Fragment thr:off
          Power Management:off

eth0      no wireless extensions.

root@YunGmacario:/#
```

From the host, browse Wi-Fi network "Arduino Yun-xxxxxxxxxxxx"

Try "opkg update"

```
root@YunGmacario:/# opkg update
Downloading http://downloads.arduino.cc/openwrtyun/1/packages/Packages.gz.
Downloading http://downloads.arduino.cc/openwrtyun/1/packages/Packages.sig.
Signature check failed.
Remove wrong Signature file.
Collected errors:
 * opkg_download: Failed to download http://downloads.arduino.cc/openwrtyun/1/packages/Packages.gz: Error.
 * opkg_download: Failed to download http://downloads.arduino.cc/openwrtyun/1/packages/Packages.sig: Error.
root@YunGmacario:/#
```

TODO: Retry after setting up networking

```
root@YunGmacario:/# cat /etc/config/network

config interface 'loopback'
        option ifname 'lo'
        option proto 'static'
        option ipaddr '127.0.0.1'
        option netmask '255.0.0.0'

config interface 'lan'
        option ipaddr '192.168.240.1'
        option netmask '255.255.255.0'
        option proto 'static'

config interface 'wan'
        option ifname 'eth1'
        option proto 'dhcp'
        option metric '10'

root@YunGmacario:/#
```


<!-- EOF -->

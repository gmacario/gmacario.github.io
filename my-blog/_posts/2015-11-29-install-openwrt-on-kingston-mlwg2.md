---
layout: post
title:  "Installing OpenWrt on Kingston MLWG2"
date:   2015-11-29 08:30:00 CET
tags:   howto install openwrt mlwg2
---

### Introduction

This blog post explains how to install [OpenWrt](https://openwrt.org/) on the [Kingston Mobilelite Wireless MLWG2](http://www.kingston.com/us/wireless/wireless_readers).

### Download OpenWrt image for MLWG2
Download Chaos Chalmer 15.05 for mlwg2 from <https://downloads.openwrt.org/chaos_calmer/15.05/ramips/mt7620/>

File: <https://downloads.openwrt.org/chaos_calmer/15.05/ramips/mt7620/openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin>

```
gmacario@ITM-GMACARIO-W7 ~/Downloads
$ ls -la openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin
-rwxrwx---+ 1 Administrators Domain Users 3407876 Nov 29 08:38 openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin

gmacario@ITM-GMACARIO-W7 ~/Downloads
$ md5sum openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin
6948bca859a59797fc5f5978f004e11a *openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin

gmacario@ITM-GMACARIO-W7 ~/Downloads
$
```

### Prepare the install media

Plug a FAT32-formatted USB pendrive on the host and put the following files:

```
$ cd /media/xxx/
$ touch 'mlwG2_v;telnetd; .x.x.bin'
$ cp ~/Downloads/openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.bin .
$ ls -la
$ cd
$ umount /media/xxx
```

(Optional, recommended) Connect a USB-to-serial-TTL dongle to the serial console

| MLWG2 pad | Signal  | Notes                    | Connect to                |
|-----------|---------|--------------------------|---------------------------|
| 1         | +3.3Vdc | Marked with a white dot  | DO NOT CONNECT            |
| 2         | TX      | Close to R139            | USB-to-TTL dongle pin "R" |
| 3         | RX      | Close to R54             | USB-to-TTL dongle pin "T" |
| 4         | GND     | -                        | USB-to-TTL dongle pin "G" |

Launch a terminal emulator (COMx:57600,8,n,1)

Plug the USB Pendrive into the USB connector of the MLWG2.

Connect to Wi-Fi network "MLWG2-xxxx" (replace xxxx with the last two bytes of the MAC address)

Then telnet to 192.168.201.254 (username:admin; password:none)

```
C:\Users\gmacario>telnet 192.168.201.254

(none) login: admin

BusyBox v1.12.1 (2014-09-18 09:46:08 CST) built-in shell (ash)
Enter 'help' for a list of built-in commands.

#
```

Logged as admin@mlwg2

```
# mtd_write write /media/USB1/openwrt-ramips-mt7620n-mlwg2-squashfs-sysupgrade.bin KernelA
# mtd_write -r write /media/USB1/openwrt-ramips-mt7620n-mlwg2-squashfs-sysupgrade.bin KernelB
```

The MLWG2 will reboot after the second command is complete.

Result:

```
# ls -la /media
drwxrwxrwx    2 0        0            4096 USB1
drwxr-xr-x   18 0        0               0 ..
drwxr-xr-x    3 0        0               0 .
# ls -la /media/USB1
-rwxrwxrwx    1 0        0         3407876 openwrt-15.05-ramips-mt7620-mlwg2-squ
ashfs-sysupgrade.bin
-rwxrwxrwx    1 0        0               0 mlwG2_v;telnetd; .x.x.bin
drwxr-xr-x    3 0        0               0 ..
drwxrwxrwx    2 0        0            4096 .
# mtd_write write /media/USB1/openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgr
ade.bin KernelA
Unlocking KernelA ...
Writing from /media/USB1/openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.b
in to KernelA ...  [w]
# mtd_write -r write /media/USB1/openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysu
pgrade.bin KernelB
Unlocking KernelB ...
Writing from /media/USB1/openwrt-15.05-ramips-mt7620-mlwg2-squashfs-sysupgrade.b
in to KernelB ...  [e]

Connection to host lost.

C:\Users\gmacario>
```

Result on the serial console:

```

BusyBox v1.23.2 (2015-07-25 03:03:02 CEST) built-in shell (ash)

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------
 CHAOS CALMER (15.05, r46767)
 -----------------------------------------------------
  * 1 1/2 oz Gin            Shake with a glassful
  * 1/4 oz Triple Sec       of broken ice and pour
  * 3/4 oz Lime Juice       unstrained into a goblet.
  * 1 1/2 oz Orange Juice
  * 1 tsp. Grenadine Syrup
 -----------------------------------------------------
root@OpenWrt:/# [   76.140000] random: nonblocking pool is initialized

root@OpenWrt:/#
```

Inspect OpenWrt configured interfaces

```
root@OpenWrt:/# ifconfig -a
br-lan    Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          inet addr:192.168.1.1  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fda0:2235:dc76::1/60 Scope:Global
          inet6 addr: fe80::226:b7ff:fe08:e0a2/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:333 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:0 (0.0 B)  TX bytes:31038 (30.3 KiB)

eth0      Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          inet6 addr: fe80::226:b7ff:fe08:e0a2/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:138 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:14401 (14.0 KiB)
          Interrupt:5

eth0.1    Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:130 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:0 (0.0 B)  TX bytes:11500 (11.2 KiB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:9168 errors:0 dropped:0 overruns:0 frame:0
          TX packets:9168 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:623424 (608.8 KiB)  TX bytes:623424 (608.8 KiB)

wlan0     Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

root@OpenWrt:/#
```

### OpenWrt - First Login

See <https://wiki.openwrt.org/doc/howto/firstlogin>

Configure your host to connect to 192.168.1.1 using the local network

TODO

### Reconfigure networking

From the serial console use the uci command to take a static IP address in your local network and use Google DNS (replace x and y appropriately)

```
# uci set network.lan.netmask=255.255.255.0
# uci set network.lan.ipaddr=192.168.x.y
# uci set network.lan.gateway=192.168.x.z
# uci set network.lan.broadcast=192.168.x.255
# uci set network.lan.dns="8.8.4.4 8.8.8.8"
# uci commit network
```

As an alternative, directly edit file `/etc/config/network`

```
# vi /etc/config/network
```

Then restart networking

```
# /etc/init.d/network restart
```

Verify that the network configuration has changed accordingly (in this example we had network.lan.ipaddr=192.168.64.65)

```
root@OpenWrt:/etc/config# ifconfig
br-lan    Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          inet addr:192.168.64.65  Bcast:192.168.64.255  Mask:255.255.255.0
          inet6 addr: fda0:2235:dc76::1/60 Scope:Global
          inet6 addr: fe80::226:b7ff:fe08:e0a2/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:37 errors:0 dropped:0 overruns:0 frame:0
          TX packets:26 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:2615 (2.5 KiB)  TX bytes:2655 (2.5 KiB)

eth0      Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          inet6 addr: fe80::226:b7ff:fe08:e0a2/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:1958 errors:0 dropped:0 overruns:0 frame:0
          TX packets:200 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:310839 (303.5 KiB)  TX bytes:21653 (21.1 KiB)
          Interrupt:5

eth0.1    Link encap:Ethernet  HWaddr 00:26:B7:08:E0:A2
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:69 errors:0 dropped:0 overruns:0 frame:0
          TX packets:35 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:4919 (4.8 KiB)  TX bytes:3389 (3.3 KiB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:2064 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2064 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:140352 (137.0 KiB)  TX bytes:140352 (137.0 KiB)

root@OpenWrt:/etc/config#
```

Perform some tests:

From the MLWG2, try pinging another host in the same subnet - for instance, the default gateway

```
# ping <default_gateway_ip>
```

Now try pinging a well known server - for instance, Google DNS

```
# ping 8.8.8.8
```

From a Linux machine on the same subnet do a port scan of the MLWG2

```
$ sudo nmap <device_ip>
```

Stay tuned for future posts on some interesting uses of OpenWrt on my MLWG2!

### See also

* <https://wiki.openwrt.org/toh/kingston/mlwg2>
* <https://github.com/gmacario/kingston-mlwg2-hack/wiki/Login-to-a-command-shell-on-MLWG2>

<!-- EOF -->

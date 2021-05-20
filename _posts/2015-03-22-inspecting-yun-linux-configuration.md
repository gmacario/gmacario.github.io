---
layout: post
title:  "Inspecting the Linux configuration of my Arduino YUN"
date:   2015-03-22 14:00:00 CET
tags:   arduino yun fablab torino
---
<!-- markdown-link-check-disable -->

Let us get familiar with my brand new [Arduino Yun](http://arduino.cc/en/Main/ArduinoBoardYun), focusing on the Linux side of it.

Read [Guide to the Arduino Yún](http://arduino.cc/en/Guide/ArduinoYun)

## Configure networking on my Arduino Yun

Plug the Ethernet cable to to home router.

Power on Yun by connecing a +5Vdc power source to the MicroUSB port - you may just use a USB-to-MicroUSB cable then hook it to your laptop, or a powerbank.

When the white LED is turned on, browse Wi-Fi networks on your laptop.

Connect to Wi-Fi network "Arduino-Yun-90A2DAF30C7B" (the second part of the SSID corresponds to the MAC address of the WiFi transceiver on your Yun).

Browse http://arduino.local/

* Default password: `arduino`

You may then configure the network to connect to an existing Wi-Fi access point, or alternatively use the wired Ethernet.

One the networking on your Yun is properly configured, you may login to it via SSH and get a shell.

## Login via SSH to my YUN

```
$ ssh root@arduino.local
root@arduino.local's password:


BusyBox v1.19.4 (2014-04-10 11:08:41 CEST) built-in shell (ash)
Enter 'help' for a list of built-in commands.

_______                     ________        __
|       |.-----.-----.-----.|  |  |  |.----.|  |_
|   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
|_______||   __|_____|__|__||________||__|  |____|
|__| W I R E L E S S   F R E E D O M
-----------------------------------------------------


root@Arduino:~#
```

Once you have successfully logged into your YUN, you may inspect the software configuration of the [Linino](http://www.linino.org/) Linux distribution running on the Atheros AR 9331 chipset.

### cat /proc/cpuinfo

```
root@Arduino:~# cat /proc/cpuinfo
system type             : Atheros AR9330 rev 1
machine                 : Arduino Yun
processor               : 0
cpu model               : MIPS 24Kc V7.4
BogoMIPS                : 265.42
wait instruction        : yes
microsecond timers      : yes
tlb_entries             : 16
extra interrupt vector  : yes
hardware watchpoint     : yes, count: 4, address/irw mask: [0x0000, 0x0a00, 0x02a0, 0x0220]
ASEs implemented        : mips16
shadow register sets    : 1
kscratch registers      : 0
core                    : 0
VCED exceptions         : not available
VCEI exceptions         : not available

root@Arduino:~#
```

### cat /proc/version

```
root@Arduino:~# cat /proc/version
Linux version 3.3.8 (jenkins@jenkins) (gcc version 4.6.3 20120201 (prerelease) (Linaro GCC 4.6-2012.02) ) #1 Fri Apr 11 07:16:38 CEST 2014
root@Arduino:~#
```

### df -h

```
root@Arduino:~# df -h
Filesystem                Size      Used Available Use% Mounted on
rootfs                    7.0M    360.0K      6.6M   5% /
/dev/root                 7.5M      7.5M         0 100% /rom
tmpfs                    29.8M    148.0K     29.7M   0% /tmp
tmpfs                   512.0K         0    512.0K   0% /dev
/dev/mtdblock3            7.0M    360.0K      6.6M   5% /overlay
overlayfs:/overlay        7.0M    360.0K      6.6M   5% /
root@Arduino:~#
```

### ls -la

```
root@Arduino:~# ls -la /
drwxr-xr-x    1 root     root             0 Sep  8  2011 .
drwxr-xr-x    1 root     root             0 Sep  8  2011 ..
-rw-r--r--    1 root     root            33 Jan  1  1970 .extroot.md5sum
drwx------    2 root     root             0 Sep  8  2011 .gnupg
drwxr-xr-x    2 root     root           719 Apr 17  2014 bin
drwxr-xr-x    7 root     root          1260 Sep  8  2011 dev
drwxr-xr-x    1 root     root             0 Sep  8  2011 etc
drwxr-xr-x   14 root     root           747 Feb 18  2014 lib
drwxr-xr-x    1 root     root             0 Sep  8  2011 mnt
drwxr-xr-x    6 root     root             0 Sep  8  2011 overlay
dr-xr-xr-x   61 root     root             0 Jan  1  1970 proc
drwxr-xr-x   16 root     root           235 Apr 17  2014 rom
drwxr-xr-x    2 root     root             3 Apr 11  2014 root
drwxr-xr-x    2 root     root           735 Apr 17  2014 sbin
drwxr-xr-x   11 root     root             0 Jan  1  1970 sys
drwxrwxrwt   15 root     root           480 Jan 18 20:59 tmp
drwxr-xr-x    7 root     root            89 Apr 11  2014 usr
lrwxrwxrwx    1 root     root             4 Apr 17  2014 var -> /tmp
drwxr-xr-x    5 root     root            99 Feb 18  2014 www
root@Arduino:~#
```

### cat /.extroot.md5sum

```
root@Arduino:~# cat /.extroot.md5sum
6e17e158dbfa1ea4da2e3f90c2819ca6
root@Arduino:~#
```

### lsusb

```
root@Arduino:~# lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 058f:6254 Alcor Micro Corp. USB Hub
Bus 001 Device 003: ID 058f:6366 Alcor Micro Corp. Multi Flash Reader
root@Arduino:~#
```


### uci show

```
root@Arduino:~# uci show
arduino.@arduino[0]=arduino
arduino.@arduino[0].password=775e9f944188a7bcb36e9ca5dc51672b44bcceeb7d56d89dfb914eb3a1ff2d69
arduino.@arduino[0].secure_rest_api=true
arduino.radio0=wifi-device
arduino.@wifi-iface[0]=wifi-iface
arduino.lan=interface
dhcp.@dnsmasq[0]=dnsmasq
dhcp.@dnsmasq[0].domainneeded=1
dhcp.@dnsmasq[0].boguspriv=1
dhcp.@dnsmasq[0].filterwin2k=0
dhcp.@dnsmasq[0].localise_queries=1
dhcp.@dnsmasq[0].rebind_protection=1
dhcp.@dnsmasq[0].rebind_localhost=1
dhcp.@dnsmasq[0].local=/lan/
dhcp.@dnsmasq[0].domain=lan
dhcp.@dnsmasq[0].expandhosts=1
dhcp.@dnsmasq[0].nonegcache=0
dhcp.@dnsmasq[0].authoritative=1
dhcp.@dnsmasq[0].readethers=1
dhcp.@dnsmasq[0].leasefile=/tmp/dhcp.leases
dhcp.@dnsmasq[0].resolvfile=/tmp/resolv.conf.auto
dhcp.lan=dhcp
dhcp.lan.interface=lan
dhcp.lan.start=100
dhcp.lan.limit=150
dhcp.lan.leasetime=12h
dhcp.wan=dhcp
dhcp.wan.interface=wan
dhcp.wan.ignore=1
dropbear.@dropbear[0]=dropbear
dropbear.@dropbear[0].PasswordAuth=on
dropbear.@dropbear[0].RootPasswordAuth=on
dropbear.@dropbear[0].Port=22
firewall.@defaults[0]=defaults
firewall.@defaults[0].syn_flood=1
firewall.@defaults[0].input=ACCEPT
firewall.@defaults[0].output=ACCEPT
firewall.@defaults[0].forward=REJECT
firewall.@zone[0]=zone
firewall.@zone[0].name=lan
firewall.@zone[0].network=lan
firewall.@zone[0].input=ACCEPT
firewall.@zone[0].output=ACCEPT
firewall.@zone[0].forward=REJECT
firewall.@zone[1]=zone
firewall.@zone[1].name=wan
firewall.@zone[1].network=wan
firewall.@zone[1].input=ACCEPT
firewall.@zone[1].output=ACCEPT
firewall.@zone[1].forward=REJECT
fstab.automount=global
fstab.automount.from_fstab=1
fstab.automount.anon_mount=1
fstab.autoswap=global
fstab.autoswap.from_fstab=1
fstab.autoswap.anon_swap=0
luci.main=core
luci.main.lang=auto
luci.main.mediaurlbase=/luci-static/openwrt.org
luci.main.resourcebase=/luci-static/resources
luci.flash_keep=extern
luci.flash_keep.uci=/etc/config/
luci.flash_keep.dropbear=/etc/dropbear/
luci.flash_keep.openvpn=/etc/openvpn/
luci.flash_keep.passwd=/etc/passwd
luci.flash_keep.opkg=/etc/opkg.conf
luci.flash_keep.firewall=/etc/firewall.user
luci.flash_keep.uploads=/lib/uci/upload/
luci.languages=internal
luci.languages.en=English
luci.sauth=internal
luci.sauth.sessionpath=/tmp/luci-sessions
luci.sauth.sessiontime=3600
luci.ccache=internal
luci.ccache.enable=1
luci.themes=internal
luci.themes.Bootstrap=/luci-static/bootstrap
luci.themes.OpenWrt=/luci-static/openwrt.org
network.loopback=interface
network.loopback.ifname=lo
network.loopback.proto=static
network.loopback.ipaddr=127.0.0.1
network.loopback.netmask=255.0.0.0
network.lan=interface
network.lan.proto=static
network.lan.ipaddr=192.168.240.1
network.lan.netmask=255.255.255.0
network.wan=interface
network.wan.ifname=eth1
network.wan.proto=dhcp
network.wan.metric=10
system.@system[0]=system
system.@system[0].hostname=Arduino
system.@system[0].timezone=UTC
system.ntp=timeserver
system.ntp.server=0.openwrt.pool.ntp.org 1.openwrt.pool.ntp.org 2.openwrt.pool.ntp.org 3.openwrt.pool.ntp.org
system.ntp.enable_server=0
system.@led[0]=led
system.@led[0].default=0
ucitrack.@network[0]=network
ucitrack.@network[0].init=network
ucitrack.@network[0].affects=dhcp radvd
ucitrack.@wireless[0]=wireless
ucitrack.@wireless[0].affects=network
ucitrack.@firewall[0]=firewall
ucitrack.@firewall[0].init=firewall
ucitrack.@firewall[0].affects=luci-splash qos miniupnpd
ucitrack.@olsr[0]=olsr
ucitrack.@olsr[0].init=olsrd
ucitrack.@dhcp[0]=dhcp
ucitrack.@dhcp[0].init=dnsmasq
ucitrack.@dropbear[0]=dropbear
ucitrack.@dropbear[0].init=dropbear
ucitrack.@httpd[0]=httpd
ucitrack.@httpd[0].init=httpd
ucitrack.@fstab[0]=fstab
ucitrack.@fstab[0].init=fstab
ucitrack.@qos[0]=qos
ucitrack.@qos[0].init=qos
ucitrack.@system[0]=system
ucitrack.@system[0].init=led
ucitrack.@system[0].affects=luci_statistics
ucitrack.@luci_splash[0]=luci_splash
ucitrack.@luci_splash[0].init=luci_splash
ucitrack.@upnpd[0]=upnpd
ucitrack.@upnpd[0].init=miniupnpd
ucitrack.@ntpclient[0]=ntpclient
ucitrack.@ntpclient[0].init=ntpclient
ucitrack.@samba[0]=samba
ucitrack.@samba[0].init=samba
ucitrack.@tinyproxy[0]=tinyproxy
ucitrack.@tinyproxy[0].init=tinyproxy
ucitrack.@6relayd[0]=6relayd
ucitrack.@6relayd[0].init=6relayd
uhttpd.main=uhttpd
uhttpd.main.listen_http=0.0.0.0:80
uhttpd.main.listen_https=0.0.0.0:443
uhttpd.main.home=/www
uhttpd.main.rfc1918_filter=0
uhttpd.main.max_requests=2
uhttpd.main.cert=/etc/uhttpd.crt
uhttpd.main.key=/etc/uhttpd.key
uhttpd.main.cgi_prefix=/cgi-bin
uhttpd.main.script_timeout=60
uhttpd.main.network_timeout=30
uhttpd.main.tcp_keepalive=1
uhttpd.px5g=cert
uhttpd.px5g.days=36500
uhttpd.px5g.bits=1024
uhttpd.px5g.country=IT
uhttpd.px5g.state=Turin
uhttpd.px5g.location=Turin
uhttpd.px5g.commonname=Arduino LLC
wireless.radio0=wifi-device
wireless.radio0.type=mac80211
wireless.radio0.channel=11
wireless.radio0.hwmode=11ng
wireless.radio0.path=platform/ar933x_wmac
wireless.radio0.htmode=HT20
wireless.radio0.ht_capab=SHORT-GI-20 SHORT-GI-40 RX-STBC1 DSSS_CCK-40
wireless.radio0.disabled=0
wireless.@wifi-iface[0]=wifi-iface
wireless.@wifi-iface[0].device=radio0
wireless.@wifi-iface[0].network=lan
wireless.@wifi-iface[0].mode=ap
wireless.@wifi-iface[0].encryption=none
wireless.@wifi-iface[0].ssid=Arduino Yun-90A2DAF30C7B
root@Arduino:~#
```

We have a total of 167 configuration entries

```
root@Arduino:~# uci show | wc -l
167
root@Arduino:~#
```

<!-- markdown-link-check-enable -->
<!-- EOF -->

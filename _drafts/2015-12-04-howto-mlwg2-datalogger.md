---
layout: post
title:  "Configuring MLWG2 to act as a Wi-Fi Datalogger"
date:   2015-11-30 21:20:00 CET
categories: howto datalogger mlwg2 openwrt
---
<-- markdown-link-check-disable -->
This blog post explains how I did [something](http://www.something.com/) on my laptop running MS Windows 7.
Login on the serial console
Configure networking
```
root@OpenWrt:/# cat /etc/config/network
config interface 'loopback'
        option ifname 'lo'
        option proto 'static'
        option ipaddr '127.0.0.1'
        option netmask '255.0.0.0'
config globals 'globals'
        option ula_prefix 'fd84:4190:3bb2::/48'
config interface 'lan'
        option ifname 'eth0.1'
        option force_link '1'
        option macaddr '00:26:b7:08:e0:a2'
        option type 'bridge'
        option proto 'static'
        option ipaddr '192.168.64.65'
        option netmask '255.255.255.0'
        option ip6assign '60'
root@OpenWrt:/#
```
Restart networking after changing configuration
```
# /etc/init.d/network restart
# ifconfig
# busybox route -n
```
You may now access LuCI via <http://192.168.64.65>
If you want to access the Internet you need to define a default gateway
```
# busybox route add default gw 192.168.64.1
```
Verify Internet connectivity
```
# ping -c 5 8.8.8.8
```
Configure DNS
```
# mv resolv.conf resolv.conf.ORIG
# echo "nameserver 8.8.8.8" >/etc/resolv.conf
# ping -c 5 www.cisco.com
```
Now you may install the additional required OpenWrt packages
```
# opkg update
# opkg install wireless-tools
# opkg install nmap
```
Configure wlan0
```
# ifconfig wlan0 up
```
Scan available Wi-Fi networks
```
# iwlist wlan0 scan
```
Scan local network
```
# nmap -sN 192.168.64.0/24
```
TODO
iwlist per sniffing delle SSID
iwlist scan  ==> cerca le reti Wi-Fi
Connettiti ad una rete aperta
nmap sulla subnet
Honeypot:
<http://hype-free.blogspot.it/2009/03/installing-webhoneypot-on-openwrt.html>
<http://www.aircrack-ng.org/documentation.html>
Sample table
< <http://www.tablesgenerator.com/markdown_tables> -->
| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |
<-- markdown-link-check-enable-->
<-- EOF -->

---
layout: post
title:  "Installing TINC on Arduino Yun"
date:   2017-03-03 18:00:00 CET
# categories: arduino yun day fablab torino
---
<!-- markdown-link-check-disable -->

### Introduction

Detailed steps to install TINC on my Arduino Yun.

Based on [SOLARMA/hostconfig/docs/2017-01-27-installing-tinc-on-arduino-yun.md](https://github.com/SOLARMA/hostconfig/blob/master/docs/2017-01-27-installing-tinc-on-arduino-yun.md)

### Prerequisites

See 2017-03-03 post on <https://gmacario.github.io>: "Restoring Arduino Yun factory settings"

### Configure board

Connect Ethernet cable

Power up the YUN via microUSB

Browse <http://Arduino.local>

**NOTE**: If from your Windows laptop yyou cannot resolve hostname `Arduino.local`,
download and install Bonjour Print Servies for Windows from <https://support.apple.com/kb/dl999>

Alternatively, check on your router the IP address assigned to the Yun
(in your case this is 192.168.64.153), then browse <http://192.168.64.153>.

Click "CONFIGURE" to configure the board

* Yun Board Configuration
  * Yun name: `ardyungm33` (default: `Arduino`)
  * Password: `xxxx`
  * Confirm Password: `xxxx`
  * Timezone: Europe/Rome
* Wireless Parameters
  * Configure a wireless network: No

then click "CONFIGURE & RESTART"

### Install packages

Login with `ssh root@ardyungm33.local`

```
$ ssh root@ardyungm33.local
The authenticity of host 'ardyungm33.local (192.168.64.153)' can't be established.
RSA key fingerprint is SHA256:1Ap2vSN5mtS4zTl/cdsl20RZtFz0gPbW3Ngo3WCI0NI.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'ardyungm33.local' (RSA) to the list of known hosts.


BusyBox v1.19.4 (2014-11-13 19:03:47 CET) built-in shell (ash)
Enter 'help' for a list of built-in commands.

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------


root@ardyungm33:~#
```

Verify if some package updates are available

```
opkg update && opkg list-upgradable
```

Result:

```
root@ardyungm33:~# opkg update && opkg list-upgradable
Downloading http://downloads.arduino.cc/openwrtyun/1/packages/Packages.gz.
Updated list of available packages in /var/opkg-lists/attitude_adjustment.
Downloading http://downloads.arduino.cc/openwrtyun/1/packages/Packages.sig.
Signature check passed.
temboo - 1.1.0-1 - 1.4.0-1
root@ardyungm33:~#
```

Update the listed packages

```
opkg upgrade temboo
```

Install tinc

```
opkg install tinc
```

From LuCI: Network > Wifi

* radio0: Master "Arduino Yun-90A2DAF30C7B" > Disable

**NOTE**: If the Yun starts rebooting every couple of minute, try leaving radio0 enabled.

From LuCI: System > Administration

* SSH-Keys: (paste contents of your laptop `~/.ssh/id_rsa.pub`)

then click "Save & Apply"

Test: Login to Yun via `ssh root@ardyungm33.local` (should not require password)

### Configure TINC network `ninuxto`

Logged as `root@ardyungm33`, manually create the files, then sync them to the corresponding repositories on GitHub

```
mkdir -p /etc/tinc/ninuxto/hosts
vi /etc/tinc/ninuxto/tinc.conf                (paste from <https://github.com/SOLARMA/hostconfig>)
vi /etc/tinc/ninuxto/rsa_key.priv             (paste from <https://github.com/SOLARMA/hostconfig>)
```

Now copy the public configuration and keys of the known nodes

```
vi /etc/tinc/ninuxto/hosts/ardyungm33         (paste from <https://github.com/gmacario/tinc-ninuxto>)
vi /etc/tinc/ninuxto/hosts/kruk               (paste from <https://github.com/gmacario/tinc-ninuxto>)
vi /etc/tinc/ninuxto/hosts/rpi3gm23           (paste from <https://github.com/gmacario/tinc-ninuxto>)
vi /etc/tinc/ninuxto/hosts/tincgw21           (paste from <https://github.com/gmacario/tinc-ninuxto>)
```

Logged as root@ardyungm33, create startup and shutdown scripts

```
vi /etc/tinc/ninuxto/tinc-up                  (paste from <https://github.com/SOLARMA/hostconfig>)
vi /etc/tinc/ninuxto/tinc-down                (paste from <https://github.com/SOLARMA/hostconfig>)
chmod 755 /etc/tinc/ninuxto/tinc-*
```

Test:

```
tincd -n ninuxto --no-detach -d7
```

Verify that interface becomes active, then type `^C` to stop tincd

### Autoconfigure TINC network `ninuxto` at boot

TODO: (2017-03-03 22:50 CET)

Logged as root@ardyungm33, inspect scripts

```
cat /etc/init.d/tinc
uci show | grep tinc
```

See https://wiki.openwrt.org/doc/howto/vpn.tinc

See https://forum.openwrt.org/viewtopic.php?id=10408

```
cp /etc/config/tinc /etc/config/tinc.ORIG
vi /etc/config/tinc                         (paste from <https://github.com/SOLARMA/hostconfig>)
/etc/init.d/tinc enable
/etc/init.d/tinc restart
```

### Install Arduino sketch `solpev-alarm`

(2017-03-03 23:00 CET)

Start Arduino IDE

File > Open > `solpev-alarm`

From <https://github.com/gmacario/learning-arduino/tree/master/Sketches/solpev-alarm>

Sketch > Upload

TODO TODO TODO

<!-- markdown-link-check-enable -->
<!-- EOF -->

---
layout: post
title:  "Trying Volumio on a Raspberry Pi 3"
date:   2017-03-31 18:00:00 CEST
---

This blog post explains my experiences with the [Volumio](https://volumio.org/)
Music Player on a Raspberry Pi 3.

### Prepare the SD-Card image

See <https://volumio.org/get-started/>

Download Volumio your platform: Raspberry Pi

* VERSION: 2.129
* RELEASE DATE: 23-03-2017
* TOTAL DOWNLOADS: 677960
* IMAGE MD5: 7c8cb096671ffa754440fb66bae62bdd

Click "Download", will download file `volumio-2.129-2017-03-23-pi.img.zip`

Unzip the file and verify the checksum

```shell
gmacario@ITM-GPAOLO-W10 /cygdrive/d/temp
$ unzip ~/Downloads/volumio-2.129-2017-03-23-pi.img.zip
Archive:  /home/gmacario/Downloads/volumio-2.129-2017-03-23-pi.img.zip
  inflating: volumio-2.129-2017-03-23-pi.img

gmacario@ITM-GPAOLO-W10 /cygdrive/d/temp
$ ls -la volumio-2.129-2017-03-23-pi.img
-rw-r--r--+ 1 gmacario Domain Users 2936012800 Mar 23 00:22 volumio-2.129-2017-03-23-pi.img

gmacario@ITM-GPAOLO-W10 /cygdrive/d/temp
$ md5sum volumio-2.129-2017-03-23-pi.img
7c8cb096671ffa754440fb66bae62bdd *volumio-2.129-2017-03-23-pi.img

gmacario@ITM-GPAOLO-W10 /cygdrive/d/temp
$
```

Then write the `*.img` file to an empty MicroSD-Card (4 GB or bigger)

**NOTE**: On MS Windows you may use
[Win32DiskImager](http://sourceforge.net/projects/win32diskimager/files/latest/download)

Insert the MicroSD into the RPi3.
Plug an Ethernet cable into your RPi3
Power up the RPi3 from the microUSB port.

**NOTE**: There are no messages displayed on the RPi3 serial console, don't worry.

Run Fing and verify that a new device called `volumio` is displayed.
In my example this get the assigned IP Address: 192.168.12.105.

Browse `\\volumio.local` ==> Does not work from my Windows 10 laptop (WHY???)

Try logging into the device via SSH:

```
gmacario@ITM-GPAOLO-W10 ~
$ ssh volumio@192.168.12.105
The authenticity of host '192.168.12.105 (192.168.12.105)' can't be established.
ECDSA key fingerprint is SHA256:h0EWpVmHzJnH/kwGf6GtT2uwMFsvk//eoiHfEO+dn4A.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.12.105' (ECDSA) to the list of known hosts.
volumio@192.168.12.105's password:
                       ___
                      /\_ \                        __
         __  __    ___\//\ \    __  __    ___ ___ /\_\    ___
        /\ \/\ \  / __`\\ \ \  /\ \/\ \ /' __` __`\/\ \  / __`\
        \ \ \_/ |/\ \L\ \\_\ \_\ \ \_\ \/\ \/\ \/\ \ \ \/\ \L\ \
         \ \___/ \ \____//\____\\ \____/\ \_\ \_\ \_\ \_\ \____/
          \/__/   \/___/ \/____/ \/___/  \/_/\/_/\/_/\/_/\/___/

             Free Audiophile Linux Music Player - Version 2.0

          C 2015 Michelangelo Guarise - Volumio Team - Volumio.org


Volumio Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
volumio@volumio:~$
```

Inspect mounted filesystems

```
volumio@volumio:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/mmcblk0p2  2.2G  493M  1.6G  24% /imgpart
/dev/loop0      253M  253M     0 100% /static
overlay          27G   12M   26G   1% /
devtmpfs        479M     0  479M   0% /dev
tmpfs           487M     0  487M   0% /dev/shm
tmpfs           487M  4.7M  482M   1% /run
tmpfs           5.0M  4.0K  5.0M   1% /run/lock
tmpfs           487M     0  487M   0% /sys/fs/cgroup
tmpfs           487M   16K  487M   1% /tmp
tmpfs           487M     0  487M   0% /var/spool/cups
tmpfs            20M   32K   20M   1% /var/log
tmpfs           487M     0  487M   0% /var/spool/cups/tmp
/dev/mmcblk0p1   61M   29M   33M  47% /boot
tmpfs            98M     0   98M   0% /run/user/1000
volumio@volumio:~$
```

The image is based on Raspbian

```
volumio@volumio:~$ cat /etc/os-release
PRETTY_NAME="Raspbian GNU/Linux 8 (jessie)"
NAME="Raspbian GNU/Linux"
VERSION_ID="8"
VERSION="8 (jessie)"
ID=raspbian
ID_LIKE=debian
HOME_URL="http://www.raspbian.org/"
SUPPORT_URL="http://www.raspbian.org/RaspbianForums"
BUG_REPORT_URL="http://www.raspbian.org/RaspbianBugs"
VOLUMIO_BUILD_VERSION="c2a36d9689f55c1a8d60e4bcf6a70b072a8138fa"
VOLUMIO_FE_VERSION="3b84e7a97479daf304d02679ff18405556fc1dec"
VOLUMIO_BE_VERSION="0ee5830d72efb2a019e23de171f1306bf3499e26"
VOLUMIO_VARIANT="volumio"
VOLUMIO_TEST="FALSE"
VOLUMIO_BUILD_DATE="Thu Mar 23 00:15:25 CET 2017"

VOLUMIO_VERSION="2.129"
VOLUMIO_HARDWARE="pi"
volumio@volumio:~$
```

The Volumio application is based on NodeJS:

```
volumio@volumio:~$ ps axfw
  PID TTY      STAT   TIME COMMAND
    2 ?        S      0:00 [kthreadd]
    3 ?        S      0:00  \_ [ksoftirqd/0]
    5 ?        S<     0:00  \_ [kworker/0:0H]
...
1421 ?        Ssl    2:38 /usr/local/bin/node /volumio/index.js
1921 ?        S      0:00  \_ /bin/sh -c /usr/local/bin/node /volumio/app/plugins/miscellanea/albumart/serverStartup.js 3001 /data/albumart
1922 ?        Sl     0:00      \_ /usr/local/bin/node /volumio/app/plugins/miscellanea/albumart/serverStartup.js 3001 /data/albumart
1994 ?        Sl     0:02          \_ /bin/node /volumio/app/plugins/miscellanea/albumart/serverStartup.js 3001 /data/albumart
2010 ?        Sl     0:02          \_ /bin/node /volumio/app/plugins/miscellanea/albumart/serverStartup.js 3001 /data/albumart
2013 ?        Sl     0:02          \_ /bin/node /volumio/app/plugins/miscellanea/albumart/serverStartup.js 3001 /data/albumart
...
2394 ?        Ss     0:00 /usr/sbin/dhcpd
2741 ?        Ss     0:00 /lib/systemd/systemd --user
2744 ?        S      0:00  \_ (sd-pam)
volumio@volumio:~$
```

### See also

* <https://www.volumio.org/>
* <https://github.com/VOLUMIO>

<!-- EOF -->

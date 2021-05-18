---
layout: post
title:  "Trying Kali Linux 2.1.2 on a Raspberry Pi 3"
date:   2017-01-19 08:00:00 CET
# categories: template android howto development
---
<-- markdown-link-check-disable -->
This blog post explains my experiences with [Kali Linux 2.1.2](http://www.kali.org/) on a [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/).
Following instructions at YouTube Video: [Kali Linux on Raspberry Pi 3](https://www.youtube.com/watch?v=6xXnUGR_e4E) (8:11)
### Format MicroSD-card with Kali Linux image for RPi 2 / 3
Browse <https://www.kali.org/> > Downloads > Kali ARM images
Choose Kali image for RaspberryPi 2 / 3
* Size: 1166M
* Version: 2.1.2
* SHA1Sum: DB36FCD53C630FD32F2F8943DDDD9F57B3673C5A
Verify checksum of the downloaded image
```
gmacario@ITM-GPAOLO-W10 ~
$ sha1sum.exe /cygdrive/d/data/public/Linux/Kali/kali-2.1.2-rpi2.img.xz
db36fcd53c630fd32f2f8943dddd9f57b3673c5a */cygdrive/d/data/public/Linux/Kali/kali-2.1.2-rpi2.img.xz
gmacario@ITM-GPAOLO-W10 ~
$
```
Uncompress the downloaded image
```
xzcat kali-2.1.2-rpi2.img.xz >kali-2.1.2-rpi2.img
```
Launch [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/)
Write image `kali-2.1.2-rpi2.img` to an empty MicroSD-card (16 GB or bigger)
<45 CET -->
Insert your MicroSD-card into the RPi, then power up the board.
Login as user `root` (default password: `toor`).
**IMPORTANT**: Change default password now
```
root@kali:~# passwd
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
root@kali:~#
```
Regenerate SSH Host Key (they were pre-configured on the downloaded images)
```
rm /etc/ssh/ssh_host_*
dpkg-reconfigure openssh-server
service ssh restart
```
Type `ip address` to know the assigned IP address (in my example, this is `192.168.64.114`). Alternatively, use the [Fing](https://www2.fing.io/) App from an Android phone connected to the same Wireless Access Point.
Login from another machine with the following command: `ssh root@kali.lan`
or by specifying the target IP address:
```
gmacario@ITM-GPAOLO-W10 ~
$ ssh root@192.168.64.114
root@192.168.64.114's password:
The programs included with the Kali GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.
Kali GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Jan  9 15:19:54 2017 from 192.168.64.112
root@kali:~#
```
### Install VNC Server on Kali Linux
Watch YouTube video: [How to Remote Access Linux on Raspberry Pi 2](https://www.youtube.com/watch?v=ZR-ztmJ7mks) (17:13)
NOTE: As of 2017-01-19 Kali Linux `tightvncserver` is a transitional package - will try [TigerVNC](http://tigervnc.org/) instead.
```
apt-get update
apt-get -y install tigervnc-common tigervnc-standalone-server
apt-get -y install autocutsel
```
Type `vncpasswd` to create session password (will be saved in `~/.vnc/passwd`)
Create systemd unit file `/etc/systemd/system/vncserver.service`
```
[Unit]
Description=VNC remote desktop server
After=sshd.service
[Service]
Type=dbus
ExecStart=/usr/bin/vncserver -localhost no
User=root
Type=forking
[Install]
WantedBy=multi-user.target
```
**NOTE**: Added option `-localhost no` to allow VNC connections from outside (default is only from localhost, needs to setup a SSH tunnel). This is relaxing security, though.
Adjust file owner and permissions
```
sudo chown root:root /etc/systemd/system/vncserver.service
sudo chmod 644 /etc/systemd/system/vncserver.service
```
Test
```
sudo systemctl start vncserver
sudo systemctl enable vncserver
```
Verify that the server is running
```
sudo systemctl status vncserver
vncserver -list
```
From another machine (i.e. a laptop) launch TigerVNC Viewer
* Remote Host: `kali.lan:5901`
* Password: `xxxx` (the password chosen when first running `vncserver` )
**Issue 1**: Cannot launch Wireshark
```
root@kali:~# wireshark
Unable to find an X11 visual which matches EGL config 1
Segmentation fault
root@kali:#
```
**Issue 2**: Copy-and-paste does not seem to work (it worked with tightvncserver)
### Resize Root Partition
Logged as root@kali.lan
```
apt-get -y install gparted
```
Then type `gparted` and resize the partition to use all the available space on the MicroSD.
### Install all Kali Linux tools
```
apt-get install kali-linux-full
```
**NOTE**: Depending on network speed, the above command may take a few hours to complete
### Links
* Kali Linux: <https://kali.org/>
* Metasploitable 2: <https://sourceforge.net/projects/metasploitable/files/Metasploitable2/>
* Rasbperry Pi 3: <http://goo.gl/T1NJ2D>
<-- markdown-link-check-enable-->
<-- EOF -->

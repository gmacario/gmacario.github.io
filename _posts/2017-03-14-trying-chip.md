---
layout: post
title:  "Experiences with the C.H.I.P. 9$ Computer"
date:   2017-03-14 18:00:00 CET
# categories: template android howto development
---

This blog post explains my experiences with [C.H.I.P.](https://getchip.com/pages/chip) - the World's First $9 Computer.

### Reflash CHIP

Browse <http://flash.getchip.com/>

> Your CHIP details:
>
> * Serial #: 162542130082604c
> * NAND:Hynix 8G MLC

* Select image "Headless 4.4"

Downloading file `stable-server-b149-Hynix_8G_MLC.chp` (312 MB)

> * Serial #: 162542130082604c
> * NAND:Hynix 8G MLC
> * MD5 Hash: 165e3a2a2c9353e06b98136beac777eb

### Manually configure Wi-Fi from command line

See <https://docs.getchip.com/chip.html#wifi-connection>

### Install TINC on C.H.I.P.

Based on the instructions at <https://github.com/gmacario/tinc-ninuxto/blob/master/configuring-tinc-ninuxto-on-udoobuntu2.md>

Logged as chip@chip, change default password for user `chip`, then configure hostname (let us choose `chipgm34` in our example)

```script
password chip
echo "chipgm32" | sudo tee /etc/hostname
sudo vi /etc/hosts      (Replace occurrences of old hostname with new)
```

Update installed Debian packages, then reboot to activate the changes

```script
sudo apt update && sudo apt -y dist-upgrade
sudo reboot
```

As soon as the host is up and running, remote login via SSH as chip@chipgm32, then install TINC and other required pacakges

```script
sudo apt -y install git rsync tinc
```

Clone the "gmacario/tinc-ninuxto" repository from GitHub

```script
mkdir -p ~/MYGIT &&  cd ~/MYGIT
[ ! -e tinc-ninuxto ] && git clone https://github.com/gmacario/tinc-ninuxto
```

Create the local TINC configuration

```script
cd ~/MYGIT/tinc-ninuxto && git pull --all --prune && \
  sudo mkdir -p /etc/tinc/ninuxto/hosts/ && \
  sudo rsync -avz hosts/ /etc/tinc/ninuxto/hosts/
```

Customize TINC configuration files starting from some templates

```script
sudo cp ~/MYGIT/tinc-ninuxto/sample-tinc.conf /etc/tinc/ninuxto/tinc.conf
sudo vi /etc/tinc/ninuxto/tinc.conf      (Adjust Name="chipgm32")
```

```script
sudo cp ~/MYGIT/tinc-ninuxto/sample-tinc-up /etc/tinc/ninuxto/tinc-up
sudo vi /etc/tinc/ninuxto/tinc-up        (Choose an available IP Address according to the table at README.md)
sudo chmod 755 /etc/tinc/ninuxto/tinc-up
```

```script
sudo cp ~/MYGIT/tinc-ninuxto/sample-tinc-down /etc/tinc/ninuxto/tinc-down
sudo vi /etc/tinc/ninuxto/tinc-down      (Everything should be OK, but double check)
sudo chmod 755 /etc/tinc/ninuxto/tinc-down
```

Create a public/private key pair if they do not exist

```script
sudo -i sh -c "[ ! -e /etc/tinc/ninuxto/rsa_key.priv ] && /usr/sbin/tincd -n ninuxto -K4096"
```

Accept the suggested paths where to save private and public RSA key.

Submit a Pull Request to https://github.com/gmacario/tinc-ninuxto with the following changes:

* A new line in the table at `README.md` to mark the IP address you chose for your node
* Your **public** key `/etc/tinc/ninuxto/hosts/chipgm32` saved under `hosts/`

After the PR is merged, update the gmacario/tinc-ninuxto repository in all your peer nodes (i.e. tincgw21, rpi3gm23) to make sure the new node is recognized.

##### Test connectivity to tinc-ninuxto

Try connecting to TINC network ninuxto

```script
sudo tincd -n ninuxto --no-detach -d7
```

##### Automatically start tinc at boot

Type the following commands to have TINC network `ninuxto` active at boot:

```
echo "ninuxto" | sudo tee -a /etc/tinc/nets.boot
sudo service tinc restart
```

### Install Docker on TINC

See <https://blog.hypriot.com/post/docker-supported-on-chip-computer/>

Prerequisite: chip running the latest Debian image (headless) with kernel 4.4

```script
chip@chipgm32:~$ cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 8 (jessie)"
NAME="Debian GNU/Linux"
VERSION_ID="8"
VERSION="8 (jessie)"
ID=debian
HOME_URL="http://www.debian.org/"
SUPPORT_URL="http://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
chip@chipgm32:~$ uname -a
Linux chipgm32 4.4.13-ntc-mlc #1 SMP Tue Dec 6 21:38:00 UTC 2016 armv7l GNU/Linux
chip@chipgm32:~$
```

Login as `root` on the chip

```script
chip@chipgm32:~$ sudo -i
root@chipgm32:~#
```

<!-- 2017-03-13 14:55 CET -->

Logged as root@chip, install Docker using the official script

```script
curl -sSL https://get.docker.com | sh
```

Result:

```script
root@chipgm32:~# curl -sSL https://get.docker.com | sh
modprobe: FATAL: Module aufs not found.
Warning: current kernel is not supported by the linux-image-extra-virtual
 package.  We have no AUFS support.  Consider installing the packages
 linux-image-virtual kernel and linux-image-extra-virtual for AUFS support.
+ sleep 10
+ sh -c 'sleep 3; apt-get update'
Hit http://security.debian.org jessie/updates InRelease
Hit http://opensource.nextthing.co jessie InRelease
Hit http://http.debian.net jessie-backports InRelease
Hit http://security.debian.org jessie/updates/main Sources
Ign http://ftp.us.debian.org jessie InRelease
Hit http://security.debian.org jessie/updates/contrib Sources
Hit http://security.debian.org jessie/updates/non-free Sources
Hit http://security.debian.org jessie/updates/main armhf Packages
Hit http://ftp.us.debian.org jessie Release.gpg
Hit http://security.debian.org jessie/updates/contrib armhf Packages
Hit http://security.debian.org jessie/updates/non-free armhf Packages
Hit http://security.debian.org jessie/updates/contrib Translation-en
Hit http://opensource.nextthing.co jessie/main armhf Packages
Hit http://security.debian.org jessie/updates/main Translation-en
Hit http://security.debian.org jessie/updates/non-free Translation-en
Hit http://ftp.us.debian.org jessie Release
Ign http://opensource.nextthing.co jessie/main Translation-en
Get:1 http://http.debian.net jessie-backports/main Sources/DiffIndex [27.8 kB]
Get:2 http://http.debian.net jessie-backports/contrib Sources/DiffIndex [27.4 kB]
Get:3 http://http.debian.net jessie-backports/non-free Sources/DiffIndex [20.0 kB]
Get:4 http://http.debian.net jessie-backports/main armhf Packages/DiffIndex [27.8 kB]
Get:5 http://http.debian.net jessie-backports/contrib armhf Packages/DiffIndex [24.1 kB]
Get:6 http://http.debian.net jessie-backports/non-free armhf Packages/DiffIndex [7054 B]
Get:7 http://http.debian.net jessie-backports/contrib Translation-en/DiffIndex [6484 B]
Get:8 http://http.debian.net jessie-backports/main Translation-en/DiffIndex [27.8 kB]
Get:9 http://http.debian.net jessie-backports/non-free Translation-en/DiffIndex [14.7 kB]
Hit http://ftp.us.debian.org jessie/main Sources
Hit http://ftp.us.debian.org jessie/contrib Sources
Hit http://ftp.us.debian.org jessie/non-free Sources
Hit http://ftp.us.debian.org jessie/main armhf Packages
Hit http://ftp.us.debian.org jessie/contrib armhf Packages
Hit http://ftp.us.debian.org jessie/non-free armhf Packages
Hit http://ftp.us.debian.org jessie/contrib Translation-en
Hit http://ftp.us.debian.org jessie/main Translation-en
Hit http://ftp.us.debian.org jessie/non-free Translation-en
Fetched 183 kB in 1min 4s (2852 B/s)
Reading package lists... Done
+ sh -c 'sleep 3; apt-get install -y -q apt-transport-https ca-certificates'
Reading package lists...
Building dependency tree...
Reading state information...
ca-certificates is already the newest version.
The following NEW packages will be installed:
  apt-transport-https
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 135 kB of archives.
After this operation, 170 kB of additional disk space will be used.
Get:1 http://ftp.us.debian.org/debian/ jessie/main apt-transport-https armhf 1.0.9.8.4 [135 kB]
Fetched 135 kB in 1s (98.1 kB/s)
Selecting previously unselected package apt-transport-https.
(Reading database ... 22131 files and directories currently installed.)
Preparing to unpack .../apt-transport-https_1.0.9.8.4_armhf.deb ...
Unpacking apt-transport-https (1.0.9.8.4) ...
Setting up apt-transport-https (1.0.9.8.4) ...
+ sh -c 'sleep 3; apt-get install -y -q dirmngr'
Reading package lists...
Building dependency tree...
Reading state information...
The following extra packages will be installed:
  libassuan0 libksba8 libpth20
The following NEW packages will be installed:
  dirmngr libassuan0 libksba8 libpth20
0 upgraded, 4 newly installed, 0 to remove and 0 not upgraded.
Need to get 360 kB of archives.
After this operation, 881 kB of additional disk space will be used.
Get:1 http://ftp.us.debian.org/debian/ jessie/main libassuan0 armhf 2.1.2-2 [29.9 kB]
Get:2 http://ftp.us.debian.org/debian/ jessie/main libksba8 armhf 1.3.2-1+deb8u1 [82.1 kB]
Get:3 http://ftp.us.debian.org/debian/ jessie/main libpth20 armhf 2.0.7-20 [73.6 kB]
Fetched 360 kB in 1s (251 kB/s)
Selecting previously unselected package libassuan0:armhf.
(Reading database ... 22137 files and directories currently installed.)
Preparing to unpack .../libassuan0_2.1.2-2_armhf.deb ...
Unpacking libassuan0:armhf (2.1.2-2) ...
Selecting previously unselected package libksba8:armhf.
Preparing to unpack .../libksba8_1.3.2-1+deb8u1_armhf.deb ...
Unpacking libksba8:armhf (1.3.2-1+deb8u1) ...
Selecting previously unselected package libpth20:armhf.
Preparing to unpack .../libpth20_2.0.7-20_armhf.deb ...
Unpacking libpth20:armhf (2.0.7-20) ...
Selecting previously unselected package dirmngr.
Preparing to unpack .../dirmngr_1.1.1-5_armhf.deb ...
Unpacking dirmngr (1.1.1-5) ...
Processing triggers for man-db (2.7.0.2-5) ...
Processing triggers for systemd (215-17+deb8u6) ...
Setting up libassuan0:armhf (2.1.2-2) ...
Setting up libksba8:armhf (1.3.2-1+deb8u1) ...
Setting up libpth20:armhf (2.0.7-20) ...
Setting up dirmngr (1.1.1-5) ...
Processing triggers for libc-bin (2.19-18+deb8u7) ...
Processing triggers for systemd (215-17+deb8u6) ...
+ for key_server in '$key_servers'
+ sh -c 'apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D'
Executing: gpg --ignore-time-conflict --no-options --no-default-keyring --homedir /tmp/tmp.SQycH2Vhju --no-auto-check-trustdb --trust-model always --keyring /etc/apt/trusted.gpg --primary-keyring /etc/apt/trusted.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-jessie-automatic.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-jessie-security-automatic.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-jessie-stable.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-squeeze-automatic.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-squeeze-stable.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-wheezy-automatic.gpg --keyring /etc/apt/trusted.gpg.d/debian-archive-wheezy-stable.gpg --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
gpg: requesting key 2C52609D from hkp server ha.pool.sks-keyservers.net
gpg: key 2C52609D: public key "Docker Release Tool (releasedocker) <docker@docker.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
+ break
+ sh -c 'apt-key adv -k 58118E89F3A912897C070ADBF76221572C52609D >/dev/null'
+ sh -c 'mkdir -p /etc/apt/sources.list.d'
++ dpkg --print-architecture
+ sh -c 'echo deb \[arch=armhf\] https://apt.dockerproject.org/repo debian-jessie main > /etc/apt/sources.list.d/docker.list'
+ sh -c 'sleep 3; apt-get update; apt-get install -y -q docker-engine'
Hit http://security.debian.org jessie/updates InRelease
Ign http://ftp.us.debian.org jessie InRelease
Hit http://opensource.nextthing.co jessie InRelease
Get:1 https://apt.dockerproject.org debian-jessie InRelease [30.2 kB]
Hit http://ftp.us.debian.org jessie Release.gpg
Hit http://http.debian.net jessie-backports InRelease
Hit http://ftp.us.debian.org jessie Release
Hit http://security.debian.org jessie/updates/main Sources
Hit http://security.debian.org jessie/updates/contrib Sources
Hit http://security.debian.org jessie/updates/non-free Sources
Hit http://security.debian.org jessie/updates/main armhf Packages
Hit http://security.debian.org jessie/updates/contrib armhf Packages
Hit http://security.debian.org jessie/updates/non-free armhf Packages
Hit http://opensource.nextthing.co jessie/main armhf Packages
Hit http://security.debian.org jessie/updates/contrib Translation-en
Hit http://security.debian.org jessie/updates/main Translation-en
Hit http://security.debian.org jessie/updates/non-free Translation-en
Get:2 https://apt.dockerproject.org debian-jessie/main armhf Packages [3029 B]
Get:3 https://apt.dockerproject.org debian-jessie/main Translation-en [454 B]
Get:4 https://apt.dockerproject.org debian-jessie/main Translation-en [454 B]
Get:5 https://apt.dockerproject.org debian-jessie/main Translation-en [454 B]
Get:6 https://apt.dockerproject.org debian-jessie/main Translation-en [454 B]
Get:7 https://apt.dockerproject.org debian-jessie/main Translation-en [454 B]
Ign https://apt.dockerproject.org debian-jessie/main Translation-en
Ign http://opensource.nextthing.co jessie/main Translation-en
Get:8 http://http.debian.net jessie-backports/main Sources/DiffIndex [27.8 kB]
Get:9 http://http.debian.net jessie-backports/contrib Sources/DiffIndex [27.4 kB]
Get:10 http://http.debian.net jessie-backports/non-free Sources/DiffIndex [20.0 kB]
Get:11 http://http.debian.net jessie-backports/main armhf Packages/DiffIndex [27.8 kB]
Hit http://ftp.us.debian.org jessie/main Sources
Get:12 http://http.debian.net jessie-backports/contrib armhf Packages/DiffIndex [24.1 kB]
Get:13 http://http.debian.net jessie-backports/non-free armhf Packages/DiffIndex [7054 B]
Get:14 http://http.debian.net jessie-backports/contrib Translation-en/DiffIndex [6484 B]
Get:15 http://http.debian.net jessie-backports/main Translation-en/DiffIndex [27.8 kB]
Get:16 http://http.debian.net jessie-backports/non-free Translation-en/DiffIndex [14.7 kB]
Hit http://ftp.us.debian.org jessie/contrib Sources
Hit http://ftp.us.debian.org jessie/non-free Sources
Hit http://ftp.us.debian.org jessie/main armhf Packages
Hit http://ftp.us.debian.org jessie/contrib armhf Packages
Hit http://ftp.us.debian.org jessie/non-free armhf Packages
Hit http://ftp.us.debian.org jessie/contrib Translation-en
Hit http://ftp.us.debian.org jessie/main Translation-en
Hit http://ftp.us.debian.org jessie/non-free Translation-en
Reading package lists... Done
Reading package lists...
Building dependency tree...
Reading state information...
The following extra packages will be installed:
  aufs-tools cgroupfs-mount libapparmor1 libdrm2 libltdl7 libnih-dbus1 libnih1 libpng12-0 makedev
  mountall plymouth
Suggested packages:
  desktop-base plymouth-themes
The following NEW packages will be installed:
  aufs-tools cgroupfs-mount docker-engine libapparmor1 libdrm2 libltdl7 libnih-dbus1 libnih1
  libpng12-0 makedev mountall plymouth
0 upgraded, 12 newly installed, 0 to remove and 0 not upgraded.
Need to get 17.4 MB of archives.
After this operation, 80.4 MB of additional disk space will be used.
Get:1 http://ftp.us.debian.org/debian/ jessie/main libdrm2 armhf 2.4.58-2 [27.6 kB]
Get:2 http://ftp.us.debian.org/debian/ jessie/main libltdl7 armhf 2.4.2-1.11 [42.3 kB]
Get:3 https://apt.dockerproject.org/repo/ debian-jessie/main docker-engine armhf 17.03.0~ce-0~debian-jessie [16.5 MB]
Get:4 http://ftp.us.debian.org/debian/ jessie/main libpng12-0 armhf 1.2.50-2+deb8u3 [162 kB]
Get:5 http://ftp.us.debian.org/debian/ jessie/main makedev all 2.3.1-93 [42.6 kB]
Get:6 http://ftp.us.debian.org/debian/ jessie/main plymouth armhf 0.9.0-9 [166 kB]
Get:7 http://ftp.us.debian.org/debian/ jessie/main libnih1 armhf 1.0.3-4.3 [123 kB]
Get:8 http://ftp.us.debian.org/debian/ jessie/main libnih-dbus1 armhf 1.0.3-4.3 [96.2 kB]
Get:9 http://ftp.us.debian.org/debian/ jessie/main mountall armhf 2.54 [68.1 kB]
Get:10 http://ftp.us.debian.org/debian/ jessie/main aufs-tools armhf 1:3.2+20130722-1.1 [91.6 kB]
Get:11 http://ftp.us.debian.org/debian/ jessie/main cgroupfs-mount all 1.1 [4572 B]
Get:12 http://ftp.us.debian.org/debian/ jessie/main libapparmor1 armhf 2.9.0-3 [57.8 kB]
Fetched 17.4 MB in 12s (1439 kB/s)
Selecting previously unselected package libdrm2:armhf.
(Reading database ... 22249 files and directories currently installed.)
Preparing to unpack .../libdrm2_2.4.58-2_armhf.deb ...
Unpacking libdrm2:armhf (2.4.58-2) ...
Selecting previously unselected package libltdl7:armhf.
Preparing to unpack .../libltdl7_2.4.2-1.11_armhf.deb ...
Unpacking libltdl7:armhf (2.4.2-1.11) ...
Selecting previously unselected package libpng12-0:armhf.
Preparing to unpack .../libpng12-0_1.2.50-2+deb8u3_armhf.deb ...
Unpacking libpng12-0:armhf (1.2.50-2+deb8u3) ...
Selecting previously unselected package makedev.
Preparing to unpack .../makedev_2.3.1-93_all.deb ...
Unpacking makedev (2.3.1-93) ...
Selecting previously unselected package plymouth.
Preparing to unpack .../plymouth_0.9.0-9_armhf.deb ...
Unpacking plymouth (0.9.0-9) ...
Selecting previously unselected package libnih1.
Preparing to unpack .../libnih1_1.0.3-4.3_armhf.deb ...
Unpacking libnih1 (1.0.3-4.3) ...
Selecting previously unselected package libnih-dbus1.
Preparing to unpack .../libnih-dbus1_1.0.3-4.3_armhf.deb ...
Unpacking libnih-dbus1 (1.0.3-4.3) ...
Selecting previously unselected package mountall.
Preparing to unpack .../mountall_2.54_armhf.deb ...
Unpacking mountall (2.54) ...
Selecting previously unselected package aufs-tools.
Preparing to unpack .../aufs-tools_1%3a3.2+20130722-1.1_armhf.deb ...
Unpacking aufs-tools (1:3.2+20130722-1.1) ...
Selecting previously unselected package cgroupfs-mount.
Preparing to unpack .../cgroupfs-mount_1.1_all.deb ...
Unpacking cgroupfs-mount (1.1) ...
Selecting previously unselected package libapparmor1:armhf.
Preparing to unpack .../libapparmor1_2.9.0-3_armhf.deb ...
Unpacking libapparmor1:armhf (2.9.0-3) ...
Selecting previously unselected package docker-engine.
Processing triggers for dbus (1.8.22-0+deb8u1) ...
Setting up libdrm2:armhf (2.4.58-2) ...
Setting up libltdl7:armhf (2.4.2-1.11) ...
Setting up libpng12-0:armhf (1.2.50-2+deb8u3) ...
Setting up makedev (2.3.1-93) ...
/run/udev or .udevdb or .udev presence implies active udev.  Aborting MAKEDEV invocation.
/run/udev or .udevdb or .udev presence implies active udev.  Aborting MAKEDEV invocation.
/run/udev or .udevdb or .udev presence implies active udev.  Aborting MAKEDEV invocation.
/run/udev or .udevdb or .udev presence implies active udev.  Aborting MAKEDEV invocation.
Setting up plymouth (0.9.0-9) ...
update-initramfs: deferring update (trigger activated)
update-rc.d: warning: start and stop actions are no longer supported; falling back to defaults
update-rc.d: warning: start and stop actions are no longer supported; falling back to defaults
Setting up libnih1 (1.0.3-4.3) ...
Setting up libnih-dbus1 (1.0.3-4.3) ...
Setting up mountall (2.54) ...
Setting up aufs-tools (1:3.2+20130722-1.1) ...
Setting up cgroupfs-mount (1.1) ...
Setting up libapparmor1:armhf (2.9.0-3) ...
Setting up docker-engine (17.03.0~ce-0~debian-jessie) ...
Processing triggers for libc-bin (2.19-18+deb8u7) ...
Processing triggers for systemd (215-17+deb8u6) ...
Processing triggers for initramfs-tools (0.120+deb8u2) ...
update-initramfs: Generating /boot/initrd.img-4.4.13-ntc-mlc
Warning: root device  does not exist
DTB: sun5i-r8-chip.dtb
Installing sun5i-r8-chip.dtb into /boot/dtbs/4.4.13-ntc-mlc/sun5i-r8-chip.dtb
Taking backup of sun5i-r8-chip.dtb.
Installing new sun5i-r8-chip.dtb.
Installing sun5i-r8-chip.dtb into /boot/dtbs/4.4.13-ntc-mlc/sun5i-r8-chip.dtb
Taking backup of sun5i-r8-chip.dtb.
Installing new sun5i-r8-chip.dtb.
flash-kernel: installing version 4.4.13-ntc-mlc
Taking backup of zImage.
Installing new zImage.
Taking backup of sun5i-r8-chip.dtb.
Installing new sun5i-r8-chip.dtb.
Processing triggers for dbus (1.8.22-0+deb8u1) ...
+ sh -c 'docker version'
Client:
 Version:      17.03.0-ce
 API version:  1.26
 Go version:   go1.7.5
 Git commit:   60ccb22
 Built:        Thu Feb 23 11:36:35 2017
 OS/Arch:      linux/arm

Server:
 Version:      17.03.0-ce
 API version:  1.26 (minimum version 1.12)
 Go version:   go1.7.5
 Git commit:   60ccb22
 Built:        Thu Feb 23 11:36:35 2017
 OS/Arch:      linux/arm
 Experimental: false

If you would like to use Docker as a non-root user, you should now consider
adding your user to the "docker" group with something like:

  sudo usermod -aG docker your-user

Remember that you will have to log out and back in for this to take effect!

root@chipgm32:~#
```

**NOTE**: The message above `modprobe: FATAL: Module aufs not found.`
should be harmless as Docker engine is using the overlay2 Storage Driver:

```script
root@chipgm32:~# docker info
Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 17.03.0-ce
Storage Driver: overlay2
 Backing Filesystem: <unknown>
 Supports d_type: true
 Native Overlay Diff: false
Logging Driver: json-file
Cgroup Driver: cgroupfs
Plugins:
 Volume: local
 Network: bridge host macvlan null overlay
Swarm: inactive
Runtimes: runc
Default Runtime: runc
Init Binary: docker-init
containerd version: 977c511eda0925a723debdc94d09459af49d082a
runc version: a01dafd48bc1c7cc12bdb01206f9fea7dd6feb70
init version: 949e6fa
Kernel Version: 4.4.13-ntc-mlc
Operating System: Debian GNU/Linux 8 (jessie)
OSType: linux
Architecture: armv7l
CPUs: 1
Total Memory: 491 MiB
Name: chipgm32
ID: X565:BNYG:ATBK:UNXA:BC7P:RIX2:HVNT:BKMG:7QSQ:ZH5N:ROLP:M4HB
Docker Root Dir: /var/lib/docker
Debug Mode (client): false
Debug Mode (server): false
Registry: https://index.docker.io/v1/
WARNING: No swap limit support
WARNING: No kernel memory limit support
Experimental: false
Insecure Registries:
 127.0.0.0/8
Live Restore Enabled: false
root@chipgm32:~#
```

Add user `chip` to group `docker`

```script
sudo usermod -aG docker chip
```

Logout and login to apply the changes

#### Run your first Docker Container on chipgm32

Logged as chip@chipgm32

```script
docker run -d -p 80:80 hypriot/rpi-busybox-httpd
```

Result:

```script
root@chipgm32:~# docker run -d -p 80:80 hypriot/rpi-busybox-httpd
Unable to find image 'hypriot/rpi-busybox-httpd:latest' locally
latest: Pulling from hypriot/rpi-busybox-httpd
c74a9c6a645f: Pull complete
6f1938f6d8ae: Pull complete
e1347d4747a6: Pull complete
a3ed95caeb02: Pull complete
Digest: sha256:c00342f952d97628bf5dda457d3b409c37df687c859df82b9424f61264f54cd1
Status: Downloaded newer image for hypriot/rpi-busybox-httpd:latest
0dcc31c2d196a7285391eb33437fdf7f3b75df295cf8724451ecf768b9cb3220
root@chipgm32:~#
```

Now browse <http://192.168.64.206/> and verfiy that the webserver is up and running:

### Install docker-compose on chipgm32

<!-- 2071-03-13 15:24 CET -->

**NOTE**: As of 2017-03-13 there is no pre-built `docker-compose` binary for Linux/armv7l, therefore the following commands will return "Not Found":

```script
sudo curl -L "https://github.com/docker/compose/releases/download/1.10.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
file /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Read <https://github.com/hypriot/arm-compose>

See <https://packagecloud.io/Hypriot/Schatzkiste/install>

Logged as chip@chipgm32

```script
curl -s https://packagecloud.io/install/repositories/Hypriot/Schatzkiste/script.deb.sh | sudo bash
```

Now install package `docker-compose`

```script
sudo apt install docker-compose
```

Test

```
chip@chipgm32:~ $ docker-compose --version
docker-compose version 1.9.0, build 2585387
pi@rpi3gm23:~ $
```


### Run Portainer on chipgm32

See <https://blog.hypriot.com/post/new-docker-ui-portainer/>

Prerequisites: docker and docker-compose already installed

Login as chip@chipgm32 and type the following commands:

```script
mkdir -p ~/MYGIT && cd ~/MYGIT
git clone https://github.com/gmacario/rpi3-compose-portainer
cd rpi3-compose-portainer
```

Now run the containers

```
docker-compose up -d
```

Browse <http://192.168.64.206:9000> to access Portainer web UI.

### Configure Wi-Fi from command line

<!-- 2017-03-14 15:25 CET -->

See <https://docs.getchip.com/chip.html#wifi-connection>

Connect via USB to your laptop,

Using Windows Device Manager identify the new USB serial port created (in our example, COM21)

Start PuTTY:COM21:115200,8,n,1, you will get a login prompt

```
Debian GNU/Linux 8 chipgm32 ttyGS0

chipgm32 login:
```

Login as user `chip` (default password: `chip` but you should have already changed it, right?)

Logged as chip@chipgm32, list available Wi-Fi networks

```script
nmcli device wifi list
```

#### Connect to a password-protected Wi-Fi network

Logged as chip@chipgm32, type the following command

```script
sudo nmcli device wifi connect '(your wifi network name/SSID)' password '(your wifi password)' ifname wlan0
```

#### Connect to a hidden Wi-Fi network

Connect to a password-protected Wi-Fi network with the following commnand
(reference: <http://stackoverflow.com/questions/35476428/how-to-connect-to-hidden-wifi-network-using-nmcli>)

```script
sudo nmcli con add type wifi con-name '(connection name)' ifname wlan0 ssid '(your wifi hidden ssid)'
sudo nmcli con modify '(connection name)' wifi-sec.key-mgmt wpa-psk
sudo nmcli con modify '(connection name)' wifi-sec.psk '(password)'
sudo nmcli con up '(connection name)'
```

Step 3: Test your Connection

```script
nmcli device status
```


### See also

* C.H.I.P. Documentation: <https://docs.getchip.com/chip.html>

<!-- EOF -->

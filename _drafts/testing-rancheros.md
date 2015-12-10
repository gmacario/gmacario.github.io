---
layout: post
title:  "Testing Rancher OS"
date:   2015-12-10 19:00:00 CET
categories: howto rancheros linux containers docker
---

### Introduction

My first steps trying [RancherOS](http://rancher.com/rancher-os/).

### References

* <https://medium.com/devs-foodit/pimp-my-jenkins-continuous-delivery-dashboard-edition-229463755730>
* <http://rancher.com/deploying-a-scalable-jenkins-cluster-with-docker-and-rancher/>
* <http://thenewstack.io/now-in-beta-rancher-labs-runs-docker-natively-in-production/>
* <https://www.quora.com/What-are-the-differences-between-RancherOS-and-CoreOS>
* <https://github.com/rancher/os>
* <http://docs.rancher.com/os/quick-start-guide/>

### Launching RancherOS using Vagrant

(adapted from <http://docs.rancher.com/os/quick-start-guide/>)

Logged in as gmacario@itm-gmacario-w7, start a Cygwin terminal

Clone the RancherOS Vagrant repository.

```
$ mkdir -p ~/test && cd ~/test
$ git clone https://github.com/rancher/os-vagrant.git
$ cd os-vagrant
```

Startup your VM with `vagrant up`

```
$ vagrant up
Bringing machine 'rancher-01' up with 'virtualbox' provider...
...
==> rancher-01: Machine booted and ready!
==> rancher-01: Setting hostname...
==> rancher-01: Configuring and enabling network interfaces...
```

Log into your VM with `vagrant ssh`

```
$ vagrant ssh
[rancher@rancher-01 ~]$
```

### A first look at RancherOS

#### Check kernel version

```
[rancher@rancher-01 ~]$ uname -a
Linux rancher-01 4.2.3-rancher #1 SMP Wed Oct 14 11:25:04 UTC 2015 x86_64 GNU/Linux
[rancher@rancher-01 ~]$
```

#### Inspect disk usage

```
[rancher@rancher-01 ~]$ sudo df -h
Filesystem                Size      Used Available Use% Mounted on
overlay                  36.5G    231.4M     34.3G   1% /
tmpfs                   484.9M         0    484.9M   0% /dev
tmpfs                   498.3M         0    498.3M   0% /sys/fs/cgroup
none                    498.3M    252.0K    498.0M   0% /run
/dev/sda1                36.5G    231.4M     34.3G   1% /home
/dev/sda1                36.5G    231.4M     34.3G   1% /opt
/dev/sda1                36.5G    231.4M     34.3G   1% /etc/docker
/dev/sda1                36.5G    231.4M     34.3G   1% /lib/firmware
none                    498.3M    252.0K    498.0M   0% /var/run
/dev/sda1                36.5G    231.4M     34.3G   1% /sbin/reboot
/dev/sda1                36.5G    231.4M     34.3G   1% /var/log
devtmpfs                484.9M         0    484.9M   0% /host/dev
shm                      64.0M         0     64.0M   0% /host/dev/shm
/dev/sda1                36.5G    231.4M     34.3G   1% /sbin/shutdown
/dev/sda1                36.5G    231.4M     34.3G   1% /sbin/halt
/dev/sda1                36.5G    231.4M     34.3G   1% /sbin/iptables
/dev/sda1                36.5G    231.4M     34.3G   1% /sbin/poweroff
/dev/sda1                36.5G    231.4M     34.3G   1% /etc/rkt
/dev/sda1                36.5G    231.4M     34.3G   1% /lib/modules
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/sbin/ros
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/bin/system-docker
/dev/sda1                36.5G    231.4M     34.3G   1% /var/lib/docker
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/bin/user-docker
/dev/sda1                36.5G    231.4M     34.3G   1% /var/lib/rkt
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/sbin/wait-for-network
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/bin/dockerlaunch
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/bin/cloud-init
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/bin/docker.dist
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/sbin/rancherctl
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/sbin/wait-for-docker
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/bin/respawn
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/sbin/netconf
/dev/sda1                36.5G    231.4M     34.3G   1% /var/lib/rancher
/dev/sda1                36.5G    231.4M     34.3G   1% /var/lib/rancher/conf
/dev/sda1                36.5G    231.4M     34.3G   1% /usr/share/ros/os-config.yml
/dev/sda1                36.5G    231.4M     34.3G   1% /etc/ssl/certs/ca-certificates.crt.rancher
/dev/sda1                36.5G    231.4M     34.3G   1% /etc/resolv.conf
/dev/sda1                36.5G    231.4M     34.3G   1% /etc/hostname
shm                      64.0M         0     64.0M   0% /dev/shm
devtmpfs                484.9M         0    484.9M   0% /dev
shm                      64.0M         0     64.0M   0% /dev/shm
[rancher@rancher-01 ~]$
```

#### Check network interfaces

```
[root@rancher-01 ~]$ ifconfig
docker-sys Link encap:Ethernet  HWaddr 00:00:00:00:00:00
          inet addr:172.18.42.1  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::c4e4:8ff:fe67:ae2d/64 Scope:Link
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:5 errors:0 dropped:0 overruns:0 frame:0
          TX packets:8 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:368 (368.0 B)  TX bytes:648 (648.0 B)

docker0   Link encap:Ethernet  HWaddr 02:42:46:53:C8:82
          inet addr:172.17.0.1  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::42:46ff:fe53:c882/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:59 errors:0 dropped:0 overruns:0 frame:0
          TX packets:54 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:4003 (3.9 KiB)  TX bytes:4563 (4.4 KiB)

eth0      Link encap:Ethernet  HWaddr 08:00:27:9F:1D:71
          inet addr:10.0.2.15  Bcast:10.0.2.255  Mask:255.255.255.0
          inet6 addr: fe80::a00:27ff:fe9f:1d71/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:104139 errors:0 dropped:0 overruns:0 frame:0
          TX packets:55480 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:75924932 (72.4 MiB)  TX bytes:3401703 (3.2 MiB)

eth1      Link encap:Ethernet  HWaddr 08:00:27:19:16:E4
          inet addr:172.19.8.101  Bcast:0.0.0.0  Mask:255.255.255.0
          inet6 addr: fe80::a00:27ff:fe19:16e4/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:7181 errors:0 dropped:4 overruns:0 frame:0
          TX packets:29 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:755660 (737.9 KiB)  TX bytes:3362 (3.2 KiB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

veth0196292 Link encap:Ethernet  HWaddr FE:49:55:09:12:AA
          inet6 addr: fe80::fc49:55ff:fe09:12aa/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:13 errors:0 dropped:0 overruns:0 frame:0
          TX packets:30 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:822 (822.0 B)  TX bytes:1944 (1.8 KiB)

[root@rancher-01 ~]$
```

#### Check Docker version

```
[rancher@rancher-01 ~]$ docker version
Client:
 Version:      1.9.1-rc1
 API version:  1.21
 Go version:   go1.4.3
 Git commit:   4663423
 Built:        Mon Nov 16 06:05:31 UTC 2015
 OS/Arch:      linux/amd64

Server:
 Version:      1.9.1-rc1
 API version:  1.21
 Go version:   go1.4.3
 Git commit:   4663423
 Built:        Mon Nov 16 06:05:31 UTC 2015
 OS/Arch:      linux/amd64
[rancher@rancher-01 ~]$
```

#### Inspect running system containers

Notice that `system-docker ps` fails unless it is run as `root`.

```
[rancher@rancher-01 ~]$ sudo -i
[root@rancher-01 ~]# system-docker ps
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS               NAMES
692016a11484        rancher/os-docker:v0.4.1    "/usr/sbin/entry.sh /"   2 hours ago         Up 2 hours                              docker
ebe39a8deb65        rancher/os-console:v0.4.1   "/usr/sbin/entry.sh /"   2 hours ago         Up 2 hours                              os_console_1
ec28508ac472        rancher/os-ntp:v0.4.1       "/usr/sbin/entry.sh /"   2 hours ago         Up 2 hours                              ntp
503dd1a3f135        rancher/os-network:v0.4.1   "/usr/sbin/entry.sh n"   2 hours ago         Up 2 hours                              network
ccf03fbf1693        rancher/os-udev:v0.4.1      "/usr/sbin/entry.sh /"   2 hours ago         Up 2 hours                              udev
f6f621151318        rancher/os-acpid:v0.4.1     "/usr/sbin/entry.sh /"   2 hours ago         Up 2 hours                              acpid
24a59d843f13        rancher/os-syslog:v0.4.1    "/usr/sbin/entry.sh /"   2 hours ago         Up 2 hours                              syslog
[root@rancher-01 ~]# exit
logout
[rancher@rancher-01 ~]$
```

#### Run Ubuntu inside a container

```
[rancher@rancher-01 ~]$ docker run -it ubuntu
root@f2180b351d1b:/# lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 14.04.3 LTS
Release:        14.04
Codename:       trusty
root@f2180b351d1b:/#
```

#### Run nginx inside a container

```
[rancher@rancher-01 ~]$ ifconfig eth1 | grep "inet addr"
          inet addr:172.19.8.101  Bcast:0.0.0.0  Mask:255.255.255.0
[rancher@rancher-01 ~]$ docker run -d --name nginx -p 8000:80 husseingalal/nginxbusy
8331240ea5fdf078822dc3f79380627e6137d2a5d7d1c75fad567da12419b850
[rancher@rancher-01 ~]$
```

Now logged as gmacario@itm-gmacario-w7, browse <http://172.19.8.101:8000/>

#### Deploy a system service container

```
[rancher@rancher-01 ~]$ sudo system-docker run -d --net=host --name busydash husseingalal/busydash
b6fb4f1983399f285c1e29f0133b454837d2d9d2f461f3328b3467233573195f
[rancher@rancher-01 ~]$
```

logged as gmacario@itm-gmacario-w7, browse <http://172.19.8.101/>


**NOTE 1**: Docker image `husseingalal/busydash` was built from the following `Dockerfile`:

```
FROM hwestphal/nodebox
MAINTAINER hussein.galal.ahmed.11@gmail.com

RUN opkg-install unzip
RUN curl -k -L -o master.zip https://github.com/afaqurk/linux-dash/archive/master.zip
RUN unzip master.zip
WORKDIR linux-dash-master
RUN npm install

ENTRYPOINT ["node","server"]
```

**NOTE 2**: Sources for Docker image `hwestphal/nodebox` are available at <https://github.com/hwestphal/docker-nodebox>

TODO

<!-- EOF -->

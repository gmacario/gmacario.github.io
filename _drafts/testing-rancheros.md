---
layout: post
title:  "Testing Rancher OS"
date:   2015-12-10 19:00:00 CET
categories: howto rancheros linux containers docker
---

### Introduction

TODO

### References

* <https://medium.com/devs-foodit/pimp-my-jenkins-continuous-delivery-dashboard-edition-229463755730>
* <http://rancher.com/deploying-a-scalable-jenkins-cluster-with-docker-and-rancher/>
* <http://thenewstack.io/now-in-beta-rancher-labs-runs-docker-natively-in-production/>
* <https://www.quora.com/What-are-the-differences-between-RancherOS-and-CoreOS>
* <https://github.com/rancher/os>
* <http://docs.rancher.com/os/quick-start-guide/>

### Launching RancherOS using Vagrant

(From <http://docs.rancher.com/os/quick-start-guide/>)

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

Check kernel version

```
[rancher@rancher-01 ~]$ uname -a
Linux rancher-01 4.2.3-rancher #1 SMP Wed Oct 14 11:25:04 UTC 2015 x86_64 GNU/Linux
[rancher@rancher-01 ~]$
```

Inspect disk usage

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

Check Docker version

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

TODO

<!-- EOF -->

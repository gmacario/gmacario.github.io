---
layout: post
title:  "Trying systemd inside a container"
date:   2015-05-12 22:40:00
categories: systemd howto development docker
---
<-- markdown-link-check-disable -->
This blog post explains how ...
Logged as gmacario@mv-linux-powerhorse
```
$  docker run -ti library/fedora /bin/bash
```
Logged as root@container
```
# mkdir -p /run/log
# /usr/lib/systemd/systemd-bootchart --rel -n 50
# dnf install -y openssh-clients
# scp /run/log/bootchart*.svg gmacario@gmoffice.solarma.it:Downloads
```
TODO: Open issue on systemd/systemd
bootchart: Diagram out of bounds when "--per-cpu" is selected on a multi-core system
* IO utilization - read
* IO utilization - write
* CPU[overall] utilization
* CPU[overall] wait
If "--per-cpu" is selected, the following bars are added:
* CPU[0] utilization
* CPU[0] wait
* ...
* CPU[n_cpus - 1] utilization
* CPU[n_cpus - 1] wait
Fixup: height_xxx * (2 + n_cpus) / 2
<-- markdown-link-check-enable-->
<-- EOF -->

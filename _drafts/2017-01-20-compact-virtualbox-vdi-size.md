---
layout: post
title:  "How to compact VirtualBox VDI file"
date:   2017-01-20 10:00:00 CET
# categories: template android howto development
---
<-- markdown-link-check-disable -->
* Make free space in the Ubuntu Linux Guest
* Nullify the free space
  With a Ubuntu Linux Guest run this in recovery mode
  ```
  mount -o remount,ro /dev/sda1
  zerofree -v /dev/sda1
  shutdown -h now
  ```
* Now run VBoxManage's `modifymedium` command with the `--compact` option.
  With a Windows Host run this:
  ```
  VBoxManage.exe modifymedium c:\path\to\thedisk.vdi --compact
  ```
  This reduces the `*.vdi` size
<-- markdown-link-check-enable-->
<-- EOF -->

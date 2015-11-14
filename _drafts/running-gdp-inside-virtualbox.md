---
layout: post
title:  "Running GDP inside VirtualBox"
date:   2015-11-14 09:00:00 CET
categories: howto gdp genivi yocto virtualbox embedded ivi
---

Build a `*-qemux86-64.vmdk` image from branch `dev-qemux86-64` of <https://github.com/gmacario/genivi-demo-platform>

```
$ git checkout -b https://github.com/gmacario/genivi-demo-platform
$ cd genivi-demo-platform
$ source init.sh
$ bitbake core-image-minimal
```

From the Oracle VM VirtualBox Manager, create a new VM

* Name: core-image-minimal-qemux86-64
* Type: Linux
* Version: Other Linux (64-bit)

Memory size: 1024 MB

Hard disk: Use an existing virtual hard disk file

* File name: .../core-image-minimal-qemux86-64.vmdk

Click "Create"

From the Oracle VM VirtualBox Manager, start the VM

Result: FAIL

(verified on <https://github.com/gmacario/genivi-demo-platform/commit/e01ebe7838170ef45a920b43f11dcd02865d2d13>)

```
...
VFS: Unable to mount root fs on unknown-block(0,0)
User configuration error - no valid root filesystem found
Kernel panic - not syncing: Invalid configuration from end user prevents continuing
...
```

I was unable to scroll up in the boot log, but I presume the kernel cmdline does not properly define `root=xxx`

Tracking issue in <https://github.com/gmacario/genivi-demo-platform/issues/1>

TODO


<!-- EOF -->

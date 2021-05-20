---
layout: post
title:  "Running a Yocto image inside VirtualBox"
date:   2015-11-14 09:00:00 CET
tags:   howto gdp genivi yocto virtualbox embedded ivi
---
<!-- markdown-link-check-disable -->

I managed to have a Yocto image boot inside [Oracle VirtualBox](http://www.virtualbox.org/) by performing the following steps.

Tested with `core-image-minimal-qemux86-64.vmdk`

The Yocto project provides support for building VMDK (VMware Disk) images, which are also recognized by VirtualBox.

The support for building native VDI (VirtualBox Disk Image) was added after the release 1.8 (fido) of Yocto project which I tested when preparing this article.

### Building a VMDK image

Build a `*-qemux86-64.vmdk` image from branch `dev-qemux86-64` of <https://github.com/gmacario/genivi-demo-platform>

```
$ git checkout -b dev-qemux86-64 https://github.com/gmacario/genivi-demo-platform
$ cd genivi-demo-platform
$ source init.sh
$ bitbake core-image-minimal
```

The important configuration to be added to `conf/local.conf` is the following line:

```
IMAGE_FSTYPES += "vmdk"
```

### Running the VMDK image

From the Oracle VM VirtualBox Manager, create a new Virtual Machine

Name and operating system

* Name: core-image-minimal-qemux86-64
* Type: Linux
* Version: Other Linux (64-bit)

Click "Next"

Memory size

* Select: 1024 MB

Click "Next"

Hard disk

* Select: Do not add a virtual hard disk

Select "Create", then "Continue"

From the Oracle VM VirtualBox Manager, change VM settings

Under Storage > Add new storage controller > Add SATA Controller

Under Storage > Controller: SATA > Add Hard Disk

* Select: Choose existing disk
* Virtual hard disk file: .../core-image-minimal-qemux86-64.vmdk

Click "OK"

From the Oracle VM VirtualBox Manager, start the VM

Result:

![capture-20151114-1623](https://cloud.githubusercontent.com/assets/75182/11164285/225eebb2-8aec-11e5-89b6-685f0b0fd9a2.PNG)

You may then login as user `root` (there is no default password)

<!-- markdown-link-check-enable -->
<!-- EOF -->

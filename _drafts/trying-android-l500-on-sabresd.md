---
layout: post
title:  "Trying Android Lollipop 5.0.0 on a Freescale Sabre SD"
date:   2015-06-04 16:49:00
categories: android howto development debugging
---

This blog post explains my tests of Android Lollipop 5.0.0 on a SABRE SD board.

### Download files from Freescale website

Browse <http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD>

You should sign in with your account credentials in order to be able to download the files.
If you do not have a Freescale login please create one by selecting "Register".

Select tab "Documentation". Download the following files:

* **IMX6_L500_100_ANDROID_DOCS**
  - i.MX6 Android L5.0.0_1.0.0 BSP Documentation	Supporting Information	gz	8189	L5.0.0_1.0.0	5/29/2015

Select tab "Software & Tools", then expand group "Hardware Development Tools > Programmers (Flash, etc.)". Download the following files:

* **IMX-L5.0.0-MFG-TOOL**
  - i.MX 6Family Manufacturing Toolkit for L5.0.0_1.0.0
  - Size (K): 36731 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015

Select tab "Software & Tools", then expand group "Run-time Software > Operating System Software-Board Support Packages". Download the following files:

* **IMX6-L500-100-ANDROID-SOURCE-BSP**
  - i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, i.MX 6Solo i.MX 6Sololite and i.MX6SX Android L5.0.0_1.0.0 BSP, Source Code for BSP and Codecs.
  - Size (K): 94224 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015
* **IMX6-L500-100-ANDROID-DEMO-SD-BSP**
  - i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, and i.MX 6Solo Android L5.0.0_1.0.0 BSP Binary Demo Files for the SABRE Platform and SABRE Board for Smart Devices.
  - Size (K): 783176 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015
* **IMX6-L500-100-ANDROID-DEMO-iMX6SX-BSP**
  - i.MX 6SoloX Android L5.0.0_1.0.0 BSP Binary Demo Files.
  - Size (K): 990953 Format: gz Rev #: L5.0.0_1.0.0 Modified: 6/2/2015

### Extract the downloaded files

Create a new directory to contain the extracted files

```
$ mkdir -p ~/temp/Android_L500_100_iMX6
```

Extract the documentation and the MFGTool

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_doc.tar.gz
```


The documentation will be extracted under `published/`.
Please read the following files:

* `Android_Release_Notes.pdf` - Android(TM) Release Notes
  - Document Number: ARN - Rev. L5.0.0_1.0.0-ga, 06/2015 - Format: PDF, 10 pages

* `Android_Quick_Start_Guide.pdf` - Android(TM) Quick Start Guide
  - Document Number: AQSUG - Rev. L5.0.0_1.0.0-ga, 06/2015 - Format: PDF, 28 pages

* `Android_User's_Guide.pdf` - Android(TM) User's Guide
  - Document Number: AUG - Rev. L5..0_1.0.0-ga, 06/2015 - Format: PDF, 25 pages

* ...

Extract the documentation and the MFGTool

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_tools.tar.gz
```

Extract the archive with demo images, then extract the full image for q6sabresd

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_images_6qsabresd.tar.gz
$ tar xvf android_L5.0.0_1.0.0-ga_full_image_6qsabresd.tar.gz
```

Extract the BSP sources

```
$ cd ~/temp/Android_L500_100_iMX6
$ tar xvf .../android_L5.0.0_1.0.0-ga_core_source.gz
```

### Create a SD-Card with L5.0.0 for Sabre SD Quad

Login to a Linux machine equipped with a SD-Card writer (in our case, gmacario@kruk)

```
$ cd /opt/export/tmp-gmacario/easy-build/build-android-kk443-sabresd
$ SDCARD=/dev/sdX SDCARD_SIZE=xxxx ./sabresd-prepare-sdcard-android.sh
```

TODO

### Write Android L5.0.0 on Sabre SD Quad eMMC

Follow instructions in Chapter 3 of the "Android(TM) Quick Start Guide"

TODO TODO TODO

```
$ cd ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_tools/mfgtools/
$ cd "Profiles/Linux/OS Firmware/files/android/sabresd/"
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/u-boot-imx6q.imx .
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
$ cp ~/temp/Android_L500_100_iMX6/android_L5.0.0_1.0.0-ga_full_image_6qsabresd/
```

TODO

<!-- EOF -->

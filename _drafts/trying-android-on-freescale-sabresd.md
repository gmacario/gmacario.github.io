---
layout: post
title:  "Trying Android on Freescale SabreSD"
date:   2015-05-15 12:40:00
categories: android howto development freescale embedded imx6
---

This blog post explains how to install and run Android KitKat 4.4.3
on the Freescale
[SABRE Platform for Smart Devices](http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREPLAT)
Reference Design based on the i.MX 6 Series Application Processor.

### Download files from the Freescale website

#### Download Android BSP documentation

Browse <http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD>

Select tab "Documentation" then select the "Download" button
of the following package

| Package ID | Description | Type | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|------|--------|-----------|-------|--------------------|
| **IMX6_KK443_200_ANDROID_DOCS** | i.MX6 Android kk4.4.3_2.0.0 BSP Documentation	| Supporting Information | gz | 7625 | kk4.4.3_2.0.0 | 2015-06-02 |

#### Download Manufacturing Tools

Select tab "Software & Tools".
In section "Hardware Development Tools", expand group
"Programmers (Flash, etc.)",
then select the "Download" button of the following packages:

| Package ID | Description | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|--------|-----------|-------|--------------------|
| **IMX_KK4.4.3_MFG_TOOL** | i.MX 6Family Manufacturing Toolkit for kk4.4.3_2.0.0 | gz | 36796 | kk4.4.3_2.0.0 | 2015-06-02 |

#### Download Android BSP and demo image for SabreSD

Select tab "Software & Tools".
In section "Run-time Software", expand group
"Operating System Software-Board Support Packages",
then select the "Download" button of the following packages:

<!-- TIP: <http://www.tablesgenerator.com/markdown_tables> -->

| Package ID | Description | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|--------|-----------|-------|--------------------|
| **IMX6_KK443_200_ANDROID_DEMO_SD_BSP** | i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, and i.MX 6Solo Android KK4.4.3_2.0.0 BSP Binary Demo Files for the SABRE Platform and SABRE Board for Smart Devices | gz | 1166696 | kk4.4.3_2.0.0 | 2015-06-02 |

#### (Optional) Download source code for BSP

Select tab "Software & Tools".
In section "Run-time Software", expand group
"Operating System Software-Board Support Packages",
then select the "Download" button of the following packages:

| Package ID | Description | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|--------|-----------|-------|--------------------|
| **IMX6_KK443_200_ANDROID_SOURCE_BSP**  | i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, i.MX 6Solo and i.MX 6Sololite Android KK4.4.3_2.0.0 BSP, Source Code for BSP and Codecs | gz | 66824 | kk4.4.3_2.0.0 | 2015-06-02 |


NOTE: Before being able to download the software, you should first login
to the Freescale website, then accept the Freescale Semiconductor Software License Agreement.

Inspect size of the downloaded files:

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ ls -la *.gz
-rwxrwx---+ 1 Administrators Domain Users   68427748 May 14 15:46 android_KK4.4.3_2.0.0-ga_core_source.gz
-rwxrwx---+ 1 Administrators Domain Users    7808540 May 14 16:04 android_kk4.4.3_2.0.0-ga_doc.gz
-rwxrwx---+ 1 Administrators Domain Users 1194696105 May 14 16:06 android_kk4.4.3_2.0.0-ga_images_6qsabresd.gz
-rwxrwx---+ 1 Administrators Domain Users   37679059 May 14 17:06 android_KK4.4.3_2.0.0-ga_tools.gz

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

Verify file checksums:

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ md5sum *.gz
7d489191496c31ca370e1eae9e51c545 *android_KK4.4.3_2.0.0-ga_core_source.gz
cb298854a1cea2d35133f1e972464fcd *android_kk4.4.3_2.0.0-ga_doc.gz
99ee83507692a7e7355cf4b596b91b2f *android_kk4.4.3_2.0.0-ga_images_6qsabresd.gz
ec6e236662cb6b7d1919d1cb48defe3b *android_KK4.4.3_2.0.0-ga_tools.gz

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

### Extract documentation

```
$ mkdir -p tmp/doc
$ tar -C tmp/doc -xvzf android_kk4.4.3_2.0.0-ga_doc.gz
```

Result

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ tar -C tmp/doc -xvzf android_kk4.4.3_2.0.0-ga_doc.gz
final/
final/Android_Frequently_Asked_Questions.pdf
final/Android_Quick_Start_Guide.pdf
final/Android_Release_Notes.pdf
final/Android_User's_Guide.pdf
final/i.MX_6_Graphics_User's_Guide.pdf
final/i.MX_Android_Camera_Issues_on_the_SDP_Board.pdf
final/i.MX_Android_Extended_Codec_Release_Notes.pdf
final/i.MX_Android_Extended_Wi-Fi_Display_Sink_Release_Notes.pdf
final/i.MX_Android_Wi-Fi_Display_Sink_API_Introduction.pdf

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

Read documentation in the following order

1. Android_Quick_Start_Guide.pdf (26 pages)
2. ...

### Extract KK images for SabreSD

```
$ mkdir -p tmp/images
$ tar -C tmp/images -xvzf android_kk4.4.3_2.0.0-ga_images_6qsabresd.gz
```

Result

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ tar -C tmp/images -xvzf android_kk4.4.3_2.0.0-ga_images_6qsabresd.gz
android_KK4.4.3_2.0.0-ga_core_image_6qsabresd.tar.gz
android_KK4.4.3_2.0.0-ga_full_image_6qsabresd.tar.gz

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

Inspect size of the extracted files:

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ ls -la tmp/images
total 1172680
drwxrwxr-x+ 1 gmacario Domain Users         0 May 14 16:21 .
drwxrwxr-x+ 1 gmacario Domain Users         0 May 14 16:21 ..
-rwxrwxr-x+ 1 gmacario Domain Users 596332389 Jan 19 18:58 android_KK4.4.3_2.0.0-ga_core_image_6qsabresd.tar.gz
-rwxrwxr-x+ 1 gmacario Domain Users 604488992 Jan 19 18:17 android_KK4.4.3_2.0.0-ga_full_image_6qsabresd.tar.gz

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

Now extract contents of `android_KK4.4.3_2.0.0-ga_full_image_6qsabresd.tar.gz`

```
$ tar -C tmp/ -xvzf tmp/images/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd.tar.gz
$ ls -laR tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd
```

Result

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ ls -laR tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd
tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd:
total 788
drwxrwxr-x+ 1 gmacario Domain Users      0 Jan  8 07:08 .
drwxrwxr-x+ 1 gmacario Domain Users      0 May 14 17:30 ..
drwxrwxr-x+ 1 gmacario Domain Users      0 Jan  8 07:09 eMMC
drwxrwxr-x+ 1 gmacario Domain Users      0 Jan  8 07:11 NFS
drwxrwxr-x+ 1 gmacario Domain Users      0 Jan  8 07:27 SD
-rwxrwxr-x+ 1 gmacario Domain Users 392192 Jan  8 07:08 u-boot-imx6dl.imx
-rwxrwxr-x+ 1 gmacario Domain Users 392192 Jan  8 07:08 u-boot-imx6q.imx

tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd/eMMC:
total 412920
drwxrwxr-x+ 1 gmacario Domain Users         0 Jan  8 07:09 .
drwxrwxr-x+ 1 gmacario Domain Users         0 Jan  8 07:08 ..
-rw-rwxr--+ 1 gmacario Domain Users   7274929 Jan  8 07:08 boot-imx6dl.img
-rw-rwxr--+ 1 gmacario Domain Users   7274372 Jan  8 07:08 boot-imx6q.img
-rw-rwxr--+ 1 gmacario Domain Users   7274372 Jan  8 07:08 boot-imx6q-ldo.img
-rw-rwxr--+ 1 gmacario Domain Users   7835491 Jan  8 07:08 recovery-imx6dl.img
-rw-rwxr--+ 1 gmacario Domain Users   7834934 Jan  8 07:08 recovery-imx6q.img
-rw-rwxr--+ 1 gmacario Domain Users   7834934 Jan  8 07:08 recovery-imx6q-ldo.img
-rw-rwxr--+ 1 gmacario Domain Users 377487360 Jan  8 07:08 system.img

tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd/NFS:
total 175196
drwxrwxr-x+ 1 gmacario Domain Users         0 Jan  8 07:11 .
drwxrwxr-x+ 1 gmacario Domain Users         0 Jan  8 07:08 ..
-rw-rwxr--+ 1 gmacario Domain Users 172504599 Jan  8 07:11 android_fs.tar.gz
-rwxrwxr-x+ 1 gmacario Domain Users     51339 Jan  8 07:08 imx6dl-sabresd.dtb
-rwxrwxr-x+ 1 gmacario Domain Users     50782 Jan  8 07:08 imx6q-sabresd.dtb
-rwxrwxr-x+ 1 gmacario Domain Users     50782 Jan  8 07:08 imx6q-sabresd-ldo.dtb
-rwxrwxr-x+ 1 gmacario Domain Users   6723120 Jan  8 07:09 zImage

tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd/SD:
total 412920
drwxrwxr-x+ 1 gmacario Domain Users         0 Jan  8 07:27 .
drwxrwxr-x+ 1 gmacario Domain Users         0 Jan  8 07:08 ..
-rw-rwxr--+ 1 gmacario Domain Users   7274929 Jan  8 07:26 boot-imx6dl.img
-rw-rwxr--+ 1 gmacario Domain Users   7274372 Jan  8 07:26 boot-imx6q.img
-rw-rwxr--+ 1 gmacario Domain Users   7274372 Jan  8 07:26 boot-imx6q-ldo.img
-rw-rwxr--+ 1 gmacario Domain Users   7835492 Jan  8 07:26 recovery-imx6dl.img
-rw-rwxr--+ 1 gmacario Domain Users   7834935 Jan  8 07:26 recovery-imx6q.img
-rw-rwxr--+ 1 gmacario Domain Users   7834935 Jan  8 07:26 recovery-imx6q-ldo.img
-rw-rwxr--+ 1 gmacario Domain Users 377487360 Jan  8 07:26 system.img

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

TODO

### Extract the Manufacturing Tools

```
$ mkdir -p tmp
$ tar -C tmp/ -xvzf android_KK4.4.3_2.0.0-ga_tools.gz
$ tar -C tmp/ -xvzf tmp/android_KK4.4.3_2.0.0-ga_tools/mfgtools.tar.gz
$ ls -la tmp/mfgtools
```

Result:

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ ls -la tmp/mfgtools
total 2348
drwxrwxr-x+ 1 gmacario Domain Users       0 Dec  2 11:55 .
drwxrwxr-x+ 1 gmacario Domain Users       0 May 14 17:19 ..
-rw-rwxr--+ 1 gmacario Domain Users      24 Dec  2 11:55 .gitignore
-rw-rwxr--+ 1 gmacario Domain Users     150 Dec  2 11:55 cfg.ini
drwxrwxr-x+ 1 gmacario Domain Users       0 Dec  2 11:55 Document
drwxrwxr-x+ 1 gmacario Domain Users       0 Dec  2 11:55 Drivers
-rw-rwxr--+ 1 gmacario Domain Users 1743872 Dec  2 11:55 MfgTool2.exe
-rw-rwxr--+ 1 gmacario Domain Users     292 Dec  2 11:55 mfgtool2-android-mx6dl-sabreauto-nand.vbs
-rw-rwxr--+ 1 gmacario Domain Users     185 Dec  2 11:55 mfgtool2-android-mx6dl-sabreauto-sdcard.vbs
-rw-rwxr--+ 1 gmacario Domain Users     179 Dec  2 11:55 mfgtool2-android-mx6dl-sabresd-emmc.vbs
-rw-rwxr--+ 1 gmacario Domain Users     181 Dec  2 11:55 mfgtool2-android-mx6dl-sabresd-sd.vbs
-rw-rwxr--+ 1 gmacario Domain Users     291 Dec  2 11:55 mfgtool2-android-mx6q-sabreauto-nand.vbs
-rw-rwxr--+ 1 gmacario Domain Users     184 Dec  2 11:55 mfgtool2-android-mx6q-sabreauto-sdcard.vbs
-rw-rwxr--+ 1 gmacario Domain Users     178 Dec  2 11:55 mfgtool2-android-mx6q-sabresd-emmc.vbs
-rw-rwxr--+ 1 gmacario Domain Users     194 Dec  2 11:55 mfgtool2-android-mx6q-sabresd-emmc-1.2g.vbs
-rw-rwxr--+ 1 gmacario Domain Users     180 Dec  2 11:55 mfgtool2-android-mx6q-sabresd-sd.vbs
-rw-rwxr--+ 1 gmacario Domain Users     196 Dec  2 11:55 mfgtool2-android-mx6q-sabresd-sd-1.2g.vbs
-rw-rwxr--+ 1 gmacario Domain Users     177 Dec  2 11:55 mfgtool2-android-mx6sl-evk-sd.vbs
-rwxrwxr-x+ 1 gmacario Domain Users     293 Dec  2 11:55 mfgtool2-android-mx6sx-sabreauto-nand.vbs
-rwxrwxr-x+ 1 gmacario Domain Users     211 Dec  2 11:55 mfgtool2-android-mx6sx-sabreauto-sdcard.vbs
-rw-rwxr--+ 1 gmacario Domain Users     201 Dec  2 11:55 mfgtool2-android-mx6sx-sabresd-sdcard.vbs
-rw-rwxr--+ 1 gmacario Domain Users     325 Dec  2 11:55 mfgtool2-yocto-mx6-14x14-arm2-nand.vbs
-rw-rwxr--+ 1 gmacario Domain Users     325 Dec  2 11:55 mfgtool2-yocto-mx6-17x17-arm2-nand.vbs
-rw-rwxr--+ 1 gmacario Domain Users     355 Dec  2 11:55 mfgtool2-yocto-mx6-17x17-arm2-qspi-nor.vbs
-rw-rwxr--+ 1 gmacario Domain Users     187 Dec  2 11:55 mfgtool2-yocto-mx6-17x17-arm2-sdcard-sda.vbs
-rw-rwxr--+ 1 gmacario Domain Users     187 Dec  2 11:55 mfgtool2-yocto-mx6-17x17-arm2-sdcard-sdb.vbs
-rw-rwxr--+ 1 gmacario Domain Users     329 Dec  2 11:55 mfgtool2-yocto-mx6-19x19-arm2-nand.vbs
-rw-rwxr--+ 1 gmacario Domain Users     174 Dec  2 11:55 mfgtool2-yocto-mx6-evk-sdcard-ldo-sd1.vbs
-rw-rwxr--+ 1 gmacario Domain Users     174 Dec  2 11:55 mfgtool2-yocto-mx6-evk-sdcard-ldo-sd2.vbs
-rw-rwxr--+ 1 gmacario Domain Users     174 Dec  2 11:55 mfgtool2-yocto-mx6-evk-sdcard-ldo-sd3.vbs
-rw-rwxr--+ 1 gmacario Domain Users     157 Dec  2 11:55 mfgtool2-yocto-mx6-evk-sdcard-sd1.vbs
-rw-rwxr--+ 1 gmacario Domain Users     158 Dec  2 11:55 mfgtool2-yocto-mx6-evk-sdcard-sd2.vbs
-rw-rwxr--+ 1 gmacario Domain Users     158 Dec  2 11:55 mfgtool2-yocto-mx6-evk-sdcard-sd3.vbs
-rw-rwxr--+ 1 gmacario Domain Users     215 Dec  2 11:55 mfgtool2-yocto-mx6-evk-spi-nor.vbs
-rw-rwxr--+ 1 gmacario Domain Users     324 Dec  2 11:55 mfgtool2-yocto-mx6-sabreauto-nand.vbs
-rw-rwxr--+ 1 gmacario Domain Users     354 Dec  2 11:55 mfgtool2-yocto-mx6-sabreauto-qspi-nor.vbs
-rw-rwxr--+ 1 gmacario Domain Users     209 Dec  2 11:55 mfgtool2-yocto-mx6-sabreauto-sdcard-sd3.vbs
-rw-rwxr--+ 1 gmacario Domain Users     215 Dec  2 11:55 mfgtool2-yocto-mx6-sabreauto-spi-nor.vbs
-rw-rwxr--+ 1 gmacario Domain Users     219 Dec  2 11:55 mfgtool2-yocto-mx6-sabreauto-weim-nor.vbs
-rw-rwxr--+ 1 gmacario Domain Users     173 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-emmc.vbs
-rw-rwxr--+ 1 gmacario Domain Users     189 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-emmc-1.2g.vbs
-rw-rwxr--+ 1 gmacario Domain Users     463 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-qspi-nor.vbs
-rw-rwxr--+ 1 gmacario Domain Users     214 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-sdcard-1.2g-sd2.vbs
-rw-rwxr--+ 1 gmacario Domain Users     214 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-sdcard-1.2g-sd3.vbs
-rw-rwxr--+ 1 gmacario Domain Users     214 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-sdcard-1.2g-sd4.vbs
-rw-rwxr--+ 1 gmacario Domain Users     198 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-sdcard-sd2.vbs
-rw-rwxr--+ 1 gmacario Domain Users     198 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-sdcard-sd3.vbs
-rw-rwxr--+ 1 gmacario Domain Users     198 Dec  2 11:55 mfgtool2-yocto-mx6-sabresd-sdcard-sd4.vbs
-rw-rwxr--+ 1 gmacario Domain Users  586752 Dec  2 11:55 MfgToolLib.dll
drwxrwxr-x+ 1 gmacario Domain Users       0 Dec  2 11:55 Profiles
-rw-rwxr--+ 1 gmacario Domain Users      21 Dec  2 11:55 UICfg.ini
drwxrwxr-x+ 1 gmacario Domain Users       0 Dec  2 11:55 Utils

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

TODO



### Get familiar with the Sabre SD Board

Read the [SABRE Board for Smart Devices - Quick Start Guide](http://cache.freescale.com/files/32bit/doc/quick_start_guide/SABRESDB_IMX6_QSG.pdf).

Check hardware inventory provided with the SABRESD board:

* One SabreSD board
* One USB-to-MicroUSB cable
* Power supply +5Vdc (barrel plug)
* One 8 GB SD-Card containing the system image

Additional hardware to be sourced:

* One controlling PC (used for formatting the SD-Card and as terminal emulator)
* One HDMI cable
* One HDMI display
* One Ethernet cable
* One Internet router with at least one empty Ethernet socket
* USB adapter (micro B male to A female)
* USB hub (one USB A male, two or more USB A female)
* USB keyboard
* USB mouse

### Setting up the system

#### Insert SD Card

Insert the SD-Card containing the software image into **J507 (SD3)**
- **NOTE**: Do not insert the SD-Card into J500 (SD2) instead, otherwise the board will not boot!

#### Connect the USB Debug Cable

NOTE: This step is optional, but strongly advised

* Connect a MicroSD-to-USB cable to J509 (USB TO UART).
  Connect the other endpoint to into a USB port on your laptop
* On the Windows Device Manager inspect the serial port created when plugging into
  the target serial port. In our example this is COM13
* Launch a terminal emulator program on the controlling PC
  (i.e. PuTTY on Windows, or minicom on Linux)
* Configure the terminal emulator program as _target-serial-port_:115200,8,n,1

#### Connect User Interface Devices

* Connect a HDMI cable into J8.
  Connect the other endpoint of the HDMI cable to a HDMI display

* TODO: Attach a USB hub to USB jack J505.
  Connect a USB mouse and keyboard to the hub.

#### Connect Ethernet Cable (optional)

* Connect the Ethernet cable to J7.
  Connect the other endpoint of the Ethernet cable into one empty socket
  of the Internet router / LAN switch

#### Verify the Boot Mode DIP Switch Configuration (SW6)

The following configuration will cause the system software to be booted from the SD-Card inserted into the SD3 socket:

| D1  | D2  | D3  | D4  | D5  | D6  | D7  | D8  |
|-----|-----|-----|-----|-----|-----|-----|-----|
| off | ON  | off | off | off | off | ON  | off |

#### Connect Power Supply

Plug the +5Vdc power supply into P1.

The SabreSD will then boot.

Watch the bootup messages on the terminal emulator connected to the debug serial console.

**NOTE:** The messages shown below refer to the stock "MX6Q-SDB Android r13.4.1 110-77482 B" SD-Card that was delivered together with the SabreSD board

If you press "ENTER" on the debug serial console you should get a root shell on the Android system:

```
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Unpacking initramfs...
Freeing initrd memory: 160K
PMU: registered new PMU device of type 0
Static Power Management for Freescale i.MX6
wait mode is enabled for i.MX6
cpaddr = d9880000 suspend_iram_base=d991c000
PM driver module loaded
IMX usb wakeup probe
i.MXC CPU frequency driver
highmem bounce pool size: 64 pages
ashmem: initialized
JFFS2 version 2.2. (NAND) Â© 2001-2006 Red Hat, Inc.
msgmni has been set to 764
io scheduler noop registered
io scheduler deadline registered
io scheduler cfq registered (default)
mxc_mipi_dsi mxc_mipi_dsi: i.MX MIPI DSI driver probed
MIPI DSI driver module loaded
mxc_sdc_fb mxc_sdc_fb.0: register mxc display driver hdmi
mxc_hdmi mxc_hdmi: Detected HDMI controller 0x13:0xa:0xa0:0xc1
fbcvt: 1920x1080@60: CVT Name - 2.073M9
imx-ipuv3 imx-ipuv3.1: IPU DMFC DP HIGH RESOLUTION: 1(0,1), 5B(2~5), 5F(6,7)
mxc_sdc_fb mxc_sdc_fb.1: Can't get fb option for mxcfb1!
mxc_sdc_fb mxc_sdc_fb.2: Can't get fb option for mxcfb2!
imx-sdma imx-sdma: loaded firmware 1.1
imx-sdma imx-sdma: initialized
Serial: IMX driver
imx-uart.2: ttymxc2 at MMIO 0x21ec000 (irq = 60) is a IMX
imx-uart.0: ttymxc0 at MMIO 0x2020000 (irq = 58) is a IMX
console [ttymxc0] enabled, bootconsole disabled
console [ttymxc0] enabled, bootconsole disabled
loop: module loaded
m25p80 spi0.0: unrecognized JEDEC id ffffff
vcan: Virtual CAN interface driver
CAN device driver interface
flexcan netdevice driver
FEC Ethernet Driver
fec_enet_mii_bus: probed
PPP generic driver version 2.4.2
PPP Deflate Compression module registered
PPP BSD Compression module registered
PPP MPPE Compression module registered
NET: Registered protocol family 24
PPTP driver version 0.8.5
tun: Universal TUN/TAP device driver, 1.6
tun: (C) 1999-2004 Max Krasnyansky <maxk@qualcomm.com>
ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
fsl-ehci fsl-ehci.0: Freescale On-Chip EHCI Host Controller
fsl-ehci fsl-ehci.0: new USB bus registered, assigned bus number 1
fsl-ehci fsl-ehci.0: irq 75, io base 0x02184000
fsl-ehci fsl-ehci.0: USB 2.0 started, EHCI 1.00
hub 1-0:1.0: USB hub found
hub 1-0:1.0: 1 port detected
add wake up source irq 72
fsl-ehci fsl-ehci.1: Freescale On-Chip EHCI Host Controller
fsl-ehci fsl-ehci.1: new USB bus registered, assigned bus number 2
fsl-ehci fsl-ehci.1: irq 72, io base 0x02184200
fsl-ehci fsl-ehci.1: USB 2.0 started, EHCI 1.00
hub 2-0:1.0: USB hub found
hub 2-0:1.0: 1 port detected
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
Initializing USB Mass Storage driver...
usbcore: registered new interface driver usb-storage
USB Mass Storage support registered.
usbcore: registered new interface driver usbserial
usbserial: USB Serial Driver core
USB Serial support registered for GSM modem (1-port)
usbcore: registered new interface driver option
option: v0.7.2:USB Driver for GSM modems
USB Serial support registered for Qualcomm USB modem
usbcore: registered new interface driver qcserial
ARC USBOTG Device Controller driver (1 August 2005)
android_usb gadget: Mass Storage Function, version: 2009/09/11
android_usb gadget: Number of LUNs=1
 lun0: LUN: removable file: (no medium)
Gadget Android: controller 'fsl-usb2-udc' not recognized
android_usb gadget: android_usb ready
Suspend udc for OTG auto detect
fsl-usb2-udc: bind to driver android_usb
mousedev: PS/2 mouse device common for all mice
input: gpio-keys as /devices/platform/gpio-keys/input/input0
input: max11801_ts as /devices/platform/imx-i2c.1/i2c-1/1-0048/input/input1
egalax_ts 1-0004: egalax_ts: failed to read firmware version
egalax_ts: probe of 1-0004 failed with error -5
egalax_ts 2-0004: egalax_ts: failed to read firmware version
egalax_ts: probe of 2-0004 failed with error -5
elan - Read Hello Packet Failed
elan-touch: probe of 2-0010 failed with error -22
i2c-core: driver [isl29023] using legacy suspend method
i2c-core: driver [isl29023] using legacy resume method
using rtc device, snvs_rtc, for alarms
snvs_rtc snvs_rtc.0: rtc core: registered snvs_rtc as rtc0
i2c /dev entries driver
Linux video capture interface: v2.00
ov5642_read_reg:write reg error:reg=300a
ov5642_probe:cannot find camera
ov5640_read_reg:write reg error:reg=300a
ov5640_probe:cannot find camera
mxc_v4l2_output mxc_v4l2_output.0: V4L2 device registered as video16
mxc_v4l2_output mxc_v4l2_output.0: V4L2 device registered as video17
usbcore: registered new interface driver uvcvideo
USB Video Class driver (v1.1.0)
mag3110 2-000e: check mag3110 chip ID
input: mag3110 as /devices/virtual/input/input2
mag3110 2-000e: mag3110 is probed
i2c-core: driver [mag3110] using legacy suspend method
i2c-core: driver [mag3110] using legacy resume method
input: mma845x as /devices/virtual/input/input3
imx2-wdt imx2-wdt.0: IMX2+ Watchdog Timer enabled. timeout=60s (nowayout=1)
device-mapper: uevent: version 1.0.3
device-mapper: ioctl: 4.20.0-ioctl (2011-02-02) initialised: dm-devel@redhat.com
Bluetooth: Virtual HCI driver ver 1.3
Bluetooth: HCI UART driver ver 2.2
Bluetooth: HCIATH3K protocol initialized
Bluetooth: Generic Bluetooth USB driver ver 0.6
usbcore: registered new interface driver btusb
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
mmc0: SDHCI controller on platform [sdhci-esdhc-imx.3] using DMA
mmc1: SDHCI controller on platform [sdhci-esdhc-imx.2] using DMA
mmc2: SDHCI controller on platform [sdhci-esdhc-imx.1] using DMA
mxc_vdoa mxc_vdoa: i.MX Video Data Order Adapter(VDOA) driver probed
VPU initialized
mxc_asrc registered
revserved_memory_account:viv_gpu registerd
Thermal calibration data is 0x5984fb7d
Anatop Thermal registered as thermal_zone0
anatop_thermal_probe: default cooling device is cpufreq!
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
logger: created 256K log 'log_main'
logger: created 256K log 'log_events'
logger: created 256K log 'log_radio'
logger: created 256K log 'log_system'
usbcore: registered new interface driver snd-usb-audio
mxc_hdmi_soc mxc_hdmi_soc.0: MXC HDMI Audio
Cirrus Logic CS42888 ALSA SoC Codec Driver
i2c-core: driver [cs42888] using legacy suspend method
i2c-core: driver [cs42888] using legacy resume method
mmc0: new high speed DDR MMC card at address 0001
mmcblk0: mmc0:0001 SEM08G 7.39 GiB
mmcblk0boot0: mmc0:0001 SEM08G partition 1 2.00 MiB
mmcblk0boot1: mmc0:0001 SEM08G partition 2 2.00 MiB
 mmcblk0: unknown partition table
 mmcblk0boot1: unknown partition table
 mmcblk0boot0: unknown partition table
wm8962 0-001a: customer id 0 revision D
input: WM8962 Beep Generator as /devices/platform/imx-i2c.0/i2c-0/0-001a/input/input4
asoc: wm8962 <-> imx-ssi.1 mapping ok
imx_3stack asoc driver
asoc: mxc-hdmi-soc <-> imx-hdmi-soc-dai.0 mapping ok
ALSA device list:
  #0: wm8962-audio
  #1: imx-hdmi-soc
Netfilter messages via NETLINK v0.30.
nf_conntrack version 0.5.0 (12580 buckets, 50320 max)
ctnetlink v0.93: registering with nfnetlink.
NF_TPROXY: Transparent proxy support initialized, version 4.1.0
NF_TPROXY: Copyright (c) 2006-2007 BalaBit IT Ltd.
xt_time: kernel timezone is -0000
IPv4 over IPv4 tunneling driver
GRE over IPv4 demultiplexor driver
ip_tables: (C) 2000-2006 Netfilter Core Team
arp_tables: (C) 2002 David S. Miller
TCP cubic registered
NET: Registered protocol family 10
ip6_tables: (C) 2000-2006 Netfilter Core Team
IPv6 over IPv4 tunneling driver
NET: Registered protocol family 17
NET: Registered protocol family 15
can: controller area network core (rev 20090105 abi 8)
NET: Registered protocol family 29
can: raw protocol (rev 20090105)
can: broadcast manager protocol (rev 20090105 t)
Bluetooth: RFCOMM TTY layer initialized
Bluetooth: RFCOMM socket layer initialized
Bluetooth: RFCOMM ver 1.11
Bluetooth: BNEP (Ethernet Emulation) ver 1.3
Bluetooth: BNEP filters: protocol multicast
Bluetooth: HIDP (Human Interface Emulation) ver 1.2
L2TP core driver, V2.0
PPPoL2TP kernel driver, V2.0
L2TP IP encapsulation support (L2TPv3)
L2TP netlink interface
L2TP ethernet pseudowire support (L2TPv3)
lib80211: common routines for IEEE802.11 drivers
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
Bus freq driver module loaded
Bus freq driver Enabled
mxc_dvfs_core_probe
DVFS driver module loaded
mmc1: new high speed SDHC card at address aaaa
regulator_init_complete: PFUZE100_VGEN6: incomplete constraints, leaving on
mmcblk1: mmc1:aaaa SU08G 7.40 GiB
regulator_init_complete: PFUZE100_VGEN3: incomplete constraints, leaving on
regulator_init_complete: PFUZE100_VGEN2: incomplete constraints, leaving on
regulator_init_complete: PFUZE100_VGEN1: incomplete constraints, leaving on
snvs_rtc snvs_rtc.0: setting system clock to 1970-01-01 00:00:01 UTC (1)
Freeing init memory: 220K
init: cannot find '/system/bin/gpu_init.sh', disabling 'gpu_init'
init: cannot find '/system/etc/install-recovery.sh', disabling 'flash_recovery'
android_usb: already disabled
mtp_bind_config
root@android:/ # input: eCompass as /devices/virtual/input/input5
ERROR: v4l2 capture: slave not found!
ERROR: v4l2 capture: slave not found!
ERROR: v4l2 capture: slave not found!
ERROR: v4l2 capture: slave not found!
warning: `zygote' uses 32-bit capabilities (legacy support in use)
request_suspend_state: wakeup (3->0) at 17786497338 (1970-01-02 00:00:07.904135335 UTC)
eth0: Freescale FEC PHY driver [Generic PHY] (mii_bus:phy_addr=1:01, irq=-1)
ADDRCONF(NETDEV_UP): eth0: link is not ready
acc_open
acc_release
CPU3: shutdown
CPU2: shutdown
binder: release proc 2293, transaction 5785, not freed

root@android:/ #
```

Inspect the running processes

```
root@android:/ # ps
USER     PID   PPID  VSIZE  RSS     WCHAN    PC         NAME
root      1     0     352    216   c011101c 000086e8 S /init
root      2     0     0      0     c0095300 00000000 S kthreadd
root      3     2     0      0     c0080750 00000000 S ksoftirqd/0
root      4     2     0      0     c008f200 00000000 S kworker/0:0
root      5     2     0      0     c008f200 00000000 S kworker/u:0
root      6     2     0      0     c00b9d34 00000000 S migration/0
root      7     2     0      0     c00b9d34 00000000 S migration/1
root      8     2     0      0     c008f200 00000000 S kworker/1:0
root      9     2     0      0     c0080750 00000000 S ksoftirqd/1
root      16    2     0      0     c0090ce8 00000000 S cpuset
root      17    2     0      0     c0090ce8 00000000 S khelper
root      18    2     0      0     c008f200 00000000 S kworker/u:1
root      23    2     0      0     c0090ce8 00000000 S suspend
root      133   2     0      0     c0068974 00000000 S usb_wakeup thre
root      385   2     0      0     c00e158c 00000000 S sync_supers
root      387   2     0      0     c00e2114 00000000 S bdi-default
root      389   2     0      0     c0090ce8 00000000 S kblockd
root      403   2     0      0     c0090ce8 00000000 S imx6q-ecspi.0
root      413   2     0      0     c02fe7d4 00000000 S khubd
root      415   2     0      0     c0090ce8 00000000 S otg_switch
root      430   2     0      0     c00bae14 00000000 S irq/461-pfuze
root      463   2     0      0     c03c1abc 00000000 D ipu1_task
root      464   2     0      0     c03c1abc 00000000 D ipu1_task
root      465   2     0      0     c03c1abc 00000000 D ipu2_task
root      466   2     0      0     c03c1abc 00000000 D ipu2_task
root      493   2     0      0     c0090ce8 00000000 S rpciod
root      494   2     0      0     c008f200 00000000 S kworker/0:1
root      495   2     0      0     c008f200 00000000 S kworker/1:1
root      503   2     0      0     c0068974 00000000 S usb_wakeup thre
root      511   2     0      0     c00db950 00000000 S kswapd0
root      513   2     0      0     c0133f40 00000000 S fsnotify_mark
root      514   2     0      0     c0090ce8 00000000 S nfsiod
root      515   2     0      0     c0090ce8 00000000 S crypto
root      539   2     0      0     c0090ce8 00000000 S mxcfb0-vsync-pr
root      1092  2     0      0     c02906e0 00000000 S kapmd
root      1170  2     0      0     c0090ce8 00000000 S f_mtp
root      1175  2     0      0     c032b028 00000000 S file-storage
root      1184  2     0      0     c00bae14 00000000 S irq/346-max1180
root      1220  2     0      0     c0086b0c 00000000 D kworker/0:2
root      1221  2     0      0     c00bae14 00000000 S irq/312-MAX8903
root      1222  2     0      0     c00bae14 00000000 S irq/283-MAX8903
root      1223  2     0      0     c00bae14 00000000 S irq/386-MAX8903
root      1224  2     0      0     c00bae14 00000000 S irq/343-MAX8903
root      1242  2     0      0     c0399fa0 00000000 S kinteractiveup
root      1245  2     0      0     c008f200 00000000 S kworker/u:2
root      1252  2     0      0     c0090ce8 00000000 S vpu_wq
root      1257  2     0      0     c0090ce8 00000000 S galcore workque
root      1258  2     0      0     c03cd6b0 00000000 S Vivante Kernel
root      1259  2     0      0     c009a860 00000000 S Vivante Kernel
root      1260  2     0      0     c009a860 00000000 S galcore daemon
root      1261  2     0      0     c009a860 00000000 S galcore daemon
root      1262  2     0      0     c009a860 00000000 S galcore daemon
root      1278  2     0      0     c0090ce8 00000000 S binder
root      1312  2     0      0     c03a8268 00000000 S mmcqd/0
root      1313  2     0      0     c03a8268 00000000 S mmcqd/0boot0
root      1314  2     0      0     c03a8268 00000000 S mmcqd/0boot1
root      1343  2     0      0     c03a8268 00000000 S mmcqd/1
root      1351  2     0      0     c0551ecc 00000000 S krfcommd
root      1368  1     320    4     c011101c 000086e8 S /sbin/ueventd
root      2206  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p5-
root      2207  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2208  2     0      0     c0122f14 00000000 S flush-179:24
root      2209  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p7-
root      2210  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2211  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p6-
root      2212  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2213  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p8-
root      2214  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2215  1     776    416   c0048980 400d2e74 S /system/bin/sh
system    2216  1     832    232   c03f3580 40080690 S /system/bin/servicemanager
root      2217  1     4028   556   ffffffff 400c3c94 S /system/bin/vold
root      2218  1     6360   844   ffffffff 4003dc94 S /system/bin/netd
root      2219  1     868    252   c011101c 400517b4 S /system/bin/dispd
root      2220  1     696    224   c0440120 400f3f98 S /system/bin/debuggerd
system    2221  1     289384 10836 ffffffff 400e4690 S /system/bin/surfaceflinger
root      2222  1     442376 35556 ffffffff 4005a7b4 S zygote
drm       2223  1     7796   2532  ffffffff 4010a690 S /system/bin/drmserver
media     2224  1     29196  6808  ffffffff 40070690 S /system/bin/mediaserver
bluetooth 2225  1     1336   532   c011101c 400a3438 S /system/bin/dbus-daemon
root      2226  1     844    252   c04e6fbc 40040458 S /system/bin/installd
keystore  2227  1     1736   500   c0440120 40101f98 S /system/bin/keystore
root      2228  1     1392   620   c0099d2c 40030c94 S /system/bin/rild
system    2229  1     868    252   c011101c 400db438 S /system/bin/magd
root      2232  1     7524   924   ffffffff 40034c24 S /system/etc/gps/ingsvcd
system    2305  2222  741524 41324 ffffffff 4005a690 S system_server
dhcp      2360  1     920    272   c011101c 40039438 S /system/bin/dhcpcd
root      2376  2     0      0     c008f200 00000000 S kworker/0:3
system    2383  2222  667768 72968 ffffffff 4005b3c0 S com.android.systemui
app_12    2431  2222  451936 30448 ffffffff 4005b3c0 S android.process.media
app_18    2444  2222  452416 31516 ffffffff 4005b3c0 S com.android.inputmethod.latin
radio     2467  2222  464008 31656 ffffffff 4005b3c0 S com.android.phone
app_19    2494  2222  669336 42656 ffffffff 4005b3c0 S com.android.launcher
system    2512  2222  456304 29108 ffffffff 4005b3c0 S com.android.settings
app_0     2527  2222  476988 46092 ffffffff 4005b3c0 S android.process.acore
app_0     2575  2222  458244 32464 ffffffff 4005b3c0 S com.android.contacts
app_6     2612  2222  450224 28748 ffffffff 4005b3c0 S com.android.providers.calendar
app_11    2628  2222  452104 28436 ffffffff 4005b3c0 S com.android.deskclock
app_13    2644  2222  460592 33556 ffffffff 4005b3c0 S com.android.email
app_14    2659  2222  456552 27952 ffffffff 4005b3c0 S com.android.exchange
system    2679  2222  450760 27936 ffffffff 4005b3c0 S fsl.power.service
app_23    2705  2222  452244 28828 ffffffff 4005b3c0 S com.android.mms
app_5     2743  2222  454092 28736 ffffffff 4005b3c0 S com.android.calendar
root      2767  2215  956    276   00000000 40012458 R ps
root@android:/ #
```

# TODO

### Create a SD-Card with Android 4.4.3 for SabreSD

TODO: Keep on reading "Android Quick Start Guide" from page 3

TODO: Write the image to the SD-Card

Get an SD-Card (TBD size) with no valuable contents (will be erased)


### Download the board images to the SabreSD

See Chapter 3 of the "Android_Quick_Sart_Guide.pdf"

**NOTE**: The Freescale Manufacturing Tools only work in MS Windows.

For Linux you may use the (TODO: link) project on GitHub which provides similar functionalities.

Refer to the Android Quick Start Guide and to understand which image
you should choose for your target board.

Create directory `android/sabresd` under
`_MFGTool-Dir_/Profiles/Linux/OS Firmware/files/` and copy the relevant files:

```
$ mkdir -p "tmp/mfgtools/Profiles/Linux/OS Firmware/files/android/sabresd/"
$ ls -la "tmp/mfgtools/Profiles/Linux/OS Firmware/files/android/sabresd/"
$ for f in \
  u-boot-imx6q.imx \
  eMMC/boot-imx6q.img \
  eMMC/system.img \
  eMMC/recovery-imx6q.img; do cp \
    tmp/android_KK4.4.3_2.0.0-ga_full_image_6qsabresd/$f \
    "tmp/mfgtools/Profiles/Linux/OS Firmware/files/android/sabresd/"; \
  done
$ ls -la "tmp/mfgtools/Profiles/Linux/OS Firmware/files/android/sabresd/"
```

Result:

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$ ls -la "tmp/mfgtools/Profiles/Linux/OS Firmware/files/android/sabresd/"
total 383784
drwxrwxr-x+ 1 gmacario Domain Users         0 May 14 17:56 .
drwxrwxr-x+ 1 gmacario Domain Users         0 Dec  2 11:55 ..
-rw-rwxr--+ 1 gmacario Domain Users   7274372 May 14 17:56 boot-imx6q.img
-rwxrwxr-x+ 1 gmacario Domain Users         0 Dec  2 11:55 placeholder
-rw-rwxr--+ 1 gmacario Domain Users   7834934 May 14 17:56 recovery-imx6q.img
-rw-rwxr--+ 1 gmacario Domain Users 377487360 May 14 17:56 system.img
-rwxrwxr-x+ 1 gmacario Domain Users    392192 May 14 17:56 u-boot-imx6q.imx

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MOVEME/Freescale/20150514-Android_KK443_200_SabreSD
$
```

TODO TODO TODO



### TODO: Extract source files

```
$ mkdir -p tmp/source
$ tar -C tmp/source -xvzf android_KK4.4.3_2.0.0-ga_core_source.gz
```

<!-- EOF -->

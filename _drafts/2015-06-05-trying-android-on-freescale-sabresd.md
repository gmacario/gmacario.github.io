---
layout: post
title:  "Trying Android KitKat 4.4.3 on Freescale SabreSD"
date:   2015-05-15 12:40:00
categories: android howto development freescale embedded imx6
---
<-- markdown-link-check-disable -->
This blog post explains how to install and run Android KitKat 4.4.3 on the Freescale [SABRE Platform for Smart Devices](http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREPLAT) Reference Design based on the i.MX 6 Series Application Processor.
### Download files from the Freescale website
#### Download Android BSP documentation
Browse <http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD>
Select tab "Documentation" then select the "Download" button of the following package
| Package ID | Description | Type | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|------|--------|-----------|-------|--------------------|
| **IMX6_KK443_200_ANDROID_DOCS** | i.MX6 Android kk4.4.3_2.0.0 BSP Documentation	| Supporting Information | gz | 7625 | kk4.4.3_2.0.0 | 2015-06-02 |
#### Download Manufacturing Tools
Select tab "Software & Tools".
In section "Hardware Development Tools", expand group "Programmers (Flash, etc.)", then select the "Download" button of the following packages:
| Package ID | Description | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|--------|-----------|-------|--------------------|
| **IMX_KK4.4.3_MFG_TOOL** | i.MX 6Family Manufacturing Toolkit for kk4.4.3_2.0.0 | gz | 36796 | kk4.4.3_2.0.0 | 2015-06-02 |
#### Download Android BSP and demo image for SabreSD
Select tab "Software & Tools".
In section "Run-time Software", expand group "Operating System Software-Board Support Packages", then select the "Download" button of the following packages:
< <http://www.tablesgenerator.com/markdown_tables> -->
| Package ID | Description | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|--------|-----------|-------|--------------------|
| **IMX6_KK443_200_ANDROID_DEMO_SD_BSP** | i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, and i.MX 6Solo Android KK4.4.3_2.0.0 BSP Binary Demo Files for the SABRE Platform and SABRE Board for Smart Devices | gz | 1166696 | kk4.4.3_2.0.0 | 2015-06-02 |
#### (Optional) Download source code for BSP
Select tab "Software & Tools".
In section "Run-time Software", expand group "Operating System Software-Board Support Packages", then select the "Download" button of the following packages:
| Package ID | Description | Format | Size (KB) | Rev # | Date Last Modified |
|------------|-------------|--------|-----------|-------|--------------------|
| **IMX6_KK443_200_ANDROID_SOURCE_BSP**  | i.MX 6Quad, i.MX 6Dual, i.MX 6DualLite, i.MX 6Solo and i.MX 6Sololite Android KK4.4.3_2.0.0 BSP, Source Code for BSP and Codecs | gz | 66824 | kk4.4.3_2.0.0 | 2015-06-02 |
NOTE: Before being able to download the software, you should first login to the Freescale website, then accept the Freescale Semiconductor Software License Agreement.
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
**NOTE**: Do not insert the SD-Card into J500 (SD2) instead, otherwise the board will not boot
#### Connect the USB Debug Cable
**NOTE**: This step is optional, but strongly advised to make sure everything works as expected.
* Connect a MicroSD-to-USB cable to J509 (USB TO UART).
  Connect the other endpoint to into a USB port on your laptop
* On the Windows Device Manager inspect the serial port created when plugging into the target serial port. In our example this is COM13
* Launch a terminal emulator program on the controlling PC (i.e. PuTTY on Windows, or minicom on Linux)
* Configure the terminal emulator program as _target-serial-port_:115200,8,n,1
#### Connect User Interface Devices
* Connect a HDMI cable into J8.
  Connect the other endpoint of the HDMI cable to a HDMI display.
* TODO: Attach a USB hub to USB jack J505.
  Connect a USB mouse and keyboard to the hub.
#### Connect Ethernet Cable (optional)
* Connect the Ethernet cable to J7.
  Connect the other endpoint of the Ethernet cable into one empty socket of the Internet router / LAN switch
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
If you press "ENTER" on the debug serial console you should get a root shell on the Android Operating System:
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
mxc_sdc_fb mxc_sdc_fb.1: Can't get fb option for mxcfb1
mxc_sdc_fb mxc_sdc_fb.2: Can't get fb option for mxcfb2
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
anatop_thermal_probe: default cooling device is cpufreq
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
ERROR: v4l2 capture: slave not found
ERROR: v4l2 capture: slave not found
ERROR: v4l2 capture: slave not found
ERROR: v4l2 capture: slave not found
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
### Create a SD-Card with Android 4.4.3 for SabreSD
From sec 4.1.1 of "Android User's Guide":
| Partition type/index   | Name        | Start offset    | Size   | File system | Content |
|------------------------|-------------|-----------------|--------|-------------|---------|
| N/A                    | BOOT Loader | 1 KB            | 1 MB   | N/A | bootloader |
| Primary 1              | Boot        | 8 MB            | 8 MB   | boot.img format, kernel+ramdisk | boot.img |
| Primary 2              | Recovery    | Follow Boot     | 8 MB   | boot.img format, kernel+ramdisk | recovery.img |
| Extended 3 | - | - | - \|- | Extended partition for logical
| Logical 5 (Extended 3) | SYSTEM      | Follow Recovery | 512 MB | EXT4. Mount as /system | Android system files under /system dir |
| Logical 6 (Extended 3) | CACHE       | Follow SYSTEM   | 512 MB | EXT4. Mount as /cache | Android cache for image store of OTA |
| Logical 7 (Extended 3) | Device      | Follow CACHE    | 8 MB   | EXT4. Mount as /device | To store MAC address files |
| Logical 8 (Extended 3) | Misc        | Follow Device   | 4 MB   | N/A | For recovery store bootloader message, reserve |
| Primary 4              | DATA        | Follow Misc     | Total - Other images | EXT4. Mount as /data | Application data storage for the system application and the internal media partition in /mnt/sdcard/ dir |
Copy file `android_kk4.4.3_2.0.0-ga_images_6qsabresd.gz` to a Linux machine with a SD-Card reader.
Get an SD-Card (at least 2 GB size) with no valuable contents (will be erased)
On the Linux machine, run the script `sabresd-prepare-sdcard-android.sh` (to be published as part of project <https://github.com/gmacario/easy-build>).
Make sure you properly define `SDCARD` and `SDCARD_SIZE` environment variables. Example
```
$ SDCARD=/dev/sdX SDCARD_SIZE=15720251392 ./sabresd-prepare-sdcard-android.sh
```
Look at the messages displayed on the terminal to verify that the SD-Card has been correctly written, then extract the SD-Card and insert it into J507 (SD3) of the SabreSD board.
Power up the SabreSD bard and watch the boot messages on the serial console (**NOTE**: Only U-Boot, boot.img and recovery.img were flashed to the SD-Card):
```
U-Boot 2014.04-00190-gaffa032 (Jan 08 2015 - 09:56:55)
CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 25 C, calibration data: 0x5984fb7d
Reset cause: POR
Board: MX6-SabreSD
I2C:   ready
DRAM:  1 GiB
MMC:   FSL_SDHC: 0, FSL_SDHC: 1, FSL_SDHC: 2
*** Warning - bad CRC, using default environment
No panel detected: default to Hannstar-XGA
Display: Hannstar-XGA (1024x768)
In:    serial
Out:   serial
Err:   serial
Found PFUZE100 deviceid=10,revid=11
check_and_clean: reg 0, flag_set 0
Fastboot: Normal
flash target is MMC:1
Bad partition index:5 for partition:system
Net:   FEC [PRIME]
Normal Boot
Hit any key to stop autoboot:  1  0
booti mmc1
kernel   @ 14008000 (6723120)
ramdisk  @ 15000000 (497370)
fdt      @ 14f00000 (50782)
kernel cmdline:
	use boot.img command line:
	console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
switch to ldo_bypass mode
   Using Device Tree in place at 14f00000, end 14f0f65d
Starting kernel ...
Booting Linux on physical CPU 0x0
Initializing cgroup subsys cpu
Initializing cgroup subsys cpuacct
Linux version 3.10.53-06481-g1c3a910 (b18293@scmbld4) (gcc version 4.6.x-google 20120106 (prerelease) (GCC) ) #2 SMP PREEMPT Thu Jan 8 13:11:51 CST 2015
CPU: ARMv7 Processor [412fc09a] revision 10 (ARMv7), cr=10c53c7d
CPU: PIPT / VIPT nonaliasing data cache, VIPT aliasing instruction cache
Machine: Freescale i.MX6 Quad/DualLite (Device Tree), model: Freescale i.MX6 Quad SABRE Smart Device Board
cma: CMA: reserved 384 MiB at 32000000
Memory policy: ECC disabled, Data cache writealloc
PERCPU: Embedded 8 pages/cpu @817d9000 s9728 r8192 d14848 u32768
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 259840
Kernel command line: console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
PID hash table entries: 4096 (order: 2, 16384 bytes)
Dentry cache hash table entries: 131072 (order: 7, 524288 bytes)
Inode-cache hash table entries: 65536 (order: 6, 262144 bytes)
Memory: 959MB 64MB = 1023MB total
Memory: 627668k/627668k available, 420908k reserved, 0K highmem
Virtual kernel memory layout:
    vector  : 0xffff0000 - 0xffff1000   (   4 kB)
    fixmap  : 0xfff00000 - 0xfffe0000   ( 896 kB)
    vmalloc : 0xc0800000 - 0xff000000   (1000 MB)
    lowmem  : 0x80000000 - 0xc0000000   (1024 MB)
    pkmap   : 0x7fe00000 - 0x80000000   (   2 MB)
    modules : 0x7f000000 - 0x7fe00000   (  14 MB)
      .text : 0x80008000 - 0x80e51868   (14631 kB)
      .init : 0x80e52000 - 0x80ea7600   ( 342 kB)
      .data : 0x80ea8000 - 0x80f2b740   ( 526 kB)
       .bss : 0x80f2b740 - 0x80fc02f8   ( 595 kB)
SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=4, Nodes=1
Preemptible hierarchical RCU implementation.
NR_IRQS:16 nr_irqs:16 16
L310 cache controller enabled
l2x0: 16 ways, CACHE_ID 0x410000c7, AUX_CTRL 0x32070000, Cache size: 1048576 B
sched_clock: 32 bits at 3000kHz, resolution 333ns, wraps every 1431655ms
CPU identified as i.MX6Q, silicon rev 1.2
Console: colour dummy device 80x30
Calibrating delay loop... 1581.05 BogoMIPS (lpj=7905280)
pid_max: default: 32768 minimum: 301
Security Framework initialized
SELinux:  Initializing.
Mount-cache hash table entries: 512
Initializing cgroup subsys debug
Initializing cgroup subsys freezer
CPU: Testing write buffer coherency: ok
CPU0: thread -1, cpu 0, socket 0, mpidr 80000000
Setting up static identity map for 0x807bf708 - 0x807bf760
CPU1: Booted secondary processor
CPU1: thread -1, cpu 1, socket 0, mpidr 80000001
CPU2: Booted secondary processor
CPU2: thread -1, cpu 2, socket 0, mpidr 80000002
CPU3: Booted secondary processor
CPU3: thread -1, cpu 3, socket 0, mpidr 80000003
Brought up 4 CPUs
SMP: Total of 4 processors activated (6324.22 BogoMIPS).
CPU: All CPU(s) started in SVC mode.
devtmpfs: initialized
pinctrl core: initialized pinctrl subsystem
regulator-dummy: no parameters
NET: Registered protocol family 16
DMA: preallocated 256 KiB pool for atomic coherent allocations
Use WDOG2 as reset source
syscon 20c8000.anatop: regmap [mem 0x020c8000-0x020c8fff] registered
vdd1p1: 800 <--> 1375 mV at 1125 mV
vdd3p0: 2800 <--> 3150 mV at 3000 mV
vdd2p5: 2000 <--> 2750 mV at 2425 mV
cpu: 725 <--> 1450 mV
vddpu: 725 <--> 1450 mV
vddsoc: 725 <--> 1450 mV
syscon 20e0000.iomuxc-gpr: regmap [mem 0x020e0000-0x020e0037] registered
syscon 21bc000.ocotp-ctrl: regmap [mem 0x021bc000-0x021bffff] registered
request miniPCIE Power On gpio
hw-breakpoint: found 5 (+1 reserved) breakpoint and 1 watchpoint registers.
hw-breakpoint: maximum watchpoint size is 4 bytes.
imx6q-pinctrl 20e0000.iomuxc: initialized IMX pinctrl driver
bio: create slab <bio-0> at 0
mxs-dma 110000.dma-apbh: initialized
usb_otg_vbus: 5000 mV
usb_h1_vbus: 5000 mV
wm8962-supply: no parameters
mipi_dsi_pwr_on: no parameters
sensor-supply: 3300 mV
i2c-core: driver [max17135] using legacy suspend method
i2c-core: driver [max17135] using legacy resume method
SCSI subsystem initialized
usbcore: registered new interface driver usbfs
usbcore: registered new interface driver hub
usbcore: registered new device driver usb
i2c i2c-0: IMX I2C adapter registered
i2c i2c-1: IMX I2C adapter registered
i2c i2c-2: IMX I2C adapter registered
Linux video capture interface: v2.00
pps_core: LinuxPPS API ver. 1 registered
pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@linux.it>
PTP clock support registered
imx-ipuv3 2400000.ipu: IPU DMFC NORMAL mode: 1(0~1), 5B(4,5), 5F(6,7)
imx-ipuv3 2800000.ipu: IPU DMFC NORMAL mode: 1(0~1), 5B(4,5), 5F(6,7)
mxc_mipi_csi2 21dc000.mipi_csi: i.MX MIPI CSI2 driver probed
mxc_mipi_csi2 21dc000.mipi_csi: i.MX MIPI CSI2 dphy version is 0x3130302a
MIPI CSI2 driver module loaded
Advanced Linux Sound Architecture Driver Initialized.
Bluetooth: Core ver 2.16
NET: Registered protocol family 31
Bluetooth: HCI device and connection manager initialized
Bluetooth: HCI socket layer initialized
Bluetooth: L2CAP socket layer initialized
Bluetooth: SCO socket layer initialized
pureg-dummy: no parameters
Switching to clocksource mxc_timer1
NET: Registered protocol family 2
TCP established hash table entries: 8192 (order: 4, 65536 bytes)
TCP bind hash table entries: 8192 (order: 4, 65536 bytes)
TCP: Hash tables configured (established 8192 bind 8192)
TCP: reno registered
UDP hash table entries: 512 (order: 2, 16384 bytes)
UDP-Lite hash table entries: 512 (order: 2, 16384 bytes)
NET: Registered protocol family 1
RPC: Registered named UNIX socket transport module.
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
Trying to unpack rootfs image as initramfs...
Freeing initrd memory: 484K (85000000 - 85079000)
hw perfevents: enabled with ARMv7 Cortex-A9 PMU driver, 7 counters available
imx6_busfreq busfreq.16: DDR medium rate not supported.
Bus freq driver module loaded
bt power gpio is:2
mxc_bt_rfkill driver success loaded
rfkill: BT RF going to : on
mxc_bt_rfkill_reset
mxc_ir consumer_ir.41: unable to request PWM.
platform consumer_ir.41: Driver mxc_ir requests probe deferral
console [pstore-1] enabled
ramoops: attached 0x100000@0x4bf00000, ecc: 0/0
mxc_ramoops device success loaded
futex hash table entries: 1024 (order: 4, 65536 bytes)
audit: initializing netlink socket (disabled)
type=2000 audit(0.480:1): initialized
VFS: Disk quotas dquot_6.5.2
Dquot-cache hash table entries: 1024 (order 0, 4096 bytes)
NFS: Registering the id_resolver key type
Key type id_resolver registered
Key type id_legacy registered
NTFS driver 2.1.30 [Flags: R/W DEBUG].
jffs2: version 2.2. (NAND) © 2001-2006 Red Hat, Inc.
fuse init (API version 7.22)
msgmni has been set to 1994
io scheduler noop registered
io scheduler deadline registered
io scheduler cfq registered (default)
imx-weim 21b8000.weim: WEIM driver registered.
mxc_mipi_dsi 21e0000.mipi: i.MX MIPI DSI driver probed
MIPI DSI driver module loaded
imx6q-pinctrl 20e0000.iomuxc: pin MX6Q_PAD_DISP0_DAT9 already requested by 2084000.pwm; cannot claim for lcd.34
imx6q-pinctrl 20e0000.iomuxc: pin-101 (lcd.34) status -22
imx6q-pinctrl 20e0000.iomuxc: could not request pin 101 on device 20e0000.iomuxc
mxc_lcdif lcd.34: Error applying setting, reverse things back
imx6q-pinctrl 20e0000.iomuxc: pin MX6Q_PAD_DISP0_DAT9 already requested by 2084000.pwm; cannot claim for lcd.34
imx6q-pinctrl 20e0000.iomuxc: pin-101 (lcd.34) status -22
imx6q-pinctrl 20e0000.iomuxc: could not request pin 101 on device 20e0000.iomuxc
mxc_lcdif lcd.34: Error applying setting, reverse things back
mxc_lcdif lcd.34: can't get/select pinctrl
mxc_lcdif: probe of lcd.34 failed with error -22
mxc_sdc_fb fb.30: registered mxc display driver ldb
imx-ipuv3 2800000.ipu: IPU DMFC DP HIGH RESOLUTION: 1(0,1), 5B(2~5), 5F(6,7)
Console: switching to colour frame buffer device 128x48
mxc_sdc_fb fb.31: Can't get fb option for mxcfb1
mxc_sdc_fb fb.32: Can't get fb option for mxcfb2
mxc_sdc_fb fb.33: Can't get fb option for mxcfb3
imx-sdma 20ec000.sdma: no iram assigned, using external mem
imx-sdma 20ec000.sdma: loaded firmware 1.1
imx-sdma 20ec000.sdma: initialized
pfuze100-regulator 1-0008: Full lay: 1, Metal lay: 1
pfuze100-regulator 1-0008: FAB: 0, FIN: 0
pfuze100-regulator 1-0008: pfuze100 found.
SW1AB: 300 <--> 1875 mV at 1150 mV
SW1C: 300 <--> 1875 mV at 1175 mV
SW2: 800 <--> 3300 mV at 3300 mV
SW3A: 400 <--> 1975 mV at 1500 mV
SW3B: 400 <--> 1975 mV at 1500 mV
SW4: 800 <--> 3300 mV at 3150 mV
SWBST: 5000 <--> 5150 mV at 5000 mV
VSNVS: 1000 <--> 3000 mV at 3000 mV
VREFDDR: 750 mV
VGEN1: 800 <--> 1550 mV at 1500 mV
VGEN2: 800 <--> 1550 mV at 1500 mV
VGEN3: 1800 <--> 3300 mV at 2800 mV
VGEN4: 1800 <--> 3300 mV at 1800 mV
VGEN5: 1800 <--> 3300 mV at 3000 mV
VGEN6: 1800 <--> 3300 mV at 3300 mV
Serial: IMX driver
2020000.serial: ttymxc0 at MMIO 0x2020000 (irq = 58) is a IMX
console [ttymxc0] enabled
21ec000.serial: ttymxc2 at MMIO 0x21ec000 (irq = 60) is a IMX
21f4000.serial: ttymxc4 at MMIO 0x21f4000 (irq = 62) is a IMX
serial: Freescale lpuart driver
imx sema4 driver is registered.
[drm] Initialized drm 1.1.0 20060810
[drm] Initialized vivante 1.0.0 20120216 on minor 0
brd: module loaded
loop: module loaded
imx6q-pinctrl 20e0000.iomuxc: pin MX6Q_PAD_KEY_COL1 already requested by 21f4000.serial; cannot claim for 2008000.ecspi
imx6q-pinctrl 20e0000.iomuxc: pin-128 (2008000.ecspi) status -22
imx6q-pinctrl 20e0000.iomuxc: could not request pin 128 on device 20e0000.iomuxc
spi_imx 2008000.ecspi: Error applying setting, reverse things back
m25p80 spi32766.0: found mr25h256, expected m25p32
m25p80 spi32766.0: mr25h256 (32 Kbytes)
spi_imx 2008000.ecspi: probed
tun: Universal TUN/TAP device driver, 1.6
tun: (C) 1999-2004 Max Krasnyansky <maxk@qualcomm.com>
CAN device driver interface
libphy: fec_enet_mii_bus: probed
fec 2188000.ethernet eth0: registered PHC device 0
PPP generic driver version 2.4.2
PPP BSD Compression module registered
PPP Deflate Compression module registered
PPP MPPE Compression module registered
NET: Registered protocol family 24
usbcore: registered new interface driver asix
usbcore: registered new interface driver ax88179_178a
usbcore: registered new interface driver cdc_ether
usbcore: registered new interface driver net1080
usbcore: registered new interface driver cdc_subset
usbcore: registered new interface driver zaurus
usbcore: registered new interface driver cdc_ncm
ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
usbcore: registered new interface driver cdc_acm
cdc_acm: USB Abstract Control Model driver for USB modems and ISDN adapters
usbcore: registered new interface driver usb-storage
usbcore: registered new interface driver usbserial
usbcore: registered new interface driver option
usbserial: USB Serial support registered for GSM modem (1-port)
ci_hdrc ci_hdrc.0: EHCI Host Controller
ci_hdrc ci_hdrc.0: new USB bus registered, assigned bus number 1
ci_hdrc ci_hdrc.0: USB 2.0 started, EHCI 1.00
usb usb1: New USB device found, idVendor=1d6b, idProduct=0002
usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
usb usb1: Product: EHCI Host Controller
usb usb1: Manufacturer: Linux 3.10.53-06481-g1c3a910 ehci_hcd
usb usb1: SerialNumber: ci_hdrc.0
hub 1-0:1.0: USB hub found
hub 1-0:1.0: 1 port detected
ci_hdrc ci_hdrc.1: doesn't support gadget
ci_hdrc ci_hdrc.1: EHCI Host Controller
ci_hdrc ci_hdrc.1: new USB bus registered, assigned bus number 2
ci_hdrc ci_hdrc.1: USB 2.0 started, EHCI 1.00
usb usb2: New USB device found, idVendor=1d6b, idProduct=0002
usb usb2: New USB device strings: Mfr=3, Product=2, SerialNumber=1
usb usb2: Product: EHCI Host Controller
usb usb2: Manufacturer: Linux 3.10.53-06481-g1c3a910 ehci_hcd
usb usb2: SerialNumber: ci_hdrc.1
hub 2-0:1.0: USB hub found
hub 2-0:1.0: 1 port detected
mousedev: PS/2 mouse device common for all mice
usbcore: registered new interface driver xpad
usbcore: registered new interface driver usb_acecad
usbcore: registered new interface driver aiptek
usbcore: registered new interface driver gtco
usbcore: registered new interface driver hanwang
usbcore: registered new interface driver kbtab
usbcore: registered new interface driver wacom
elan-touch 2-0010: elan - Read Hello Packet Failed
elan-touch: probe of 2-0010 failed with error -22
egalax_ts 1-0004: Failed to read firmware version
egalax_ts: probe of 1-0004 failed with error -5
egalax_ts 2-0004: Failed to read firmware version
egalax_ts: probe of 2-0004 failed with error -5
input: max11801_ts as /devices/soc0/soc.1/2100000.aips-bus/21a4000.i2c/i2c-1/1-0048/input/input0
i2c-core: driver [isl29023] using legacy suspend method
i2c-core: driver [isl29023] using legacy resume method
snvs_rtc 20cc034.snvs-rtc-lp: rtc core: registered 20cc034.snvs-rtc-lp as rtc0
i2c /dev entries driver
ov5640_read_reg:write reg error:reg=300a
camera ov5640 is not found
ov5642_read_reg:write reg error:reg=300a
camera ov5642 is not found
ov5640_read_reg:write reg error:reg=300a
camera ov5640_mipi is not found
mxc_v4l2_output v4l2_out.38: V4L2 device registered as video16
mxc_v4l2_output v4l2_out.38: V4L2 device registered as video17
usbcore: registered new interface driver uvcvideo
USB Video Class driver (1.1.1)
gspca_main: v2.14.0 registered
mag3110 2-000e: check mag3110 chip ID
input: FreescaleMagnetometer as /devices/virtual/input/input1
input: eCompass as /devices/virtual/input/input2
mag3110 2-000e: mag3110 is probed
input: FreescaleAccelerometer as /devices/virtual/input/input3
mma8x5x device driver probe successfully
imx2-wdt 20c0000.wdog: IMX2+ Watchdog Timer enabled. timeout=60s (nowayout=0)
device-mapper: uevent: version 1.0.3
device-mapper: ioctl: 4.24.0-ioctl (2013-01-15) initialised: dm-devel@redhat.com
Bluetooth: Virtual HCI driver ver 1.3
Bluetooth: HCI UART driver ver 2.2
Bluetooth: HCIATH3K protocol initialized
usbcore: registered new interface driver btusb
cpuidle: using governor ladder
cpuidle: using governor menu
sdhci: Secure Digital Host Controller Interface driver
sdhci: Copyright(c) Pierre Ossman
sdhci-pltfm: SDHCI platform and OF driver helper
mmc1: no vqmmc regulator found
mmc1: no vmmc regulator found
mmc1: SDHCI controller on 2194000.usdhc [2194000.usdhc] using ADMA
mmc2: no vqmmc regulator found
mmc2: no vmmc regulator found
mmc2: SDHCI controller on 2198000.usdhc [2198000.usdhc] using ADMA
mmc3: no vqmmc regulator found
mmc3: no vmmc regulator found
mmc2: new high speed SDHC card at address 0001
mmcblk2: mmc2:0001 00000 14.6 GiB
 mmcblk2: p1 p2 p3
mmc3: SDHCI controller on 219c000.usdhc [219c000.usdhc] using ADMA
Galcore version 5.0.11.25762
mmc3: new high speed DDR MMC card at address 0001
mmcblk3: mmc3:0001 SEM08G 7.39 GiB
mmcblk3boot0: mmc3:0001 SEM08G partition 1 2.00 MiB
mmcblk3boot1: mmc3:0001 SEM08G partition 2 2.00 MiB
mmcblk3rpmb: mmc3:0001 SEM08G partition 3 128 KiB
 mmcblk3: unknown partition table
 mmcblk3boot1: unknown partition table
 mmcblk3boot0: unknown partition table
mxc_vdoa 21e4000.vdoa: i.MX Video Data Order Adapter(VDOA) driver probed
mxc_asrc 2034000.asrc: mxc_asrc registered
mxc_vpu 2040000.vpu: VPU initialized
hidraw: raw HID events driver (C) Jiri Kosina
usbcore: registered new interface driver usbhid
usbhid: USB HID core driver
ashmem: initialized
logger: created 256K log 'log_main'
logger: created 256K log 'log_events'
logger: created 256K log 'log_radio'
logger: created 256K log 'log_system'
usbcore: registered new interface driver snd-usb-audio
wm8962 0-001a: customer id 0 revision D
fsl-hdmi-dai hdmi_audio.17: failed to probe. Load HDMI-video first.
fsl-hdmi-dai: probe of hdmi_audio.17 failed with error -12
input: WM8962 Beep Generator as /devices/soc0/soc.1/2100000.aips-bus/21a0000.i2c/i2c-0/0-001a/input/input4
imx-wm8962 sound.28:  wm8962 <-> 202c000.ssi mapping ok
imx-audio-hdmi sound-hdmi.29: initialize HDMI-audio failed. load HDMI-video first
NET: Registered protocol family 26
u32 classifier
    Actions configured
Netfilter messages via NETLINK v0.30.
nf_conntrack version 0.5.0 (15958 buckets, 63832 max)
ctnetlink v0.93: registering with nfnetlink.
NF_TPROXY: Transparent proxy support initialized, version 4.1.0
NF_TPROXY: Copyright (c) 2006-2007 BalaBit IT Ltd.
xt_time: kernel timezone is -0000
ip_tables: (C) 2000-2006 Netfilter Core Team
arp_tables: (C) 2002 David S. Miller
TCP: cubic registered
Initializing XFRM netlink socket
NET: Registered protocol family 10
mip6: Mobile IPv6
ip6_tables: (C) 2000-2006 Netfilter Core Team
NET: Registered protocol family 17
NET: Registered protocol family 15
can: controller area network core (rev 20120528 abi 9)
NET: Registered protocol family 29
can: raw protocol (rev 20120528)
can: broadcast manager protocol (rev 20120528 t)
can: netlink gateway (rev 20130117) max_hops=1
Bluetooth: RFCOMM TTY layer initialized
Bluetooth: RFCOMM socket layer initialized
Bluetooth: RFCOMM ver 1.11
Bluetooth: BNEP (Ethernet Emulation) ver 1.3
Bluetooth: BNEP filters: protocol multicast
Bluetooth: BNEP socket layer initialized
Bluetooth: HIDP (Human Interface Emulation) ver 1.2
Bluetooth: HIDP socket layer initialized
8021q: 802.1Q VLAN Support v1.8
Key type dns_resolver registered
VFP support v0.3: implementor 41 architecture 3 part 30 variant 9 rev 4
VGEN1: disabling
SWBST: disabling
SW4: disabling
wm8962-supply: disabling
regulator-dummy: disabling
imx mcc test is registered.
file system registered
android_usb gadget: Mass Storage Function, version: 2009/09/11
android_usb gadget: Number of LUNs=1
 lun0: LUN: removable file: (no medium)
android_usb gadget: android_usb ready
input: gpio-keys.27 as /devices/soc0/gpio-keys.27/input/input5
snvs_rtc 20cc034.snvs-rtc-lp: setting system clock to 1970-01-01 00:00:01 UTC (1)
ALSA device list:
  #0: wm8962-audio
Freeing unused kernel memory: 340K (80e52000 - 80ea7000)
SELinux:  Permission attach_queue in class tun_socket not defined in policy.
SELinux: the above unknown classes and permissions will be denied
type=1403 audit(1.740:2): policy loaded auid=4294967295 ses=4294967295
SELinux: Loaded policy from /sepolicy
type=1404 audit(1.750:3): enforcing=1 old_enforcing=0 auid=4294967295 ses=4294967295
init (1): /proc/1/oom_adj is deprecated, please use /proc/1/oom_score_adj instead.
init: /dev/hw_random not found
keychord: using input dev gpio-keys.27 for fevent
init: cannot open '/initlogo.rle'
Console: switching to colour dummy device 80x30
fs_mgr: Cannot mount filesystem on /dev/block/mmcblk2p5 at /system
init: fs_mgr_mount_all returned an error
init: /dev/hw_random not found
init: Unable to open persistent property directory /data/property errno: 2
rfkill: BT RF going to : off
init: cannot find '/system/bin/sh', disabling 'console'
type=1400 audit(23.930:4): avc:  denied  { entrypoint } for  pid=143 comm="init" path="/sbin/healthd" dev="rootfs" ino=152 scontext=u:r:healthd:s0 tcontext=u:object_r:rootfs:s0 tclass=file permissive=1
healthd: BatteryTemperaturePath not found
healthd: BatteryTechnologyPath not found
binder: 143:143 transaction failed 29189, size 0-0
init: cannot find '/system/bin/servicemanager', disabling 'servicemanager'
init: cannot find '/system/bin/vold', disabling 'vold'
init: cannot find '/system/bin/netd', disabling 'netd'
init: cannot find '/system/bin/debuggerd', disabling 'debuggerd'
init: cannot find '/system/bin/surfaceflinger', disabling 'surfaceflinger'
init: cannot find '/system/bin/app_process', disabling 'zygote'
init: cannot find '/system/bin/drmserver', disabling 'drm'
init: cannot find '/system/bin/mediaserver', disabling 'media'
init: cannot find '/system/bin/installd', disabling 'installd'
init: cannot find '/system/etc/install-recovery.sh', disabling 'flash_recovery'
init: cannot find '/system/bin/keystore', disabling 'keystore'
init: cannot find '/system/bin/rild', disabling 'ril-daemon'
init: Unable to write persistent property to temp file /data/property/.temp.1Xl6lA errno: 2
init: Unable to write persistent property to temp file /data/property/.temp.PKH8B0 errno: 2
init: using deprecated syntax for specifying property 'ro.serialno', use ${name} instead
init: using deprecated syntax for specifying property 'ro.product.manufacturer', use ${name} instead
init: property 'ro.product.manufacturer' doesn't exist while expanding '$ro.product.manufacturer'
init: cannot expand '$ro.product.manufacturer' while writing to '/sys/class/android_usb/android0/iManufacturer'
init: using deprecated syntax for specifying property 'ro.product.model', use ${name} instead
init: property 'ro.product.model' doesn't exist while expanding '$ro.product.model'
init: cannot expand '$ro.product.model' while writing to '/sys/class/android_usb/android0/iProduct'
init: property 'sys.powerctl' doesn't exist while expanding '${sys.powerctl}'
init: powerctl: cannot expand '${sys.powerctl}'
init: property 'sys.sysctl.extra_free_kbytes' doesn't exist while expanding '${sys.sysctl.extra_free_kbytes}'
init: cannot expand '${sys.sysctl.extra_free_kbytes}' while writing to '/proc/sys/vm/extra_free_kbytes'
android_usb: already disabled
mtp_bind_config
binder: 143:143 transaction failed 29189, size 0-0
binder: 143:143 transaction failed 29189, size 0-0
```
TODO: Update after successfully loading /system
### TODO: Download the board images to the SabreSD
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
### TODO: Building Android images for i.MX SabreSD from sources
TODO: Integrate into <https://github.com/gmacario/easy-build/blob/master/build-aosp/README.md>
(2015-05-20 16:15 CEST)
Login as gmacario@mv-linux-powerhorse
```
$ cd ~/easy-build/build-aosp
$ ./build.sh
$ ./run-NEW.sh
```
TODO: build-aosp: Commit "run-NEW.sh" as updated "run.sh" in resolution of issue ???
Logged as root@container, create subdirectory `myandroid` inside the directory shared with the host, then change to user `build`:
```
# cd ~build/shared && mkdir myandroid && chown build.build myandroid && ln -sf ${PWD}/myandroid ~build/
# cd ~build/shared && mkdir extra && chown build.build extra && ln -sf ${PWD}/extra ~build/
# su - build
```
Logged as build@container, configure git (specify your user.email and user.name)
```
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
$ git config --global color.ui auto
```
#### Unpacking the Freescale Android release package
Unpack the Freescale Android release package downloaded from <http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=RDIMX6SABREBRD>
```
$ cd ~/extra
$ tar xzvf ~/shared/20150514-Android_KK443_200_SabreSD/android_KK4.4.3_2.0.0-ga_core_source.gz
$ cd android_KK4.4.3_2.0.0-ga_core_source/code/
$ tar xzvf KK4.4.3_2.0.0-ga.tar.gz
```
#### Getting Android source code (AOSP/kernel/U-Boot)
See Sec 3.1 of "Android_User's_Guide.pdf" and <https://community.freescale.com/thread/353644>
Download the source code of Android KitKat 4.4.3:
```
$ cd ~/myandroid
$ repo init -u https://android.googlesource.com/platform/manifest -b android-4.4.3_r1
$ repo sync -j16
```
**NOTE**: The last command will download about 40 GB of code and may take a few hours depending on the speed of your Internet connection.
(Optional) Save a backup of the AOSP tree under ~/extra - so you will save time when restoring in case you screwed it...
```
$ cd ~/myandroid && tar cvfz ~/extra/bk-aosp-yyyymmdd-hhmm.tar.gz .
```
Get the KK4.4.3_2.0.0 Linux kernel sources from Freescale open source git:
```
$ cd ~/extra
$ git clone git://git.freescale.com/imx/linux-2.6-imx.git kernel_imx
$ cd kernel_imx
$ git checkout kk4.4.3_2.0.0-ga
```
Clone the U-Boot git repository from Freescale open source git:
```
$ cd ~/extra
$ git clone git://git.freescale.com/imx/uboot-imx.git uboot-imx
$ cd uboot-imx
$ git checkout kk4.4.3_2.0.0-ga
```
Copy the i.MX kernel and u-boot source tree inside the AOSP directory:
```
$ cd ~/extra && cp -a kernel_imx ~/myandroid/
$ cd ~/extra && cp -a uboot-imx  ~/myandroid/bootable/bootloader/
```
#### Patch code for i.MX
Repo tutorial: https://source.android.com/source/developing.html
(Optional) create a new topic branch BEFORE applying Freescale patches:
```
$ cd ~/myandroid
$ repo start try-kk443-200-sabresd --all
```
Show the working tree status (will take TBD minutes):
```
$ repo status -j8 -o
```
Install the patch script tool (will add the "c_patch" function):
```
$ cd ~/myandroid
$ source build/envsetup.sh
$ source ~/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga/and_patch.sh
$ help
```
(2015-05-21 18:11 CEST)
Create a topic branch and apply Freescale patches:
```
$ c_patch ~/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga imx_KK4.4.3_2.0.0-ga
```
Result:
```
build@59681ae38fc9:~/myandroid$ c_patch ~/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga imx_KK4.4.3_2.0.0-ga
Parsing basefile /home/build/shared/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga/baseversion...
Check work tree and patch dir based on /home/build/shared/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga/baseversion...
Checking NEW project - external/linux-lib ...
Checking NEW project - external/linux-test ...
Checking NEW project - external/linux-firmware-imx ...
Checking NEW project - external/ntfs-3g ...
Checking NEW project - external/powerdebug ...
Checking NEW project - external/fsl_vpu_omx ...
Checking NEW project - external/mtd-utils ...
Checking NEW project - external/busybox ...
Checking NEW project - device/fsl ...
Checking NEW project - device/fsl-proprietary ...
Checking NEW project - hardware/imx ...
Checking NEW project - hardware/realtek ...
Checking NEW project - packages/apps/fsl_imx_demo ...
Checking CHANGE project - build ...
Checking CHANGE project - libcore ...
Checking CHANGE project - system/vold ...
Checking CHANGE project - system/core ...
Checking CHANGE project - external/ppp ...
Checking CHANGE project - bionic ...
Checking CHANGE project - bootable/recovery ...
Checking CHANGE project - frameworks/native ...
Checking CHANGE project - packages/wallpapers/Basic ...
Checking CHANGE project - external/skia ...
Checking CHANGE project - hardware/libhardware ...
Checking CHANGE project - hardware/libhardware_legacy ...
Checking CHANGE project - external/tinyalsa ...
Checking CHANGE project - packages/apps/SoundRecorder ...
Checking CHANGE project - packages/providers/MediaProvider ...
Checking CHANGE project - hardware/ril ...
Checking CHANGE project - hardware/qcom/wlan ...
Checking CHANGE project - external/wpa_supplicant_8 ...
Checking CHANGE project - system/netd ...
Checking CHANGE project - frameworks/av ...
Checking CHANGE project - frameworks/base ...
Checking CHANGE project - packages/apps/Settings ...
Checking CHANGE project - packages/apps/Gallery2 ...
Checking CHANGE project - packages/apps/Music ...
Checking CHANGE project - packages/apps/Mms ...
Checking CHANGE project - packages/apps/Camera2 ...
Checking CHANGE project - frameworks/webview ...
Checking CHANGE project - packages/apps/LegacyCamera ...
Checking CHANGE project - external/dnsmasq ...
Checking CHANGE project - dalvik ...
Checking CHANGE project - external/chromium_org ...
Checking CHANGE project - external/iproute2 ...
Checking CHANGE project - external/iptables ...
Checking CHANGE project - external/kernel-headers ...
Checking CHANGE project - external/linux-tools-perf ...
Checking CHANGE project - system/extras ...
Checking CHANGE project - packages/apps/Launcher2 ...
Checking CHANGE project - hardware/ti/wpan ...
Checking KEEP project - abi/cpp ...
Checking KEEP project - art ...
Checking KEEP project - bootable/bootloader/legacy ...
Checking KEEP project - bootable/diskinstaller ...
Checking KEEP project - cts ...
Checking KEEP project - developers/build ...
Checking KEEP project - developers/demos ...
Checking KEEP project - developers/docs ...
Checking KEEP project - developers/samples/android ...
Checking KEEP project - development ...
Checking KEEP project - device/asus/deb ...
Checking KEEP project - device/asus/flo ...
Checking KEEP project - device/asus/flo-kernel ...
Checking KEEP project - device/asus/grouper ...
Checking KEEP project - device/asus/tilapia ...
Checking KEEP project - device/common ...
Checking KEEP project - device/generic/armv7-a-neon ...
Checking KEEP project - device/generic/common ...
Checking KEEP project - device/generic/goldfish ...
Checking KEEP project - device/generic/mips ...
Checking KEEP project - device/generic/mini-emulator-armv7-a-neon ...
Checking KEEP project - device/generic/mini-emulator-mips ...
Checking KEEP project - device/generic/mini-emulator-x86 ...
Checking KEEP project - device/generic/x86 ...
Checking KEEP project - device/google/accessory/arduino ...
Checking KEEP project - device/google/accessory/demokit ...
Checking KEEP project - device/lge/hammerhead ...
Checking KEEP project - device/lge/hammerhead-kernel ...
Checking KEEP project - device/lge/mako ...
Checking KEEP project - device/lge/mako-kernel ...
Checking KEEP project - device/sample ...
Checking KEEP project - device/samsung/manta ...
Checking KEEP project - docs/source.android.com ...
Checking KEEP project - external/aac ...
Checking KEEP project - external/android-clat ...
Checking KEEP project - external/android-mock ...
Checking KEEP project - external/ant-glob ...
Checking KEEP project - external/antlr ...
Checking KEEP project - external/apache-harmony ...
Checking KEEP project - external/apache-http ...
Checking KEEP project - external/apache-qp ...
Checking KEEP project - external/apache-xml ...
Checking KEEP project - external/arduino ...
Checking KEEP project - external/bison ...
Checking KEEP project - external/blktrace ...
Checking CHANGE project - external/bluetooth/bluedroid ...
Checking KEEP project - external/bouncycastle ...
Checking KEEP project - external/bsdiff ...
Checking KEEP project - external/bzip2 ...
Checking KEEP project - external/ceres-solver ...
Checking KEEP project - external/checkpolicy ...
Checking KEEP project - external/chromium ...
Checking KEEP project - external/chromium-libpac ...
Checking KEEP project - external/chromium-trace ...
Checking KEEP project - external/chromium_org/sdch/open-vcdiff ...
Checking KEEP project - external/chromium_org/testing/gtest ...
Checking KEEP project - external/chromium_org/third_party/WebKit ...
Checking KEEP project - external/chromium_org/third_party/angle ...
Checking KEEP project - external/chromium_org/third_party/eyesfree/src/android/java/src/com/googlecode/eyesfree/braille ...
Checking KEEP project - external/chromium_org/third_party/freetype ...
Checking KEEP project - external/chromium_org/third_party/icu ...
Checking KEEP project - external/chromium_org/third_party/leveldatabase/src ...
Checking KEEP project - external/chromium_org/third_party/libjingle/source/talk ...
Checking KEEP project - external/chromium_org/third_party/libphonenumber/src/phonenumbers ...
Checking KEEP project - external/chromium_org/third_party/libphonenumber/src/resources ...
Checking KEEP project - external/chromium_org/third_party/mesa/src ...
Checking KEEP project - external/chromium_org/third_party/openssl ...
Checking KEEP project - external/chromium_org/third_party/opus/src ...
Checking KEEP project - external/chromium_org/third_party/ots ...
Checking KEEP project - external/chromium_org/third_party/sfntly/cpp/src ...
Checking KEEP project - external/chromium_org/third_party/skia/gyp ...
Checking KEEP project - external/chromium_org/third_party/skia/include ...
Checking KEEP project - external/chromium_org/third_party/skia/src ...
Checking KEEP project - external/chromium_org/third_party/smhasher/src ...
Checking KEEP project - external/chromium_org/third_party/yasm/source/patched-yasm ...
Checking KEEP project - external/chromium_org/tools/grit ...
Checking KEEP project - external/chromium_org/tools/gyp ...
Checking KEEP project - external/chromium_org/v8 ...
Checking KEEP project - external/clang ...
Checking KEEP project - external/compiler-rt ...
Checking KEEP project - external/dexmaker ...
Checking KEEP project - external/dhcpcd ...
Checking KEEP project - external/doclava ...
Checking KEEP project - external/dropbear ...
Checking KEEP project - external/droiddriver ...
Checking KEEP project - external/e2fsprogs ...
Checking KEEP project - external/easymock ...
Checking KEEP project - external/eclipse-basebuilder ...
Checking KEEP project - external/eclipse-windowbuilder ...
Checking KEEP project - external/eigen ...
Checking KEEP project - external/elfutils ...
Checking KEEP project - external/embunit ...
Checking KEEP project - external/emma ...
Checking KEEP project - external/esd ...
Checking KEEP project - external/expat ...
Checking KEEP project - external/eyes-free ...
Checking KEEP project - external/fdlibm ...
Checking KEEP project - external/flac ...
Checking KEEP project - external/freetype ...
Checking KEEP project - external/fsck_msdos ...
Checking KEEP project - external/ganymed-ssh2 ...
Checking KEEP project - external/gcc-demangle ...
Checking KEEP project - external/genext2fs ...
Checking KEEP project - external/giflib ...
Checking KEEP project - external/google-diff-match-patch ...
Checking KEEP project - external/grub ...
Checking KEEP project - external/gtest ...
Checking KEEP project - external/guava ...
Checking KEEP project - external/hamcrest ...
Checking KEEP project - external/harfbuzz ...
Checking KEEP project - external/harfbuzz_ng ...
Checking KEEP project - external/hyphenation ...
Checking KEEP project - external/icu4c ...
Checking KEEP project - external/ipsec-tools ...
Checking KEEP project - external/iputils ...
Checking KEEP project - external/jack ...
Checking KEEP project - external/javasqlite ...
Checking KEEP project - external/javassist ...
Checking KEEP project - external/jdiff ...
Checking KEEP project - external/jhead ...
Checking KEEP project - external/jmdns ...
Checking KEEP project - external/jmonkeyengine ...
Checking KEEP project - external/jpeg ...
Checking KEEP project - external/jsilver ...
Checking KEEP project - external/jsr305 ...
Checking KEEP project - external/junit ...
Checking KEEP project - external/libcap-ng ...
Checking KEEP project - external/libexif ...
Checking KEEP project - external/libffi ...
Checking KEEP project - external/libgsm ...
Checking KEEP project - external/liblzf ...
Checking KEEP project - external/libmtp ...
Checking KEEP project - external/libnfc-nci ...
Checking KEEP project - external/libnfc-nxp ...
Checking KEEP project - external/libnl-headers ...
Checking KEEP project - external/libogg ...
Checking KEEP project - external/libpcap ...
Checking KEEP project - external/libphonenumber ...
Checking KEEP project - external/libpng ...
Checking KEEP project - external/libppp ...
Checking CHANGE project - external/libselinux ...
Checking KEEP project - external/libsepol ...
Checking KEEP project - external/libssh2 ...
Checking KEEP project - external/libusb ...
Checking KEEP project - external/libusb-compat ...
Checking KEEP project - external/libvorbis ...
Checking KEEP project - external/libvpx ...
Checking KEEP project - external/libxml2 ...
Checking KEEP project - external/libxslt ...
Checking KEEP project - external/libyuv ...
Checking KEEP project - external/littlemock ...
Checking KEEP project - external/llvm ...
Checking KEEP project - external/lzma ...
Checking KEEP project - external/marisa-trie ...
Checking KEEP project - external/markdown ...
Checking KEEP project - external/mdnsresponder ...
Checking KEEP project - external/mesa3d ...
Checking KEEP project - external/mksh ...
Checking KEEP project - external/mockito ...
Checking KEEP project - external/mockwebserver ...
Checking KEEP project - external/mp4parser ...
Checking KEEP project - external/mtpd ...
Checking KEEP project - external/naver-fonts ...
Checking KEEP project - external/netcat ...
Checking KEEP project - external/netperf ...
Checking KEEP project - external/neven ...
Checking KEEP project - external/nist-pkits ...
Checking KEEP project - external/nist-sip ...
Checking KEEP project - external/noto-fonts ...
Checking KEEP project - external/oauth ...
Checking KEEP project - external/objenesis ...
Checking KEEP project - external/okhttp ...
Checking KEEP project - external/open-vcdiff ...
Checking KEEP project - external/opencv ...
Checking KEEP project - external/openfst ...
Checking KEEP project - external/openssh ...
Checking CHANGE project - external/openssl ...
Checking KEEP project - external/oprofile ...
Checking KEEP project - external/pixman ...
Checking KEEP project - external/proguard ...
Checking KEEP project - external/protobuf ...
Checking KEEP project - external/qemu ...
Checking KEEP project - external/qemu-pc-bios ...
Checking KEEP project - external/regex-re2 ...
Checking KEEP project - external/replicaisland ...
Checking KEEP project - external/robolectric ...
Checking KEEP project - external/safe-iop ...
Checking KEEP project - external/scrypt ...
Checking KEEP project - external/sepolicy ...
Checking KEEP project - external/sfntly ...
Checking KEEP project - external/sil-fonts ...
Checking KEEP project - external/smack ...
Checking KEEP project - external/smali ...
Checking KEEP project - external/sonivox ...
Checking KEEP project - external/speex ...
Checking KEEP project - external/sqlite ...
Checking KEEP project - external/srec ...
Checking KEEP project - external/srtp ...
Checking KEEP project - external/stlport ...
Checking KEEP project - external/strace ...
Checking KEEP project - external/stressapptest ...
Checking KEEP project - external/svox ...
Checking KEEP project - external/tagsoup ...
Checking KEEP project - external/tcpdump ...
Checking KEEP project - external/timezonepicker-support ...
Checking KEEP project - external/tinycompress ...
Checking KEEP project - external/tinyxml ...
Checking KEEP project - external/tinyxml2 ...
Checking KEEP project - external/tremolo ...
Checking KEEP project - external/v8 ...
Checking KEEP project - external/valgrind ...
Checking KEEP project - external/webp ...
Checking KEEP project - external/webrtc ...
Checking KEEP project - external/xmlwriter ...
Checking KEEP project - external/xmp_toolkit ...
Checking KEEP project - external/yaffs2 ...
Checking KEEP project - external/zlib ...
Checking KEEP project - external/zxing ...
Checking KEEP project - frameworks/compile/libbcc ...
Checking KEEP project - frameworks/compile/mclinker ...
Checking KEEP project - frameworks/compile/slang ...
Checking KEEP project - frameworks/ex ...
Checking KEEP project - frameworks/mff ...
Checking KEEP project - frameworks/ml ...
Checking KEEP project - frameworks/opt/calendar ...
Checking KEEP project - frameworks/opt/carddav ...
Checking KEEP project - frameworks/opt/colorpicker ...
Checking KEEP project - frameworks/opt/datetimepicker ...
Checking KEEP project - frameworks/opt/emoji ...
Checking KEEP project - frameworks/opt/inputmethodcommon ...
Checking KEEP project - frameworks/opt/mailcommon ...
Checking KEEP project - frameworks/opt/mms ...
Checking KEEP project - frameworks/opt/net/voip ...
Checking KEEP project - frameworks/opt/photoviewer ...
Checking KEEP project - frameworks/opt/timezonepicker ...
Checking KEEP project - frameworks/opt/telephony ...
Checking KEEP project - frameworks/opt/vcard ...
Checking KEEP project - frameworks/opt/widget ...
Checking KEEP project - frameworks/rs ...
Checking KEEP project - frameworks/support ...
Checking KEEP project - frameworks/testing ...
Checking KEEP project - frameworks/volley ...
Checking KEEP project - frameworks/wilhelm ...
Checking KEEP project - hardware/akm ...
Checking KEEP project - hardware/broadcom/libbt ...
Checking KEEP project - hardware/broadcom/wlan ...
Checking KEEP project - hardware/invensense ...
Checking KEEP project - hardware/qcom/audio ...
Checking KEEP project - hardware/qcom/bt ...
Checking KEEP project - hardware/qcom/camera ...
Checking KEEP project - hardware/qcom/display ...
Checking KEEP project - hardware/qcom/keymaster ...
Checking KEEP project - hardware/qcom/media ...
Checking KEEP project - hardware/qcom/msm8960 ...
Checking KEEP project - hardware/qcom/msm8x74 ...
Checking KEEP project - hardware/qcom/power ...
Checking KEEP project - hardware/qcom/sensors ...
Checking KEEP project - hardware/samsung_slsi/exynos5 ...
Checking KEEP project - hardware/ti/omap3 ...
Checking KEEP project - hardware/ti/omap4xxx ...
Checking KEEP project - hardware/ti/wlan ...
Checking KEEP project - libnativehelper ...
Checking KEEP project - ndk ...
Checking KEEP project - packages/apps/BasicSmsReceiver ...
Checking KEEP project - packages/apps/Bluetooth ...
Checking KEEP project - packages/apps/Browser ...
Checking KEEP project - packages/apps/Calculator ...
Checking KEEP project - packages/apps/Calendar ...
Checking KEEP project - packages/apps/Camera ...
Checking KEEP project - packages/apps/CellBroadcastReceiver ...
Checking KEEP project - packages/apps/CertInstaller ...
Checking KEEP project - packages/apps/Contacts ...
Checking KEEP project - packages/apps/ContactsCommon ...
Checking KEEP project - packages/apps/DeskClock ...
Checking KEEP project - packages/apps/Dialer ...
Checking KEEP project - packages/apps/Email ...
Checking KEEP project - packages/apps/Exchange ...
Checking CHANGE project - packages/apps/Gallery ...
Checking KEEP project - packages/apps/HTMLViewer ...
Checking KEEP project - packages/apps/InCallUI ...
Checking KEEP project - packages/apps/KeyChain ...
Checking KEEP project - packages/apps/Launcher3 ...
Checking KEEP project - packages/apps/MusicFX ...
Checking KEEP project - packages/apps/Nfc ...
Checking KEEP project - packages/apps/OneTimeInitializer ...
Checking KEEP project - packages/apps/PackageInstaller ...
Checking KEEP project - packages/apps/Phone ...
Checking KEEP project - packages/apps/PhoneCommon ...
Checking KEEP project - packages/apps/Protips ...
Checking KEEP project - packages/apps/Provision ...
Checking KEEP project - packages/apps/QuickSearchBox ...
Checking KEEP project - packages/apps/SmartCardService ...
Checking KEEP project - packages/apps/SpareParts ...
Checking KEEP project - packages/apps/SpeechRecorder ...
Checking KEEP project - packages/apps/Stk ...
Checking KEEP project - packages/apps/Tag ...
Checking KEEP project - packages/apps/UnifiedEmail ...
Checking KEEP project - packages/apps/VideoEditor ...
Checking KEEP project - packages/apps/VoiceDialer ...
Checking KEEP project - packages/experimental ...
Checking KEEP project - packages/inputmethods/LatinIME ...
Checking KEEP project - packages/inputmethods/OpenWnn ...
Checking KEEP project - packages/inputmethods/PinyinIME ...
Checking KEEP project - packages/providers/ApplicationsProvider ...
Checking KEEP project - packages/providers/CalendarProvider ...
Checking KEEP project - packages/providers/ContactsProvider ...
Checking KEEP project - packages/providers/DownloadProvider ...
Checking KEEP project - packages/providers/PartnerBookmarksProvider ...
Checking KEEP project - packages/providers/TelephonyProvider ...
Checking KEEP project - packages/providers/UserDictionaryProvider ...
Checking KEEP project - packages/screensavers/Basic ...
Checking KEEP project - packages/screensavers/PhotoTable ...
Checking KEEP project - packages/screensavers/WebView ...
Checking KEEP project - packages/services/Telephony ...
Checking KEEP project - packages/wallpapers/Galaxy4 ...
Checking KEEP project - packages/wallpapers/HoloSpiral ...
Checking KEEP project - packages/wallpapers/LivePicker ...
Checking KEEP project - packages/wallpapers/MagicSmoke ...
Checking KEEP project - packages/wallpapers/MusicVisualization ...
Checking KEEP project - packages/wallpapers/NoiseField ...
Checking KEEP project - packages/wallpapers/PhaseBeam ...
Checking KEEP project - pdk ...
Checking KEEP project - prebuilts/clang/darwin-x86/3.1 ...
Checking KEEP project - prebuilts/clang/darwin-x86/3.2 ...
Checking KEEP project - prebuilts/clang/darwin-x86/arm/3.3 ...
Checking KEEP project - prebuilts/clang/darwin-x86/host/3.3 ...
Checking KEEP project - prebuilts/clang/darwin-x86/mips/3.3 ...
Checking KEEP project - prebuilts/clang/darwin-x86/x86/3.3 ...
Checking KEEP project - prebuilts/clang/linux-x86/3.1 ...
Checking KEEP project - prebuilts/clang/linux-x86/3.2 ...
Checking KEEP project - prebuilts/clang/linux-x86/arm/3.3 ...
Checking KEEP project - prebuilts/clang/linux-x86/host/3.3 ...
Checking KEEP project - prebuilts/clang/linux-x86/mips/3.3 ...
Checking KEEP project - prebuilts/clang/linux-x86/x86/3.3 ...
Checking KEEP project - prebuilts/devtools ...
Checking KEEP project - prebuilts/eclipse ...
Checking KEEP project - prebuilts/gcc/darwin-x86/arm/arm-eabi-4.6 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/arm/arm-eabi-4.7 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/arm/arm-linux-androideabi-4.6 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/arm/arm-linux-androideabi-4.7 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/host/headers ...
Checking KEEP project - prebuilts/gcc/darwin-x86/host/i686-apple-darwin-4.2.1 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/mips/mipsel-linux-android-4.6 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/mips/mipsel-linux-android-4.7 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/x86/i686-linux-android-4.6 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/x86/i686-linux-android-4.7 ...
Checking KEEP project - prebuilts/gcc/darwin-x86/x86/x86_64-linux-android-4.7 ...
Checking KEEP project - prebuilts/gcc/linux-x86/arm/arm-eabi-4.6 ...
Checking KEEP project - prebuilts/gcc/linux-x86/arm/arm-eabi-4.7 ...
Checking KEEP project - prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6 ...
Checking KEEP project - prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.7 ...
Checking KEEP project - prebuilts/gcc/linux-x86/host/i686-linux-glibc2.7-4.4.3 ...
Checking KEEP project - prebuilts/gcc/linux-x86/host/i686-linux-glibc2.7-4.6 ...
Checking KEEP project - prebuilts/gcc/linux-x86/host/x86_64-linux-glibc2.7-4.6 ...
Checking KEEP project - prebuilts/gcc/linux-x86/mips/mipsel-linux-android-4.6 ...
Checking KEEP project - prebuilts/gcc/linux-x86/mips/mipsel-linux-android-4.7 ...
Checking KEEP project - prebuilts/gcc/linux-x86/x86/i686-linux-android-4.6 ...
Checking KEEP project - prebuilts/gcc/linux-x86/x86/i686-linux-android-4.7 ...
Checking KEEP project - prebuilts/gcc/linux-x86/x86/x86_64-linux-android-4.7 ...
Checking KEEP project - prebuilts/gradle-plugin ...
Checking KEEP project - prebuilts/maven_repo/android ...
Checking KEEP project - prebuilts/misc ...
Checking KEEP project - prebuilts/ndk ...
Checking KEEP project - prebuilts/python/darwin-x86/2.7.5 ...
Checking KEEP project - prebuilts/python/linux-x86/2.7.5 ...
Checking KEEP project - prebuilts/qemu-kernel ...
Checking KEEP project - prebuilts/runtime ...
Checking KEEP project - prebuilts/sdk ...
Checking KEEP project - system/media ...
Checking KEEP project - system/security ...
Checking KEEP project - tools/external/fat32lib ...
Checking KEEP project - tools/external/gradle ...
Load new gits created by FSL...
Creating NEW gits - external/linux-lib
Creating NEW gits - external/linux-test
Creating NEW gits - external/linux-firmware-imx
Creating NEW gits - external/ntfs-3g
Creating NEW gits - external/powerdebug
Creating NEW gits - external/fsl_vpu_omx
Creating NEW gits - external/mtd-utils
Creating NEW gits - external/busybox
Creating NEW gits - device/fsl
Creating NEW gits - device/fsl-proprietary
Creating NEW gits - hardware/imx
Creating NEW gits - hardware/realtek
Creating NEW gits - packages/apps/fsl_imx_demo
Switch all gits to base version ...
Switching base version for external/linux-lib
Switching base version for external/linux-test
Switching base version for external/linux-firmware-imx
Switching base version for external/ntfs-3g
Switching base version for external/powerdebug
Switching base version for external/fsl_vpu_omx
Switching base version for external/mtd-utils
Switching base version for external/busybox
Switching base version for device/fsl
Switching base version for device/fsl-proprietary
Switching base version for hardware/imx
Switching base version for hardware/realtek
Switching base version for packages/apps/fsl_imx_demo
Switching base version for build
Switching base version for libcore
Switching base version for system/vold
Switching base version for system/core
Switching base version for external/ppp
Switching base version for bionic
Switching base version for bootable/recovery
Switching base version for frameworks/native
Switching base version for packages/wallpapers/Basic
Switching base version for external/skia
Switching base version for hardware/libhardware
Switching base version for hardware/libhardware_legacy
Switching base version for external/tinyalsa
Switching base version for packages/apps/SoundRecorder
Switching base version for packages/providers/MediaProvider
Switching base version for hardware/ril
Switching base version for hardware/qcom/wlan
Switching base version for external/wpa_supplicant_8
Switching base version for system/netd
Switching base version for frameworks/av
Switching base version for frameworks/base
Switching base version for packages/apps/Settings
Switching base version for packages/apps/Gallery2
Switching base version for packages/apps/Music
Switching base version for packages/apps/Mms
Switching base version for packages/apps/Camera2
Switching base version for frameworks/webview
Switching base version for packages/apps/LegacyCamera
Switching base version for external/dnsmasq
Switching base version for dalvik
Switching base version for external/chromium_org
Switching base version for external/iproute2
Switching base version for external/iptables
Switching base version for external/kernel-headers
Switching base version for external/linux-tools-perf
Switching base version for system/extras
Switching base version for packages/apps/Launcher2
Switching base version for hardware/ti/wpan
Switching base version for abi/cpp
Switching base version for art
Switching base version for bootable/bootloader/legacy
Switching base version for bootable/diskinstaller
Switching base version for cts
Switching base version for developers/build
Switching base version for developers/demos
Switching base version for developers/docs
Switching base version for developers/samples/android
Switching base version for development
Switching base version for device/asus/deb
Switching base version for device/asus/flo
Switching base version for device/asus/flo-kernel
Switching base version for device/asus/grouper
Switching base version for device/asus/tilapia
Switching base version for device/common
Switching base version for device/generic/armv7-a-neon
Switching base version for device/generic/common
Switching base version for device/generic/goldfish
Switching base version for device/generic/mips
Switching base version for device/generic/mini-emulator-armv7-a-neon
Switching base version for device/generic/mini-emulator-mips
Switching base version for device/generic/mini-emulator-x86
Switching base version for device/generic/x86
Switching base version for device/google/accessory/arduino
Switching base version for device/google/accessory/demokit
Switching base version for device/lge/hammerhead
Switching base version for device/lge/hammerhead-kernel
Switching base version for device/lge/mako
Switching base version for device/lge/mako-kernel
Switching base version for device/sample
Switching base version for device/samsung/manta
Switching base version for docs/source.android.com
Switching base version for external/aac
Switching base version for external/android-clat
Switching base version for external/android-mock
Switching base version for external/ant-glob
Switching base version for external/antlr
Switching base version for external/apache-harmony
Switching base version for external/apache-http
Switching base version for external/apache-qp
Switching base version for external/apache-xml
Switching base version for external/arduino
Switching base version for external/bison
Switching base version for external/blktrace
Switching base version for external/bluetooth/bluedroid
Switching base version for external/bouncycastle
Switching base version for external/bsdiff
Switching base version for external/bzip2
Switching base version for external/ceres-solver
Switching base version for external/checkpolicy
Switching base version for external/chromium
Switching base version for external/chromium-libpac
Switching base version for external/chromium-trace
Switching base version for external/chromium_org/sdch/open-vcdiff
Switching base version for external/chromium_org/testing/gtest
Switching base version for external/chromium_org/third_party/WebKit
Switching base version for external/chromium_org/third_party/angle
Switching base version for external/chromium_org/third_party/eyesfree/src/android/java/src/com/googlecode/eyesfree/braille
Switching base version for external/chromium_org/third_party/freetype
Switching base version for external/chromium_org/third_party/icu
Switching base version for external/chromium_org/third_party/leveldatabase/src
Switching base version for external/chromium_org/third_party/libjingle/source/talk
Switching base version for external/chromium_org/third_party/libphonenumber/src/phonenumbers
Switching base version for external/chromium_org/third_party/libphonenumber/src/resources
Switching base version for external/chromium_org/third_party/mesa/src
Switching base version for external/chromium_org/third_party/openssl
Switching base version for external/chromium_org/third_party/opus/src
Switching base version for external/chromium_org/third_party/ots
Switching base version for external/chromium_org/third_party/sfntly/cpp/src
Switching base version for external/chromium_org/third_party/skia/gyp
Switching base version for external/chromium_org/third_party/skia/include
Switching base version for external/chromium_org/third_party/skia/src
Switching base version for external/chromium_org/third_party/smhasher/src
Switching base version for external/chromium_org/third_party/yasm/source/patched-yasm
Switching base version for external/chromium_org/tools/grit
Switching base version for external/chromium_org/tools/gyp
Switching base version for external/chromium_org/v8
Switching base version for external/clang
Switching base version for external/compiler-rt
Switching base version for external/dexmaker
Switching base version for external/dhcpcd
Switching base version for external/doclava
Switching base version for external/dropbear
Switching base version for external/droiddriver
Switching base version for external/e2fsprogs
Switching base version for external/easymock
Switching base version for external/eclipse-basebuilder
Switching base version for external/eclipse-windowbuilder
Switching base version for external/eigen
Switching base version for external/elfutils
Switching base version for external/embunit
Switching base version for external/emma
Switching base version for external/esd
Switching base version for external/expat
Switching base version for external/eyes-free
Switching base version for external/fdlibm
Switching base version for external/flac
Switching base version for external/freetype
Switching base version for external/fsck_msdos
Switching base version for external/ganymed-ssh2
Switching base version for external/gcc-demangle
Switching base version for external/genext2fs
Switching base version for external/giflib
Switching base version for external/google-diff-match-patch
Switching base version for external/grub
Switching base version for external/gtest
Switching base version for external/guava
Switching base version for external/hamcrest
Switching base version for external/harfbuzz
Switching base version for external/harfbuzz_ng
Switching base version for external/hyphenation
Switching base version for external/icu4c
Switching base version for external/ipsec-tools
Switching base version for external/iputils
Switching base version for external/jack
Switching base version for external/javasqlite
Switching base version for external/javassist
Switching base version for external/jdiff
Switching base version for external/jhead
Switching base version for external/jmdns
Switching base version for external/jmonkeyengine
Switching base version for external/jpeg
Switching base version for external/jsilver
Switching base version for external/jsr305
Switching base version for external/junit
Switching base version for external/libcap-ng
Switching base version for external/libexif
Switching base version for external/libffi
Switching base version for external/libgsm
Switching base version for external/liblzf
Switching base version for external/libmtp
Switching base version for external/libnfc-nci
Switching base version for external/libnfc-nxp
Switching base version for external/libnl-headers
Switching base version for external/libogg
Switching base version for external/libpcap
Switching base version for external/libphonenumber
Switching base version for external/libpng
Switching base version for external/libppp
Switching base version for external/libselinux
Switching base version for external/libsepol
Switching base version for external/libssh2
Switching base version for external/libusb
Switching base version for external/libusb-compat
Switching base version for external/libvorbis
Switching base version for external/libvpx
Switching base version for external/libxml2
Switching base version for external/libxslt
Switching base version for external/libyuv
Switching base version for external/littlemock
Switching base version for external/llvm
Switching base version for external/lzma
Switching base version for external/marisa-trie
Switching base version for external/markdown
Switching base version for external/mdnsresponder
Switching base version for external/mesa3d
Switching base version for external/mksh
Switching base version for external/mockito
Switching base version for external/mockwebserver
Switching base version for external/mp4parser
Switching base version for external/mtpd
Switching base version for external/naver-fonts
Switching base version for external/netcat
Switching base version for external/netperf
Switching base version for external/neven
Switching base version for external/nist-pkits
Switching base version for external/nist-sip
Switching base version for external/noto-fonts
Switching base version for external/oauth
Switching base version for external/objenesis
Switching base version for external/okhttp
Switching base version for external/open-vcdiff
Switching base version for external/opencv
Switching base version for external/openfst
Switching base version for external/openssh
Switching base version for external/openssl
Switching base version for external/oprofile
Switching base version for external/pixman
Switching base version for external/proguard
Switching base version for external/protobuf
Switching base version for external/qemu
Switching base version for external/qemu-pc-bios
Switching base version for external/regex-re2
Switching base version for external/replicaisland
Switching base version for external/robolectric
Switching base version for external/safe-iop
Switching base version for external/scrypt
Switching base version for external/sepolicy
Switching base version for external/sfntly
Switching base version for external/sil-fonts
Switching base version for external/smack
Switching base version for external/smali
Switching base version for external/sonivox
Switching base version for external/speex
Switching base version for external/sqlite
Switching base version for external/srec
Switching base version for external/srtp
Switching base version for external/stlport
Switching base version for external/strace
Switching base version for external/stressapptest
Switching base version for external/svox
Switching base version for external/tagsoup
Switching base version for external/tcpdump
Switching base version for external/timezonepicker-support
Switching base version for external/tinycompress
Switching base version for external/tinyxml
Switching base version for external/tinyxml2
Switching base version for external/tremolo
Switching base version for external/v8
Switching base version for external/valgrind
Switching base version for external/webp
Switching base version for external/webrtc
Switching base version for external/xmlwriter
Switching base version for external/xmp_toolkit
Switching base version for external/yaffs2
Switching base version for external/zlib
Switching base version for external/zxing
Switching base version for frameworks/compile/libbcc
Switching base version for frameworks/compile/mclinker
Switching base version for frameworks/compile/slang
Switching base version for frameworks/ex
Switching base version for frameworks/mff
Switching base version for frameworks/ml
Switching base version for frameworks/opt/calendar
Switching base version for frameworks/opt/carddav
Switching base version for frameworks/opt/colorpicker
Switching base version for frameworks/opt/datetimepicker
Switching base version for frameworks/opt/emoji
Switching base version for frameworks/opt/inputmethodcommon
Switching base version for frameworks/opt/mailcommon
Switching base version for frameworks/opt/mms
Switching base version for frameworks/opt/net/voip
Switching base version for frameworks/opt/photoviewer
Switching base version for frameworks/opt/timezonepicker
Switching base version for frameworks/opt/telephony
Switching base version for frameworks/opt/vcard
Switching base version for frameworks/opt/widget
Switching base version for frameworks/rs
Switching base version for frameworks/support
Switching base version for frameworks/testing
Switching base version for frameworks/volley
Switching base version for frameworks/wilhelm
Switching base version for hardware/akm
Switching base version for hardware/broadcom/libbt
Switching base version for hardware/broadcom/wlan
Switching base version for hardware/invensense
Switching base version for hardware/qcom/audio
Switching base version for hardware/qcom/bt
Switching base version for hardware/qcom/camera
Switching base version for hardware/qcom/display
Switching base version for hardware/qcom/keymaster
Switching base version for hardware/qcom/media
Switching base version for hardware/qcom/msm8960
Switching base version for hardware/qcom/msm8x74
Switching base version for hardware/qcom/power
Switching base version for hardware/qcom/sensors
Switching base version for hardware/samsung_slsi/exynos5
Switching base version for hardware/ti/omap3
Switching base version for hardware/ti/omap4xxx
Switching base version for hardware/ti/wlan
Switching base version for libnativehelper
Switching base version for ndk
Switching base version for packages/apps/BasicSmsReceiver
Switching base version for packages/apps/Bluetooth
Switching base version for packages/apps/Browser
Switching base version for packages/apps/Calculator
Switching base version for packages/apps/Calendar
Switching base version for packages/apps/Camera
Switching base version for packages/apps/CellBroadcastReceiver
Switching base version for packages/apps/CertInstaller
Switching base version for packages/apps/Contacts
Switching base version for packages/apps/ContactsCommon
Switching base version for packages/apps/DeskClock
Switching base version for packages/apps/Dialer
Switching base version for packages/apps/Email
Switching base version for packages/apps/Exchange
Switching base version for packages/apps/Gallery
Switching base version for packages/apps/HTMLViewer
Switching base version for packages/apps/InCallUI
Switching base version for packages/apps/KeyChain
Switching base version for packages/apps/Launcher3
Switching base version for packages/apps/MusicFX
Switching base version for packages/apps/Nfc
Switching base version for packages/apps/OneTimeInitializer
Switching base version for packages/apps/PackageInstaller
Switching base version for packages/apps/Phone
Switching base version for packages/apps/PhoneCommon
Switching base version for packages/apps/Protips
Switching base version for packages/apps/Provision
Switching base version for packages/apps/QuickSearchBox
Switching base version for packages/apps/SmartCardService
Switching base version for packages/apps/SpareParts
Switching base version for packages/apps/SpeechRecorder
Switching base version for packages/apps/Stk
Switching base version for packages/apps/Tag
Switching base version for packages/apps/UnifiedEmail
Switching base version for packages/apps/VideoEditor
Switching base version for packages/apps/VoiceDialer
Switching base version for packages/experimental
Switching base version for packages/inputmethods/LatinIME
Switching base version for packages/inputmethods/OpenWnn
Switching base version for packages/inputmethods/PinyinIME
Switching base version for packages/providers/ApplicationsProvider
Switching base version for packages/providers/CalendarProvider
Switching base version for packages/providers/ContactsProvider
Switching base version for packages/providers/DownloadProvider
Switching base version for packages/providers/PartnerBookmarksProvider
Switching base version for packages/providers/TelephonyProvider
Switching base version for packages/providers/UserDictionaryProvider
Switching base version for packages/screensavers/Basic
Switching base version for packages/screensavers/PhotoTable
Switching base version for packages/screensavers/WebView
Switching base version for packages/services/Telephony
Switching base version for packages/wallpapers/Galaxy4
Switching base version for packages/wallpapers/HoloSpiral
Switching base version for packages/wallpapers/LivePicker
Switching base version for packages/wallpapers/MagicSmoke
Switching base version for packages/wallpapers/MusicVisualization
Switching base version for packages/wallpapers/NoiseField
Switching base version for packages/wallpapers/PhaseBeam
Switching base version for pdk
Switching base version for prebuilts/clang/darwin-x86/3.1
Switching base version for prebuilts/clang/darwin-x86/3.2
Switching base version for prebuilts/clang/darwin-x86/arm/3.3
Switching base version for prebuilts/clang/darwin-x86/host/3.3
Switching base version for prebuilts/clang/darwin-x86/mips/3.3
Switching base version for prebuilts/clang/darwin-x86/x86/3.3
Switching base version for prebuilts/clang/linux-x86/3.1
Switching base version for prebuilts/clang/linux-x86/3.2
Switching base version for prebuilts/clang/linux-x86/arm/3.3
Switching base version for prebuilts/clang/linux-x86/host/3.3
Switching base version for prebuilts/clang/linux-x86/mips/3.3
Switching base version for prebuilts/clang/linux-x86/x86/3.3
Switching base version for prebuilts/devtools
Switching base version for prebuilts/eclipse
Switching base version for prebuilts/gcc/darwin-x86/arm/arm-eabi-4.6
Switching base version for prebuilts/gcc/darwin-x86/arm/arm-eabi-4.7
Switching base version for prebuilts/gcc/darwin-x86/arm/arm-linux-androideabi-4.6
Switching base version for prebuilts/gcc/darwin-x86/arm/arm-linux-androideabi-4.7
Switching base version for prebuilts/gcc/darwin-x86/host/headers
Switching base version for prebuilts/gcc/darwin-x86/host/i686-apple-darwin-4.2.1
Switching base version for prebuilts/gcc/darwin-x86/mips/mipsel-linux-android-4.6
Switching base version for prebuilts/gcc/darwin-x86/mips/mipsel-linux-android-4.7
Switching base version for prebuilts/gcc/darwin-x86/x86/i686-linux-android-4.6
Switching base version for prebuilts/gcc/darwin-x86/x86/i686-linux-android-4.7
Switching base version for prebuilts/gcc/darwin-x86/x86/x86_64-linux-android-4.7
Switching base version for prebuilts/gcc/linux-x86/arm/arm-eabi-4.6
Switching base version for prebuilts/gcc/linux-x86/arm/arm-eabi-4.7
Switching base version for prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.6
Switching base version for prebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.7
Switching base version for prebuilts/gcc/linux-x86/host/i686-linux-glibc2.7-4.4.3
Switching base version for prebuilts/gcc/linux-x86/host/i686-linux-glibc2.7-4.6
Switching base version for prebuilts/gcc/linux-x86/host/x86_64-linux-glibc2.7-4.6
Switching base version for prebuilts/gcc/linux-x86/mips/mipsel-linux-android-4.6
Switching base version for prebuilts/gcc/linux-x86/mips/mipsel-linux-android-4.7
Switching base version for prebuilts/gcc/linux-x86/x86/i686-linux-android-4.6
Switching base version for prebuilts/gcc/linux-x86/x86/i686-linux-android-4.7
Switching base version for prebuilts/gcc/linux-x86/x86/x86_64-linux-android-4.7
Switching base version for prebuilts/gradle-plugin
Switching base version for prebuilts/maven_repo/android
Switching base version for prebuilts/misc
Switching base version for prebuilts/ndk
Switching base version for prebuilts/python/darwin-x86/2.7.5
Switching base version for prebuilts/python/linux-x86/2.7.5
Switching base version for prebuilts/qemu-kernel
Switching base version for prebuilts/runtime
Switching base version for prebuilts/sdk
Switching base version for prebuilts/tools
Switching base version for sdk
Switching base version for system/media
Switching base version for system/security
Switching base version for tools/external/fat32lib
Switching base version for tools/external/gradle
Applying patches ...
Applying patch to external/linux-lib
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:114: trailing whitespace.
OBJS = mxc_ipu_lib.o
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:118: trailing whitespace.
all: $(LIBNAME).so $(LIBNAME).a
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:147: trailing whitespace.
 *
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:151: trailing whitespace.
 * The code contained herein is licensed under the GNU Lesser General
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:152: trailing whitespace.
 * Public License.  You may obtain a copy of the GNU Lesser General
warning: squelched 19675 whitespace errors
warning: 19680 lines add whitespace errors.
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:45317: trailing whitespace.
/home/build/myandroid/external/linux-lib/.git/rebase-apply/patch:46136: trailing whitespace.
warning: 2 lines add whitespace errors.
...
┬▒⎼┼☃┼±: ⎽─┤e┌c▒ed 36 ┬▒☃├e⎽⎻▒ce e⎼⎼⎺⎼⎽
┬▒⎼┼☃┼±: 41 ┌☃┼e⎽ ▒dd ┬▒☃├e⎽⎻▒ce e⎼⎼⎺⎼⎽↓
A⎻⎻┌≤☃┼± ⎻▒├c▒ ├⎺ ⎻▒c┐▒±e⎽/▒⎻⎻⎽/G▒┌┌e⎼≤
*************************************************************
S┤cce⎽⎽: N⎺┬ ≤⎺┤ c▒┼ b┤☃┌d ▒┼d⎼⎺☃d c⎺de °⎺⎼ FSL ☃↓MX ⎻┌▒├°⎺⎼└
*************************************************************
b┤☃┌d@59681▒e38°c9:·/└≤▒┼d⎼⎺☃d$
```
If everything is OK, "c_patch" will generate the following output to indicate the successful patch:
```
**************************************************************
Success: Now you can build the Android code for FSL i.MX platform
**************************************************************
```
(2015-05-21 18:30 CEST) TRY AGAIN
```
$ c_patch ~/extra/android_KK4.4.3_2.0.0-ga_core_source/code/KK4.4.3_2.0.0-ga imx_KK4.4.3_2.0.0-ga 2> c_patch_err.txt | tee c_patch_out.txt
```
(2015-05-21 18:37 CEST) Inspect Android source tree
```
$ cd ~/myandroid && repo status -j16 -o
```
Result:
```
build@59681ae38fc9:~/myandroid$ repo status -j16 -o
project bionic/                                 branch imx_KK4.4.3_2.0.0-ga
project dalvik/                                 branch imx_KK4.4.3_2.0.0-ga
project build/                                  branch imx_KK4.4.3_2.0.0-ga
project bootable/recovery/                      branch imx_KK4.4.3_2.0.0-ga
project external/bluetooth/bluedroid/           branch imx_KK4.4.3_2.0.0-ga
project external/chromium_org/                  branch imx_KK4.4.3_2.0.0-ga
project external/dnsmasq/                       branch imx_KK4.4.3_2.0.0-ga
project external/iproute2/                      branch imx_KK4.4.3_2.0.0-ga
project external/iptables/                      branch imx_KK4.4.3_2.0.0-ga
project external/kernel-headers/                branch imx_KK4.4.3_2.0.0-ga
project external/libselinux/                    branch imx_KK4.4.3_2.0.0-ga
project external/linux-tools-perf/              branch imx_KK4.4.3_2.0.0-ga
project external/openssl/                       branch imx_KK4.4.3_2.0.0-ga
project external/ppp/                           branch imx_KK4.4.3_2.0.0-ga
project external/skia/                          branch imx_KK4.4.3_2.0.0-ga
project external/tinyalsa/                      branch imx_KK4.4.3_2.0.0-ga
project external/wpa_supplicant_8/              branch imx_KK4.4.3_2.0.0-ga
project frameworks/av/                          branch imx_KK4.4.3_2.0.0-ga
project frameworks/native/                      branch imx_KK4.4.3_2.0.0-ga
project frameworks/webview/                     branch imx_KK4.4.3_2.0.0-ga
project hardware/libhardware/                   branch imx_KK4.4.3_2.0.0-ga
project hardware/libhardware_legacy/            branch imx_KK4.4.3_2.0.0-ga
project frameworks/base/                        branch imx_KK4.4.3_2.0.0-ga
project hardware/qcom/wlan/                     branch imx_KK4.4.3_2.0.0-ga
project hardware/ril/                           branch imx_KK4.4.3_2.0.0-ga
project hardware/ti/wpan/                       branch imx_KK4.4.3_2.0.0-ga
project libcore/                                branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Camera2/                  branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Gallery2/                 branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Gallery/                  branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Mms/                      branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Launcher2/                branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Music/                    branch imx_KK4.4.3_2.0.0-ga
project packages/apps/LegacyCamera/             branch imx_KK4.4.3_2.0.0-ga
project packages/apps/SoundRecorder/            branch imx_KK4.4.3_2.0.0-ga
project packages/apps/Settings/                 branch imx_KK4.4.3_2.0.0-ga
project packages/providers/MediaProvider/       branch imx_KK4.4.3_2.0.0-ga
project packages/wallpapers/Basic/              branch imx_KK4.4.3_2.0.0-ga
project system/core/                            branch imx_KK4.4.3_2.0.0-ga
project system/vold/                            branch imx_KK4.4.3_2.0.0-ga
project system/netd/                            branch imx_KK4.4.3_2.0.0-ga
project system/extras/                          branch imx_KK4.4.3_2.0.0-ga
Objects not within a project (orphans)
 --     bootable/bootloader/uboot-imx/
 --     hardware/imx/
 --     hardware/realtek/
 --     c_patch_err.txt
 --     device/fsl-proprietary/
 --     device/fsl/
 --     c_patch_out.txt
 --     c_patch.log
 --     external/linux-lib/
 --     external/busybox/
 --     external/linux-test/
 --     external/mtd-utils/
 --     external/linux-firmware-imx/
 --     external/fsl_vpu_omx/
 --     external/powerdebug/
 --     external/ntfs-3g/
 --     Makefile
 --     packages/apps/fsl_imx_demo/
 --     kernel_imx/
```
#### Building Android images
(2015-05-21 18:55 CEST)
```
$ cd ~/myandroid
$ source build/envsetup.sh
```
If you invoke `lunch` without parameters you will get the complete lunch menu:
```
build@59681ae38fc9:~/myandroid$ lunch
You're building on Linux
Lunch menu... pick a combo:
     1. aosp_arm-eng
     2. aosp_x86-eng
     3. aosp_mips-eng
     4. vbox_x86-eng
     5. aosp_manta-userdebug
     6. aosp_grouper-userdebug
     7. aosp_flo-userdebug
     8. aosp_deb-userdebug
     9. aosp_tilapia-userdebug
     10. aosp_hammerhead-userdebug
     11. aosp_mako-userdebug
     12. arm2_6dq-eng
     13. arm2_6dq-user
     14. sabresd_6dq-eng
     15. sabresd_6dq-user
     16. sabreauto_6q-eng
     17. sabreauto_6q-user
     18. arm2_6sl-eng
     19. arm2_6sl-user
     20. evk_6sl-eng
     21. evk_6sl-user
     22. sabresd_6sx-eng
     23. sabresd_6sx-user
     24. sabreauto_6sx-eng
     25. sabreauto_6sx-user
     26. hdmidongle_6dq-eng
     27. hdmidongle_6dq-user
     28. imx53_smd-eng
     29. imx53_smd-user
     30. mini_armv7a_neon-userdebug
     31. mini_x86-userdebug
     32. mini_mips-userdebug
Which would you like? [aosp_arm-eng]
```
Here is the list of the supported Freescale SABRE boards:
* `sabresd_6dq-user`: i.MX 6 SABRE-SD boards
* `sabreauto_6dq-user`: i.MX 6 SABRE-AI boards
* `evk_6sl-user`: i.MX 6SoloLite EVK boards
* `sabresd_6sx-user`: i.MX6SoloX SABRE-SD boards
* `sabreauto_6sx-user`: i.MX 6SoloX SABRE-AI boards
We want to build Android for the SABRE-SD, so "sabresd_6dq" is the product name to choose (see `~/myandroid/device/fsl/product`).
We will also choose the "-eng" rather than the "-user" combo:
```
$ lunch sabresd_6dq-eng
$ make 2>&1 | tee build_sabresd_6dq_android.log
```
After build, check file `build_*_android.log` to make sure no build error.
For BUILD_ID & BUILD_NUMBER, add a `buildspec.mk` in your `~/myandroid directory`. For details, see the Android
Frequently Asked Questions document.
FIXME: JDK6 is missing inside the container:
```
build@59681ae38fc9:~/myandroid$ lunch sabresd_6dq-eng
build/core/config.mk:367: *** Error: could not find jdk tools.jar, please install JDK6, which you can download from java.sun.com.  Stop.
** Don't have a product spec for: 'sabresd_6dq'
** Do you have the right repo manifest?
build@59681ae38fc9:~/myandroid$
```
According to http://source.android.com/source/initializing.html
> To develop older versions of Android, download and install the corresponding version of the Java JDK:
> * Java 6: for Gingerbread through KitKat
> * Java 5: for Cupcake through Froyo
Browse the Oracle Java Archive at <http://www.oracle.com/technetwork/java/javase/archive-139210.html>
* Choose "JAVA SE 6"
* Choose "Java SE Development Kit 6u45" for Linux x64 (`jdk-6u45-linux-x64.bin`, 68.75 MB)
* Accept the Oracle Binary Code License Agreement for Java SE to download the software
http://download.oracle.com/otn/java/jdk/6u45-b06/jdk-6u45-linux-x64.bin
Logged as root@container, install the prerequisite packages as detailed in <http://source.android.com/source/initializing.html#installing-required-packages-ubuntu-1404> (TODO: add to `Dockerfile`)
```
# sudo apt-get update
# sudo apt-get -y install bison g++-multilib git gperf libxml2-utils make zlib1g-dev:i386 zip
```
---------------------------------
(2015-05-21 20:10) Rebuilding container with modified `Dockerfile`.
# TODO
(2015-05-21 20:15 CEST)
Run a new container
```
$ ./run-NEW.sh
```
Logged as root@container
```
# su - build
$ ln -sf ~/shared/myandroid
$ ln -sf ~/shared/extra
```
```
$ cd ~/myandroid && source build/envsetup.sh
$ lunch sabresd_6dq-eng
$ make 2>&1 | tee build_sabresd_6dq_android.log
```
Result:
```
build@cba858cd148a:~/myandroid$ make 2>&1 | tee build_sabresd_6dq_android.log
============================================
PLATFORM_VERSION_CODENAME=REL
PLATFORM_VERSION=4.4.3
TARGET_PRODUCT=sabresd_6dq
TARGET_BUILD_VARIANT=eng
TARGET_BUILD_TYPE=release
TARGET_BUILD_APPS=
TARGET_ARCH=arm
TARGET_ARCH_VARIANT=armv7-a-neon
TARGET_CPU_VARIANT=cortex-a9
HOST_ARCH=x86
HOST_OS=linux
HOST_OS_EXTRA=Linux-3.13.0-52-generic-x86_64-with-Ubuntu-14.04-trusty
HOST_BUILD_TYPE=release
BUILD_ID=2.0.0-rc2
OUT_DIR=out
============================================
Checking build tools versions...
************************************************************
You are attempting to build with an unsupported JDK.
You use OpenJDK but only Sun/Oracle JDK is supported.
Please follow the machine setup instructions at
    https://source.android.com/source/download.html
************************************************************
build/core/main.mk:152: *** stop.  Stop.
build@cba858cd148a:~/myandroid$
```
(2015-05-21 21:00 CEST) Install Oracle JDK 6:
```
# mkdir -p /opt/java
# cd /opt/java
# /home/build/shared/jdk-6u45-linux-x64.bin
# su - build
$ echo 'PATH=/opt/java/jdk1.6.0_45/bin:$PATH' >~/.profile
$ exit
# su - build
```
Logged as build@container, verify that Java is correctly installed
```
build@cba858cd148a:~$ java -version
java version "1.6.0_45"
Java(TM) SE Runtime Environment (build 1.6.0_45-b06)
Java HotSpot(TM) 64-Bit Server VM (build 20.45-b01, mixed mode)
build@cba858cd148a:~$
```
Install package "zlib1g-dev:1386"
```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get -y install zlib1g-dev:i386
```
(2015-05-21 21:18 CEST) Try again
```
$ cd ~/myandroid && source build/envsetup.sh
$ lunch sabresd_6dq-eng
$ make 2>&1 | tee build_sabresd_6dq_android.log
```
Result:
```
...
target thumb C: tc <= external/iproute2/tc/m_mirred.c
external/iproute2/tc/m_mirred.c: In function 'parse_egress':
external/iproute2/tc/m_mirred.c:197:9: warning: pointer of type 'void *' used in arithmetic [-Wpointer-arith]
external/iproute2/tc/m_mirred.c:200:27: warning: pointer of type 'void *' used in arithmetic [-Wpointer-arith]
external/iproute2/tc/m_mirred.c:200:41: warning: pointer of type 'void *' used in subtraction [-Wpointer-arith]
external/iproute2/tc/m_mirred.c:65:34: warning: unused parameter 'a' [-Wunused-parameter]
external/iproute2/tc/m_mirred.c: In function 'print_mirred':
external/iproute2/tc/m_mirred.c:249:34: warning: unused parameter 'au' [-Wunused-parameter]
target thumb C: tc <= external/iproute2/tc/q_htb.c
external/iproute2/tc/q_htb.c: In function 'htb_parse_opt':
external/iproute2/tc/q_htb.c:94:9: warning: pointer of type 'void *' used in arithmetic [-Wpointer-arith]
external/iproute2/tc/q_htb.c:97:27: warning: pointer of type 'void *' used in arithmetic [-Wpointer-arith]
external/iproute2/tc/q_htb.c:97:41: warning: pointer of type 'void *' used in subtraction [-Wpointer-arith]
external/iproute2/tc/q_htb.c:61:45: warning: unused parameter 'qu' [-Wunused-parameter]
external/iproute2/tc/q_htb.c: In function 'htb_parse_class_opt':
external/iproute2/tc/q_htb.c:232:9: warning: pointer of type 'void *' used in arithmetic [-Wpointer-arith]
external/iproute2/tc/q_htb.c:237:27: warning: pointer of type 'void *' used in arithmetic [-Wpointer-arith]
external/iproute2/tc/q_htb.c:237:41: warning: pointer of type 'void *' used in subtraction [-Wpointer-arith]
external/iproute2/tc/q_htb.c:101:51: warning: unused parameter 'qu' [-Wunused-parameter]
external/iproute2/tc/q_htb.c: In function 'htb_print_opt':
external/iproute2/tc/q_htb.c:241:45: warning: unused parameter 'qu' [-Wunused-parameter]
external/iproute2/tc/q_htb.c: In function 'htb_print_xstats':
external/iproute2/tc/q_htb.c:302:48: warning: unused parameter 'qu' [-Wunused-parameter]
target Executable: tc (out/target/product/generic/obj/EXECUTABLES/tc_intermediates/LINKED/tc)
target Symbolic: tc (out/target/product/generic/symbols/system/bin/tc)
Export includes file: external/iproute2/tc/Android.mk -- out/target/product/generic/obj/EXECUTABLES/tc_intermediates/export_includes
target Strip: tc (out/target/product/generic/obj/EXECUTABLES/tc_intermediates/tc)
Notice file: external/iproute2/tc/NOTICE -- out/target/product/generic/obj/NOTICE_FILES/src//system/bin/tc.txt
Install: out/target/product/generic/system/bin/tc
Symlink: out/target/product/generic/system/bin/top -> toolbox
Symlink: out/target/product/generic/system/bin/touch -> toolbox
target Prebuilt: uiautomator (out/target/product/generic/obj/EXECUTABLES/uiautomator_intermediates/uiautomator)
Install: out/target/product/generic/system/bin/uiautomator
Import includes file: out/target/product/generic/obj/EXECUTABLES/uim-sysfs_intermediates/import_includes
target thumb C: uim-sysfs <= hardware/ti/wpan/ti_st/uim-sysfs/uim.c
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:24:0: warning: "BOTHER" redefined [enabled by default]
In file included from bionic/libc/kernel/arch-arm/asm/termbits.h:19:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:21,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/termbits.h:180:0: note: this is the location of the previous definition
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:27:0: warning: "TCGETS2" redefined [enabled by default]
In file included from bionic/libc/kernel/arch-arm/asm/ioctls.h:22:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:22,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/ioctls.h:74:0: note: this is the location of the previous definition
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:28:0: warning: "TCSETS2" redefined [enabled by default]
In file included from bionic/libc/kernel/arch-arm/asm/ioctls.h:22:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:22,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/ioctls.h:75:0: note: this is the location of the previous definition
In file included from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:30:0:
hardware/ti/wpan/ti_st/uim-sysfs/uim.h:73:8: error: redefinition of 'struct termios2'
In file included from bionic/libc/kernel/arch-arm/asm/termbits.h:19:0,
                 from bionic/libc/kernel/common/uapi/asm-generic/termios.h:21,
                 from bionic/libc/kernel/common/asm-generic/termios.h:22,
                 from bionic/libc/kernel/arch-arm/asm/termios.h:19,
                 from bionic/libc/kernel/common/linux/termios.h:22,
                 from bionic/libc/include/sys/ioctl.h:37,
                 from hardware/ti/wpan/ti_st/uim-sysfs/uim.c:23:
bionic/libc/kernel/common/asm-generic/termbits.h:37:8: note: originally defined here
make: *** [out/target/product/generic/obj/EXECUTABLES/uim-sysfs_intermediates/uim.o] Error 1
build@cba858cd148a:~/myandroid$
```
TODO: Add to Dockerfile:
```
RUN sudo apt-get -y install flex
RUN sudo apt-get -y install lib32stdc++6 lib32z1 lib32z1-dev
```
Result:
### See also
* http://embedded-computing.com/guest-blogs/android-embedded-in-5-easy-steps/
<-- markdown-link-check-enable-->
<-- EOF -->

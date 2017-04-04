---
layout: post
title:  "Trying Volumio on a UDOO NEO"
date:   2017-04-03 18:00:00 CEST
---

This blog post explains my experiences with the [Volumio](https://volumio.org/)
Music Player on a UDOO Neo.

### Prepare the SD-Card image

See <https://volumio.org/get-started/>

Download Volumio your platform: UDOO Neo

* Volumio Audiophile Music Player for UDOO Neo
* VERSION: 2.129
* RELEASE DATE: 26-03-2017
* TOTAL DOWNLOADS: 45
* IMAGE MD5: f1704e8402a34f4bc4de240b893b9521

Click "Download", will download file ` volumio-2.129-2017-03-26-udooneo.img.zip`

Unzip the file and verify the checksum

```shell
gmacario@ITM-GPAOLO-W10:/cygdrive/d/temp $ unzip ~/Downloads/volumio-2.129-2017-03-26-udooneo.img.zip
Archive:  /home/gmacario/Downloads/volumio-2.129-2017-03-26-udooneo.img.zip
  inflating: volumio-2.129-2017-03-26-udooneo.img
gmacario@ITM-GPAOLO-W10:/cygdrive/d/temp $ ls -la volumio-2.129-2017-03-26-udooneo.img
-rw-r--r--+ 1 gmacario Domain Users 2936012800 Mar 26 18:42 volumio-2.129-2017-03-26-udooneo.img
gmacario@ITM-GPAOLO-W10:/cygdrive/d/temp $ md5sum volumio-2.129-2017-03-26-udooneo.img
f1704e8402a34f4bc4de240b893b9521 *volumio-2.129-2017-03-26-udooneo.img
gmacario@ITM-GPAOLO-W10:/cygdrive/d/temp $
```

Then write the `*.img` file to an empty MicroSD-Card (4 GB or bigger)

**NOTE**: On MS Windows you may use
[Win32DiskImager](http://sourceforge.net/projects/win32diskimager/files/latest/download)

Insert the MicroSD into the UDOO Neo.
Plug an Ethernet cable into your UDOO Neo
Power up the UDOO Neo from the microUSB port.

Browse `\\volumio.local` ==> Does not work from my Windows 10 laptop (WHY???)

Run the [Fing](https://www.fing.io/) App on a mobile phone connected to the same subnet. Verify that a new device called `volumio` is displayed in the list, and notice its IP address.

In my case, the UDOO Neo was assigned IP Address: 192.168.12.106.

Notice that the official volumio image does not configure UDOO Neo USB-OTG port as serial console, so you need to connect to internal serial to debug any boot issues.

If everyting works, launch a web browser and  <http://192.168.12.106/>

TODO

### References

* <https://www.volumio.org/>
* <https://github.com/VOLUMIO>

TODO

<!-- EOF -->

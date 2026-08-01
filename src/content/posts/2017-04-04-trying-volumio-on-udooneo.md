---
title: "Trying Volumio on a UDOO Neo"
pubDatetime: 2017-04-03T18:00:00+02:00
tags:
  - udoo
  - howto
  - embedded
  - music
  - audio
description: "This blog post explains my experiences with the Volumio Music Player on a UDOO Neo."
---

![UDOO Neo + Volumio: turning a small board into a networked music player](/assets/2017-04-04-trying-volumio-on-udooneo/hero.svg)

This blog post explains my experiences with the [Volumio](https://volumio.org/)
Music Player on a UDOO Neo.

## Prepare the SD-Card image

See <https://volumio.org/get-started/>

Download Volumio for your platform: UDOO Neo

- Volumio Audiophile Music Player for UDOO Neo
- VERSION: 2.129
- RELEASE DATE: 26-03-2017
- TOTAL DOWNLOADS: 45
- IMAGE MD5: f1704e8402a34f4bc4de240b893b9521

Click "Download", which will download the file
`volumio-2.129-2017-03-26-udooneo.img.zip`.

Unzip the file and verify the checksum:

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

Then write the `*.img` file to an empty MicroSD card (4 GB or bigger).

**NOTE**: On MS Windows you may use
[Win32DiskImager](http://sourceforge.net/projects/win32diskimager/files/latest/download).

Insert the MicroSD into the UDOO Neo, plug an Ethernet cable into it, then
power it up from the microUSB port.

Browsing to `\\volumio.local` did not work from my Windows 10 laptop (not
sure why). Instead, I ran the [Fing](https://www.fing.io/) app on a mobile
phone connected to the same subnet, and looked for a new device called
`volumio` in the list to find its IP address.

In my case, the UDOO Neo was assigned the IP address `192.168.12.106`.

Notice that the official Volumio image does not configure the UDOO Neo's
USB-OTG port as a serial console, so you need to connect to the internal
serial port to debug any boot issues.

If everything works, launch a web browser at `http://192.168.12.106/` to
reach the Volumio web UI — that's as far as these notes go, so consider this
a basic setup log rather than a full walkthrough of the interface.

## References

- <https://volumio.org/>
- <https://github.com/VOLUMIO>

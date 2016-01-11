---
layout: post
title:  "Hacking OBD-II Port"
date:   2015-12-27 12:00:00 CET
categories: howto car network obd-ii hacking
---

[WiFI OBDII ELM-327](http://www.ebay.it/itm/WIFI-ELM327-OBDII-OBD2-AUTO-DIAGNOSTICA-WIRELESS-SCANNER-CD-PER-iPhone-iPad-/121723376227?)

Connect to Wi-Fi network "WiFi_OBDII" (default: open network)

Run Fing to scan network

Browse <http://192.168.0.10>

* Username: `admin`
* Default password: `admin`

TODO

Connect to ELM327 console

```
$ telnet 192.168.0.10 32500
```

### See also

* <https://en.wikipedia.org/wiki/ELM327>
* <http://scantool.imechatronics.com/downloads.htm>
* ELM327 Quick Reference Sheet: <http://www.elmelectronics.com/DSheets/ELM327QS.pdf> (PDF, 8 pages)
* ELM327 datasheet: <http://www.elmelectronics.com/DSheets/ELM327DS.pdf> (PDF, 94 pages)
* ELM327 AT Commands: <http://www.elmelectronics.com/ELM327/AT_Commands.pdf> (PDF, 4 pages)
* ELM327 Programmable Parameters: <http://www.elmelectronics.com/ELM327/Prog_Parameters.pdf> (PDF, 2 pages)

# OLD STUFF BELOW

This blog post explains how I did [something](http://www.something.com/) on my laptop running MS Windows 7.

Sample table

<!-- TIP: <http://www.tablesgenerator.com/markdown_tables> -->

| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |

<!-- EOF -->

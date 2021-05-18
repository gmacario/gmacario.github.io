---
layout: post
title:  "Trying NOOBS on a Raspberry Pi 3"
date:   2016-12-22 14:00:00 CET
categories: howto genivi gdp rpi
---
<!-- markdown-link-check-disable -->

Browse the <https://www.raspberrypi.org/downloads/>

Download NOOBS Version 2.1.0 (ZIP)

```
wget -c https://downloads.raspberrypi.org/NOOBS_latest
mv NOOBS_latest noobs-2.1.0.zip
```

Verify the checksum of the downloaded file matches the one published on the page above

```
sha1sum.exe noobs-2.1.0.zip
```

Result:

```
gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/noobs
$ sha1sum.exe noobs-2.1.0.zip
c4eb9a8f1442bfa1eb8e357cb78980b3442afa87 *noobs-2.1.0.zip

gmacario@ITM-GPAOLO-W10 /cygdrive/d/data/GENIVI/download-gdp/tmp/noobs
$
```

Read [Raspberry Pi 2 and 3 setup and software installation](https://at.projects.genivi.org/wiki/x/fomw)

TODO TODO TODO

### See also

* [NOOBS for Raspberry Pi](http://qdosmsq.dunbar-it.co.uk/blog/2013/06/noobs-for-raspberry-pi/)

<!-- markdown-link-check-enable -->
<!-- EOF -->

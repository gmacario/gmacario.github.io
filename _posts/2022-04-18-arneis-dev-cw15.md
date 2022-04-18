---
layout: post
title:  "ARNEIS project journal - dev-cw15"
date:   2022/04/18
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/>

Here is the report of our progress in the ARNEIS project after the end of CW15-2022.

## What did we accomplish this week?

In Sprint dev-cw15 we [closed 7 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/issues?q=is%3Aclosed+milestone%3Adev-cw15).

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

### Scaling up the Kubernetes cluster

Our Kubernetes cluster is getting more and more nodes.

Here is a screenshot of k9s showing the running nodes of the cluster (the two entries marked "NotReady" correspond to devices which had been turned off for planned maintenance):

![image](https://user-images.githubusercontent.com/75182/163815503-75c18ed3-b9f4-45be-a9c5-c6502bcf3a1c.png)

### Testing software stack for Raspberry Pi OS 64-bit

A few weeks ago the Raspberry Pi Foundation officially declared that the 64-bit version of the Raspberry Pi OS is out of beta.

For this reasons we have planned a comprehensive plan of tests for migrating the ARNEIS Edge system to this new version of OS.

The HOWTO at <https://arneis.readthedocs.io/en/latest/howto/howto-install-raspios64.html> details the results we obtained running the ARNEIS software stack on the 64-bit version of the Raspberry Pi OS.

### First tests with Arduino Portenta X8

Thanks to our friends at Arduino we were able to get one sample of the recently announced [Arduino Portenta X8](https://www.arduino.cc/pro/hardware/product/portenta-x8) board.

![image](https://user-images.githubusercontent.com/75182/163816076-cc7e33ae-b8ef-4676-bfff-2cfec0b821b4.png)

We have published a HOWTO at <https://arneis.readthedocs.io/en/latest/howto/howto-testing-portenta-x8.html> with some results from our first test trying to run the ARNEIS edge software stack on such powerful board.

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/15>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

<!-- ## That's all, folks -->

Thanks for reading up to here!

<!-- Thanks for reading up to the end of such long post! -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->


---
layout: post
title:  "ARNEIS project journal - dev-cw08"
date:   2022/02/28
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW08-2022.

## What did we accomplish this week?

In Sprint dev-cw08 we [closed 37 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/issues?q=is%3Aclosed+milestone%3Adev-cw08).

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

### Talks with Piemonte Bricks LUG

Over the last weekend we attended the event "[In un mondo di Bricks](https://facebook.com/events/s/in-un-mondo-di-bricks/2779705722333200/)" organized by [Piemonte Bricks LUG](https://www.piemontebricks.it/) (short for [_LEGO&reg; User Group_](https://arneis.readthedocs.io/en/latest/acronyms.html)) nearby our offices.

Piemonte Bricks is one of the biggest LUGs in Italy which gathers several AFOLs (short for [_Adults Fanatic of LEGO&reg;_](https://arneis.readthedocs.io/en/latest/acronyms.html)) from Piedmont and has officially been acknowledged by the LEGO&reg; Group&trade;.

The exhibition showcased a few official LEGO&reg; sets (there was even one [Liebherr R 9800](https://arneis.readthedocs.io/en/latest/lego-set-42100)!)

![2022-02-26 17 15 16](https://user-images.githubusercontent.com/75182/155892860-5a31bcd6-3c4e-4c50-a264-f7bace8e0821.jpg)

as well as some MOCs (acronym for [_My Own Creation_](https://arneis.readthedocs.io/en/latest/acronyms.html)) designed by the LUG members.

![2022-02-27 14 50 02](https://user-images.githubusercontent.com/75182/155892920-4ec40aa5-0ac0-4f49-b9ac-f14ebc413ef0.jpg)

I also had a chance of talking with some of the LUG members, including [Silvia Grillo](https://www.facebook.com/silvia.grillo.10) (the [LEGO&reg; Ambassador](https://lan.lego.com/) of the LUG) and [Lorenzo Brovia](https://www.facebook.com/ilbrovia) to whom I pitched the ARNEIS project and showed them the concept we have been working on.

Silvia was really excited about the project and enthusiastically proposed us to showcase ARNEIS in one of the next events organized by [Piemonte Bricks LUG](https://www.facebook.com/piemontebricksLUG/) - more specifically:

- [Villaggio Leumann in Bricks 2022](https://github.com/B-AROL-O/ARNEIS/issues/208)
- [San Mauro Brick Show 2022](https://github.com/B-AROL-O/ARNEIS/issues/130)

We are very proud of this invitation, but since the quality of the event we have been asked to participate is quite high we need to figure out some details first.
In any case I promised to get back to her in a few days - hopefully to confirm our participation to one of those events.

### The MOC is taking shape

[Alessandro](https://github.com/alv67) has progressed on the mechanical design of the ARNEIS conveyor and managed to place the OAK-D-Lite using the adapter which was already discussed in a previous post.

A dedicated angle regulation system is present.

He also completed the path, so the mignon bottles can circle in the conveyor as a precondition to automate the training of the Neural Network.

Here are some photos which illustrate the concept - the updated CAD model will be released in the next few days.

<img width="789" alt="Schermata 2022-02-27 alle 18 10 54" src="https://user-images.githubusercontent.com/25162080/155892312-163273f9-9819-4a22-a2d6-13e2cd9ebfd2.png">

Detail of the conveyor while some mignon bottles are flowing through:

<img width="649" alt="Schermata 2022-02-27 alle 18 12 54" src="https://user-images.githubusercontent.com/25162080/155892314-46ae256b-e8de-42fc-ae4b-65b02baa8086.png">

### First attempts at programming LEGO&reg; Technics Bluetooth Hubs

We published [a first draft of a HOWTO](https://arneis.readthedocs.io/en/latest/howto/howto-control-rpi-poweredup.html) which explains how we can control a [LEGO&reg; Technics Bluetooth Hub](https://www.bricklink.com/v2/catalog/catalogitem.page?P=bb0961c01&idColor=86#T=C&C=86).
We have two of them in our [LEGO Set 42100](https://arneis.readthedocs.io/en/latest/lego-set-42100) which we use for the [OpenCV Spatial AI Contest](https://opencv.org/opencv-spatial-ai-contest/).

Additionally, we have been experimenting with PyBricks which allows to run MicroPython scripts directly on the Hub.
You can find some sample code directly under [the /code folder of the GitHub project github.com/B-AROL-O/ARNEIS](https://github.com/B-AROL-O/ARNEIS/tree/main/code/pybricks-test01).

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/7>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

<!-- ## That's all, folks -->

<!-- Thanks for reading up to here! -->

<!-- Thanks for reading up to the end of such long post! -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->
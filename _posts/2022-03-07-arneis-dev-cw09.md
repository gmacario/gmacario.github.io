---
layout: post
title:  "ARNEIS project journal - dev-cw09"
date:   2022/03/07
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW09-2022.

## What did we accomplish this week?

In Sprint dev-cw09 we [closed 14 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/issues?q=is%3Aclosed+milestone%3Adev-cw09)

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

### We got a logo for the ARNEIS Project

[Pietro d'Agostino](https://github.com/pitdagosti) who [previously contributed the logo for the B-AROL-O Team](https://github.com/B-AROL-O/ARNEIS/pull/39), surpassed himself and contributed a logo for the ARNEIS project as well:

![ARNEIS_logo](https://user-images.githubusercontent.com/75182/156942800-954dfeff-ff7b-45f3-bb50-e389d3a9655f.png)

At <https://github.com/B-AROL-O/ARNEIS/issues/24> you may find the conversation which ended up in the final logo shown above.

### Released code to pretty-print LEGO BOM

You may have noticed that [the ARNEIS documentation site](https://arneis.readthedocs.io/) contains a [detailed list of all the LEGO&reg; pieces](https://arneis.readthedocs.io/en/latest/lego-set-42100/unboxing-lego-set-42100.html) included in the Set 42100 which we have selected to build our MOC.

![image](https://user-images.githubusercontent.com/75182/156981816-54b4fed9-0114-4eaa-b497-e7de4aa6ab8d.png)

You may wonder how we managed to create this page.

The secret is `lego-parts-csv2md`, a [Jupyter notebook](https://github.com/B-AROL-O/ARNEIS/pull/223) developed by [Alessandro](https://github.com/alv67) which is able to parse the Bill Of Material exported from [Stud.io CAD tool](https://www.bricklink.com/v3/studio/download.page) and convert it to a snippet of Markdown code.

Since we believe this tool may be useful to other people as well, we decided to publish the source code under the [Open Source MIT license](https://github.com/B-AROL-O/ARNEIS/blob/main/LICENSE), like all the other contents of the [ARNEIS repository on GitHub](https://github.com/B-AROL-O/ARNEIS).

You may find the source code of `lego-parts-csv2md`, included its usage instructions, under [the `/code` folder of the GitHub repository](https://github.com/B-AROL-O/ARNEIS/tree/main/code/lego-parts-csv2md).

### ARNEIS will be showcased at San Mauro Brick Show 2022

After some internal discussion we eventually accepted the proposal by [Piemonte Bricks LUG](https://www.piemontebricks.it/), therefore we will be showcasing the [ARNEIS Project at the San Mauro Brick Show 2022](https://github.com/B-AROL-O/ARNEIS/issues/130).

If you happend to be around Torino from 9 to 10 April 2022, please mark the event on your calendar so you will be able to see in presence our project!

![San Mauro Brick Show 2022](https://user-images.githubusercontent.com/75182/155898871-e4a5d039-880f-4513-b2ac-50cf9a3b573d.png)

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/8>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

<!-- ## That's all, folks -->

<!-- Thanks for reading up to here! -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->

---
layout: post
title:  "ARNEIS project journal - dev-cw04"
date:   2022/01/31
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW04-2022.

## What did we accomplish this week?

In Sprint dev-cw04 we [closed 21 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/milestone/3?closed=1)

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's highlight some of the most relevant things which happened.

### First rendering of the ARNEIS Bottle Conveyor

Well, we had already anticipated this with a teaser [in our previous weekly post](https://gmacario.github.io/posts/2022-01-24-arneis-dev-cw03) and [in a tweet](https://twitter.com/baroloteam/status/1486204084776583178), anyway here is the actual result that [Alessandro](https://github.com/alv67) achieved so far:

[![Bottle conveyor 2022-01-22](https://img.youtube.com/vi/BFKyx1COfqk/0.jpg)](https://www.youtube.com/watch?v=BFKyx1COfqk "Bottle conveyor 2022-01-22")

([Watch the video on YouTube](https://www.youtube.com/watch?v=BFKyx1COfqk))

You can check the details, including the LDraw file, directly [inside ARNEIS git repository](https://github.com/B-AROL-O/ARNEIS/tree/main/mocs/studies).

### Problems in sourcing LEGO Set 42100

When in mid December the ARNEIS project was selected as a finalist for the OpenCV Spatial AI Contest, we promptly submitted the request for [LEGO Set 42100 (Liebherr R 9800 Excavator)](https://www.lego.com/en-it/product/liebherr-r-9800-excavator-42100) which at that time was available from a few local resellers - one of which even offered a 41% discount on its list price.

![image](https://user-images.githubusercontent.com/75182/151664835-0c4a324f-47dd-4285-bd4a-5c68c04a4677.png)

Later we were communicated that the requested sets should be purchased and delivered to us directly by the OpenCV Spatial AI Contest organization, threfore we could not get the 41% rebate on the chosen set.

Unfortunately a couple of days ago [Phil Nelson from OpenCV wrote us](https://github.com/B-AROL-O/ARNEIS/issues/7#issuecomment-1024859461) that

> I’ve been trying to track this down online for awhile, it appears the Liebherr R 9800 Excavator set is retired by LEGO.

This is bad news, since we have based all our design and planning of the ARNEIS project under the assumption that we would receive this LEGO Set ASAP.

At the moment there are still a few items left from a couple of vendors on Amazon.it:

![image](https://user-images.githubusercontent.com/75182/151653389-54f26295-4f85-4b64-ae85-6ae13c8fa875.png)

and eBay.it

![image](https://user-images.githubusercontent.com/75182/151653398-edc00489-11db-48fe-b62e-06042d6fed98.png)

but their prices are increasing - most likely because the set is no longer produced - so we need to hurry up.

By the way, at the moment we are not aware of alternate LEGO sets containing so many useful pieces for our design, such as motors, controllers, gears, etc. There have been [some rumours of a replacement set](https://www.brickfanatics.com/it/technic-estate-2022-si-dice-che-sia-il-pi%C3%B9-costoso/) but most likely this will be released in Q3-2022, so this does not fit within the Phase 2 time frame.

We have a constant conversation with Phil and the OpenCV organization in order to have this issue resolved; if you have any suggestions, please follow-up on [ARNEIS/issues/7](https://github.com/B-AROL-O/ARNEIS/issues/7).

### First attempts at recognizing mignon bottles with the OAK-D-Lite

[Gianluca Teti](https://github.com/gteti) - the wannabe AI expert in our team - has been playing with the OAK-D-Lite software for the purpose of recognizing the mignon bottles that will be handled by the ARNEIS system.

He already got some results:

![image](https://user-images.githubusercontent.com/51110452/150135037-d63e327e-09fe-4384-9d58-36086fb443a6.png)

The actual photo shoot took place using this stage:

![photo1642596731](https://user-images.githubusercontent.com/51110452/150135084-27eeea29-5450-42bc-a5f2-266a1dfeb47e.jpeg)

Here are some more details about the stage:

![photo1642596718](https://user-images.githubusercontent.com/51110452/150135077-a100064d-f18e-419f-a48c-9eea85da4a76.jpeg)

In the coming days we will be optimizing the lighting and will update the camera setup to match the actual layout of the ARNEIS conveyor. You may see some preliminary studies [here](https://github.com/B-AROL-O/ARNEIS/issues/89).
As soon as we finalize the layout, we will be start training a customized Neural Network to recognize the bottle types we will be classifying.

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/3>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

Thanks for reading up to here!

Gianpaolo on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->

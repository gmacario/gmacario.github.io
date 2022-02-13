---
layout: post
title:  "ARNEIS project journal - dev-cw06"
date:   2022/02/14
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in my 2021-12-18 post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW06-2022.

## What did we accomplish this week?

In Sprint dev-cw06 we [closed TODO issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/milestone/12?closed=1)

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

### Our LEGO 42100 Set should eventually arrive

As you can read in detail in [ARNEIS#7](https://github.com/B-AROL-O/ARNEIS/issues/7) we requested to the OpenCV contest organizers one LEGO Set 42100 which included most of the pieces we planned to use for the design of the ARNEIS system.
At that time this set was in full production (there were even rebates so it was well in the 400$ budget) so we started the design for Phase 2 of the ARNEIS project with the assumption that we could quickly get this set from OpenCV contest organizers.

![LEGO set 42100 from zavvi](https://user-images.githubusercontent.com/75182/149888035-3b15775f-34a8-4222-9016-1916c3511552.png)

We then learned that LEGO retired this set at the end of 2021, so it quickly went out of stock, and also its price increased very quickly.
Our first purchase order was then canceled as soon as the dealer realized that the last item he had on stock was damaged.

We we now issued a second order from another dealer in Europe and we should have it delivered to our home address in a matter of hours. Let's cross fingers! 

<!--
We eventually made it and we secured a [LEGO&reg; Liebherr R9800 Set](https://www.bricklink.com/v2/catalog/catalogitem.page?S=42100-1#T=S&O={%22iconly%22:0}) which should soon arrive in Torino.

TODO:Photo
-->

We are eager to spend our nights in putting the pieces together and see wether [Alessandro design of the ARNEIS conveyor](https://github.com/B-AROL-O/ARNEIS/tree/main/mocs/studies) works as expected!

[![ARNEIS project by B-AROL-O team - WIP](https://img.youtube.com/vi/7qxbT31U5dE/0.jpg)](https://www.youtube.com/watch?v=7qxbT31U5dE "ARNEIS project by B-AROL-O team - WIP")

### First shot at ARNEIS System Architecture

Based on the [ARNEIS Functional Specification](https://arneis.readthedocs.io/en/latest/architecture/arneis-spec.html) we have published last week, we have recently released a first shot of the [ARNEIS System Architecture](https://arneis.readthedocs.io/en/latest/architecture/arneis-sysarch.html) with emphasis of the main mechatronic components which will be involved in the system.

We will be expanding the ARNEIS System Architecture document putting details on the Software components and how we plan to deploy them.
In short, we are targeting a hybrid Kubernetes cloud consisting of computing and storage nodes on Azure, plus an Agent Node running locally on the Raspberry Pi which is also used to control the OAK-D-Lite camera.

### And the Kubernetes cluster is alive

Even though the software architecture is not yet finalized, we are starting to get our feet wet with Kubernetes and Azure. This may prove helpful for both the training phase of the ARNEIS Neural Network, as well as at runtime to deploy the web application, store the results, etc.

For this reason we have bootstrapped a tiny [Lightweight Kubernetes cluster](https://k3s.io/) and documented the process [in this HOWTO](https://arneis.readthedocs.io/en/latest/howto/howto-install-k3s-for-arneis.html). We hope this document may be helpful and inspiring for other future projects as well!


## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/5>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

More specifically, during the 2022-02-17 edition of the [OpenCV Weekly Webinar](https://twitter.com/opencvweekly) our team should be interviewed by Phil Nelson, so if you have time please tune in next Thursday at 18:00 CET and say hello to us!

## That's all, folks

Thanks for reading up to the end of such long post!

<!-- Thanks for reading up to here! -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/B-AROL-O).

<!-- EOF -->

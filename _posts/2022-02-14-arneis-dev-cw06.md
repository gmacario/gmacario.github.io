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

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW06-2022.

## What did we accomplish this week?

In Sprint dev-cw06 we [closed TODO issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/milestone/12?closed=1)

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

TODO

<!--
### First shot at ARNEIS System Architecture

Based on the [ARNEIS Functional Specification](https://arneis.readthedocs.io/en/latest/architecture/arneis-spec.html) we have published last week, we have recently released a first shot of the [ARNEIS System Architecture](https://arneis.readthedocs.io/en/latest/architecture/arneis-sysarch.html) with emphasis of the main mechatronic components which will be involved in the system.

We will be expanding the ARNEIS System Architecture document putting details on the Software components and how we plan to deploy them.
In short, we are targeting a hybrid Kubernetes cloud consisting of computing and storage nodes on Azure, plus an Agent Node running locally on the Raspberry Pi which is also used to control the OAK-D-Lite camera.
-->

<!--
### And the Kubernetes cluster is alive

Even though the software is not yet finalized, we are starting to get our feet wet with Kubernetes and Azure. This may prove helpful for both the training phase of the ARNEIS Neural Network, as well as at runtime to deploy the web application, store the results, etc.

For this reason we have bootstrapped a tiny [Lightweight Kubernetes cluster](https://k3s.io/) and documented the process [in this HOWTO](https://arneis.readthedocs.io/en/latest/howto/howto-install-k3s-for-arneis.html). We hope this document may be helpful and inspiring for other future projects as well!
-->

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/5>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

## That's all, folks

Thanks for reading up to the end of such long post!

<!-- Thanks for reading up to here! -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/B-AROL-O).

<!-- EOF -->

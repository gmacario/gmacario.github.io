---
layout: post
title:  "ARNEIS project journal - dev-cw05"
date:   2022/02/07
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW05-2022.

## What did we accomplish this week?

In Sprint dev-cw05 we [closed 25 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/milestone/4?closed=1).

Let's now dig into some of the major results we achieved during last week.

### OAK-D-Lite LEGO® mechanical adapter

[Alessandro](https://github.com/alv67) designed a mechanical support for the OAK-D-Lite camera, and he made it using only original LEGO® Technics parts - so for the joy of LEGO&reg; purists no 3D printing parts or modified bricks are required.

![oak-d-lite-lego-support-01.jpg](https://raw.githubusercontent.com/B-AROL-O/ARNEIS/main/docs/images/oak-d-lite-lego-support-04.jpg)

Another remarkable feature of this design is that it leaves the dissipation surface of the OAK-D-Lite uncovered; this should minimize overheating the OAK-D-Lite when the camera is in use.

You may find more details, including the complete [Studio 2.0](https://stud.io/) CAD model, at <https://github.com/B-AROL-O/ARNEIS/blob/main/mocs/studies/camera-support>.

This design - like all the other deliverables of the ARNEIS project - is released under the MIT license.
We encourage everybody - including the other [OpenCV Spatial AI Contest finalists](https://opencv.org/opencv-spatial-ai-contest/), to use and possible improve it.
If so, feel free to submit a [Pull Request on ARNEIS project on GitHub](https://github.com/B-AROL-O/ARNEIS/pulls).

### Motorized Bottle Conveyor (2022-02-06)

Alessandro also published an evolution of the conveyor idea that [was presented last week](https://gmacario.github.io/posts/2022-01-31-arneis-dev-cw04).
Now a motor and relative gearing is applied to the driving sprocket wheel.

All the parts used in this design are available in the LEGO&reg; [42100 Liebherr R9800](https://www.bricklink.com/v2/catalog/catalogitem.page?S=42100-1) set.

![motorized sprocket wheel](https://github.com/B-AROL-O/ARNEIS/blob/main/mocs/studies/bottle-conveyor-20220206.png?raw=true)

You may find more details, including the complete [Studio 2.0](https://stud.io/) CAD model, at <https://github.com/B-AROL-O/ARNEIS/blob/main/mocs/studies>.

### Steps for training our custom Neural Network

[Gianluca](https://github.com/gteti) has been trying to run the Training of a custom Neural Network on a workstation he has at home.

He started from the sample notebooks at <https://github.com/luxonis/depthai-ml-training> and whenever he faced an issue he asked Luxonis directly and with their GREAT help he is moving forward.
You may find details on the upstream issue [luxonis/depthai-ml-training#17](https://github.com/luxonis/depthai-ml-training/issues/17).

In parallel Gianluca has tried other solutions, one of which - even though a little convoluted - eventually managed to achieve the goal.

![Screenshot](https://user-images.githubusercontent.com/51110452/152745900-3eb33a6c-1fa2-45bf-a8a2-b25cc525edbd.png)

You may find the complete HOWTO on <https://arneis.readthedocs.io/>.


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

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/12>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

Unfortunately we will not be able to progress much further with the mechanical design [until we get the actual LEGO set](https://github.com/B-AROL-O/ARNEIS/issues/7).

On the other hand, we are going to [train the ARNEIS Neural Network](https://github.com/B-AROL-O/ARNEIS/issues/31) using photos taken with the OAK-D-Lite to our set of "mignon" bottles:

![Some mignon bottles](https://user-images.githubusercontent.com/75182/146777189-d154dd14-2f70-4097-a950-b17159fdaaf7.jpg)

In parallel we would like to evaluate [Roboflow](https://roboflow.com/) which - based on the information we collected so far - should simplify and speed up the training process a lot.
If you have first-hand experience on Roboflow, please report your success stories and/or lessons learned on <https://github.com/B-AROL-O/ARNEIS/issues/123>.

## That's all, folks

Thanks for reading up to the end of such long post!

If you want to help with the ARNEIS project or just say hello to us, please get in touch with us through GitHub at <https://github.com/B-AROL-O/ARNEIS> or Twitter at <https://twitter.com/baroloteam>.

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/B-AROL-O).

<!-- EOF -->

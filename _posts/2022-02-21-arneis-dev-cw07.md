---
layout: post
title:  "ARNEIS project journal - dev-cw07"
date:   2022/02/21
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW07-2022.

## What did we accomplish this week?

In Sprint dev-cw07 we [closed 24 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/milestone/5?closed=1).

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

### First assemblies of the LEGO Conveyor

After [a long and bumpy trip](https://github.com/b-arol-o/arneis/issues/7) we eventually managed to receive our beloved LEGO Set 42100.

![LEGO Technic 4100 with banana](https://user-images.githubusercontent.com/25162080/154041966-18c4a11b-e9ad-4281-bcf3-08c5b9c8b115.jpeg)

Here are a few pictures of the ARNEIS conveyor made of actual LEGO bricks according to [the blueprints](https://github.com/B-AROL-O/ARNEIS/tree/main/mocs/studies):

![wip-conveyor-01.jpeg](https://raw.githubusercontent.com/B-AROL-O/ARNEIS/main/docs/images/wip-conveyor-01.jpeg)

Here is a picture showing the movement of the conveyor transporting a few mignon bottles:

![wip-conveyor-03.gif](https://github.com/B-AROL-O/ARNEIS/blob/main/docs/images/wip-conveyor-03.gif)

### Our OpenCV Weekly Webinar postponed

[Phil Nelson communicated](https://github.com/B-AROL-O/ARNEIS/issues/120) that our participation to the [OpenCV Weekly Webinar](https://twitter.com/opencvweekly) has been replanned for Thursday, 2022-03-24 where we will have the whole episode to present the ARNEIS project.

This will give us some more time to work on the project before the episode. Please mark the new date on your calendar, and stay tuned for future announcements!

### First release of the ARNEIS Software Architecture

We released an early version of the [ARNEIS Software Architecture document](https://github.com/B-AROL-O/ARNEIS/blob/main/docs/architecture/arneis-swarch.md) where we describe the components which will be the brain of the ARNEIS system and how those components will be deployed (basically, as microservices on a tiny [Kubernetes](https://kubernetes.io/) cluster).

We will soon focus on the detailed design and how those components talk to each other. As usual, we do not want to reinvent the wheel, so if you feel we can leveraging existing code or you can help us achieve the goal, please get back to us as soon as possible!

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/6>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

## That's all, folks

<!-- Thanks for reading up to here! -->

Thanks for reading up to the end of such long post!

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->

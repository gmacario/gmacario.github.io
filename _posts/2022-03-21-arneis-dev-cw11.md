---
layout: post
title:  "ARNEIS project journal - dev-cw11"
date:   2022/03/21
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW11-2022.

## What did we accomplish this week?

In Sprint dev-cw11 we [closed 15 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/issues?q=is%3Aclosed+milestone%3Adev-cw11).

Let's now dig into some of the major results we achieved during last week.

### B-AROL-O Team at the OpenCV Weekly Webinar

On Monday, 2022-03-14 we got an email from [Phil Nelson](https://twitter.com/philnelson) informing us that due to technical issues the [OpenCV AI Game Show](https://opencv.org/gameshow/)
which was supposed to be kicked off on Episode 49 of the [OpenCV Weekly Webinar](https://twitter.com/opencvweekly) had to be postponed to the week after,
and proposing to fill in the empty slot and present [ARNEIS](https://github.com/B-AROL-O/ARNEIS) instead.

After some internal discussion with Alessandro and Gianluca we accepted the challenge.
Unfortunately we had only two days left for the preparation, therefore we had to cut corners and speed up our plan for filling the 1h slot of the webinar.

Moreover, due to work priorities [Alessandro](https://github.com/alv67) would not be able to attend in person, so we decided that I ([Gianpaolo](https://github.com/gmacario)) would introduce [B-AROL-O team](https://github.com/B-AROL-O) and the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS) in the first part of the webinar

<a href="https://www.linkedin.com/video/event/urn:li:ugcPost:6909587011267891201/">![image](https://user-images.githubusercontent.com/75182/159136335-12c6b155-d7be-4172-bf84-1a45ef91c181.png)</a>

... then would leave the stage to [Gianluca](https://github.com/gteti) who would talk about the mechanical design and zoom into the CV algorithm and the current issues we are still trying to solve.

We hope that the people who eventually attended the webinar on Thursday, 2022-03-17 were not disappointed.
As a matter of fact, by reading the comments in the [recorded video](https://www.linkedin.com/video/event/urn:li:ugcPost:6909587011267891201/) (LinkedIn login required) it looks like our project was well welcomed.

<a href="https://www.linkedin.com/video/event/urn:li:ugcPost:6909587011267891201/">![image](https://user-images.githubusercontent.com/75182/159172049-6ccb1a2e-1b85-439c-b93b-e7d3ee232249.png)</a>

According to [the Zoom recording](https://twitter.com/opencvweekly/status/1504487889630945281) we had more than 100 people who watched the webinar:

<a href="https://twitter.com/opencvweekly/status/1504487889630945281">![image](https://user-images.githubusercontent.com/75182/159225428-5ad3b74b-2d04-43f0-9c82-40927fafc057.png)</a>

Among the attendees we recognized a few friends and former colleagues; on the other hand, we were particularly amazed to see so many people from all over the world joining the event and making very interesting questions and suggestions.

We are very thankful to [Satya](https://twitter.com/LearnOpenCV) and [Phil](https://twitter.com/philnelson) who invited us to the [OpenCV Weekly Webinar](https://twitter.com/opencvweekly), and we are looking forward to more community contributions now that the project has received such exposure.

We also hope we will be able to meet some of you in person during one of next events in the coming weeks where we will be showcasing ARNEIS - more specifically:

* Saturday, 2022-04-09 and Sunday, 2022-04-10: [San Mauro Brick Show 2022](https://github.com/B-AROL-O/ARNEIS/issues/130)
* Saturday, 2022-05-28 and Sunday, 2022-05-29: [Expo Mattoncino 6 Pinerolo](https://github.com/B-AROL-O/ARNEIS/issues/213)

Please mark both events on your calendar and - if you happen to be around Torino in one of those days - don't forget to come and meet us!

### Working on a synthetic dataset for training the ARNEIS NN

As explained by Satya during the [2022-03-17 OpenCV AI Webinar](https://twitter.com/opencvweekly/status/1504487889630945281), the most effective way for improving the recognition rate of a Neural Network is to provide a comprehensive dataset for training.

As we could not find any public dataset for "mignon bottles" like the ones we use in the ARNEIS project, so fare we have been using about 500 real pictures taken with the OAK-D-Lite to a subset of the bottles we have available.

Satya also suggested to enhance the dataset by developing 3D models of each bottle, slapping hi-res scans of their labels, then use programs such as Unity or Roboflow to generate plenty of synthetic pictures with different orientation, lighting and obstactles in order to reinforce the training algorithm of the Neural Network.

[Stefan Daniel Achirei](https://scholar.google.com/citations?user=z9g3WNcAAAAJ&hl=ro) commented in the chat

> toolkit for generating synthetic data:<br>
> <https://github.com/Unity-Technologies/com.unity.perception>

This toolkit was presented in [Episode 43 of the OpenCV Weekly Webinar](https://www.youtube.com/watch?v=LGGtF_4v5sQ) a few weeks ago (skip to 45:28 of the video recording):

[![What's New With the OpenCV AI Kit Plugin for Unity w/ Gerard Espona - Weekly Ep #43 - 02/03/22](https://img.youtube.com/vi/LGGtF_4v5sQ/0.jpg)](https://www.youtube.com/watch?v=LGGtF_4v5sQ "What's New With the OpenCV AI Kit Plugin for Unity w/ Gerard Espona - Weekly Ep #43 - 02/03/22")

Please subscribe to [ARNEIS#258](https://github.com/B-AROL-O/ARNEIS/issues/258) if you are interested in the process or can provide further suggestions or feedbacks.

### Built a second ARNEIS MOC

We managed to get our hands on another [LEGO&reg; 42100 Set](https://arneis.readthedocs.io/en/latest/lego-set-42100/README.html) which we have used to verify the building instruction manual of the MOC design which Alessandro [released last weeek](https://github.com/B-AROL-O/ARNEIS/tree/main/mocs/project#arneis-conveyor-v20220312).

After about 5h of work the MOC is complete

![2022-03-20-2141-moc-complete](https://user-images.githubusercontent.com/75182/159185341-6ee084a1-ad6d-4eee-b0bd-ce83908fc87d.jpg)

... and there are still A LOT of extra parts that we could use to improve the design!

![2022-03-20-2141-leftovers](https://user-images.githubusercontent.com/75182/159185349-3c987443-ba6c-4744-b7f7-65d1b8894eeb.jpg)

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/10>.

Thanks for reading up to the end of such long post!

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->
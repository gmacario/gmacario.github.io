---
layout: post
title:  "ARNEIS project journal - dev-cw12"
date:   2022/03/28
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/>

Here is the report of our progress in the ARNEIS project after the end of CW12-2022.

## What did we accomplish this week?

In Sprint dev-cw12 we [closed 13 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/issues?q=is%3Aclosed+milestone%3Adev-cw12).

Let's now dig into some of the major results we achieved during last week.

### Get inspiration from the Arduino Week

I am pretty sure anyone who follows my blog knows what [Arduino](https://www.arduino.cc) is, right?

OK, so the news is that last week the <https://week.arduino.cc/> took place, with dozens of inspiring sessions all over the week, including the interview to [Denis Ruffino](https://it.linkedin.com/in/denis-ruffino-028a88a) (our manager) on [Day 4 (watch from 1:36:00)](https://youtu.be/XVgWuTRLklk?t=5757).

<!-- ![OOPS](https://i.pinimg.com/736x/4f/f8/02/4ff802833a423a78314e99fb30ea0b8b.jpg) -->

> **... oops, I just realized I revealed a trade secret!**

After [B-AROL-O on Twitter](https://twitter.com/baroloteam) went online, we have been repeatedly asked to disclose the name of the company where [Alessandro](https://github.com/alv67), [Gianluca](https://github.com/gteti) and myself are employed, but we have always declined.

As I explained during [OpenCV Weekly Webinar Episode 49](https://twitter.com/baroloteam/status/1504865479290241026),
we decided to apply to the Spatial AI Contest and have been developing ARNEIS only as a hobby project and outside our working hours, with the only purpose of learning and having fun, and without any corporate support or sponsorship.

Now the secret is officially over, even though some smart people already told me they had guessed it from the letters between the "-" in our team name ;-)

Back to the Arduino Week, the day which personally  inspired me most was in fact [Day 6 (Saturday, 2022-03-26)](https://www.youtube.com/watch?v=AqgJ17d8UnQ?t=0) where a few projects from the Arduino community were showcased

[![ARDUINO WEEK 2022 Day 6](https://img.youtube.com/vi/AqgJ17d8UnQ/0.jpg)](https://www.youtube.com/watch?v=AqgJ17d8UnQ?t=0 "ARDUINO WEEK 2022 Day 6")

[Massimo Banzi](https://www.linkedin.com/in/massimobanzi/), [David Cuartielles](https://www.linkedin.com/in/david-cuartielles-23bab14/) and their guests urged the audience to invest energy and efforts in learning, tweaking and sharing the results in the open. This composite share of knowledge helps making impossible things possible, and will contribute to improving the world for the new generations.

[Arduino](https://www.arduino.cc) has been doing this for the last 10 years, and I would dream of being able to do something similar -- by the way, this is why [ARNEIS artifacts are released under an Open Source license](https://github.com/B-AROL-O/ARNEIS/blob/main/README.md#copyright-and-license).

If you have no time for watching the full recording (3h), at least please watch [this presentation](https://youtu.be/AqgJ17d8UnQ?t=7924)  (2:12:00):

[![ARDUINO WEEK 2022 Day 6](https://user-images.githubusercontent.com/75182/160293521-1faf47b2-1b99-4cdb-80ad-ee8f5b8ad321.png)](https://www.youtube.com/watch?v=AqgJ17d8UnQ?t=7920 "ARDUINO WEEK 2022 Day 6")

I am pretty sure that after 6 minutes you will agree with me:

[![2022-03-27-arduino-day6-good-job-guys.png](https://pbs.twimg.com/media/FO3vmxnWYAA2xLM?format=jpg&name=large)](https://twitter.com/gpmacario/status/1508124989928706048)

### ARNEIS System Integration in progress

We are in code freeze process as we approach release 0.1.0 - a.k.a. the first public release of the ARNEIS project.

Here is a picture of the system integration bench of the ARNEIS project.

![2022-03-26-1855-arneis-sysint.jpg](https://github.com/B-AROL-O/ARNEIS/raw/280-feat-arneis-system-integration-for-the-release/docs/images/2022-03-26-1855-arneis-sysint.jpg)

Details in the draft Pull Request: <https://github.com/B-AROL-O/ARNEIS/pull/281>

### Preparing the final submission to the OpenCV Spatial AI Contest

As we approach to the deadline for the final submission to the OpenCV Spatial AI Context, our team is busy preparing the final report as well as a short video that the selection committee will use to evaluate the project and rank it among the 50 finalists.

The prizes for the three best projects are - to use an understatement - "interesting":

![image](https://user-images.githubusercontent.com/75182/160473643-0c71fa5a-154a-4d02-9b58-44168ed17482.png)

(Source: <https://opencv.org/opencv-spatial-ai-contest/>)

The prizes are of course a big motivator, but even more important is for us to be able to convey the message that even with the short time as we had during the Contest it is possible to produce significant results, and at the same time grow in experience and have fun. The secret was: learn from the community, share the results and do not fear to fail.

As soon we submit video to the OpenCV Spatial AI Contest we will share it.
Stay tuned for details in the next issue of the ARNEIS Project Journal!

In the meanwhile you can find the previous posts directly in Gianpaolo blog, or linked from Twitter: [@baroloteam](https://twitter.com/baroloteam).

<!-- [List of Gianpaolo blog posts about ARNEIS](https://github.com/gmacario/gmacario.github.io/pulls?q=is%3Apr+is%3Aclosed+label%3A%22topic%3A+ARNEIS%22) -->

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/11>.

<!-- Thanks for reading up to here! -->

Thanks for reading up to the end of such long post!

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->

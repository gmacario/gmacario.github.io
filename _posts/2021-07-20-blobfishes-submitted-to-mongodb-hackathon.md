---

layout: post
title:  "Project Blobfishes submitted to the DigitalOcean MongoDB Hackathon"
date:   2021/07/20
tags: 	mongodb digitalocean hackathon blobfishes

---

<!--
TODO: Place one beautiful (or ugly?) picture here
-->

As I anticipated in my [previous post](https://gmacario.github.io/posts/2021-07-17-our-journey-to-do-mongodb-hackathon) a few days ago I joined the [DigitalOcean MongoDB Hackathon](https://www.digitalocean.com/mongodb-hackathon/) together with a group of friends.

Even though the official objective of joining the Hackathon is to be awarded a prize, I believe all of us shared a few other goals:
1. We want to learn and explore new web technologies
2. We want to apply best practices which may be useful in our day-to-day jobs...
3. But first of all we want to have fun!

<!--
What are we going to develop and submit to the Hackathon?
Stay tuned, I will shed some light very soon... 
-->

## What did we eventually develop?

Let me introduce
<https://github.com/aquariophilie/blobfishes>

<!-- TODO -->

## Our journey

I learned about the DigitalOcean MongoDB Hackathon when it was launched at the [deploy by DigitalOcean](https://deploy.digitalocean.com/) event at the end of June.

From that day on I kept chasing my friends to join me in this effort, but they were reluctant. I may understand why, they already bear with me during the workday, and having to do the same also during their evenings and week-ends is definitely a demanding effort...

### Project blobfishes kick-off

My friends eventually gave up to my insistence, and on 2021-07-14 we met in person to agree upon what we would develop in order to be awarded with the [wonderful prizes](https://www.digitalocean.com/mongodb-hackathon/#prizes) offered by DigitalOcean.

We soon realized that the time until the closing date of the hackathon ([July 20, 2021, 11:59 pm PST](https://www.digitalocean.com/mongodb-hackathon/)) was quite short, therefore we had to cut corners and agreed the scope of work.

As the [blobfishes project page on GitHub](https://github.com/aquariophilie/blobfishes) states

> Blobfishes aims to be the ugliest project participating to the [DigitalOcean MongoDB Hackathon](https://www.digitalocean.com/mongodb-hackathon/).

After the kick-off meeting we never had the chance of meeting all together in person again; instead, we relied upon collaboration tools such as [Telegram](https://web.telegram.org/) and [GitHub issues](https://github.com/aquariophilie/blobfishes/issues) and best practices such as CI/CD and SCRUM.

### Roles and responsibilities

Based on our skills and interests we also agreed on each [team member role](https://github.com/aquariophilie/blobfishes/blob/main/docs/rasic.md).

<!-- TODO: Excerpt of the RASI? -->

Hopefully - since I am the eldest and the laziest member of the team - my friends did not ask me to write complex [MongoDB queries](https://docs.mongodb.com/) or arcane [Node.js](https://nodejs.org/it/docs/) or [Svelte](https://svelte.dev/) code.
Instead, they assigned me the Ops, Deploy and Documentation tasks which are usually neglected by all real developers.

Like a [cherry on top of the ice cream](https://www.quora.com/What-is-the-meaning-of-the-phrase-cherry-on-top), I also offered to contribute with my skills of ball-breaker and watchdog which I have refined during my work at [AROL](https://www.arol.com/).
That's why you may notice that I have currently the highest rank in number of open issues - not in resolved ones, though :-(

Based on the RASI, each member of the team the responsibility to choose the best tool and/or technology to support his tasks, of course after consulting with the others.

We found it particularly useful to discuss and agree on key project decisions by means of a GitHub issue assigned to the task owner. All knowledgeable people can interact there, discuss options or submit linked PRs with architecture documents, examples, etc. The issue will be closed after documenting the decision in the project repository - either via source code, diagrams or Markdown documents.
<!-- You may look at issue TODO as an example: decision on the database schema -->

## The result

At the end of the day our project setup proved to work well - even at such short notice we eventually [managed to have our submission accepted](https://github.com/aquariophilie/blobfishes/issues/24#issuecomment-883869551) just a few hours before the Hackathon closed!

## Next steps

As it is now about time to go to work here is my short-time action plan:

1. Do a `git commit`
2. Have all the [GitHub checks](https://github.com/gmacario/gmacario.github.io/actions) green
3. Merge this PR to have this post [published on my blog](https://gmacario.github.io/)
4. Leave home to arrive at my workplace on time

For a longer time plan, please have a look at the [blobfishes project dashboard](https://github.com/aquariophilie/blobfishes/projects/1).

By the way, the blobfishes project is released under an [Open Source license](https://github.com/aquariophilie/blobfishes/blob/main/LICENSE), and contributions are more than welcome!

<!-- TODO -->

<!-- EOF -->

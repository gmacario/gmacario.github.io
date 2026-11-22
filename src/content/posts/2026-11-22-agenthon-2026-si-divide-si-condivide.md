---
title: "Agenthon 2026: one day, one breadstick, one GenAI campaign"
pubDatetime: 2026-11-22T00:00:00+01:00
featured: true
ogImage: "../../assets/2026-11-22-agenthon-2026-si-divide-si-condivide-og.jpg"
tags:
  - hackathon
  - agenthon
  - gdg-torino
  - genai
  - marketing
  - claude-code
description: 'How the B-AROL-O team designed and produced, almost entirely with generative AI, a full advertising campaign for the Rubatà breadsticks of Grissinificio Feyles in one day at the GDG Torino "Build with AI" Agenthon: the idea, what we delivered, how we built it and what I would keep for the next hackathon.'
---

![Web banner from our campaign: a woman hands a bundle of Rubatà breadsticks to a smiling friend at the door of a home aperitivo, beside the headline «Portate qualcosa da dividere.», the Il Classico carton and the claim «Si divide. Si condivide.»](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/hero-16x9.jpg)

On Saturday 21 November 2026 the [B-AROL-O team](https://github.com/B-AROL-O)
([Alessio Chessa](https://github.com/aleche28),
[Luca Frigato](https://github.com/FrigaZzz) and I) spent the day at
[Feat. House](https://feat.house/) in Turin for the GDG Torino
["Build with AI" Agenthon](https://agenthon.gdgtorino.it/). We picked Track 2,
GenAI for marketing, and at 10:28 the brief appeared on the participant portal.
At 17:00 the submission froze. This is what happened in between.

<!-- TODO: add a photo from the day, if you have one -->

## The brief

The client was [Grissinificio Feyles](https://grissinificiofeyles.it/), a
family bakery near Turin that has made Rubatà, the knobbly Piedmontese
breadsticks, since 1968. They wanted Rubatà to become the star of the aperitivo
at home and a gift worth bringing to friends, for people aged 25 to 40.

The ask was a full campaign, made with generative AI, in one working day:

1. a 20 to 30 second commercial
2. a social media content set
3. web and print visuals
4. an advertising image with headline and call to action
5. a project sheet explaining the idea and the role of AI
6. the list of every tool used

Packaging and product had to stay faithful to the originals. Everything else
was open: realistic, illustrated, animated or surreal.

## The idea

We gave ourselves until 12:00 to agree on one concept, and then nobody was
allowed to reopen it.

The idea came from the language. In Italian, **«dividere»** means two things at
once: to break and to share. A Rubatà does both in a single gesture: snap one in
half, and you are already handing the other half to someone. So the campaign
does not need to explain sharing; it only has to show the snap.

**Claim:** _«Si divide. Si condivide.»_ (It breaks. It's shared.)

Early research had suggested three Christmas concepts across several product
lines. At the concept lock we set them aside for one hero pack, the sky-blue Il
Classico carton with its die-cut wheat-ear window, and one gesture. As you will
read below, Christmas found its way back in by the end of the day.

![Hero ad: two hands snapping one Rubatà on a sky-blue background, with the headline «Spezzatelo. È fatto apposta.»](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/hero-ad-4x5.jpg)

## What we made

- **The spot**, about 30 seconds: a Christmas story of sharing, from 1968 to
  today, starring Il Cioccorubatà fondente.
  [Watch it here](https://drive.google.com/file/d/1k-UAqDOfcPWlhVR_IKaYoMYq0grGPlYI/view).
- **A social set** of five post concepts in 9:16, 4:5 and 1:1, with a
  friend-tag prompt, _«A chi va l'altra metà?»_ ("Who gets the other half?"),
  and a six-slide carousel that tells the snap story from the storyboard.
- **Web and print**: banners, a home page hero, display ads, a poster, a
  billboard, a bus shelter in Turin, a magazine page and a gift tag.
- **The hero ad**, _«Spezzatelo. È fatto apposta.»_ ("Snap it. It's made for
  that."), in three formats.
- **The project sheet and tools list**, which the brief counted as deliverables
  in their own right.

### A note on the spot

If you compare the spot with the storyboard we wrote at noon, you will notice
they are not quite the same film. The plan was eight beats around the snap: a
breadstick broken between two hands, the ear of wheat, the oven, Turin's arcades
and an aperitivo table where the carton empties. What came out of the afternoon
is a Christmas story, from 1968 to today, and the snap is not in it.

That is what a few hours of generating, picking takes and editing do to a plan.
Some shots did not come out as we had pictured them, others came out better
than expected and pulled the story in a new direction, and at some point the
clock decides for you. The spot still tells the sharing, and the stills carry
the snap. But the jury noticed the gap: their main criticism was that the
spot did not feel aligned enough with the rest of the campaign. It is a fair
point, and it is the first lesson below.

![Social post, 1:1: the die-cut wheat-ear window of the Il Classico carton](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/social-finestra-1x1.jpg)

![Mockup of the campaign poster in a bus shelter in Turin](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/mockup-bus-shelter-torino.jpg)

## How we built it

AI made the image plates, the video clips, the voiceover, the music and the
sound effects. People made every decision about the idea, the brand and the
final cut.

- **Images:** Nano Banana 2 on Vertex AI, always with the official pack photos
  as references.
- **Video:** Google Veo 3.1 on Vertex AI, with its native audio.
- **Voice and music:** ElevenLabs, with a pronunciation dictionary so that the
  voiceover says «Rubatà» like someone from Turin.
- **Editing:** HeyGen HyperFrames and FFmpeg.
- **Planning, docs and code:** Claude and Claude Code, working in a shared
  GitHub repository and devcontainer.

The rule that saved us most time: **the AI never writes text and never draws the
logo.** Every plate was generated text-free, with a clean lower third, and the
logo, packshots, headlines and calls to action were composited afterwards in
Python with Pillow, from the official files. Image models still mangle lettering
and packaging, and a misspelt claim or a melted logo would have cost us the
"faithful to the original" requirement. The mockups used the same trick: each
scene was generated with a plain green panel, and the code keyed out the green
and warped our real artwork onto it.

We also wrote the brand rules down as instructions for the models: always
knobbly, irregular breadsticks, never thin smooth ones; no hands rolling dough
and no "hand-rolled" claims; no awards, dates or figures that the client's kit
did not state.

## Lessons for the next hackathon

- **Make the GitHub repository the single source of truth, for everyone and
  every tool.** The concept lock, the storyboard and the brand rules lived in
  our repository, but not all the work flowed through it. If every team member,
  and every tool and agent they use, had read from and written back to the same
  repository, the changes to the spot would have been visible to the rest of the
  campaign as they happened, and the spot would have stayed closer to it.
- **Lock the concept early.** The 12:00 freeze turned the afternoon into
  production instead of debate, even if the spot then found its own way.
- **Treat the storyboard as a starting point, and share the changes.**
  Generative video does not always give you the shot you asked for, so leave
  room for the takes that surprise you, but write the new direction down where
  the whole team can see it.
- **Start long generations before lunch.** Video clips rendered while we ate.
- **Know the submission mechanics.** The portal took a Google Drive folder and
  recorded each file's timestamp at 17:00, so we froze the folder at 16:45 and
  kept the pitch deck outside it.
- **Cut at a fixed time.** At 15:45 anything unfinished was dropped: a finished
  spot is worth more than one extra social format.
- **Keep text and logos out of the generator.** Compositing them in code is
  cheap, exact and repeatable.

## How it went

<!-- TODO: say in a sentence or two how the pitch and the awards went, and anything that surprised you about the jury or the other teams -->

We did not make the podium. The jury's main criticism, as I said above, was that
the spot was not aligned enough with the rest of the campaign. Still, we left
with a complete, brand-safe campaign that Feyles could run as it is, and a
format that extends to the other seven Rubatà flavours with a new snap each.

Thanks to GDG Torino for organising the day, to Demetra for the Track 2 brief,
to Feyles for trusting a room full of hackers with their brand, and to Alessio
and Luca for a very fast Saturday.

Everything we made, including the prompts and the compositing scripts, is on
GitHub: [B-AROL-O/agenthon-2026](https://github.com/B-AROL-O/agenthon-2026).

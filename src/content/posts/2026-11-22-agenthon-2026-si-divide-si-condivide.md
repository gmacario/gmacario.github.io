---
title: "Agenthon 2026: one day, one breadstick, one GenAI campaign"
pubDatetime: 2026-11-22T00:00:00+01:00
draft: true
tags:
  - hackathon
  - agenthon
  - gdg-torino
  - genai
  - marketing
  - claude-code
description: 'How the B-AROL-O team designed and produced, almost entirely with generative AI, a full advertising campaign for the Rubatà breadsticks of Grissinificio Feyles in one day at the GDG Torino "Build with AI" Agenthon: the idea, what we delivered, how we built it and what I would keep for the next hackathon.'
---

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
lines. We dropped them all for one hero pack, the sky-blue Il Classico carton
with its die-cut wheat-ear window, and one gesture. A 26-second spot has no room
for a catalogue tour.

![Hero ad: two hands snapping one Rubatà on a sky-blue background, with the headline «Spezzatelo. È fatto apposta.»](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/hero-ad-4x5.jpg)

## What we made

- **The spot**, about 26 seconds in 8 beats, in 16:9 and 9:16. It opens on the
  sound of a snap with no music, goes back to the ear of wheat and the oven, and
  ends at an aperitivo table where the breadsticks pass from hand to hand until
  the carton is empty: _«Uno diventa due. Poi finiscono.»_
  [Watch it here](https://drive.google.com/file/d/1k-UAqDOfcPWlhVR_IKaYoMYq0grGPlYI/view).
- **A social set** of five post concepts in 9:16, 4:5 and 1:1, with a
  friend-tag prompt, _«A chi va l'altra metà?»_ ("Who gets the other half?"),
  and a six-slide carousel retelling the spot.
- **Web and print**: banners, a home page hero, display ads, a poster, a
  billboard, a bus shelter in Turin, a magazine page and a gift tag.
- **The hero ad**, _«Spezzatelo. È fatto apposta.»_ ("Snap it. It's made for
  that."), in three formats.
- **The project sheet and tools list**, which the brief counted as deliverables
  in their own right.

![Social post, 1:1: the die-cut wheat-ear window of the Il Classico carton](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/social-finestra-1x1.jpg)

![Mockup of the campaign poster in a bus shelter in Turin](/assets/2026-11-22-agenthon-2026-si-divide-si-condivide/mockup-bus-shelter-torino.jpg)

## How we built it

AI made the image plates, the video clips, the voiceover, the music and the
sound effects. People made every decision about the idea, the brand and the
final cut.

- **Images:** Nano Banana 2 on Vertex AI, always with the official pack photos
  as references.
- **Video:** Google Veo 3.1 on Vertex AI, whose native audio gave us the
  breadstick snaps.
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

## What I would keep for the next hackathon

- **Lock the concept early and mean it.** The 12:00 freeze turned the afternoon
  into production instead of debate.
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

We did not make the podium, but we left with a complete, brand-safe campaign
that Feyles could run as it is, and a format that extends to the other seven
Rubatà flavours with a new snap each.

Thanks to GDG Torino for organising the day, to Demetra for the Track 2 brief,
to Feyles for trusting a room full of hackers with their brand, and to Alessio
and Luca for a very fast Saturday.

Everything we made, including the prompts and the compositing scripts, is on
GitHub: [B-AROL-O/agenthon-2026](https://github.com/B-AROL-O/agenthon-2026).

---
title: "hackTurin 2026: the backstage of PoopVolt, built by four humans and their coding agents"
pubDatetime: 2026-10-15T00:00:00+02:00
featured: true
tags:
  - hackathon
  - hackturin
  - claude-code
  - ai-agents
  - arduino
  - photovoltaic
description: "Behind the scenes of PoopVolt, our hackTurin 2026 entry for the Beyond Solar challenge: how a team of four used Claude Code, Codex and Copilot, a strict pull-request workflow and a lot of honesty about what really works to ship two releases, a working Arduino UNO Q prototype and a two-minute film in one weekend."
---

![PoopVolt logo: a pigeon sitting on a photovoltaic panel beside the product name](/assets/2026-10-15-hackturin-2026-poopvolt-backstage/logo.png)

Over the weekend of 10-11 October 2026 I took part in
[hackTurin 2026](https://luma.com/t2odor1k) together with
[Giacomo Lisita](https://github.com/giacolees),
[Lorenzo Palloni](https://github.com/lorenzopalloni) and
[Federico Nebuloni](https://github.com/fedenebu). We tackled the **Beyond Solar**
challenge with **PoopVolt**, and the official writeup is on
[Devpost](https://devpost.com/software/poopvolt).

This post is not about the pitch. It is about _how_ we built it: a weekend in
which coding agents were not a gadget on the side but full participants in the
repository, and in which the most useful thing we taught them was to say what
does **not** work yet.

## The idea in one paragraph

The owner of an older photovoltaic plant usually cannot tell whether it still
produces what it should. Dust, bird droppings (hence the pigeon) and ageing
lower the output slowly, and a plant that "apparently works" is rarely
inspected. PoopVolt is a proposed Edge AI maintenance aid built around an
[Arduino UNO Q](https://www.arduino.cc/product-uno-q): it compares expected and
observed production, classifies visible soiling from a phone photo, and gives a
service company evidence that a technician reviews before proposing an
intervention to the owner. Everything is in the public repository
[B-AROL-O/hackturin-2026](https://github.com/B-AROL-O/hackturin-2026).

## The numbers behind the weekend

The first commit landed on Saturday at 01:25, a few hours before the hacking
started. By Sunday afternoon the repository had:

- **83** issues and pull requests, and two tagged releases
  ([0.1.0](https://github.com/B-AROL-O/hackturin-2026/blob/main/CHANGELOG.md)
  at 07:39 and 0.2.0 at 08:25 on Sunday morning);
- **134** non-merge commits, **87** of which were authored or co-authored by
  [Claude Code](https://claude.com/claude-code); a handful more came from
  OpenAI Codex and the GitHub Copilot coding agent;
- firmware for the UNO Q microcontroller and Linux side, a SOLARMA inverter log
  importer, an expected-versus-observed comparison, a phone-to-edge inspection
  workflow, a live dashboard, a KiCad schematic, a bill of materials, brand
  guidelines and a 120-second
  [Remotion](https://www.remotion.dev/) motion-graphics film.

Four people could not have typed all of that in thirty-something hours. Four
people _directing_ agents could.

## Who did what: humans and agents

We did not plan a formal division of labour, but one emerged quickly, and each
of us ended up pairing with a different kind of agent.

**Lorenzo** stayed close to the metal. The firmware commits are his: Grove
sensor diagnostics on the UNO Q Base Shield, the PN532 NFC reader over the
shield UART, panel current on `A1`, streaming readings from the MCU to Linux over
the Bridge, and a measured storage/RAM/CPU budget for a computer vision model on
the board. Hardware does not forgive hallucinations, and this is where the
humans did most of the work, measuring and writing down what they measured: the
repository even records that the LM2596 step-down converter could not supply
5 V from the LiPo battery.

![Lorenzo assembling the PoopVolt hardware at hackTurin 2026: wiring a battery charger board next to the Grove modules, with the Grove current sensor documentation open on the laptop, a multimeter and a screwdriver bit set on the desk](/assets/2026-10-15-hackturin-2026-poopvolt-backstage/lorenzo-assembling-hardware.jpg)

**Giacomo** owned the story: the pitch, the architecture documents, the
company offer and, at the end, the film. He worked largely with Codex (you can
still see `codex/...` branches in the history), and he invested early in
something I had not seen before at a hackathon: an
[`.agent/` guideline corpus](https://github.com/B-AROL-O/hackturin-2026/tree/main/.agent)
plus an `AGENTS.md` at the repository root. They tell any coding agent what to
read before touching the presentation, which documents are authoritative and,
above all, to keep "architectural proposals, illustrative examples, and
measured results distinct". The Remotion film was then produced from a written
storyboard, a frame-accurate `timing.json` and a ready-to-use
[coding-agent task](https://github.com/B-AROL-O/hackturin-2026/blob/main/presentation/video/agent-task.md).

**Federico** gave PoopVolt a face: the logo, the
[brand guidelines](https://github.com/B-AROL-O/hackturin-2026/blob/main/brand-guidelines.md)
and the prototype photos used throughout the video.

**I** mostly acted as the integrator, with [Claude Code](https://claude.com/claude-code)
running as a long-lived cloud session (a similar setup is described in
[my previous post](/posts/2026-09-11-remote-sessions-vscode-claude-code)). On
Saturday morning it replaced Poetry with `uv` in the devcontainer; later it
wrote the SOLARMA inverter log importer with unit and timestamp checks, the
bill of materials, the Devpost draft and the
[project status](https://github.com/B-AROL-O/hackturin-2026/blob/main/docs/project-status.md)
page. In the small hours of Sunday it produced the peer-relative
expected-versus-observed comparison on the replayed data, which became the core
of our evidence.

## The night shift

That 03:07 commit deserves a paragraph of its own. While the team was asleep,
the agent was replaying months of inverter logs from a real plant and looking
for the case that would make the idea tangible. It found one: inverter 1
produced nothing for 75 days, about 550 kWh short of its peers, and a simple
daily peer check would have flagged it on the first day.

![Chart of the SOLARMA replay: inverter 1 daily energy drops to zero for 75 days while its peers keep producing](/assets/2026-10-15-hackturin-2026-poopvolt-backstage/comparison-inverter-1-replayed.svg)

When I woke up, I reviewed and merged it, cut release 0.1.0, asked for a
requirements check of the Devpost draft against the Beyond Solar brief and cut
0.2.0 before 08:30. Having an agent that keeps working on a well-defined task
overnight, and a human that reviews in the morning, turned out to be the most
productive rhythm of the weekend.

## Guardrails that made it work

Letting several agents and four humans push to the same repository for
thirty hours could have been chaos. A few rules, set up in the first hours,
kept it under control:

1. **Everything goes through pull requests.** Work happens on feature branches
   merged into `develop`; `main` only receives release PRs.
2. **Linters as the referee.** We run
   [Super-Linter](https://github.com/super-linter/super-linter) on pull requests
   to `main`, with markdownlint, Prettier, textlint terminology rules, pylint,
   Biome and stylelint. A good share of the agents' commits are boring
   `chore(lint)` and `style:` fixes, and that is exactly the point: the agents
   cleaned up after everyone, humans included, so that every release PR was
   green.
3. **A devcontainer for everybody.** The same `uv`-based environment, with
   Claude Code preinstalled, worked on laptops and in cloud sessions alike.
4. **Write the brief down.** `AGENTS.md`, the `.agent/` corpus, the storyboard
   and the agent task files are prompts that live in the repository, are
   reviewed like code and are shared by every agent, whichever vendor it comes
   from.

## Honesty as a feature

If you read the PoopVolt readme you will notice an unusual amount of
qualification: "proposed", "replayed", "simulated", "remains to verify". That
was deliberate. Coding agents are very good at producing confident text, and a
hackathon pitch is the perfect place for confident text to drift away from
what the prototype actually does.

So we made the distinction part of the rules. The
[project status](https://github.com/B-AROL-O/hackturin-2026/blob/main/docs/project-status.md)
page lists what works today and what is still a proposal. The data on every
chart is labelled measured, replayed or simulated. When we discussed our
progress with Matteo Stoppa of Coesa, one of the mentors, on Saturday and
Sunday, the Devpost draft was updated to say "discussed with", not "validated
by". Once the rules were written down, the agents applied them to the documents
they touched, just like the linter rules.

![PoopVolt prototype outdoors in the sun, next to a laptop, with the LCD showing live readings](/assets/2026-10-15-hackturin-2026-poopvolt-backstage/prototype-outdoor.jpg)

## Lessons learned

- **Agents scale the boring parts.** Lint fixes, merge conflict resolution,
  changelogs, character counts in the Devpost short fields: none of it is
  glamorous, all of it would have cost us hours.
- **Humans own the physical world and the claims.** Wiring, measurements and
  the decision about what we can honestly say stayed with the people in the
  room.
- **Long-running sessions beat one-shot prompts.** A single cloud session that
  knew the whole repository history was more useful than many short chats.
- **Vendor diversity is fine if the brief is shared.** Claude Code, Codex and
  Copilot all worked on the same repository without stepping on each other,
  because the rules lived in the repository rather than in anybody's head.

## What's next

The repository is still alive after the event, with a few more PRs merged in
the following days to keep `main` green. If you are curious, have a look at
the [Devpost page](https://devpost.com/software/poopvolt) and the
[repository](https://github.com/B-AROL-O/hackturin-2026), and let me know what
you think.

Many thanks to the hackTurin 2026 organizers, partners and mentors, and to
Giacomo, Lorenzo and Federico for a great weekend.

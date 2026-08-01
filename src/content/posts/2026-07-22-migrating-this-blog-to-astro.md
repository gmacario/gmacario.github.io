---
title: "Rebuilding this blog with Astro (with a little help from Claude)"
pubDatetime: 2026-07-22T00:00:00+02:00
tags:
  - astro
  - blog
  - migration
  - ai
description: "Why I rebuilt gmacario.github.io on Astro and AstroPaper, and how I did the whole migration pair-programming with Claude Code."
ogImage: "../../assets/2026-07-22-migrating-this-blog-to-astro-og.png"
---

![Rebuilding gmacario.github.io: from Next.js to Astro](/assets/2026-07-22-migrating-this-blog-to-astro/hero.svg)

This site has just been rebuilt from the ground up on [Astro](https://astro.build/).
If you are reading this, the migration worked: the URL you clicked still points
where it always did, but the page underneath is now static, fast, and much
easier to maintain. Here is why I did it, and how I did the whole thing
pair-programming with [Claude Code](https://claude.com/claude-code).

## Why migrate

The blog had quietly become a maintenance liability. It ran on **Next.js 10,
React 17, Material-UI v4, Tailwind 2 and Node 14** — every one of those
end-of-life. The build even depended on `next export`, which no longer exists in
modern Next.js, so "just upgrade it" was really "rewrite it" in disguise.

At the same time I wanted the site to do a slightly different job: less of a bare
blog, more of a **professional home base** — a short bio and a link to my CV
above the fold, with the technical blog right behind it.

So instead of nursing the old stack along, I chose to rebuild:

| Decision | Choice |
| --- | --- |
| Framework | **Astro** with the **AstroPaper** theme (MIT, actively maintained) |
| Why | Markdown-native, ships ~zero JavaScript, first-class GitHub Pages action, low long-term maintenance |
| Content | Migrate **all 69 posts**, keep every existing permalink |
| Hosting | GitHub Pages via the official `withastro/action` workflow |

I considered the alternatives — a modern Jekyll theme, Hugo, or upgrading
Next.js in place — but Astro hit the sweet spot: my posts are already Markdown,
the output is almost pure HTML, and the maintenance surface is tiny.

## How the migration went

I ran the whole thing as a conversation with **Claude Code**, in deliberate
phases so nothing had to be done in one risky leap:

1. **Scaffold.** Stand up AstroPaper in a subdirectory so the old site kept
   working the entire time, and port the site metadata (title, author, social
   links) from the old config.
2. **Content.** Move all 69 posts into Astro's content collections. This was the
   fiddly part: the old Jekyll/Next front-matter used a grab-bag of date formats
   (`2015-01-21 14:00:00 CET`, `2023/04/22`, …), space-separated tags, and no
   post descriptions at all. Claude wrote a small migration script that
   normalised every date to a proper ISO timestamp with the correct
   Europe/Rome offset (DST included), split the tags, and derived a description
   from each post's first real paragraph.
3. **Homepage & pages.** A bio/CV-first landing page, a paginated archive, an
   About page, plus an RSS feed, a sitemap and full-text search — none of which
   the old site had.
4. **CI/CD.** Replace the old build with the official Astro GitHub Pages
   workflow: pull requests build for verification, `main` deploys.
5. **Cutover.** Promote the new site to the repository root and delete the
   legacy code.

Crucially, **existing links did not break.** Post URLs are derived from the file
name, so `/posts/<slug>` resolves exactly as it did before — a decade of
inbound links and search results still land.

## How Claude actually helped

This wasn't "AI, build me a website." It was closer to pair programming, with me
driving and reviewing every decision:

- **Planning.** Claude turned a vague "move to Astro" into an explicit,
  phased plan and kept a running checklist on the tracking issue.
- **The tedious parts.** The date/tag/description migration script, and a fix
  for a batch of **broken image links** that had been quietly 404-ing for years
  (an old bug I'd never gotten around to).
- **CI wrangling.** Diagnosing a failing linter, adjusting the workflows, and
  standing up the GitHub Pages deploy — reading the actual CI logs to figure out
  what broke and why.
- **Previews.** Because there was no public preview URL mid-migration, Claude
  spun up the built site headlessly and sent me **screenshots** (light and dark
  mode) so I could eyeball each change.

What stayed firmly with me: the architectural choices, the copy, and every
push to production. Claude proposed and did the legwork; I decided and merged.

## The result

The site you're on now is static HTML with a sprinkle of JavaScript, builds in
seconds, deploys automatically from `main`, and should need almost no upkeep. A
decade of posts came along for the ride, with their URLs intact — and I picked
up an RSS feed, a sitemap and search along the way.

If you have an ageing static site gathering technical debt, I can recommend both
the destination (Astro) and the method (a careful, phased migration with an AI
pair). More to come.

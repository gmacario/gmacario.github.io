# gmacario.github.io — Astro rebuild (work in progress)

This directory holds the in-progress rebuild of
[gmacario.github.io](https://gmacario.github.io/) as a professional home base,
tracked in [issue #62](https://github.com/gmacario/gmacario.github.io/issues/62).

It is built with [Astro](https://astro.build/) using the
[AstroPaper](https://github.com/satnaing/astro-paper) theme (MIT). During the
migration it lives in this subdirectory so the legacy Next.js site at the repo
root keeps building; at cutover (Phase 5) this becomes the repository root.

## Status

- **Phase 1 — Scaffold ✅**: AstroPaper scaffolded here; site metadata (title,
  description, author, social links) ported from `../config.yml` and the legacy
  `../pages/index.js`. See `astro-paper.config.ts`.
- Phase 2 (content migration), Phase 3 (homepage/pages), Phase 4 (CI/CD) and
  Phase 5 (cutover) are still to come.

## Prerequisites

Node.js 22 (LTS) — see `.nvmrc`.

## Local development

```sh
cd astro-site
npm install
npm run dev
```

Then open the URL printed by Astro (default <http://localhost:4321/>).

## Build

```sh
npm run build      # astro check + astro build + pagefind search index
npm run preview
```

## Credits

Theme: [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing,
licensed under the MIT License (see [`LICENSE`](./LICENSE)).

# gmacario.github.io

[![Deploy Astro site to GitHub Pages](https://github.com/gmacario/gmacario.github.io/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/gmacario/gmacario.github.io/actions/workflows/build-and-deploy.yml)
[![Check links](https://github.com/gmacario/gmacario.github.io/actions/workflows/check-links.yml/badge.svg)](https://github.com/gmacario/gmacario.github.io/actions/workflows/check-links.yml)
[![Netlify Status](https://app.netlify.com/sites/gmacario-blog/status.svg?column=deploys)](https://app.netlify.com/sites/gmacario-blog/deploys)

Gianpaolo Macario's personal website and technical blog — a professional home
base with a bio/CV landing page and a decade of posts.

Built with [Astro](https://astro.build/) using the
[AstroPaper](https://github.com/satnaing/astro-paper) theme.

## Prerequisites

Node.js 22 (LTS) — see [`.nvmrc`](.nvmrc).

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
```

## Build

```sh
npm run build    # astro check + astro build + Pagefind search index -> dist/
npm run preview
```

## Adding content

- Blog posts live in [`src/content/posts/`](src/content/posts) as Markdown.
  The file name becomes the permalink (`/posts/<filename>`).
- Standalone pages (e.g. About) live in
  [`src/content/pages/`](src/content/pages).
- Images and other static assets go under [`public/`](public) and are
  referenced with absolute paths (e.g. `/assets/...`, `/images/...`).

Site-wide configuration (title, author, social links, etc.) lives in
[`astro-paper.config.ts`](astro-paper.config.ts).

## Deployment

### Production

Pushes to `main` are built and deployed to **GitHub Pages** at
<https://gmacario.github.io/> by the
[`build-and-deploy.yml`](.github/workflows/build-and-deploy.yml) workflow
(via [`withastro/action`](https://github.com/withastro/action) and
`actions/deploy-pages`). Pull requests are built for verification but not
deployed.

### Staging & Deploy Previews

The same `main` branch is also deployed to **Netlify** at
<https://blog.gmacario.it/> (connected via the Netlify GitHub integration).
Netlify serves:
- A staging copy of the site for each production deploy.
- **Deploy previews** for every pull request — a unique URL is posted as a PR
  comment so reviewers can interact with the full built site before merging.

Build configuration is declared in [`netlify.toml`](netlify.toml) (config as
code); no repository secrets are used for the deploy.

## Copyright and license

Disclaimer: [IANAL](https://en.wikipedia.org/wiki/IANAL)

Copyright 2006-2026 [Gianpaolo Macario](https://gmacario.github.io/).

The contents of this repository and the executable distribution are licensed
under the terms of the MIT license as detailed in the [LICENSE](LICENSE) file,
with the exception of the `src/content/posts` folder which is licensed under a
Creative Commons Attribution-Share Alike 4.0 License
(<https://creativecommons.org/licenses/by-sa/4.0/>).

![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)

This site uses the [AstroPaper](https://github.com/satnaing/astro-paper) theme
by Sat Naing, distributed under the MIT license; its notice is retained in
[LICENSE-AstroPaper](LICENSE-AstroPaper).

<!-- EOF -->

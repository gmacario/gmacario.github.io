---
title: "Ditching Google Analytics: a beginner's guide to Cloudflare Web Analytics"
pubDatetime: 2026-07-24T00:00:00+02:00
tags:
  - analytics
  - privacy
  - cloudflare
  - astro
  - blog
description: "Why this blog uses Cloudflare Web Analytics instead of Google Analytics, how it compares to GoatCounter, Plausible and Umami, and a step-by-step, newbie-friendly guide to setting it up."
---

I wanted basic traffic numbers for this blog — nothing fancy, just "is anyone
reading this" — without dragging in Google Analytics and everything that comes
with it. Here's the comparison I did, the alternative I picked, and the exact
steps to set it up, in case you want to do the same on your own site.

## Why not just use Google Analytics?

GA4 is free and extremely capable, but for a personal blog it brings baggage
that's disproportionate to the job:

- **It needs a cookie consent banner.** GA sets cookies to track visitors
  across sessions, which means you're legally required (under the EU's
  ePrivacy rules) to ask for consent before it loads. That's a banner, a
  consent-management script, and a worse experience for every reader.
- **It's a lot of machinery for "how many people read this."** A full
  analytics suite, a separate Google account, a dashboard with more options
  than a personal blog will ever need.
- **It ships a fair amount of JavaScript** to a static site that otherwise
  loads almost instantly.

None of that is disqualifying if you need GA's depth — e-commerce funnels,
audience segments, ad attribution. For a blog, it's overkill.

## The alternatives I considered

Before picking one, I compared four options that all describe themselves as
"privacy-friendly": they don't use cookies, don't track individuals across
sites, and don't need a consent banner.

| Option | Cost | Cookies? | Self-hostable? | Notes |
| --- | --- | --- | --- | --- |
| **Cloudflare Web Analytics** | Free, unlimited | No | No | Zero accounts to manage beyond an existing/new Cloudflare login; lightest setup |
| **GoatCounter** | Free for personal use | No | Yes (single Go binary) | Open source, very small script, simple dashboard |
| **Umami** | Free self-hosted / paid cloud | No | Yes (needs Postgres or MySQL) | Nicer dashboard than GoatCounter, a bit more to run yourself |
| **Plausible** | ~$9–14/month | No | Yes (heavier: ClickHouse + Postgres) | The most polished dashboard of the four, but the paid tier or a non-trivial self-host |

One thing ruled out an option I initially considered and skipped from the
table above: **server log-based analytics**. This blog is hosted on **GitHub
Pages**, which is a static file host — it keeps no server access logs at all.
So log-based tools, and anything that only sees requests hitting your own
server (like Netlify's built-in analytics, which would only ever see this
site's *deploy previews*, not real production traffic), were never on the
table. Whatever I picked had to be a small script embedded in the page
itself.

I ended up choosing **Cloudflare Web Analytics**. It's free with no usage
cap, needs no server or database of my own to run, and if you don't already
have a Cloudflare account, creating one is the only "infrastructure" step —
everything else is copypasting one token. GoatCounter is a very close second
and is worth a look if you'd rather not have a Cloudflare account at all.

## Setting it up (step by step)

This assumes a static site — the steps are the same regardless of what
generator you use, though the "where does the token go" part will differ
slightly if you're not using Astro.

### 1. Create a Cloudflare account (skip if you already have one)

Go to [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) and
create a free account. **You do not need to point your domain's DNS at
Cloudflare** — Web Analytics works as a standalone product on any site.

### 2. Add your site to Web Analytics

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, find **Analytics & Logs → Web Analytics**.
3. Click **Add a site**.
4. Enter your site's hostname (for this blog, `blog.gmacario.it`) and save.

### 3. Get your beacon token

After adding the site, Cloudflare shows you a snippet that looks like this:

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "YOUR_BEACON_TOKEN_GOES_HERE"}'
></script>
```

The part you actually need is the **token** — that long hex string inside
`data-cf-beacon`. That's it: there's no username/password pair, no OAuth
flow, no API key to generate separately. The token is the credential, and
it's meant to be public — it's sitting in plain sight in every page's HTML,
by design, so there's nothing to keep secret about it.

If you just want the snippet on a plain HTML site, you can stop here: paste
that `<script>` tag right before `</body>` on every page and you're done.

### 4. Wiring it into an Astro site (what this blog does)

Because this is a static site built and deployed by CI, hardcoding the token
into a template isn't quite the best move — it would mean **every** build,
including PR preview builds on Netlify, sends traffic to the same analytics
dashboard, mixing real visitors with my own testing. Instead:

1. **Declare the token as an environment variable**, not a hardcoded string,
   using Astro's typed env schema (`astro.config.ts`):

   ```ts
   env: {
     schema: {
       PUBLIC_CLOUDFLARE_BEACON_TOKEN: envField.string({
         access: "public",
         context: "client",
         optional: true,
       }),
     },
   },
   ```

2. **Read it in the site config**, falling back to `undefined` when unset —
   so the beacon is simply skipped if nothing is configured:

   ```ts
   analytics: {
     cloudflareBeaconToken:
       userConfig.analytics?.cloudflareBeaconToken ||
       PUBLIC_CLOUDFLARE_BEACON_TOKEN,
   },
   ```

3. **Render the script tag conditionally** in the shared page layout, only
   when a token is present and only in production builds:

   ```astro
   {
     cfBeaconToken && (
       <script
         is:inline
         defer
         src="https://static.cloudflareinsights.com/beacon.min.js"
         data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
       />
     )
   }
   ```

4. **Set the actual token as a repository variable** in GitHub (Settings →
   Secrets and variables → Actions → Variables), named
   `PUBLIC_CLOUDFLARE_BEACON_TOKEN` — a **variable**, not a secret, since (as
   noted above) the token ends up in public page HTML anyway.

5. **Pass it only to the production deploy job**, not to preview builds:

   ```yaml
   - name: Build Astro site
     uses: withastro/action@v3
     env:
       PUBLIC_CLOUDFLARE_BEACON_TOKEN: ${{ vars.PUBLIC_CLOUDFLARE_BEACON_TOKEN }}
   ```

The result: production (GitHub Pages) carries the beacon; Netlify staging
and PR preview deploys never get the variable, so they never send data to
the dashboard, and my own clicking-around during testing doesn't skew the
numbers.

### 5. Check that data is arriving

Give it a few minutes after your next deploy, then visit **Analytics & Logs
→ Web Analytics** in the Cloudflare dashboard and pick your site. You should
start seeing page views, top pages, referrers and country-level breakdowns —
no cookies, no consent banner, no personal data collected.

## The honest caveat

This site uses Astro's [View
Transitions](https://docs.astro.build/en/guides/view-transitions/)
(`<ClientRouter />`), which means navigating between pages swaps the DOM
instead of triggering a full browser page load. I haven't yet confirmed
whether Cloudflare's beacon correctly counts those in-page navigations as
separate page views, or whether it only sees the very first load. If your
site uses view transitions or a similar client-side router, it's worth
checking your numbers against expectations once real traffic arrives, rather
than assuming it "just works."

## Bottom line

If you run a personal site on a static host and want a rough sense of who's
reading without becoming a part-time analytics administrator, Cloudflare Web
Analytics (or GoatCounter, if you'd rather avoid another platform account) is
a five-minute job that never needs a cookie banner. Save Google Analytics for
when you actually need what only it provides.

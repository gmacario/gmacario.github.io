import { defineAstroPaperConfig } from "./src/types/config";

// Site metadata ported from the legacy Next.js site during the Astro migration
// (see issue #62). Sources:
//   - config.yml     -> title, description, socials (github, twitter/x)
//   - pages/index.js -> author, LinkedIn profile
// Homepage copy and the bio/CV landing page are refined in Phase 3.
export default defineAstroPaperConfig({
  site: {
    // Target custom domain for the rebuilt site (see issue #62 hosting decision).
    url: "https://blog.gmacario.it/",
    title: "gmacario.github.io",
    description: "Gianpaolo Macario's public rants",
    author: "Gianpaolo Macario",
    profile: "https://github.com/gmacario",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Rome",
    dir: "ltr",
  },
  posts: {
    // Homepage shows the 10 most recent posts (surviving idea from the 2015 plan).
    perPage: 10,
    perIndex: 10,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    // Static OG image (public/default-og.jpg) instead of per-post generated
    // images: keeps the build deterministic and free of a build-time Google
    // Fonts fetch. OG image artwork is revisited in Phase 3.
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    // "Edit page" links are off for now; can be enabled with the repo edit URL.
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/gmacario" },
    { name: "x", url: "https://x.com/gpmacario" },
    { name: "linkedin", url: "https://it.linkedin.com/in/gmacario/" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});

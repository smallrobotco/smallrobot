# smallrobotco

The Small Robot Co. website — [smallrobot.co](https://smallrobot.co).

A Nuxt 4 site, prerendered to static HTML and self-hosted behind Apache. There is no
CMS: landing pages are markup in `app/pages/`, and blog posts are Markdown files under
`content/`. Rewritten in 2026 from the previous Ember 3.22 app; the content came out of
its Drupal backend, now retired.

## Requirements

Node 24 (active LTS), pinned in `.tool-versions`. Node 25 is *not* supported by Nuxt 4.

```sh
asdf install          # or otherwise get Node 24 on PATH
npm install
```

No environment variables or secrets are needed to build.

## Landing pages

Each page in `app/pages/` is markup: a stack of `<PageSection>` bands (background,
overlay, hero, divider and row alignment are its props), each holding Bootstrap grid
columns (`<div class="col-12 col-md-6">`) of plain HTML. An empty column is a spacer. The call to action and the client logo carousel that
end most pages are `<CtaSection />` and `<ClientsSection />`; the logos themselves are
SVG files in `app/assets/clients/`. Edit the `.vue` file and the change is live in
`npm run dev`.

## Blog posts

| File | Becomes |
|---|---|
| `content/articles/<slug>.md` | `/ideas/<slug>`, and an entry in the `/ideas` listing (newest `date` first) |
| `content/people/<slug>.yml` | an article author, referenced by `author: <slug>` |
| `public/img/content/` | images used by posts, referenced as `/img/content/<file>` |

A post is Markdown with a block of fields at the top:

```md
---
title: Why we still like static sites
date: 2026-11-23T09:00:00-08:00
author: trent-stromkins
navColor: nav-light            # light nav and title, for a dark hero
heroBackgroundUrl: https://…   # optional hero image
heroColor: background-black    # background-* class behind the hero
heroLayout: hero-center        # or hero-left
heroOverlay: overlay-black     # overlay-* wash over the image
---

The body, in **Markdown**. HTML works too — the older posts are HTML from the CMS.
```

Set `draft: true` to keep a post in the repo but off the site. New posts need nothing
else: the prerender crawler finds them through the `/ideas` listing.
`shared/types/content.ts` documents every field.

Posts are validated strictly (`server/content/parse.ts`): a misspelled field, a bad date
or a missing author fails `npm test` and `npm run generate` with the file and field
named, instead of quietly rendering wrong.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run generate` | Prerender the whole site to static files in `.output/public` |
| `npm run preview` | Serve the built output locally |
| `npm test` | Unit tests (vitest) — validates every blog post in `content/` |
| `npm run typecheck` | `nuxt typecheck` |
| `npm run diff:prod` | Compare a local build's text content against the live site, route by route |
| `npm run diff:structure` | Compare DOM structure against the live site |
| `npm run build` | Server build (not used — we deploy static output) |

Both diff commands need a `npm run generate` first. They exist as deploy verification:
the live site is prerendered too, so these are real HTML comparisons of what you built
against what is serving.

`diff:structure` matters because this site's CSS is unusually sensitive to DOM shape —
several stylesheet rules key off wrapper elements and `:nth-child()` parity, so a lost
wrapper silently unstyles whole sections without changing any text.

## Architecture notes

- **Fully static.** Blog posts are read at build time by small Nitro routes
  (`server/api/`, via `app/composables/useContent.ts`) and rendered from Markdown there.
  Each prerendered route carries its data in a `_payload.json`, which client-side
  navigation reads; the API routes are never deployed or called in production. Any
  change — page or post — is a commit and a deploy.
- **Styles are Bootstrap 5 (npm) plus the site's own SCSS** in `app/assets/scss/`.
  `_variables.scss` holds the design tokens and every Bootstrap default the site
  overrides; `_bootstrap.scss` loads only the Bootstrap modules in use (reboot, type,
  grid, buttons, utilities — no JS components); `global/_bootstrap-overrides.scss` has
  the few changes variables can't express (heading scale, link underlines, buttons).
- **`public/.htaccess` ships with the site** and carries the redirects, cache tiers,
  compression, and the 404 handling (`/404/index.html` is the fully styled page from
  `app/pages/[...slug].vue`, prerendered explicitly — see `nitro.prerender.routes`).
- **`public/sw.js` is a kill switch**, not a service worker: the previous site
  registered an aggressive offline cache, and this file unregisters it from returning
  visitors' browsers. Keep it served with `no-cache` (the htaccess does).
- **The contact form is intentionally absent** pending a backend. The old one posted to
  Netlify Forms; without that platform it would report success while discarding the
  message. Phone and email links are live on the contact page instead.
## Deployment

CI builds, tests, and deploys `.output/public` to the web host by rsync over SSH — on
every push to `main`, and manually via *Actions → CI → Run workflow* from any branch.
Configuration lives entirely in repository secrets (Settings → Secrets → Actions):

| Secret | Meaning |
|---|---|
| `DEPLOY_SSH_KEY` | private half of a dedicated deploy keypair |
| `DEPLOY_HOST` | server hostname or address |
| `DEPLOY_USER` | unprivileged deploy user that owns the docroot |
| `DEPLOY_PATH` | absolute path of the document root |

Server expectations: Apache with `AllowOverride All` on the docroot (everything else
the site needs arrives in the `.htaccess`), and the deploy key's public half in the
deploy user's `~/.ssh/authorized_keys`.

# smallrobotco

The Small Robot Co. website — [smallrobot.co](https://smallrobot.co).

A Nuxt 4 front end over a Drupal JSON:API backend at `api.smallrobot.co`, prerendered
to static HTML and self-hosted.

## Status: mid-migration

This branch (`vue`) is a rewrite of the previous Ember 3.22 app, which had been frozen
since March 2022 and could no longer be built. See
[docs/UPGRADE-PLAN.md](docs/UPGRADE-PLAN.md) for the audit and rationale, and
[docs/API-SCHEMA.md](docs/API-SCHEMA.md) for the Drupal API as it actually behaves.

The old Ember app lives in [`legacy/`](legacy/) for reference while porting, and gets
deleted once the port is verified complete. **Do not add features there.**

**Done:** data layer, styles and assets, routes, sections, header/footer/nav, head and
social meta, the slideshow carousel. All 13 routes prerender, at 96–99% text parity with
production (`npm run diff:prod`).

**Outstanding:**

1. **The contact form** — needs a backend before it can ship. It used Netlify Forms, and
   on Apache it would report success while silently discarding the message. Blocking for
   cutover; see [docs/UPGRADE-PLAN.md](docs/UPGRADE-PLAN.md) §5a.
2. **A visual pass** — text parity is verified, layout is not.
3. **Delete `legacy/`** once 1 and 2 are settled.
4. **Hosting** — Virtualmin vhost, `.htaccess` SPA fallback, TLS, rsync deploy, and the
   three `smallrobot.org` → `smallrobot.co` 301s.

## Requirements

Node 24 (active LTS), pinned in `.tool-versions`. Node 25 is *not* supported by Nuxt 4.

```sh
asdf install          # or otherwise get Node 24.19.0 on PATH
npm install
```

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run generate` | Prerender the whole site to static files in `.output/public` |
| `npm run preview` | Serve the built output locally |
| `npm test` | Unit tests (vitest) — the JSON:API normalizer, against real captured fixtures |
| `npm run typecheck` | `nuxt typecheck` |
| `npm run diff:prod` | Compare generated text content against live production, route by route |
| `npm run build` | Server build (not used — we deploy static output) |

`npm run diff:prod` needs a `npm run generate` first. It is the main check that the
port did not drop content — both this build and production are prerendered, so it
compares real HTML. Expect small differences: the footer text changed deliberately,
the contact form is absent on purpose, and production is a stale prerender whose CMS
content predates the current build.

`npm run generate` is the one that matters: it produces plain HTML/CSS/JS for the
Apache host, and it replaces the old `prember` + `ember-cli-fastboot` +
`prember-crawler` stack.

## Deployment

Not yet wired up. Target is a self-hosted VPS managed by Virtualmin, replacing Netlify.
Before cutover, see the blockers in
[docs/UPGRADE-PLAN.md §5a](docs/UPGRADE-PLAN.md) — in particular the contact form,
which currently depends on Netlify Forms and will fail *silently* on Apache.

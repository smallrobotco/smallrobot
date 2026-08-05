# smallrobotco

The Small Robot Co. website — [smallrobot.co](https://smallrobot.co).

A Nuxt 4 front end over a Drupal JSON:API backend at `api.smallrobot.co`, prerendered
to static HTML and self-hosted.

## Status: mid-migration

This branch (`vue`) is a rewrite of the previous Ember 3.22 app, which had been frozen
since March 2022 and could no longer be built. See
[docs/UPGRADE-PLAN.md](docs/UPGRADE-PLAN.md) for the audit and rationale.

The old Ember app lives in [`legacy/`](legacy/) for reference while porting, and gets
deleted once the port is verified complete. **Do not add features there.**

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
| `npm run build` | Server build (not used — we deploy static output) |

`npm run generate` is the one that matters: it produces plain HTML/CSS/JS for the
Apache host, and it replaces the old `prember` + `ember-cli-fastboot` +
`prember-crawler` stack.

## Deployment

Not yet wired up. Target is a self-hosted VPS managed by Virtualmin, replacing Netlify.
Before cutover, see the blockers in
[docs/UPGRADE-PLAN.md §5a](docs/UPGRADE-PLAN.md) — in particular the contact form,
which currently depends on Netlify Forms and will fail *silently* on Apache.

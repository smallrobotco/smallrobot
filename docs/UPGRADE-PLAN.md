# smallrobotco — Modernization Audit & Upgrade Plan

Audit date: 2026-08-04. No code changed; this is an assessment.

## TL;DR

The app is **4 years frozen** (last commit 2022-03-11) but **still in production** —
`smallrobot.co` and `api.smallrobot.co` both return 200.

It **cannot be built on this machine today**: `package.json` pins Node `12.20.1` via
Volta, Volta is not installed, and the system Node is v25.

**Recommendation: re-scaffold on Ember 7, don't do six sequential LTS hops.** The app is
small enough (~35 hand-written source files) that a fresh `ember new` plus a port beats
upgrading through 3.28 → 4.4 → 4.8 → 4.12 → 5.x → 6.x → 7.x.

### Two decisions (2026-08-04) that cut most of the risk out

1. **No offline/PWA support is needed** → all four `ember-service-worker-*` packages
   (last published **2018–2019**) are simply **deleted**, not replaced.
2. **Prerendering existed to serve SEO from a static host** → moving to a VPS with Node
   available means `prember` + `prember-crawler` (2019) can go too.

Those were the seven most-abandoned packages in the tree and the reason a hop-by-hop
upgrade looked painful. With them gone, **every remaining dependency is either actively
maintained or trivially droppable** — which makes the re-scaffold clean.

⚠️ One correction worth flagging — see §5a. Dropping prerender does **not**
automatically preserve SEO. Prerender wasn't what made Netlify work (the
`/* → /index.html 200` rule does that); it was there so crawlers get real HTML rather
than an empty SPA shell. That concern follows you to any host. The recommended fix is a
small Puppeteer prerender step in CI (**Option D**) — static output, Virtualmin-native,
zero abandoned addons. Serving a plain SPA is a fine choice too, just make it knowingly.

**Virtualmin:** fine for static hosting (`public_html` + built-in Let's Encrypt), but a
poor fit for a long-lived Node/FastBoot process — which is another reason Option D beats
live SSR here.

Estimate: **2–3.5 days** re-scaffold (down from 3–5), vs 5–8 days hop-by-hop.

**Migrating to Vue/Nuxt instead is also genuinely viable** (~4–6 days) — see §5b. The
gap is narrow because the Ember 7 path is *already* a near-total rewrite: 10 of the 12
components are empty shells, and every component and model has to be rewritten either
way. Nuxt's `nuxt generate` would also make the prerender problem vanish outright.

🚨 **Blocker found, independent of framework choice:** the contact form uses **Netlify
Forms**. On a VPS it fails *silently while showing a success message*. Must be replaced
before cutover — see §5a. Also export existing submissions from Netlify first.

---

## 1. Current state

| Thing | Pinned | Current | Age |
|---|---|---|---|
| ember-source | `~3.22.0` | 7.1.0 | Oct 2020 → 4 majors behind |
| ember-data | `~3.23.0` | 5.8.2 | 2 majors behind |
| ember-cli | `~3.22.0` | 7.1.0 | |
| Node | `12.20.1` (Volta) | 22/24 LTS | Node 12 EOL Apr 2022 |
| ember-auto-import | `^1.8.0` | 2.13.1 | 1.x blocks modern addons |
| yarn.lock | Mar 2022 | — | |
| browserslist | targets `ie 11` | — | IE11 EOL Jun 2022 |

CI is dead twice over: `.circleci/config.yml` uses `circleci/node:8.0.0`,
`.travis.yml` uses Node 6. Both need replacing (GitHub Actions).

`yarn audit`: **1063 advisories** (117 critical, 611 high) across 3371 packages.
**Important caveat:** this is overwhelmingly *build-time* tooling (Broccoli, Babel 6,
old Webpack). The site is prerendered to static HTML and served by Netlify, so almost
none of it reaches a browser. Treat this as a build-supply-chain concern, not a live
site vulnerability — it does **not** justify an emergency patch-only pass.

### Junk dependencies

`dependencies` contains three packages that are certainly typo'd installs from someone
running `npx`/`update` commands. They are not imported anywhere:

```
"npx": "^10.2.2",  "to": "^0.2.9",  "update": "^0.7.4"
```

Delete these regardless of which path is chosen.

---

## 2. What the app actually is

Reassuringly small. Application code barely touches the ecosystem — the only non-Ember
runtime imports in `app/` are `fetch` and `rsvp`.

| | Count | Notes |
|---|---|---|
| Models | 16 | all classic `Model.extend({...})` |
| Components | 12 | **all classic `@ember/component`**, zero Glimmer |
| Routes | 10 | |
| Controllers / serializers / adapter / validations / helper | 7 | |
| Templates | 24 | |
| SCSS — yours | ~10 | `app/styles/{global,components}` + `app.scss` |
| SCSS — vendored Bootstrap 4 | 84 | version-independent Sass, port as-is |
| Test files | 55 | mostly default blueprint stubs; verify real coverage |

Template helper usage is tiny — `html-safe` ×5, `eq` ×2, `or` ×2, `v-get` ×1,
`flash` ×1, `action` ×3, `link-to` ×4. Everything else is `if`/`each`/`yield`.

### Octane readiness

Zero `@glimmer/component`, zero native class syntax, zero tracked properties. All 12
components are classic, and 3 models use `computed()`. `jquery-integration` is already
`false` and there is no jQuery in app code — that part is already done.

This is the main body of work in either path: 12 components + 16 models to convert.
At this size that is genuinely tractable.

---

## 3. Addon triage

### 3a. DROP — not used anywhere in `app/`

Verified by grepping templates and JS for each addon's helpers/components/imports.
This is the single biggest lever on effort — it removes 12 upgrade problems for free.

| Addon | Evidence |
|---|---|
| `ember-composable-helpers` | no `map-by`/`filter-by`/`sort-by`/`pipe`/etc. in any template |
| `ember-concurrency` | no import, no `task(` anywhere |
| `ember-hammertime` | no `touchAction` usage; last publish **2018-10** |
| `ember-scroll-to` | no `scroll-to` usage; last publish **2018-12** |
| `ember-href-to` | no `href-to` usage |
| `ember-cli-document-title` | no `titleToken`; superseded by `ember-cli-head`, which *is* used |
| `ember-cli-shims` | obsolete since Ember 3.x |
| `ember-maybe-import-regenerator` | obsolete |
| `ember-export-application-global` | dev-only relic |
| `ember-cli-eslint` | replaced by plain `eslint` (already in `lint:js` script) |
| `ember-cli-template-lint` | replaced by plain `ember-template-lint` (already in `lint:hbs`) |
| `ember-cli-uglify` | Terser is built into ember-cli now |
| `npx`, `to`, `update` | typo'd installs |

### 3b. DELETE — obsoleted by the two decisions above

No replacement needed. This is the bulk of the risk reduction.

| Addon | Last publish | Why it can go |
|---|---|---|
| `ember-service-worker` | **2020-10** | no offline requirement |
| `ember-service-worker-asset-cache` | **2018-12** | " |
| `ember-service-worker-cache-fallback` | **2018-12** | " |
| `ember-service-worker-prember` | **2019-01** | " — and its prember bridge is moot too |
| `prember` | 2024-07 | no static-host prerender step; also still wants `ember-cli-babel@^7` |
| `prember-crawler` | **2019-05** | route discovery only existed to feed prember |
| `ember-cli-netlify` | **2020-06** | leaving Netlify; rules move to nginx/Caddy config |

Also delete from `ember-cli-build.js`: the `ember-service-worker`, `asset-cache`,
`esw-cache-fallback`, `esw-prember`, and `prember` config blocks, plus the
`const crawl = require('prember-crawler')` import — that's roughly half the file.
And delete `.netlifyheaders` / `.netlifyredirects`.

`ember-cli-fastboot` (2024-05) is **conditional**: needed only if you choose live SSR
(Option B in §5a), deleted under Option C. It's the one remaining compat unknown.

### 3c. REPLACE — abandoned but the feature is still in use

| Addon | Last publish | Used at | Replacement |
|---|---|---|---|
| `ember-ajax` | 2022-11 | `app/adapters/application.js` | native `fetch` (deprecated by its own maintainers) |
| `ember-load` | **2019-01** | `app/app.js` | Ember's own loading substates |
| `ember-cli-swiper` | **2021-06** | `slideshow-block.hbs` | `swiper` package directly via `ember-auto-import` 2 |
| `ember-burger-menu` | 2022-06 | `application.hbs` | try v4 first; else hand-roll (it's just a nav drawer) |
| `ember-router-scroll` | **2021-11** | `app/router.js` | v4.1.2, or Ember's built-in scroll restoration |
| `ember-web-app` | **2020-10** | manifest generation | v5.0.1 may still work, or emit `manifest.webmanifest` by hand |
| `ember-cli-autoprefixer` | v1.0.3 | build | `ember-cli-postcss`, or drop — post-IE11 the Bootstrap 4 prefixes are largely moot |

### 3d. KEEP — actively maintained, just bump

`ember-cli-head` (2.0.0, used in 10 routes) · `ember-cli-flash` (7.0.0) ·
`ember-cp-validations` (7.0.0) · `ember-truth-helpers` (5.0.0) ·
`ember-cli-string-helpers` (8.0.1) · `ember-cli-image-transformer` (7.1.1) ·
`ember-cli-app-version` (7.0.0) · `ember-cli-sass` → `ember-cli-sass` 11 or `sass` +
`ember-cli-postcss` · `ember-resolver` (13) · `ember-qunit` (9) · `qunit-dom` ·
`ember-cli-dependency-checker` · `ember-route-action-helper` (used in `contact.hbs`;
tiny, inline it if it breaks) · `ember-hbs-minifier` (1.3.0, optional).

---

## 4. Recommended path — re-scaffold on Ember 7

### Why not `ember-cli-update` hop-by-hop

Six majors of hops (3.28 → 4.4 → 4.8 → 4.12 → 5.4 → 5.12 → 7.x) each require a working
`yarn install` and a green build at every step. But the prember/FastBoot/service-worker
stack is broken at *step one* and has to be replaced no matter what — so you'd be
carrying dead weight through every hop and resolving blueprint conflicts six times, for
an app with only ~35 real source files. The hops earn their keep on large apps with deep
addon trees; this isn't one.

### Phase −1 — Revive the current build, then migrate hosting (½–1 day)

Do this *before* touching the framework, so the hosting move is validated against
known-good output (§5a).

1. `nvm install 12.20.1 && nvm use 12.20.1` — Intel Mac, official `darwin-x64` build.
2. `yarn install` (lockfile is intact from Mar 2022, so this should resolve cleanly).
3. `yarn build` and confirm `dist/` matches what's live.
4. Delete the three junk deps (`npx`, `to`, `update`) — safe, nothing imports them.
5. Stand up the Virtualmin virtual server, `.htaccess`, TLS, and the rsync deploy.
   Point a staging subdomain at it and diff against production.
6. Cut over DNS only once staging matches.

If step 2 or 3 fails unexpectedly, stop and reassess the order — that would be the one
signal that upgrading first is more pragmatic.

### Phase 0 — De-risk (½ day, **only if choosing SSR / Option B**)

Skip entirely under Option C (no SSR) — there's nothing left to de-risk, since every
other dependency is maintained.

If you want SSR on the VPS:

1. `ember new srco7 --typescript=false`, then add `ember-cli-fastboot`.
2. Add one route that fetches from `https://api.smallrobot.co/api`, serve it via
   `fastboot-app-server`, and confirm `curl` returns fully-rendered HTML.
3. **Works** → proceed, Option B is viable. **Doesn't** → fall back to Option C and
   accept the SEO trade, or add a Puppeteer prerender step in CI (keeps static
   serving and real HTML for crawlers, with no abandoned Ember addons involved).

### Phase 1 — Scaffold (½ day)
- `ember new` on Ember 7 / ember-cli 7, Node 22 LTS, `pnpm` or `yarn` 4.
- `.nvmrc` → 22 (drop the inert Volta pin, or install Volta and pin properly).
- `browserslist` → `defaults`, drop `ie 11`.
- Port `config/optional-features.json` (all three settings are already modern).
- GitHub Actions workflow: lint + test + build. Delete `.circleci/`, `.travis.yml`,
  `Jenkinsfile` (three dead CI configs).

### Phase 2 — Port styles (½ day)
Copy `app/styles/` wholesale — 84 vendored Bootstrap 4 files plus ~10 of yours. Sass is
framework-independent so this should be near-zero-risk. Confirm `ember-cli-sass` 11 or
switch to `sass` + `ember-cli-postcss`.

### Phase 3 — Port data layer (1 day)
- 16 models: `Model.extend({...})` → native classes with `@attr` / `@belongsTo` /
  `@hasMany`. Decide Ember Data 5.x vs the newer WarpDrive-style request layer —
  for 16 read-mostly models against a Drupal JSON API, classic `@ember-data/model`
  is the lower-risk choice.
- `app/adapters/application.js`: strip `ember-ajax`, use native `fetch`.
- Port the 2 serializers, and `app/validations/contact.js` (`ember-cp-validations` 7).
- 3 models use `computed()` → getters.

### Phase 4 — Port components & templates (1–1.5 days)
- 12 classic components → `@glimmer/component` + `@tracked`. Watch for implicit
  wrapper-div reliance: classic components render a `<div>`, Glimmer ones don't, so
  check the SCSS selectors for each converted component.
- `{{action}}` (3 uses) → `{{on}}` + `@action`.
- Replace `ember-cli-swiper` in `slideshow-block.hbs` with the `swiper` package.
- Replace or re-validate `ember-burger-menu` in `application.hbs`.
- Replace `ember-load` in `app.js` with Ember loading substates.
- 24 templates otherwise port largely as-is (`if`/`each`/`link-to` are stable).

### Phase 5 — Build output & hosting (½ day)

Much smaller now that offline and prember are gone.

- **Nothing to do for offline** — service-worker layer deleted outright. Confirm no
  stale SW is still registered in returning visitors' browsers: ship a tiny
  unregister shim once, or accept that the old SW's cache expires. Worth checking,
  since a stale service worker can pin users to the old site indefinitely.
- Port the `ember-cli-image-transformer` icon/splash config from `ember-cli-build.js`
  (the only config block worth keeping).
- Enable **fingerprinting** (currently `fingerprint: { enabled: false }`) so assets
  can take `immutable` cache headers.
- Emit the SPA fallback + cache headers for the target server — see §5a.
- Delete `.netlifyheaders` / `.netlifyredirects`. Note the current file sets
  `Content-Encoding: gzip` manually without gzipping the body; do not carry that over.

### Phase 6 — Tests & cutover (½ day)
- The 55 test files are largely blueprint stubs; audit what's real and port that.
  Don't spend time regenerating stubs that assert nothing.
- Visual diff every route against production before DNS/deploy cutover.
- Deploy to a Netlify preview branch first.

---

## 5a. Hosting: Netlify → self-hosted VPS managed by Virtualmin

Currently Netlify (`ember-cli-netlify`, `.netlifyheaders`, `.netlifyredirects`, `CNAME`).
Target is your own VPS running **Virtualmin** for host management.

**Short answer: Virtualmin is not a problem for a static build, but it is a real
argument against live SSR.**

### Why Virtualmin pushes toward static

Virtualmin is a Webmin-based panel built around Apache (nginx is supported but less
common) and oriented toward PHP hosting. Two consequences:

- **Static files: trivially easy.** A Virtualmin virtual server gives you a
  `public_html` under `/home/<domain>/`. Deploying is just landing `dist/` there.
  Let's Encrypt is built into Virtualmin, so TLS renewal is handled — this removes the
  main reason I'd otherwise have suggested Caddy. **Use Apache as Virtualmin manages
  it; don't introduce Caddy alongside**, as a second web server fighting Virtualmin's
  port 80/443 ownership is exactly the kind of config drift panels handle badly.
- **A persistent Node process: friction.** Virtualmin has no first-class story for
  running and supervising a long-lived Node service. You'd hand-write a systemd unit
  plus an Apache `ProxyPass` into the vhost — and Virtualmin regenerates vhost config
  when you change domain settings, which can silently clobber manual directives. It's
  doable (Virtualmin supports custom directive blocks that survive regeneration), but
  it's ongoing maintenance in exchange for SSR.

### Revised recommendation

| Option | Virtualmin fit | Verdict |
|---|---|---|
| **A. `prember` prerender → static** | good | ✗ Keeps two abandoned 2019-era packages. Superseded by D. |
| **B. Live FastBoot SSR** | **poor** | ✗ Fights the panel; needs systemd + proxy; FastBoot-on-Ember-7 unverified. |
| **C. Plain SPA, no SSR** | excellent | Viable, simplest — but loses crawler-visible HTML. |
| **D. Static + Puppeteer prerender in CI** | excellent | ✅ **Recommended.** |

**Option D** is the best fit: keep SEO-visible HTML, keep the server dumb and
Virtualmin-native, and depend on zero abandoned Ember addons. A GitHub Actions step
builds the app, launches it headless, walks the route list, and writes real HTML per
route into `dist/`. The prerender logic lives in CI where breakage can't take the site
down, and it replaces `prember` + `prember-crawler` + `ember-cli-fastboot` with a
~40-line script you control.

If you'd rather not maintain even that, **Option C** is honest and fine — just decide it
knowingly. Worth pulling Search Console / analytics first to see what share of traffic
is organic search; for a company marketing site it's usually enough to matter.

This also means **Phase 0 can be skipped** — under D there's no FastBoot dependency to
validate.

### ⚠️ Netlify coupling that must be replaced before cutover

I initially under-scoped this. The app depends on Netlify *platform features*, not just
static hosting. `public/netlify.toml` plus the contact route reveal four:

**1. Netlify Forms — the contact form. This is the serious one.**
`app/templates/contact.hbs:74` renders `<form name="contact" ... netlify>`, and
`app/routes/contact.js` POSTs to `/` with `form-name: contact`. That's Netlify's
form-capture feature; there is no backend of your own.

On Apache with the SPA fallback, `POST /` returns `index.html` with **200 OK** — so
`fetch` resolves, `_successMessage()` fires, and the visitor is told *"Thanks for
contacting us! We'll be in touch shortly."* while the message is silently discarded.
**Silent data loss with a success message** — the worst possible failure mode, and it
would not show up in any visual diff.

Needs a real replacement before cutover. Options: a small PHP mail handler (Virtualmin
already runs PHP and manages mail, so this is the path of least resistance), Formspree
or similar, or a serverless function. Whichever you pick, also fix the error handling —
the current code treats any non-throwing response as success, so it should check
`response.ok`.

**2. `smallrobot.org` → `smallrobot.co` 301 redirects.** Three rules covering
http/https and www. These are live SEO redirects; drop them and you lose that domain's
link equity. Port to Apache `Redirect 301` / `RewriteRule`, and note Virtualmin will
need `smallrobot.org` configured as a domain (or alias) to answer for it at all.

**3. `/api/*` → `https://api.smallrobot.co/api/*` proxy** (`force = true`). Appears
**vestigial** — `config/environment.js` sets `host: 'https://api.smallrobot.co'` in
every environment, so the app calls Drupal directly and never uses this path. Verify
with the browser network tab against production before dropping it; if something does
rely on it, it needs `mod_proxy` in Apache.

**4. `fastboot.hostWhitelist`** — lists `smallrobot.co`, `dev.smallrobot.co`,
`localhost`. Only relevant if you keep FastBoot; add the staging hostname if so.

Add discovery of any *other* Netlify-side configuration to Phase −1: check the Netlify
dashboard for environment variables, build plugins, custom headers, form-notification
email addresses, and DNS records not represented in the repo. **Export the existing form
submissions before you decommission the site** — they live only in Netlify.

### What self-hosting requires

- **SPA fallback**: the existing `/*  /index.html  200` becomes, in `.htaccess`
  (convenient — no panel access needed, and it deploys with the app):
  ```apache
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ /index.html [L]
  ```
  Under Option D, prerendered files exist on disk, so the `-f` check serves them and
  the fallback only fires on a genuine miss.
- **Compression**: enable `mod_deflate`/`mod_brotli`. Do **not** carry over the manual
  `Content-Encoding: gzip` header — declaring it without gzipping the body serves
  corrupt files.
- **Caching**: after fingerprinting is enabled (Phase 5), `immutable` on `/assets/*`,
  `no-cache` on HTML.
- **Deploy**: GitHub Actions → `rsync` over SSH to `public_html`. Build in CI, never on
  the VPS, so a failed build can't take the site down. Use a dedicated deploy SSH key,
  and mind that Virtualmin expects files owned by the domain's user — set `rsync
  --chown` or deploy *as* that user.
- **What you take on that Netlify did for free**: CDN/edge caching (put Cloudflare in
  front — also covers DDoS), atomic deploys and instant rollback (rsync to a
  timestamped dir + symlink swap), and deploy previews.
- **Backups**: Virtualmin's own backup system covers `public_html`, but the site is
  fully reproducible from git — the thing actually worth backing up is the Drupal
  database behind `api.smallrobot.co`.

**Sequencing: do the hosting migration and the Ember upgrade as two separate changes,
hosting first.** Migrating hosting first — on the current, known-good build — validates
Virtualmin, Apache rewrites, TLS, and the deploy pipeline against output you already
know renders correctly. Then upgrade the framework against a deploy path you trust.
Doing both at once means a broken page gives you no way to tell which change caused it.

The machine is **Intel (x86_64)** and Node 12.20.1 has official `darwin-x64` builds, so
there's no Apple-Silicon obstacle to reviving the old build.

**Correction:** an earlier draft said nvm was already installed at
`/usr/local/bin/nvm`. It is not — that path holds the decoy `nvm` *npm package*, which
only prints "This is not the package you are looking for" (the same class of accidental
global install as the `npx`/`to`/`update` junk deps). No version manager was usable.
`asdf` 0.19 was installed but had no nodejs plugin; that plugin is now added, with
**Node 24.19.0** installed and pinned in `.tool-versions` for the Nuxt app. Reviving the
Ember build would need `asdf install nodejs 12.20.1` in `legacy/`.

**Superseded:** the order below was overtaken by the decision to build the Nuxt app
first and stand up the server afterward. Hosting work now happens after the port, not
before it, so the framework rewrite is validated against Netlify-equivalent output
locally (`npm run generate` + `npm run preview`) rather than against a live VPS. The
§5a hosting requirements and blockers all still apply — only the ordering changed.

Note the deploy artifact differs between the two steps: the current build still emits
prember-prerendered HTML, so the Apache config you validate in step one is the
`-f`-check version described above. That's the same config Option D wants afterward —
which is convenient, and another reason to prefer D over a plain SPA.

## 5. Open questions for you

**Resolved 2026-08-04:** offline/PWA not needed (delete SW layer) · prerender was a
static-host workaround (drop prember) · hosting → self-hosted VPS on Virtualmin.

Still open:

0. **Framework: Ember 7 or Nuxt?** See §5b. Both viable; ~2–3.5 days vs ~4–6. Decide
   this first, since it determines whether Phases 0–6 apply at all. Note that if you
   choose Nuxt, question 1 below becomes moot — `nuxt generate` handles it natively.
1. **SEO: Option D or C?** (Ember path only.) Do you want prerendered HTML for crawlers (Option D,
   ~40-line CI script) or is a plain SPA acceptable (Option C)? Check what share of
   traffic is organic search before deciding. This is the last decision that changes
   the plan's shape.
2. **Is the Drupal backend also being maintained?** A 2022-era Drupal at
   `api.smallrobot.co` may have its own EOL problem, and its JSON API shape constrains
   the Ember Data choice in Phase 3.
3. **Is Drupal moving to the same VPS?** Co-hosting adds PHP-FPM + MySQL to the
   Virtualmin setup — very much Virtualmin's home turf, but a separate project.
4. **TypeScript?** Ember 7 blueprints support it. Adding it during the port is cheap;
   retrofitting later is not.
5. **Keep vendored Bootstrap 4?** It's 84 files you don't control. Bootstrap 5, or
   trimming to just what these 10 components use, could be folded into Phase 2 — but
   it's scope creep and it's the main thing that could balloon the visual-diff work.

## 5b. Alternative: migrate to Vue / Nuxt instead of upgrading Ember

**Verdict: yes, this is genuinely viable — more so than it sounds — and the cost gap is
narrower than you'd expect. Roughly 4–6 days vs 2–3.5 for the Ember 7 re-scaffold.**

The reason the gap is narrow is the finding below.

### The app has almost no framework-specific logic to port

Reading every component and route changes the picture substantially:

- **10 of the 12 components are literally empty** — `Component.extend({})` with no body.
  They exist only to pair with a template. The remaining two hold static config:
  `main-nav` sets `tagName`/`classNames`, `page-section` sets those plus a Swiper
  breakpoints object.
- **6 of the 10 routes are the same boilerplate**: fetch a page by hardcoded UUID, then
  set four head-meta fields. In Nuxt these become a few lines each with `useAsyncData` +
  `useHead` — genuinely *less* code than the Ember version.
- Only two files carry real logic: `routes/contact.js` (validation + POST) and
  `routes/blog/post.js` (query by slug).
- Total template surface is ~750 lines, concentrated in `contact.hbs` (148) and
  `head.hbs` (110).
- The 94 SCSS files port **unchanged** in either direction.

This matters because **the Ember 7 path is already a near-total rewrite of every JS
file** — all 12 components are classic and must become Glimmer, all 16 models are classic
and must become native classes. You do not get to keep this code by staying on Ember. So
the *incremental* cost of targeting Vue instead of Glimmer is mostly the template syntax
conversion (`{{#if}}`→`v-if`, `{{#each}}`→`v-for`), which is mechanical at this size.

### What Nuxt would actually win

1. **It solves the problem that has dominated this entire plan.** `nuxt generate` is
   first-class, maintained SSG. That single feature replaces `prember` +
   `prember-crawler` + `ember-cli-fastboot` + the Puppeteer script from Option D, and
   removes Phase 0 and the whole SSR-vs-static question. Static output is exactly what
   Virtualmin/Apache wants.
2. **The things you need are first-party, not community addons.** SSG, head management
   (`useHead` ← `ember-cli-head`), image optimization (Nuxt Image ←
   `ember-cli-image-transformer`), routing and scroll behavior (←
   `ember-router-scroll`), file-based routes. The specific failure mode that created
   this mess — a dozen small abandoned addons — is structurally less likely when the
   framework ships these itself.
3. Swiper has official Vue bindings, replacing `ember-cli-swiper` (2021) with a
   maintained package.

### What it costs

- **The data layer is the real work.** Ember Data is doing more than it looks: the
  `JSONAPIAdapter`/`JSONAPISerializer` normalize Drupal's JSON:API compound documents
  and resolve a deep relationship graph — `page → sections → columns → elements →
  texts/images/listings/slideshows`, plus `belongsTo('file')` for images. Ember Data
  wires all of that up from the `included` array automatically. Nuxt has no equivalent;
  you'd adopt a JSON:API client or write a normalizer. **This is the one place a Nuxt
  rewrite is meaningfully harder than the Ember path**, where the models mostly survive
  a syntax change. Budget most of the extra 1.5–2.5 days here.
- `ember-cp-validations` → vee-validate or zod (contact form).
- `ember-cli-flash` → any toast library, or ~30 lines.
- `ember-burger-menu` → hand-rolled or a Vue equivalent.
- The 55 test files don't port; they'd be rewritten in Vitest. Most are blueprint stubs,
  so the real loss is small.
- Learning curve, if Vue isn't already familiar — though the site's own copy advertises
  Vue as a specialty, so presumably it is.

### The honest counter-argument

Do not assume Vue/Nuxt grants immunity from what happened here. **Nuxt 2 → 3 was a
brutal migration that stranded a lot of projects**, and Vue 2 → 3 was worse — that is
precisely the position this app is in today with Ember 3.22. Ember's actual strength is
stability: the framework itself was never the problem here, fifteen unmaintained addons
were. A Nuxt app left untouched for four years would have its own version of this
document.

The structural argument still favors Nuxt (first-party features can't be abandoned by a
solo maintainer the way `ember-scroll-to` was), but it's a difference of degree.

### Recommendation

**Either choice is defensible. Pick on intent, not on technical blockers — there aren't
any.**

- **Stay on Ember 7** if you want the cheapest correct path (2–3.5 days), the data layer
  matters more than the ecosystem, or the site is in maintenance mode.
- **Move to Nuxt** if this site is a shop-window for current work, you expect to keep
  developing it, or you'd rather own a mainstream stack than an Ember 3.22 → 7 rescue.
  The prerender problem disappearing is a real and lasting simplification.

If you go Nuxt, the plan changes shape: Phase −1 and §5a (Virtualmin, Apache, forms,
redirects) apply **unchanged** — those are hosting concerns, framework-agnostic. Phases
0–6 get replaced by a Nuxt build-out, and Phase 3 (data layer) is where the work
concentrates rather than Phase 4.

**Regardless of framework, the Netlify Forms problem above must be solved.** It's a
hosting issue and it doesn't care which framework renders the form.

## 6. If you'd rather not do the full upgrade

The minimal viable alternative: `nvm install 12.20.1` (Intel Mac, so the official
`darwin-x64` build works), `yarn install`, delete the three junk deps, and leave
everything else. This restores your ability to build and deploy but does nothing about
EOL. It is a holding action, not a fix.

It's also the **first step of the recommended path anyway** — you need a working current
build to migrate hosting against (§5a). So this isn't a competing option so much as
Phase −1: revive the build, migrate hosting, *then* decide about the framework.

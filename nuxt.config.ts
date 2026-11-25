// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Prerender everything to static HTML. `nuxt generate` is what replaces the old
  // prember + ember-cli-fastboot + prember-crawler stack.
  // The output is plain files, which is what the Apache host wants.
  ssr: true,

  nitro: {
    // Blog posts and authors under content/, read by server/utils/content.ts as
    // `assets:content`. Only the build reads them, since every route is prerendered.
    // `dir` resolves against Nitro's srcDir, which is server/, hence the `..`.
    serverAssets: [{ baseName: 'content', dir: '../content' }],

    prerender: {
      // A route that errors — invalid content, a missing file, a link to a page that
      // does not exist — fails `nuxt generate` instead of being skipped with a warning.
      failOnError: true,

      // The crawler discovers every linked route on its own; /404 is linked from
      // nowhere, so it must be listed. It renders through pages/[...slug].vue — giving
      // a fully-styled error page at /404/index.html for Apache's ErrorDocument.
      //
      // The trailing slash is load-bearing: bare '/404' collides with Nitro's own
      // 404.html special-case — a client-only SPA shell with an empty body (like
      // 200.html) — and the shell wins the write. '/404/' maps to 404/index.html, which
      // the shell does not touch.
      routes: ['/404/'],
    },
  },

  // The site's own SCSS, on Bootstrap 5 from node_modules (see assets/scss/_bootstrap.scss).
  css: ['~/assets/scss/app.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        // Carried over from the old app/index.html. Nuxt supplies charset and viewport;
        // the `X-UA-Compatible: IE=edge` meta is dropped, since IE is long dead and the
        // browserslist no longer targets it.
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
      script: [
        // Font Awesome 5 Pro, as the old index.html loaded it. The nav, footer and
        // burger menu all use `fa-*` classes, so without this every icon vanishes.
        //
        // NOTE: this pins a 2018 release of a paid product, loaded from
        // pro.fontawesome.com with an integrity hash. It still returns 200, but it is
        // worth confirming the Font Awesome account is current — and eventually
        // replacing ~8 icons with inline SVG, which would drop a blocking third-party
        // request entirely.
        {
          src: 'https://pro.fontawesome.com/releases/v5.0.10/js/all.js',
          integrity:
            'sha384-+1nLPoB0gaUktsZJP+ycZectl3GX7wP8Xf2PE/JHrb7X1u7Emm+v7wJMbAcPr8Ge',
          crossorigin: 'anonymous',
          defer: true,
        },
      ],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        // Bootstrap 5.3 is written against Sass APIs that Dart Sass now deprecates
        // (@import, global functions like darken(), if()); it can only be loaded with
        // @import, so the site's SCSS uses it too. Only these deprecations are
        // silenced; any other warning still prints.
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },
})

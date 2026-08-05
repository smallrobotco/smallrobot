// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Prerender everything to static HTML. `nuxt generate` is what replaces the old
  // prember + ember-cli-fastboot + prember-crawler stack — see docs/UPGRADE-PLAN.md.
  // The output is plain files, which is what the Virtualmin/Apache host wants.
  ssr: true,

  // Ported wholesale from the Ember app — Sass is framework-independent. Includes
  // vendored Bootstrap 4 (84 files) plus the site's own ~10.
  css: ['~/assets/scss/app.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        // Bootstrap 4 and the vendored burger-menu styles are written against the
        // legacy @import API. Silencing the deprecation warnings rather than
        // rewriting 88 vendored files to @use, which is not this port's job.
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
          // Bootstrap 4 interpolates colour keywords (`#{$green}`) in a way modern Sass
          // flags on every build. Filtered by message rather than silenced wholesale,
          // so a genuine warning from our own SCSS still gets through.
          logger: {
            warn(message: string, options: unknown) {
              if (message.includes('in interpolation here')) return
              console.warn(message, options)
            },
          },
        },
      },
    },
  },

  // The Drupal JSON:API backend. Was `host` + `namespace` in the Ember app's
  // config/environment.js. Override per-deployment with NUXT_PUBLIC_API_BASE /
  // NUXT_PUBLIC_FILE_BASE rather than rebuilding.
  //
  // Two bases because file URIs are host-relative, not API-relative: a `file`
  // resource's `uri` is `/sites/default/files/...`, which hangs off the host root and
  // would 404 under /api.
  runtimeConfig: {
    public: {
      apiBase: 'https://api.smallrobot.co/api',
      fileBase: 'https://api.smallrobot.co',
    },
  },
})

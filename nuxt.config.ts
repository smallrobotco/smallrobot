// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Prerender everything to static HTML. `nuxt generate` is what replaces the old
  // prember + ember-cli-fastboot + prember-crawler stack — see docs/UPGRADE-PLAN.md.
  // The output is plain files, which is what the Virtualmin/Apache host wants.
  ssr: true,

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

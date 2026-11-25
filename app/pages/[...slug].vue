<script setup lang="ts">
/**
 * Catch-all 404, replacing the Ember `notfound` route (`path: '/*path'`).
 *
 * The 404 body is itself content, in content/pages/404.yml.
 */
// The old notfound route pointed both title and canonical at the site root.
useSeo({
  title: 'Small Robot Co. | Vancouver Web Design, Technical Consulting, App Development, & Support',
  url: '/',
})

// Any unmatched path is a genuine 404 — except the literal /404, which is prerendered
// on purpose (nitro.prerender.routes) as Apache's ErrorDocument. That render must
// return 200: Nitro refuses to write output files for routes that respond 404, and
// Apache sets the real 404 status itself when serving an ErrorDocument internally.
// Only present during SSR/prerender — there is no event on the client.
const event = useRequestEvent()
const isErrorDocument = useRoute().path.replace(/\/+$/, '') === '/404'
if (event && !isErrorDocument) setResponseStatus(event, 404)
</script>

<template>
  <GlobalHeader hero nav-color="nav-light" />

  <!-- 404 Hero -->
  <PageSection
    hero
    hero-size="tall"
    background="section-background-green"
    align="justify-content-center align-items-center"
  >
    <div class="col-12">
      <h1 class="text-align-center"><strong>OH NOOOOOOOOO..............</strong></h1>

      <h3 class="text-align-center">You found a broken link.</h3>
    </div>
  </PageSection>

  <CtaSection />

  <ClientsSection />

  <GlobalFooter />
</template>

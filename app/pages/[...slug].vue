<script setup lang="ts">
/**
 * Catch-all 404, replacing the Ember `notfound` route (`path: '/*path'`).
 *
 * The 404 body is itself CMS content — Drupal has a page at slug `/404`.
 */
const { data: page } = await usePage('/404')

// The old notfound route pointed both title and canonical at the site root.
useSeo({
  title: 'Small Robot Co. | Vancouver Web Design, Technical Consulting, App Development, & Support',
  url: '/',
})

// Prerendering writes this to 404.html, which Apache serves as its ErrorDocument.
// Only present during SSR/prerender — there is no event on the client.
const event = useRequestEvent()
if (event) setResponseStatus(event, 404)
</script>

<template>
  <CmsPage :page="page" />
</template>

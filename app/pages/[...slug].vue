<script setup lang="ts">
/**
 * Catch-all 404, replacing the Ember `notfound` route (`path: '/*path'`).
 *
 * The 404 body is itself CMS content — Drupal has a page at slug `/404`.
 */
const { data: page } = await usePage('/404')

// Prerendering writes this to 404.html, which Apache serves as its ErrorDocument.
// Only present during SSR/prerender — there is no event on the client.
const event = useRequestEvent()
if (event) setResponseStatus(event, 404)
</script>

<template>
  <CmsPage :page="page" />
</template>

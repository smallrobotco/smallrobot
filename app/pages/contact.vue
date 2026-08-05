<script setup lang="ts">
const { data: page } = await usePage('/contact')
</script>

<template>
  <div>
    <CmsPage :page="page" />

    <!--
      TODO(step 6): the contact form.

      Deliberately NOT ported yet, because it cannot work as written. The old form
      (contact.hbs + routes/contact.js) posted to `/` with a `form-name` field — that is
      Netlify Forms, a platform feature with no backend of our own behind it.

      On Apache with an SPA fallback, `POST /` returns index.html with 200, so the fetch
      resolves, the success flash fires, and the visitor is told the message was sent
      while it is silently discarded. Shipping a form that looks like it works is worse
      than shipping no form, so this stays out until there is a real handler.

      See docs/UPGRADE-PLAN.md §5a. Needs: a handler (a small PHP mail script suits the
      Virtualmin host), validation to replace ember-cp-validations, flash messages to
      replace ember-cli-flash, and error handling that actually checks response.ok —
      the old code treated any non-throwing response as success.
    -->
  </div>
</template>

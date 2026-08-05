<script setup lang="ts">
import type { Resource } from '~/utils/jsonapi'

/**
 * The whole body of a CMS page: header, every section, footer.
 *
 * All six content routes in the Ember app had byte-identical templates, each repeating
 * the same header / each-section / footer block. They share this instead.
 *
 * TODO(step 3): GlobalHeader and GlobalFooter still need porting; the hero/nav and
 * footer markup lives in global-header.hbs / global-footer.hbs / main-nav.hbs /
 * footer-nav.hbs.
 */
// `undefined` is accepted as well as null: useAsyncData's data ref is initially
// undefined, so requiring null here would force a cast at every one of the nine call
// sites.
const { page, articles } = defineProps<{
  page: Resource | null | undefined
  articles?: Resource[]
}>()

const sections = computed(() => (page?.section ?? []) as Resource[])
</script>

<template>
  <LoadingSpinner v-if="!page" />
  <template v-else>
    <PageSection
      v-for="section in sections"
      :key="section.id"
      :section="section"
      :articles="articles"
    />
  </template>
</template>

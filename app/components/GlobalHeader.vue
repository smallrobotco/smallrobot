<script setup lang="ts">
import type { Resource } from '~/utils/jsonapi'

/**
 * Ported from global-header.hbs, which was just a conditional around MainNav:
 * a page with `heroActive` got the `hero` class and the page's navColor, otherwise a
 * bare MainNav.
 */
const { page } = defineProps<{ page: Resource | null | undefined }>()
</script>

<template>
  <MainNav
    v-if="page?.heroActive"
    hero
    :nav-color="str(page.navColor)"
  />
  <MainNav v-else />
</template>

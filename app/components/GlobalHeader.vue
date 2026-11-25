<script setup lang="ts">
/**
 * Ported from global-header.hbs, which was just a conditional around MainNav: a page
 * with a hero gets the transparent nav laid over it, in the given colour; otherwise a
 * bare MainNav.
 *
 * The wrapper <div> matters for a non-obvious reason: this was a classic Ember component,
 * so Ember emitted a wrapper element, making it the *second* child of .bm-content (after
 * the hamburger link) and pushing the page sections to nth-child(3) onward. Since
 * `.page-section:nth-child(even) .divider-wrap .angled-divider` mirrors alternate
 * dividers, dropping this element shifts every section's parity and mirrors the wrong
 * ones.
 */
const { hero = false, navColor } = defineProps<{ hero?: boolean; navColor?: string }>()
</script>

<template>
  <div class="global-header">
    <MainNav v-if="hero" hero :nav-color="navColor" />
    <MainNav v-else />
  </div>
</template>

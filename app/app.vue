<script setup lang="ts">
// TEMPORARY smoke page. Proves the data layer resolves against the live Drupal API
// during prerender. Replaced by real routes and components in the next phase.
const { data: page, error } = await usePage('/home')
const { data: articles } = await useArticles()

const elements = computed(() =>
  (((page.value?.section as any[]) ?? []) as any[])
    .flatMap((s) => s.column ?? [])
    .flatMap((c) => c.element ?? []),
)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Data layer smoke test</h1>

    <p v-if="error">FAILED: {{ error.message }}</p>

    <template v-else>
      <p>page.title = <strong>{{ page?.title }}</strong></p>
      <p>sections = {{ ((page?.section as any[]) ?? []).length }}</p>
      <p>elements = {{ elements.length }}</p>
      <ul>
        <li v-for="el in elements" :key="el.id">
          {{ el.type }}
          <template v-if="el.type === 'image'"> — file: {{ fileUrl(el.image) }}</template>
          <template v-if="el.type === 'slideshow'"> — slides: {{ el.slide?.length }}</template>
        </li>
      </ul>

      <h2>Articles ({{ articles?.length }})</h2>
      <ul>
        <li v-for="a in articles ?? []" :key="a.id">
          {{ a.title }} — /ideas/{{ a.dashedTitle }} — bio: {{ (a.bio as any)?.title }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
const { data: page } = await usePage('/about')
</script>

<template>
  <CmsPage :page="page" />
</template>

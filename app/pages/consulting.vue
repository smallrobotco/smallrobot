<script setup lang="ts">
const { data: page } = await usePage('/consulting')
</script>

<template>
  <CmsPage :page="page" />
</template>

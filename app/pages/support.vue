<script setup lang="ts">
const { data: page } = await usePage('/support')
</script>

<template>
  <CmsPage :page="page" />
</template>

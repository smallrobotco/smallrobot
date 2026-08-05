<script setup lang="ts">
const { data: page } = await usePage('/development')
</script>

<template>
  <CmsPage :page="page" />
</template>

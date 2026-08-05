<script setup lang="ts">
const { data: page } = await usePage('/home')
</script>

<template>
  <CmsPage :page="page" />
</template>

<script setup lang="ts">
import type { Article } from '#shared/types/content'

const { article } = defineProps<{ article: Article }>()
</script>

<template>
  <div class="article teaser mb-2 pb-3">
    <div class="article-outer">
      <AngledDivider />
      <div class="container-fluid">
        <div class="row">
          <div class="article-title col-12 col-md-10 col-lg-8 pt-3 mx-auto text-center">
            <NuxtLink :to="`/ideas/${article.slug}`">
              <h2 class="text-center">{{ article.title }}</h2>
            </NuxtLink>
          </div>
        </div>
        <div v-if="article.author" class="row">
          <div class="article-bio col-auto pt-2 mx-auto">
            <div class="d-flex">
              <div class="bio-photo">
                <img
                  v-if="article.author.photo"
                  :src="article.author.photo"
                  :alt="`portrait of ${article.author.name}`"
                  class="photo img-fluid"
                >
              </div>
              <div class="bio-details">
                <div class="name">{{ article.author.name }}</div>
                <div class="title">{{ article.author.professionalTitle }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- eslint-disable-next-line vue/no-v-html -- trusted content from the repo -->
          <div class="article-body col-12 col-md-10 col-lg-8 py-3 mx-auto" v-html="article.body" />
        </div>
      </div>
    </div>
  </div>
</template>


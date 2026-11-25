<script setup lang="ts">
/**
 * The blog index, at /ideas: every published post in content/articles, newest first.
 */
const articles = await useArticles()

useSeo({
  title: 'Small Robot Co. | Our Ideas Written Down',
  url: '/ideas',
})
</script>

<template>
  <GlobalHeader hero nav-color="nav-light" />

  <!-- Blog Hero -->
  <PageSection
    hero
    hero-size="short"
    background="section-background-purple"
    overlay="overlay-purple"
    background-image="/img/2018-11/blog-splash.jpg"
    align="justify-content-center align-items-center"
  >
    <div class="col-12 col-md-9">
      <h1 class="hero-title text-align-center"><span class="white"><strong>INTERESTING THINGS</strong></span></h1>

      <h3 class="text-align-center"><span class="white">that may have come to us while stuck in traffic</span></h3>
    </div>
  </PageSection>

  <!-- Blog Listing -->
  <PageSection
    hero-size="short"
    divider
    align="justify-content-center"
  >
    <div class="col-12">
      <ArticleTeaser v-for="article in articles" :key="article.slug" :article="article" />
      <template v-if="!articles.length">No Articles</template>
    </div>
  </PageSection>

  <CtaSection />

  <ClientsSection />

  <GlobalFooter />
</template>

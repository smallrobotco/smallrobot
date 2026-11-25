<script setup lang="ts">
/**
 * Ported from blog/post.hbs. The URL segment is the article's file name,
 * content/articles/<dashedTitle>.yml — the `dashedTitle` the Ember router used, kept so
 * existing inbound links still resolve. A name with no published file 404s.
 */
const route = useRoute()
const post = await useArticle(String(route.params.dashedTitle))
const author = computed(() => post.value.author)

useSeo(() => ({
  title: `${post.value.title} | Small Robot Co.`,
  url: `/ideas/${post.value.slug}`,
  // The old route hardcoded type 'website' for articles; 'article' is what it should
  // have been, and it lets the published_time and author tags below make sense.
  type: 'article',
  published: post.value.date,
  author: author.value?.name,
}))

const heroStyle = computed(() =>
  post.value.heroBackgroundUrl ? { backgroundImage: `url("${post.value.heroBackgroundUrl}")` } : undefined,
)
</script>

<template>
  <div>
    <MainNav
      hero
      :nav-color="post.navColor"
      :hero-color="post.heroColor"
      :hero-overlay="post.heroOverlay"
    />
    <section class="hero-splash">
      <div class="hero-wrapper" :class="[post.heroColor, post.heroLayout]" :style="heroStyle">
        <div class="overlay" :class="post.heroOverlay">
          <div class="container-fluid">
            <div class="row">
              <div class="hero-col">
                <div class="hero-block">
                  <div class="hero-text">
                    <h1 :class="post.navColor">{{ post.title }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid">
      <div class="row">
        <!-- eslint-disable-next-line vue/no-v-html -- trusted content from the repo -->
        <div class="body col-12 col-md-10 col-lg-8 py-3 pt-md-5 mx-auto" v-html="post.body" />

        <div v-if="author" class="author-bio col-12 col-md-10 col-lg-8 py-3 pb-md-5 mx-auto">
          <div class="d-flex">
            <div class="bio-photo">
              <img
                v-if="author.photo"
                :src="author.photo"
                :alt="`portrait of ${author.name}`"
                class="photo img-fluid"
              >
            </div>
            <div class="bio-details">
              <div class="name">{{ author.name }}</div>
              <div class="title">{{ author.professionalTitle }}</div>
              <!-- eslint-disable-next-line vue/no-v-html -- trusted content from the repo -->
              <div class="bio-body" v-html="author.bio ?? ''" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <GlobalFooter />
  </div>
</template>

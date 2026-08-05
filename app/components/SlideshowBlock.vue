<script setup lang="ts">
import type { Resource } from '~/utils/jsonapi'

/**
 * Ported from slideshow-block.hbs, minus the carousel.
 *
 * TODO(step 5): restore the carousel with the `swiper` package's Vue bindings. The old
 * `ember-cli-swiper` (last published 2021) is not being carried over. Config to match:
 * `loop=false centered=false navigation=false slidesPerView=5 spaceBetween=80`, with
 * the responsive breakpoints that lived in the page-section component's init().
 *
 * Until then the slides render as a static flex row. Content stays visible and
 * crawlable rather than disappearing behind a missing widget — the logos this holds are
 * decorative, so a non-scrolling row degrades acceptably.
 *
 * The old template also wrapped the list in a `shuffle` helper. Deliberately dropped:
 * randomising per-render defeats prerendering, since every build would emit a different
 * order and produce a pointless diff.
 */
const { slides } = defineProps<{ slides: Resource[] }>()
</script>

<template>
  <div class="slideshow">
    <div class="inner">
      <div class="item-carousel d-flex flex-wrap justify-content-center align-items-center">
        <div
          v-for="slide in slides"
          :key="slide.id"
          class="d-flex justify-content-center align-items-center text-center"
        >
          <div class="slide-inner">
            <div v-if="slide.image" class="image">
              <img :src="fileUrl(slide.image as Resource) ?? undefined" :alt="imageAlt(slide)">
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -- trusted CMS body, as in the Ember app -->
            <div v-if="bodyHtml(slide)" class="text" v-html="bodyHtml(slide)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

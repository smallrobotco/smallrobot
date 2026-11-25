<script setup lang="ts">
/**
 * The client logo carousel, on every landing page.
 *
 * Options come from the old Ember SwiperContainer arguments. The original shuffled the
 * slides on every render; that was dropped, since a prerendered site would bake in a
 * different order on each build for no benefit.
 *
 * The logos are inlined (v-html of the raw SVG) rather than <img> tags because the
 * stylesheet colours their paths.
 */
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import scienceWorld from '~/assets/clients/science-world.svg?raw'
import ngxInteractive from '~/assets/clients/ngx-interactive.svg?raw'
import campPacific from '~/assets/clients/camp-pacific.svg?raw'
import technoToyTuning from '~/assets/clients/techno-toy-tuning.svg?raw'
import trinityWestern from '~/assets/clients/trinity-western.svg?raw'
import ubc from '~/assets/clients/ubc.svg?raw'

const LOGOS = [
  { name: 'science-world', svg: scienceWorld },
  { name: 'ngx-interactive', svg: ngxInteractive },
  { name: 'camp-pacific', svg: campPacific },
  { name: 'techno-toy-tuning', svg: technoToyTuning },
  { name: 'trinity-western', svg: trinityWestern },
  { name: 'ubc', svg: ubc },
]

const BREAKPOINTS = {
  320: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 3, spaceBetween: 30 },
  900: { slidesPerView: 4, spaceBetween: 80 },
  1200: { slidesPerView: 5, spaceBetween: 80 },
}
</script>

<template>
  <PageSection background="section-background-black" align="justify-content-center">
    <div class="col-12">
      <h2 class="text-align-center"><span class="pink">Some of our Clients</span></h2>
      <div class="slideshow">
        <div class="inner">
          <Swiper
            class="item-carousel"
            :loop="false"
            :centered-slides="false"
            :navigation="false"
            :slides-per-view="5"
            :space-between="80"
            :breakpoints="BREAKPOINTS"
          >
            <SwiperSlide
              v-for="logo in LOGOS"
              :key="logo.name"
              class="d-flex justify-content-center align-items-center text-center"
            >
              <div class="slide-inner">
                <!-- eslint-disable-next-line vue/no-v-html -- our own SVG files -->
                <div class="text" v-html="logo.svg" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
/**
 * One full-width band of a landing page. The slot is the row's contents: Bootstrap grid
 * columns (`col-*` divs) holding plain HTML. An empty column is a spacer.
 *
 * Ported from the Ember page-section component, whose markup the stylesheets depend on
 * exactly:
 *
 * - The <section class="page-section"> wrapper is NOT decoration. Virtually every rule in
 *   _page-section.scss is scoped to `.page-section .outer` — including `&.hero-active`.
 *   Without the wrapper the hero and the dividers lose their styling entirely.
 * - `.page-section:nth-child(even) .angled-divider` mirrors alternate dividers, so the
 *   count of <section class="page-section"> siblings matters. Pages keep an empty one
 *   where a hidden section used to be, so the parity of everything after it holds.
 */
const props = defineProps<{
  /** `section-background-*` colour class. */
  background?: string
  /** `overlay-*` wash over the background. */
  overlay?: string
  /** Hero styling: taller, nav laid over it. */
  hero?: boolean
  /** `tall` or `short`. */
  heroSize?: string
  backgroundImage?: string
  animated?: boolean
  /** animate.css class: fadeIn, fadeInUp, slideInDown. */
  animation?: string
  /** Angled divider across the top edge. */
  divider?: boolean
  /** Row alignment classes, e.g. `justify-content-center align-items-center`. */
  align?: string
  /** Reverse the column order from the sm breakpoint up. */
  reverse?: boolean
  extraClass?: string
}>()

const outerClasses = computed(() => [
  props.background,
  props.heroSize,
  props.animation,
  props.extraClass,
  {
    'hero-active': props.hero,
    divided: props.divider,
    'background-image': Boolean(props.backgroundImage),
    animated: props.animated,
  },
])

const backgroundStyle = computed(() =>
  props.backgroundImage ? { backgroundImage: `url("${props.backgroundImage}")` } : undefined,
)
</script>

<template>
  <section class="page-section">
    <div class="outer" :class="outerClasses" :style="backgroundStyle">
      <div class="overlay" :class="overlay">
        <AngledDivider v-if="divider" />

        <div class="container-fluid">
          <div class="row" :class="[align, { 'flex-sm-row-reverse': reverse }]">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

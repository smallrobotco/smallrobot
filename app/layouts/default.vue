<script setup lang="ts">
/**
 * Ported from the old application.hbs.
 *
 * The burger menu was `ember-burger-menu` (abandoned, last published 2022). Its markup
 * is now ours; only the CSS is vendored (see assets/scss/vendor/burger-menu/), so the
 * class names below match those styles — `bm--reveal` and `bm-item--stack` correspond
 * to the old `@animation="reveal"` / `@itemAnimation="stack"` arguments.
 */
const open = ref(false)
const route = useRoute()

// The old addon's `dismissOnItemClick="true"`.
watch(() => route.fullPath, () => (open.value = false))

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/consulting', label: 'Consulting' },
  { to: '/development', label: 'Development' },
  { to: '/support', label: 'Support' },
  { to: '/about', label: 'About' },
  { to: '/ideas', label: 'Inspiration & Ideas' },
  { to: '/contact', label: 'Contact Us' },
]
</script>

<template>
  <div
    class="ember-burger-menu bm--reveal bm-item--stack bm--right"
    :class="{ 'is-open': open }"
  >
    <div class="bm-menu-container">
      <div class="bm-menu">
        <a class="menu-close" href="#" @click.prevent="open = false">
          <i aria-hidden="true" class="fa fa-times" /> Close
        </a>
        <ul>
          <li v-for="item in NAV" :key="item.to" class="bm-menu-item">
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="bm-outlet">
      <a class="hamburger right" href="#" @click.prevent="open = !open">
        <i aria-hidden="true" class="fa fa-bars" /> Menu
      </a>
      <slot />
    </div>
  </div>
</template>

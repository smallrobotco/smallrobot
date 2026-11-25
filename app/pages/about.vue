<script setup lang="ts">
useSeo({
  title: 'Small Robot Co. | About Us - Vuejs, Drupal, Wordpress, Ember.js, Web Apps',
  url: '/about',
})
</script>

<template>
  <GlobalHeader hero nav-color="nav-light" />

  <!-- About Hero -->
  <PageSection
    hero
    hero-size="short"
    background="section-background-black"
    overlay="overlay-graydark"
    background-image="/img/2018-11/about-splash.jpg"
    align="justify-content-end align-items-center"
  >
    <div class="col-12 col-md-6">
      <h1 class="text-align-right">about <strong>Small Robot</strong></h1>
    </div>
  </PageSection>

  <!-- About Intro -->
  <PageSection divider align="justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Beginning somewhere</h2>

      <p>Since the late 1990's we have been building websites, coming up with digital solutions for old workflows, and breaking into new markets. Then the dot.com crash happened, and the web as we knew it had to evolve.</p>

      <p>As time went forward, and the power of the web grew, so did the challenges that we solved, and the cool things that we built. We ventured into custom PHP, MySQL, development, which brought some great projects to the hands of our clients.</p>
    </div>
  </PageSection>

  <!-- Drupal -->
  <PageSection
    background="section-background-black"
    divider
    align="justify-content-center"
  >
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Using Drupal</h2>

      <p>Around mid 2007, we saw that Drupal was starting to get a lot of attention, with Drupal 6 being released. Drupal was a platform that had a lot of potential uses, and that interested us, so we started using Drupal in all of our projects.</p>

      <p>Today we still use Drupal for most of our projects, from our university clients, ecommerce, and even as an API, Drupal has proven to be a solid choice to build on.</p>
    </div>
  </PageSection>

  <!-- Placeholder for a hidden section ("Javascript Apps"): the divider nth-child rules count it. -->
  <section class="page-section" />

  <CtaSection />

  <ClientsSection />

  <GlobalFooter />
</template>

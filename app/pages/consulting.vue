<script setup lang="ts">
useSeo({
  title: 'Small Robot Co. | Consulting - Vuejs, Drupal, Wordpress, Ember.js, Web Apps',
  url: '/consulting',
})
</script>

<template>
  <GlobalHeader hero nav-color="nav-light" />

  <!-- Consulting Hero -->
  <PageSection
    hero
    hero-size="short"
    background="section-background-graylight"
    overlay="overlay-graydark"
    background-image="/img/2018-11/consulting-splash_0.jpg"
    animation="fadeIn"
    align="justify-content-end align-items-center"
  >
    <div class="col-12 col-md-6">
      <h1 class="text-align-right"><span class="white"><strong>planning </strong>&amp;<strong> consulting</strong></span></h1>
    </div>
  </PageSection>

  <!-- Technical consulting -->
  <PageSection
    hero-size="short"
    background="section-background-graylight"
    divider
    align="justify-content-center"
  >
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Technical consulting</h2>

      <p>During the development of web projects, there is the technical approach that will set the pace for the whole project. That approach can be the key to the longevity, maintainability, success of the project.</p>

      <p>We help you build a plan, to move a project from the conceptual stage, to a functioning entity, along with what technologies can help achieve that.</p>
    </div>
  </PageSection>

  <!-- Drupal consulting -->
  <PageSection
    hero-size="short"
    divider
    align="justify-content-center"
  >
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Drupal consulting</h2>

      <p>When your web project uses Drupal, there are development approaches that “can” make your project more difficult to use, challenging for your team to manage, and a drain on your company.</p>

      <p>We can work with you on projects large, and small, helping improve usefulness, and efficiency, of your content teams. Your project should empower your team, to make their daily tasks simpler. A happy, and productive team is a true R.O.I., that you can see right away.</p>
    </div>
  </PageSection>

  <CtaSection />

  <ClientsSection />

  <GlobalFooter />
</template>

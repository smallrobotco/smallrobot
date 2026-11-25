<script setup lang="ts">
useSeo({
  title: 'Small Robot Co. | Vancouver Web Design, Technical Consulting, App Development, & Support',
  url: '/',
})
</script>

<template>
  <GlobalHeader hero nav-color="nav-light" />

  <!-- Application Hero -->
  <PageSection
    hero
    hero-size="tall"
    background="section-background-graydark"
    overlay="overlay-blue"
    background-image="/img/app-splash.jpg"
    animation="slideInDown"
    align="justify-content-start align-items-center"
  >
    <div class="col-12 col-md-6 col-lg-5">
      <h1 class="hero-title">we craft<br />
      <b>experiences</b><br />
      with the web</h1>

      <p class="byline">Interactive web based kiosk @ Telus World of Science Vancouver, BC</p>
    </div>
  </PageSection>

  <!-- Services Consulting -->
  <PageSection
    animation="fadeInUp"
    divider
    align="justify-content-start align-items-center"
    reverse
  >
    <div class="col-12 col-md-6 col-lg-5" />
    <div class="col-12 col-md-6 col-lg-7">
      <h2>Idea Planning</h2>

      <p class="lead">Whether you are looking to develop a new project, evaluating changes, or looking for some technical advice, Small Robot can help you determine what to do next.</p>

      <p><a class="btn btn-primary" href="/consulting"><span class="fontawesome-icon-inline"><i class="fas fa-comments"></i>&nbsp;</span>Help Take The Next Step</a></p>
    </div>
  </PageSection>

  <!-- Services Development -->
  <PageSection
    background="section-background-graylight"
    animation="fadeInUp"
    divider
    align="align-items-center"
  >
    <div class="col-12 col-md-6 col-lg-5">
      <img class="d-block" src="/img/content/dev-platforms.svg" alt="Drupal Ember Vuejs Wordpress Logos">
    </div>
    <div class="col-12 col-md-6 col-lg-7">
      <h2>Idea Development</h2>

      <p class="lead">Small, large, and all areas in between, we are here to help make you ideas a reality. Using tools like the Drupal, Wordpress, Vuejs, Ember.js, and more, Small Robot can provide web &amp; application development services for any size project. We enjoy new challenges, and fresh ideas, so let's build something exciting together.</p>

      <p><a class="btn btn-primary" href="/development"><span class="fontawesome-icon-inline"><i class="fas fa-code"></i>&nbsp;</span>Let's Build Something</a></p>
    </div>
  </PageSection>

  <!-- Services Support -->
  <PageSection
    animation="fadeInUp"
    divider
    align="align-items-center"
    reverse
  >
    <div class="col-12 col-md-6 col-lg-5" />
    <div class="col-12 col-md-6 col-lg-7">
      <h2>Specialized&nbsp;Support</h2>

      <p class="lead">We can help you get back to doing what your business needs, by supporting you, or your team, maintain your web project. With our monthly service agreements, as well as On Demand services, we have the ability to support your needs.</p>

      <p><a class="btn btn-primary" href="/support"><span class="fontawesome-icon-inline"><i class="fas fa-shield-check"></i>&nbsp;</span>Learn How We Help</a></p>
    </div>
  </PageSection>

  <CtaSection />

  <ClientsSection />

  <GlobalFooter />
</template>

<script setup lang="ts">
// Unlike the other pages, this one is wrapped in a <div>, as the old contact template
// was. The wrapper changes which sections count as nth-child(even) for the divider
// rules, so it stays unless the page is re-checked against them.
useSeo({
  title: 'Small Robot Co. | Contact Us',
  url: '/contact',
})
</script>

<template>
  <div>
    <GlobalHeader hero nav-color="nav-light" />

    <!-- Contact Hero -->
    <PageSection
      hero
      hero-size="short"
      background="section-background-black"
      overlay="overlay-graydark"
      background-image="/img/2018-11/contact-hero_0.jpg"
      align="justify-content-end align-items-center"
    >
      <div class="col-12 col-md-5">
        <h1><strong>let's grab a drink at a fancy coffee house...</strong></h1>

        <p class="byline">or chat over one of the many services out there.</p>
      </div>
    </PageSection>

    <!-- Placeholder for a hidden section ("Contact Instructions"): the divider nth-child rules count it. -->
    <section class="page-section" />

    <!-- Contact details -->
    <PageSection align="justify-content-center">
      <div class="col-12 col-md-8 col-lg-7 col-xl-6">
        <h2>We <strong>want</strong> to hear your ideas.</h2>
        <p class="lead">
          We get a majority of our business by word of mouth, and we truly
          appreciate the refreshing change that personal conversations can
          bring. In the world of texts, email, social media, or whatever
          technology can make our lives not personal, we would rather you
          contact us with your voice.
        </p>
        <p>
          We also understand that sometimes that is not possible, for that
          reason, we have our means of contact here.
        </p>
      </div>
      <div class="col-12 col-md-3 col-lg-3 col-xl-3">
        <h4>Location</h4>
        <p>
          <strong>Small Robot Corp.</strong><br>
          Vancouver, BC,<br>
          Canada
        </p>
        <h4>Voice</h4>
        <p>
          <a href="tel:+1-604-764-6269">
            <i class="fas fa-phone-square" aria-hidden="true" /> +1-604-764-6269
          </a><br>
          <a href="mailto:info@smallrobot.co">
            <i class="fas fa-envelope-square" aria-hidden="true" /> Email us
          </a>
        </p>
      </div>
    </PageSection>

    <!--
      TODO(step 6): the contact form section that followed this one.

      Deliberately NOT ported, because it cannot work as written. The old form posted to
      `/` with a `form-name` field — that is Netlify Forms, a platform feature with no
      backend of our own behind it. On Apache with an SPA fallback, `POST /` returns
      index.html with 200, so the fetch resolves, the success flash fires, and the
      visitor is told the message was sent while it is silently discarded. A form that
      looks like it works is worse than no form.

      The phone number and email address above remain reachable in the meantime.

      Needs: a handler (a small PHP mail script suits the
      web host), validation to replace ember-cp-validations, flash messages to
      replace ember-cli-flash, and error handling that actually checks response.ok —
      the old code treated any non-throwing response as success.
    -->

    <GlobalFooter />
  </div>
</template>

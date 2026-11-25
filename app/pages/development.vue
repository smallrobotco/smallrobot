<script setup lang="ts">
useSeo({
  title: 'Small Robot Co. | Development - WordPress, Drupal, Vuejs, Ember.js, Web Apps',
  url: '/development',
})
</script>

<template>
  <GlobalHeader hero nav-color="nav-light" />

  <!-- Development Hero -->
  <PageSection
    hero
    hero-size="short"
    background="section-background-graydark"
    overlay="overlay-graydark"
    background-image="/img/2018-11/dev-splash.jpg"
    align="justify-content-end align-items-center"
  >
    <div class="col-12 col-md-6">
      <h1 class="text-align-right">idea <strong>development</strong></h1>
    </div>
  </PageSection>

  <!-- Drupal Development -->
  <PageSection divider align="justify-content-center">
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Drupal™ Development</h2><p>Small Robot has developed projects with the Drupal Content Management System (CMS) for over 20 years. Drupal allows you to have a website, api, etc, that can scale, and grow with your business.</p><p>Being that Drupal is an Open Source project, this allows your project to have a worldwide community of developers that speak the same language. We have development knowledge, and experience with:</p><ul><li data-list-item-id="ec30fa4629032d7f54089268e8b888fb8">Drupal 6+</li><li data-list-item-id="e2e918847ad304d0180d10c25d37fab21">Drupal Commerce</li><li data-list-item-id="eac782ab71a5b74c69a6cfd24ef0ab968">Decoupled Drupal</li><li data-list-item-id="eb39c6360673590dd747ce2dc5a7de3bb">and more...</li></ul><p>Our clients range from Higher Education, and Technology Institutions, to Small Business, and Personal sites.</p><p>See our development approach for details on how we work.</p>
    </div>
  </PageSection>

  <!-- Web Applications -->
  <PageSection
    background="section-background-graylight"
    divider
    align="justify-content-center"
  >
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Web Applications</h2><p>We love to develop web based applications, for the flexibility of platform, from phones, tablets, desktops, kiosks, and further. Using a web app can allow native like user interaction, instant feedback, and even more. The site you are reading right now is actually a "Progressive Web App" (PWA), which as the capabilities of your device / browser / connection, change, the app is still usable, even offline.</p><p>We can build your web app with React.js, Vuejs, or other frameworks. We will help you pick the best solution for your requirements. The application alone is not just the whole picture, we work with your existing API's, and can develop a custom one for your needs.</p><p>Why develop web applications:</p><ul><li data-list-item-id="ee9e4dc1582cfc118e533065856bf3601">More advanced presentation layer</li><li data-list-item-id="e561d3bca363c5c9e1b27a1ab5dbad681">"Real Time" content</li><li data-list-item-id="eb4c87c04ff376302b76efa4ca6315652">Contextual content</li><li data-list-item-id="eb218bf47109f09987eee467f1f85b642">Native app like interactivity</li><li data-list-item-id="e14dc06c01b925dc2c8da333902f83465">Multiple apps, from the same data source</li><li data-list-item-id="e1c44939d82709f510dca4fa8113b061b">Offline, and installable</li><li data-list-item-id="e1f2d507dfac35796590045fee7d928bd">More potential uses</li><li data-list-item-id="ebc52a99fe069c9108c9e33c5b5bd6261">Not just a website</li></ul>
    </div>
  </PageSection>

  <!-- Development Practices -->
  <PageSection
    background="section-background-graydark"
    divider
    align="justify-content-center"
  >
    <div class="col-12 col-md-10 col-lg-8">
      <h2>Development Approach</h2><p>We prefer to use a modified “Agile” approach to web development. For the project, all tasks are broken into 2 week “sprints”, or development cycles, which span the whole project development. These sprints contain tasks that should be able to be completed during the sprint, allowing faster internal review of the projects development progress.</p><p>At the end of each sprint, there is a client meeting, where we go over the progress of the sprint, along with, if completed tasks are demo ready, a demonstration of the completed tasks.</p><p>Tasks are typically divided into “development tasks”, and “front end tasks”, also known as theming. During the sprint planning, we will schedule development tasks to be completed early on in the project timeline. This allows the functionality of components, api’s, content structures, etc, to be completed first, allowing for testing with content, integrations, and more, without being held back by the front end presentation.</p><p>After each sprint demo, a review of the deployable code is made, and if possible, the completed tasks are deployed to a staging server for client interaction. We will then perform an internal review, and adjust the next sprint to continue incomplete tasks, and start additional tasks. This cycle repeats throughout development.</p><h3>Code Standards</h3><p>We follow the coding standards that are set forth by the project we are using, for example Drupal development, we follow <a href="https://www.drupal.org/docs/develop/standards" rel="noreferrer" target="_blank">Drupal Coding Standards</a>. This allows consistency in our code, as well as the ability to use automated code tests, to ensure quality code.</p><p>Accessibility, and browser compatibility is also very important to us, so when we create HTML, CSS, and JavaScript, we preform tests to be as due diligent with these requirements. For government, and education clients, we follow the Web Content Accessibility Guidelines (<strong>WCAG</strong>) 2.0, and 508 compliance, as a standard practice.</p><h3>Version Control</h3><p>All development projects are kept in a GIT repository, to allow versioning of code, as well as efficient collaboration between development teams. We recommend Github or Bitbucket as hosts for your repository, in private mode, especially during development.</p><h3>Open Source</h3><p>We develop all our projects using Open Source Software. Using software that is not proprietary allows costs to be, in some cases, less, but also allows for a greater number people that can develop on your project in the future. Open Source Software, like any software, is not 100% free from bugs. In the case of bugs, having a open community that finds them, allows for bugs to get fixed as a group.</p><p>Some of the development we may complete on your project, has the potential to be given back to the Open Source Software community. With your permission, along with due credit, we suggest showing support for the projects, by sharing potential improvements to the code, custom modules, and more.</p>
    </div>
  </PageSection>

  <CtaSection />

  <ClientsSection />

  <GlobalFooter />
</template>

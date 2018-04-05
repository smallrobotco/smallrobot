/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Small Robot Co - Consulting | Development | Support",
    short_name: "Small Robot",
    description: "We are a Vancouver, BC based Web Consulting, Development, and Support company, specializing in Drupal, Ember.js, and web apps.",
    start_url: "./?utm_source=web_app_manifest",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: '/assets/icons/appicon-32.png',
        sizes: `32x32`,
        targets: ['favicon']
      },
      ...[192, 280, 512].map((size) => ({
        src: `/assets/icons/appicon-${size}.png`,
        sizes: `${size}x${size}`
      }))
    ],

    apple: {
      statusBarStyle: 'black'
    },

    ms: {
      tileColor: '#000000'
    }
  };
}

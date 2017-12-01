/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Small Robot Co - Consulting | Development | Support",
    short_name: "Small Robot",
    description: "We are a Vancouver, BC based Web Consulting, Development, and Support company, specializing in Drupal, Ember.js, and web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
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
      // {
      //   src: "/img/icons/android-icon-192x192.png",
      //   sizes: "192x192",
      //   type: "image/png"
      // },
      // {
      //   src: "/img/icons/android-icon-512x512.png",
      //   sizes: "512x512",
      //   type: "image/png"
      // },
      // {
      //   src: "/img/icons/apple-icon-180x180.png",
      //   sizes: "180x180",
      //   type: "image/png",
      //   targets: ['apple']
      // },
      // {
      //   src: "/img/icons/ms-icon-150x150.png",
      //   element: "150x150",
      //   targets: ['ms']
      // }
    ],

    apple: {
      statusBarStyle: 'black-translucent'
    },

    ms: {
      tileColor: '#ffffff'
    }
  };
}

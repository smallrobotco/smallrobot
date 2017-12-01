/* eslint-env node */
'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'asset-cache': {
      exclude: [
        'img/**/*',
        'assets/**/*'
      ]
    },
    'esw-cache-first': {
      patterns: [
        '/img/(.+)',
        '/assets/(.+)'
      ]
    },
    'esw-cache-fallback': {
      patterns: [ '/' ],
      version: '1' // Changing the version will bust the cache
    },
    'ember-font-awesome': {
      useScss: true, // for ember-cli-sass
    },
    'prember': {
      urls: [
        '/',
        '/consulting',
        '/development',
        '/support',
        '/work',
        '/about',
        '/ideas',
        '/contact',
      ]
    },
    gzip: {
      // options
      extensions: '\*\*/\*.{js,css,json,ico,map,xml,txt,svg,eot,ttf,woff,woff2}'
    }
  });
  return app.toTree();
};

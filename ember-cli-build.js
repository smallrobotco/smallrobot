/* eslint-env node */
'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
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
        '/contact',
      ]
    }
  });
  // app.import('bower_components/jquery.stellar/jquery.stellar.js');
  return app.toTree();
};

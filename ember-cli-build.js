/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    brotli: {
      extensions: ['js', 'css', 'svg'],
      appendSuffix: false
    },
    'autoprefixer': {
      browsers: ['last 2 major version'],
      cascade: false
    },
    'ember-cli-image-transformer': {
      images: [
        {
          inputFilename: 'public/img/icon.png',
          outputFileName: 'appicon-',
          convertTo: 'png',
          destination: 'assets/icons/',
          sizes: [32, 192, 280, 512]
        },
        {
          inputFilename: 'public/img/splash.png',
          outputFileName: 'appsplash-',
          convertTo: 'png',
          destination: 'assets/splashes/',
          sizes: [512]
        }
      ]
    },
    'ember-service-worker': {
      versionStrategy: 'every-build'
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        'img/**/*'
      ],
      requestMode: 'cors'
    },
    'esw-cache-first': {
      patterns: [
        '/assets/(.+)',
        '/img/(.+)'
      ]
    },
    'esw-cache-fallback': {
      patterns: [
        '/api/(.+)'
      ],
    },
    'prember': {
      baseRoot: 'https://smallrobot.co',
      urls: [
        '/',
        '/consulting',
        '/development',
        '/support',
        '/contact',
        '/about',
        '/ideas',
      ]
    }
  });
  return app.toTree();
};

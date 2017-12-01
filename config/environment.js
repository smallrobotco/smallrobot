/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'smallrobotco',
    environment,
    rootURL: '/',
    host: 'https://api.smallrobot.co', //drupal
    namespace: 'api',
    locationType: 'router-scroll',
    historySupportMiddleware: true,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    'ember-validated-form': {
      label: {
        submit: 'Go for it!',
      },
      css: {
        // bootstrap classes
        group: 'form-group',
        control: 'form-control',
        label: 'form-label',
        checkbox: 'checkbox',
        radio: 'radio',
        help: 'help-block',
        hint: 'help-block',
        button: 'btn btn-default',
        submit: 'btn btn-primary'
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.rootURL = '/smallrobot';
    // ENV.locationType = 'auto';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-110529542-1'
    };
    ENV.rootURL = '/';
    ENV.locationType = 'auto';
  }

  return ENV;
};

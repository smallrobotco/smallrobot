/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      environment: 'production' // the default
    },
    git: {
      repo: 'git@github.com:bmx269/smallrobot.git',
      branch: 'deploys',
      worktreePath: '../deploy-smallrobotco',
      commitMessage: 'App Deployed %@'
    }
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.git = {
      repo: 'git@github.com:bmx269/smallrobot.git',
      branch: 'gh-pages',
      worktreePath: '../deploy-gh-smallrobotco',
      commitMessage: 'App Deployed %@'
    };
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.git = {
      repo: 'git@github.com:bmx269/smallrobot.git',
      branch: 'deploys',
      worktreePath: '../deploy-smallrobotco',
      commitMessage: 'App Deployed %@'
    };
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};

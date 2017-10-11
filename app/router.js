import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // this.route('cardstack', { path: '/', resetNamespace: true }, function() {
  //     this.route('default-content', { path : '/:slug' });
  //     this.route('new-content', { path : '/:type/new' });
  //     this.route('content', { path : '/:type/:slug' });
  // });
  this.route('development', function() {
    this.route('app');
    this.route('drupal');
  });
  this.route('consulting', function() {
    this.route('web');
  });
  this.route('support', function() {
    this.route('drupal');
  });
  this.route('work', function() {
    this.route('stories', function() {
      this.route('story');
    });
  });
  this.route('blog', function() {
    this.route('post');
  });
  this.route('about');
  this.route('loading');
  this.route('notfound', {path: '*path'});
});

export default Router;

import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/'});

  this.route('work', function() {
    this.route('stories', function() {
      this.route('story');
    });
  });
  this.route('blog', function() {
    this.route('post');
  });
  this.route('about');
  this.route('consulting');
  this.route('development');
  this.route('support');
  this.route('pricing');
  this.route('contact');

  this.route('loading');
  // this.route('page', { path: ':slug'});
  this.route('notfound', { path: '*path' });

});

export default Router;

import EmberRouter from '@ember/routing/router';
// import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  headData: inject(),
  rootURL: config.rootURL,

  // setTitle(title) {
  //   this.get('headData').set('title', title);
  // },

  didTransition() {
    this._super(...arguments);
  },

});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('about');
  this.route('consulting');
  this.route('development');
  this.route('support');
  this.route('contact');
  this.route('blog', { path: 'ideas' }, function() {
    this.route('post', { path: '/:article_dashedTitle' });
  });
  this.route('loading');
  this.route('notfound', { path: '/*path' });
});

export default Router;

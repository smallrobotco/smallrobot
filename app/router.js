// import EmberRouter from '@ember/routing/router';
// import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';
import EmberRouterScroll from 'ember-router-scroll';
// import config from './config/environment';
import config from 'my-app/config/environment';


class Router extends EmberRouterScroll {
  location = config.locationType;
  headData = inject();
  rootURL = config.rootURL;

  // didTransition() {
  //   this._super(...arguments);
  // }
}

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

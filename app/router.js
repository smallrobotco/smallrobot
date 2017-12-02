import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('work', function() {
    this.route('stories', function() {
      this.route('story', { path: ':story_id' });
    });
  });
  this.route('blog', { path: 'ideas' }, function() {
    this.route('post', { path: ':article_id' });
  });
  this.route('about');
  this.route('consulting', function() {
    this.route('web');
  });
  this.route('development', function() {
  });
  this.route('support', function() {
  });
  this.route('pricing');
  this.route('contact');

  this.route('loading');
  // this.route('page', { path: ':slug'});
  this.route('notfound', { path: '*path' });

});

export default Router;

import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  headData: service(),

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', 'a7f396b2-f325-4784-8ac9-403dabc1765a'),
      // page: this.store.query('page', {
      //   filter:
      //     {
      //       'slug':{
      //         'value': '/blog'
      //       },
      //     },
      // })
      // .then(pages => {
      //   return pages.get('firstObject');
      // }),
      articles: this.store.findAll('article'),
    });
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Our Ideas Written Down',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/ideas'
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
    controller.set('articles', models.articles);
  }
});

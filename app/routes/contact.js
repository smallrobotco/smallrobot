import Route from '@ember/routing/route';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  headData: service(),

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', '3e3126a1-7ae1-495a-96c0-2ede1e8b4ca5'),
      // page: this.store.query('page', {
      //   filter:
      //     {
      //       'slug':{
      //         'value': '/contact'
      //       },
      //     },
      // })
      // .then(pages => {
      //   return pages.get('firstObject');
      // }),
    });
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Contact Us',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/contact'
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

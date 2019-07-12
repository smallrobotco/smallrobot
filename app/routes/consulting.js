import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.findRecord('page', 'd19f7a25-ae82-4fb7-bc0b-3fd4a70a51c9');
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Consulting - Ember.js, Drupal, ContentaCMS, Decoupled, Web Apps',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, WordPress, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/consulting'
    });
  }
});




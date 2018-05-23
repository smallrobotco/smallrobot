import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.findRecord('page', 'a864bc7c-d1a1-4fc0-b0e8-8e41def4ad84');
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Pricing - Ember.js, Drupal, ContentaCMS, Decoupled, Web Apps',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/pricing'
    });
  }
});

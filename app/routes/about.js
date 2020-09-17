import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.findRecord('page', 'af5ab178-3835-4eb9-9f8a-a79f7e7268bb');
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | About Us - Vue.js, Drupal, Wordpress, Ember.js, Web Apps',
      description:
        'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, WordPress, Vue.js, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/about'
    });
  }
});

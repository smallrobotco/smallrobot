import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.findRecord('page', '2dbf6876-0e4c-4abe-9fd3-247d825064ab');
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Development - WordPress, Drupal, Vue.js, Ember.js, Web Apps',
      description:
        'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, WordPress, Vue.js, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/development'
    });
  }

});

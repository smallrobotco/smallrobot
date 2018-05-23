import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.query('page', {
      filter:
        {
          'slug':{
            'value': '/development/approach'
          },
        },
    })
    .then(pages => {
      return pages.get('firstObject');
    });
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Development Approach - Ember.js, Drupal, ContentaCMS, Decoupled, Web Apps',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/development/approach'
    });
  }
});

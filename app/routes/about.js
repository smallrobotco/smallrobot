import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', 'af5ab178-3835-4eb9-9f8a-a79f7e7268bb'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }


});

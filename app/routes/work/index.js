import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', '2bef854e-e8ac-4e20-9bbb-1712ce9af39d'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

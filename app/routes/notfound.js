import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', 'b495e845-2242-4fb2-ab6b-9beccdce8a81'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

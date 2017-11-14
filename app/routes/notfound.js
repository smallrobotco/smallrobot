import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', 'b495e845-2242-4fb2-ab6b-9beccdce8a81'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

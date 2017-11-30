import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', '37ddbded-ed77-4445-ad5e-40c842d24041'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

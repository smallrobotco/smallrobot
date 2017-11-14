import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', '93aec22a-3710-4fe0-ae09-663f6790bb79'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

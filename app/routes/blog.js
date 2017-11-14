import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', 'a7f396b2-f325-4784-8ac9-403dabc1765a'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', 'a864bc7c-d1a1-4fc0-b0e8-8e41def4ad84'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

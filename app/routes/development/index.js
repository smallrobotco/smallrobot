import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', '2dbf6876-0e4c-4abe-9fd3-247d825064ab'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

import Route from '@ember/routing/route';
import EmberObject, { set, computed } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      pages: this.store.findAll('page'),
    });
  },

  setupController(controller, models) {
    controller.set('pages', models.pages);
  }
});

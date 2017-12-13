import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', 'a7f396b2-f325-4784-8ac9-403dabc1765a'),
      // articles: this.store.findAll('article'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
    // controller.set('articles', models.articles);
  }
});

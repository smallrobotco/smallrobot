import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";

export default Route.extend({

  model(params) {
    return RSVP.hash({
      post: this.store.findRecord('article', params.article_id)
    });
  },

  setupController(controller, models) {
    controller.set('post', models.post);
  }
});

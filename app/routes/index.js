import Route from '@ember/routing/route';
// import EmberObject, { computed } from '@ember/object';
import RSVP from 'rsvp';


export default Route.extend({
  // page_id: "93aec22a-3710-4fe0-ae09-663f6790bb79",

  model(params) {
    return RSVP.hash({
      page: this.store.findRecord('page', '93aec22a-3710-4fe0-ae09-663f6790bb79'),
      // pages: this.store.query('page', {
      //   sort: "-created",
      //   page: {
      //     limit: 1,
      //   },
      //   filter: {
      //     pathUrl: '/home',
      //   }
      // }),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});

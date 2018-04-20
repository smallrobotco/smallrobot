import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', '93aec22a-3710-4fe0-ae09-663f6790bb79'),
      // page: this.store.query('page', {
      //   filter:
      //     {
      //       'slug':{
      //         'value': '/'
      //       },
      //     },
      // })
      // .then(pages => {
      //   return pages.get('firstObject');
      // }),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
    controller.set('texts', models.texts);
  }
});

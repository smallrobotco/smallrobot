import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.query('page', {
        filter:
          {
            'slug':{
              'value': '/404'
            },
          },
      })
      .then(pages => {
        return pages.get('firstObject');
      });
  },

  // setupController(controller, models) {
  //   controller.set('page', models.page);
  // }
});

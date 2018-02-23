import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.query('page', {
        filter:
          {
            'slug':{
              'value': '/about'
            },
          },
      })
      .then(pages => {
        return pages.get('firstObject');
      }),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }


});

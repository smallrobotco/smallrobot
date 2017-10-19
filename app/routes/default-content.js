import Route from '@ember/routing/route';
// import { computed } from '@ember/object';
import RSVP from 'rsvp';


export default Route.extend({

  model(params) {
    return RSVP.hash({
      page: this.store.query('page', {
        filter: {
          slug: params.page_slug
        },
      })
      .then(pages => {
        return pages.get('firstObject');
      }),
    });
  },
  serialize(page) {
    return {
      page_slug: page.get('slug')
    };
  }
  // setupController(controller, models) {
  //   controller.set('page', models.page);
  // }
});

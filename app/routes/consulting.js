import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      // page: this.store.findRecord('page', 'd19f7a25-ae82-4fb7-bc0b-3fd4a70a51c9'),
      page: this.store.query('node--vote', {
        filter:
          {
            'slug':{
              'value': '/consulting'
            },
          },
      })
      .then(pages => {
        return pages.get('firstObject');
      }),
      // latest: this.store.query('node--vote', {
      //   sort: "-created",
      //   page: {
      //     limit: 1,
      //   },
      //   filter: {
      //     'field_campaignid': {
      //       'value': params.campaign_id
      //     },
      //   }
      // }),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
  }
});




import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      page: this.store.query('page', {
        filter:
          {
            'slug':{
              'value': '/blog'
            },
          },
      })
      .then(pages => {
        return pages.get('firstObject');
      }),
      articles: this.store.findAll('article'),
    });
  },

  setupController(controller, models) {
    controller.set('page', models.page);
    controller.set('articles', models.articles);
  }
});

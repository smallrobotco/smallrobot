import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { run } from "@ember/runloop";
import { inject as service } from '@ember/service';


export default Route.extend({
  headData: service(),
  serialize(article) {
    return {
      article_dashedTitle: article.get('dashedTitle')
    }
  },
  model(params) {
    return RSVP.hash({
      // post: this.store.findRecord('article', params.article_id)
      post: this.store.query('article', {
        filter: {
          dashedTitle: params.article_dashedTitle
        }
      })
      .then(posts => {
        return posts.get('firstObject');
      })
    });
  },

  afterModel(models) {
    return setProperties(this.headData, {
      title: models.post.title + ' | Small Robot Co.',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/ideas/' + models.post.dashedTitle
    });
  },

  setupController(controller, models) {
    controller.set('post', models.post);
  }
});

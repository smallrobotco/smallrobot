import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    return RSVP.hash({
      pages: this.store.findAll('page'),
      sections: this.store.findAll('section'),
      columns: this.store.findAll('column'),
      texts: this.store.findAll('text'),
      files: this.store.findAll('file'),
      images: this.store.findAll('image'),
      contacts: this.store.findAll('contact'),
      slideshows: this.store.findAll('slideshow'),
      slides: this.store.findAll('slide'),
    });
  },

  setupController(controller, models) {
    controller.set('pages', models.pages);
    controller.set('sections', models.sections);
    controller.set('columns', models.columns);
    controller.set('texts', models.texts);
    controller.set('files', models.files);
    controller.set('images', models.images);
    controller.set('contacts', models.contacts);
    controller.set('slideshows', models.slideshows);
    controller.set('slides', models.slides);
  }
});

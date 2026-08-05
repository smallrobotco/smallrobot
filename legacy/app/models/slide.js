import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  body: attr(''),
  image: belongsTo('file'),
  slideshow: belongsTo('slideshow')
});

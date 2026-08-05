import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  imageUrl: attr('string'),
  image: belongsTo('file'),
  thumbnail: belongsTo('file'),
  element: belongsTo('element'),
});

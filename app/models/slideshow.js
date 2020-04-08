import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default Model.extend({
  created: attr('string'),
  style: attr('string'),
  slide: hasMany('slide'),
  element: belongsTo('element')
});

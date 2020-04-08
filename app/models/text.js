import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  created: attr('string'),
  body: attr(''),
  element: belongsTo('element')
});

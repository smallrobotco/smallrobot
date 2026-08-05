import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  created: attr('string'),
  listingType: attr('string'),
  listingCount: attr('number'),
  element: belongsTo('element')
});

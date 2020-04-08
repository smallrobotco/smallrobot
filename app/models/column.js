import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  columnWidthXs: attr('string'),
  columnWidthSm: attr('string'),
  columnWidthMd: attr('string'),
  columnWidthLg: attr('string'),
  columnWidthXl: attr('string'),
  extraClasses: attr('string'),
  element: hasMany('element'),
  section: belongsTo('section'),
});

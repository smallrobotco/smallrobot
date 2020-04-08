import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  title: attr('string'),
  created: attr('string'),
  updated: attr('string'),
  status: attr('boolean'),
  slug: attr('string'),
  heroActive: attr('boolean'),
  navColor: attr('string'),
  section: hasMany('section')
});

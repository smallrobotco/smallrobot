import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  created: DS.attr('string'),
  updated: DS.attr('string'),
  status: DS.attr('boolean'),
  slug: DS.attr('string'),
  heroActive: DS.attr('boolean'),
  heroBlurb: DS.attr(''),
  heroByline: DS.attr('string'),
  heroColor: DS.attr('string'),
  heroOverlay: DS.attr('string'),
  heroLayout: DS.attr('string'),
  heroBackground: DS.belongsTo('file', { async: true }),
  section: DS.hasMany('section', { async: true }),
});

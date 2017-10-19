import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  created: DS.attr('string'),
  updated: DS.attr('string'),
  status: DS.attr('boolean'),
  slug: DS.attr('string'),
  heroTitle: DS.attr(''),
  heroBlurb: DS.attr(''),
  heroByline: DS.attr('string'),
  heroColor: DS.attr('string'),
  heroBackground: DS.belongsTo('file'),
  section: DS.hasMany('section'),
});

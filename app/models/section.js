import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('string'),
  divider: DS.attr('boolean'),
  parallax: DS.attr('boolean'),
  reverse: DS.attr('boolean'),
  show: DS.attr('boolean'),
  background: DS.attr('string'),
  backgroundImage: DS.belongsTo('file'),
  layout: DS.attr('string'),
  column: DS.hasMany('column'),
  page: DS.belongsTo('page'),
});

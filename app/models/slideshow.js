import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('string'),
  style: DS.attr('string'),
  count: DS.attr('number'),
  slide: DS.hasMany('slide', { async: false }),
  element: DS.belongsTo('element', { async: false })
});

import DS from 'ember-data';

export default DS.Model.extend({
  alignment: DS.attr('string'),
  element: DS.hasMany('element', { async: true }),
  section: DS.belongsTo('section', { async: true }),
});

import DS from 'ember-data';

export default DS.Model.extend({
  element: DS.hasMany('element'),
  section: DS.belongsTo('section'),
});

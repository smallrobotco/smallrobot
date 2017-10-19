import DS from 'ember-data';

export default DS.Model.extend({
  // name: DS.attr('string'),
  // created: DS.attr('string'),
  // updated: DS.attr('string'),
  image: DS.belongsTo('file'),
  // user: DS.belongsTo('user'),
  thumbnail: DS.belongsTo('file'),
  element: DS.belongsTo('element'),
});

import DS from 'ember-data';

export default DS.Model.extend({
  imageUrl: DS.attr('string'),
  image: DS.belongsTo('file'),
  thumbnail: DS.belongsTo('file'),
  element: DS.belongsTo('element'),
});

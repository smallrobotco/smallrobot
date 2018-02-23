import DS from 'ember-data';

export default DS.Model.extend({
  image: DS.belongsTo('file', { async: true }),
  thumbnail: DS.belongsTo('file', { async: true }),
  element: DS.belongsTo('element', { async: true }),
});

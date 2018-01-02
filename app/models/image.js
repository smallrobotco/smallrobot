import DS from 'ember-data';

export default DS.Model.extend({
  image: DS.belongsTo('file', { async: false }),
  thumbnail: DS.belongsTo('file', { async: false }),
  element: DS.belongsTo('element', { async: false }),
});

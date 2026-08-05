import Model, { attr } from '@ember-data/model';

export default Model.extend({
  created: attr('string')
  // element: DS.belongsTo('element', { async: false }),
});

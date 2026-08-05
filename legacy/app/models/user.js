import Model, { attr } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  uid: attr(''),
  uuid: attr('string')
});

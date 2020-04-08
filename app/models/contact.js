import Model, { attr } from '@ember-data/model';

export default Model.extend({
  fullName: attr('string'),
  organization: attr('string'),
  email: attr('string'),
  phone: attr('string'),
  message: attr('string')
});

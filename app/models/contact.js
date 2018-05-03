import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  organization: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  message: DS.attr('string')
});

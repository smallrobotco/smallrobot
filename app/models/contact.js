import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  aboutMe: DS.attr('string'),
  budget: DS.attr('number'),
  messageBody: DS.attr('string'),
  messageType: DS.attr('string')
});

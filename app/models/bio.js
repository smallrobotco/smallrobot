import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr(''),
  twitter: DS.attr('string'),
  linkedin: DS.attr('string'),
  professionalTitle: DS.attr('string'),
  photo: DS.belongsTo('file')
});

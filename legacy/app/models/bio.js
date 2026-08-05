import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  title: attr('string'),
  body: attr(''),
  twitter: attr('string'),
  linkedin: attr('string'),
  professionalTitle: attr('string'),
  photo: belongsTo('file')
});

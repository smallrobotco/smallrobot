import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr(''),
  image: DS.belongsTo('file', { async: true }),
  slideshow: DS.belongsTo('slideshow', { async: true }),
});

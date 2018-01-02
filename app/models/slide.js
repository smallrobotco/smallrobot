import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr(''),
  image: DS.belongsTo('file', { async: false }),
  slideshow: DS.belongsTo('slideshow', { async: false }),
});

import DS from 'ember-data';

export default DS.Model.extend({
  column: DS.belongsTo('column', { async: false }),
  text: DS.hasMany('text', { async: false }),
  image: DS.hasMany('image', { async: false }),
  // video: DS.hasMany('video'),
  // slideshow: DS.hasMany('slideshow'),
});

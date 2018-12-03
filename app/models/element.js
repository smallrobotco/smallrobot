import DS from 'ember-data';

export default DS.Model.extend({
  // column: DS.belongsTo('column'),
  texts: DS.hasMany('text'),
  images: DS.hasMany('image'),
  listings: DS.hasMany('listing'),
  // video: DS.hasMany('video'),
  slideshows: DS.hasMany('slideshow')
});

import Model, { belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  texts: hasMany('text'),
  images: hasMany('image'),
  listings: hasMany('listing'),
  // video: DS.hasMany('video'),
  slideshows: hasMany('slideshow'),
});

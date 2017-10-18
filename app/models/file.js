import DS from 'ember-data';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default DS.Model.extend({
  filename: DS.attr('string'),
  url: DS.attr('string'),
  image: DS.hasMany('image', {inverse: 'imageFile'}),
  thumbnail: DS.hasMany('image', {inverse: 'thumbnail'}),

  // fullUrl: computed('url', function() {
  //   const host = ENV.host;
  //   let url = this.get('url');
  //   return `${host}`+`${url}`;
  // }),
  // inlineBackground: computed('fullUrl', function () {
  //   return new String.htmlSafe( "background-image: url('" + this.get('fullUrl') + "')" );
  // })
});

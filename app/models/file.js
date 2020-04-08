import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import ENV from '../config/environment';

export default Model.extend({
  filename: attr('string'),
  uri: attr('string'),
  image: hasMany('image', {inverse: 'image'}),
  thumbnail: hasMany('image', {inverse: 'thumbnail'}),

  fullUrl: computed('uri', function() {
    const host = ENV.host;
    let url = this.uri;
    return `${host}`+`${url}`;
  }),
  inlineBackground: computed('fullUrl', function () {
    return new htmlSafe( 'background-image: url("' + this.fullUrl + '");' );
  })
});

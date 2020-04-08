import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Model.extend({
  created: attr('string'),
  divider: attr('boolean'),
  animated: attr('boolean'),
  reverse: attr('boolean'),
  show: attr('boolean'),
  isHero: attr('boolean'),
  animation: attr('string'),
  background: attr('string'),
  backgroundImageUrl: attr('string'),
  colHorizontalAlignment: attr('string'),
  colVerticalAlignment: attr('string'),
  extraClasses: attr('string'),
  heroSize: attr('string'),
  overlay: attr('string'),
  backgroundImage: belongsTo('file'),
  column: hasMany('column'),
  page: belongsTo('page'),

  inlineBackground: computed('backgroundImageUrl', function () {
    return new htmlSafe( 'background-image: url("' + this.backgroundImageUrl + '");' );
  })
});

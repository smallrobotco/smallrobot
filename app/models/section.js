import DS from 'ember-data';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default DS.Model.extend({
  created: DS.attr('string'),
  divider: DS.attr('boolean'),
  animated: DS.attr('boolean'),
  reverse: DS.attr('boolean'),
  show: DS.attr('boolean'),
  isHero: DS.attr('boolean'),
  animation: DS.attr('string'),
  background: DS.attr('string'),
  backgroundImageUrl: DS.attr('string'),
  colHorizontalAlignment: DS.attr('string'),
  colVerticalAlignment: DS.attr('string'),
  heroSize: DS.attr('string'),
  overlay: DS.attr('string'),
  backgroundImage: DS.belongsTo('file'),
  column: DS.hasMany('column'),
  page: DS.belongsTo('page'),

  inlineBackground: computed('backgroundImageUrl', function () {
    return new htmlSafe( 'background-image: url("' + this.backgroundImageUrl + '");' );
  })
});

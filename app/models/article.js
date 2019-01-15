import DS from 'ember-data';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default DS.Model.extend({
  title: DS.attr('string'),
  created: DS.attr('date'),
  status: DS.attr('boolean'),
  intro: DS.attr(''),
  body: DS.attr(''),
  slug: DS.attr('string'),
  navColor: DS.attr('string'),
  heroActive: DS.attr('boolean'),
  heroBlurb: DS.attr(''),
  heroByline: DS.attr('string'),
  heroColor: DS.attr('string'),
  heroOverlay: DS.attr('string'),
  heroLayout: DS.attr('string'),
  heroBackground: DS.belongsTo('file'),
  heroBackgroundUrl: DS.attr('string'),
  section: DS.hasMany('section'),
  slugPath: computed('slug', function() {
    let slug = this.slug.replace(/^\/+/g,'');
    return slug;
  }),
  inlineBackground: computed('heroBackgroundUrl', function () {
    return new htmlSafe( "background-image: url('" + this.heroBackgroundUrl + "')" );
  })
});



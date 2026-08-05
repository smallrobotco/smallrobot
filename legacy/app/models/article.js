import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Model.extend({
  title: attr('string'),
  created: attr('date'),
  status: attr('boolean'),
  body: attr(''),
  path: attr('',),
  dashedTitle: attr('string'),
  navColor: attr('string'),
  heroColor: attr('string'),
  heroOverlay: attr('string'),
  heroLayout: attr('string'),
  heroBackgroundUrl: attr('string'),
  bio: belongsTo('bio'),
  slugPath: computed('slug', function() {
    let slug = this.slug.replace(/^\/+/g,'');
    return slug;
  }),

  inlineBackground: computed('heroBackgroundUrl', function () {
    return new htmlSafe( "background-image: url('" + this.heroBackgroundUrl + "')" );
  })
});



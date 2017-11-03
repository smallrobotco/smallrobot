import DS from 'ember-data';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default DS.Model.extend({
  created: DS.attr('string'),
  body: DS.attr(''),
  element: DS.belongsTo('element'),

  text: computed('body', function () {
    return new htmlSafe(this.get('body.value'));
  })
});

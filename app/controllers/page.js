import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['filter'],
  filter: window.location.pathname,

  // filteredPage: computed('model', function() {
  //   let page = this.get('model');

  //   if (slugPath) {
  //     return page.filterBy('slug', slug);
  //   } else {
  //     return page;
  //   }
  // })
});

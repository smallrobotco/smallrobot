import Controller from '@ember/controller';
import { computed } from '@ember/object';
const { reads } = computed;

export default Controller.extend({
  pages: reads('model.pages'),
});

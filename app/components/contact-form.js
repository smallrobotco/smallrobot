import Component from '@ember/component';
import ContactValidations from 'dummy/validations/contact';
import { task } from 'ember-concurrency';

export default Component.extend({
  ContactValidations,

  submitContact: task(function * (model) {
    yield model.save();
    // ... more code to show success messages etc.
  })
});

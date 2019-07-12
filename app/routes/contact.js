import contactValidations from "../validations/contact";
import Route from '@ember/routing/route';
import EmberObject, { get, setProperties } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import RSVP from 'rsvp';

export default Route.extend({
  flashMessages: service(),
  headData: service(),

  model() {
    return RSVP.hash({
      page: this.store.findRecord('page', '3e3126a1-7ae1-495a-96c0-2ede1e8b4ca5'),
      contactForm: EmberObject.extend(contactValidations).create(
        getOwner(this).ownerInjection(),
        {
          fullName: null,
          organization: null,
          phone: null,
          email: null,
          message: null
        }
      )
    });
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Contact Us',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, WordPress, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/contact'
    });
  },


  actions: {
    sendContactRequest(contact) {
      if (get(contact, 'validations.isValid')) {
        const data = contact.getProperties('fullName', 'organization', 'phone', 'email', 'message');
        data['form-name'] = 'contact';
        const body = this._encode(data);

        return fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        })
          .then(this._successMessage.bind(this))
          .catch(this._errorMessage.bind(this));
      } else {
        get(contact, 'validations.errors').forEach((error) => {
          this.flashMessages.danger(error.message);
        });
      }
    }
  },
  setupController(controller, models) {
    controller.set('page', models.page);
    controller.set('contactForm', models.contactForm);
  },

  _successMessage() {
    this.flashMessages.success('Thanks for contacting us! We\'ll be in touch shortly.');
  },

  _errorMessage() {
    this.flashMessages.danger('Something went wrong :(. Please refresh and try again.');
  },

  /**
   * Util function to encode data for netify forms
   * @param data
   * @returns {string}
   * @private
   */
  _encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }
});

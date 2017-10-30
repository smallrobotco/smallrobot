import Route from '@ember/routing/route';
// import { get, set } from '@ember/object';
// import RSVP from 'rsvp';

export default Route.extend({

  model(params) {
      return this.store.findRecord('page', 'af5ab178-3835-4eb9-9f8a-a79f7e7268bb');
  }
});

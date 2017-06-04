import Ember from 'ember';
const { Route, inject: { service }, set, get } = Ember;

export default Route.extend({
  studio: service(),
  setupController(controller) {
    set(controller, 'studio', get(this, 'studio'));
  }
});

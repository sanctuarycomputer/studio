import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:3000',
  namespace: 'api',
  pathForType: function(type) {
    return Ember.String.underscore(type);
  }
});
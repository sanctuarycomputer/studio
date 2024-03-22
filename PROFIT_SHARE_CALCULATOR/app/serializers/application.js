import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  }
});
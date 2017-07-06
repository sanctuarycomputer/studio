import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mobile-metrics', 'sm-show', 'flex'],
  actions: {
    setNumeric(label, value) {
      this.attrs.setNumeric(label, value)
    }
  }
});

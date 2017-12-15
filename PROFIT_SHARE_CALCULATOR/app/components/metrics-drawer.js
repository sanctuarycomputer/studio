import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['metrics-drawer', 'px3'],
  classNameBindings: ['open'],
  actions: {
    setNumeric(label, value) {
      this.attrs.setNumeric(label, value)
    }
  }
});

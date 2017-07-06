import Ember from 'ember';
const { Component, set } = Ember;

export default Component.extend({
  classNames: ['nav-bar', 'px2', 'flex'],
  classNameBindings: ['fixed'],
  fixed: false,

  didInsertElement() {
    let component = this;
    Ember.$(window).on('scroll', function() {
      //set(component, 'fixed', $(this).scrollTop() > 0);
    });
  }
});

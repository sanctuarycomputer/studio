import Ember from 'ember';
import ManagesTechnologistsMixin from 'profit/mixins/manages-technologists';
import { module, test } from 'qunit';

module('Unit | Mixin | manages technologists');

// Replace this with your real tests.
test('it works', function(assert) {
  let ManagesTechnologistsObject = Ember.Object.extend(ManagesTechnologistsMixin);
  let subject = ManagesTechnologistsObject.create();
  assert.ok(subject);
});

import Ember from 'ember';
import ManagesScenariosMixin from 'profit/mixins/manages-scenarios';
import { module, test } from 'qunit';

module('Unit | Mixin | manages scenarios');

// Replace this with your real tests.
test('it works', function(assert) {
  let ManagesScenariosObject = Ember.Object.extend(ManagesScenariosMixin);
  let subject = ManagesScenariosObject.create();
  assert.ok(subject);
});

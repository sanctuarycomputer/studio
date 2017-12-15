import Ember from 'ember';
import Seeds from 'profit/lib/seeds';
const { get, set } = Ember;

export default Ember.Mixin.create({
  selectedScenario: null,
  selectedHistoricalScenario: null,

  scenarios: Seeds.scenarios,
  historicalScenarios: Seeds.historicalScenarios,

  applyScenario(scenario) {
    set(this, 'income', parseFloat(scenario.profitIncurred(this).toFixed(2)));
    set(this, 'selectedScenario', scenario);
  },

  applyHistoricalScenario(scenario) {
    this.setProperties(get(scenario, 'attrs'));
    set(this, 'selectedHistoricalScenario', scenario);
  }
});

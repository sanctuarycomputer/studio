import Ember from 'ember';
import faker from 'faker';
const { Route, inject: { service }, set, get } = Ember;

export default Route.extend({
  studio: service(),
  notify: service(),

  setupController(controller) {
    set(controller, 'studio', get(this, 'studio'));
    set(controller, 'metricsDrawerOpen', false);
  },

  actions: {
    toggleMetricsDrawerOpenState() {
      get(this, 'controller').toggleProperty('metricsDrawerOpen');
    },
    /* Setters */
    applyScenario() {
      this.applyDummySettings();
      get(this, 'studio').applyScenario(...arguments);
      set(this, 'controller.metricsDrawerOpen', true);
    },
    applyHistoricalScenario() {
      this.get('store').findAll('profit_share_passes');
      get(this, 'studio').applyHistoricalScenario(...arguments);
      set(this, 'controller.metricsDrawerOpen', true);
    },
    setMode(mode) {
      set(this, 'studio.mode', mode);
      get(this, 'studio').reset();
    },
    setNumeric(label, event) {
      const { value } = event.target;
      get(this, 'studio').set(label, parseFloat(value || 0));
      get(this, 'studio').set('selectedScenario', null);
    },

    /* Mock Team Member Concerns */
    addTeamMember() {
      let newTech = get(this, 'studio').makeTechnologist({ name: faker.name.firstName(), monthsAtSanctu: 0, salary: 50000 });
      set(this, 'controller.editing', newTech);
      this.recalculateScenario();
    },
    removeTeamMember() {
      get(this, 'studio').removeTechnologist(...arguments);
      this.recalculateScenario();
    },
    editTeamMember(tech) {
      set(this, 'controller.editing', tech);
    },
    stopEditingTeamMember() {
      set(this, 'controller.editing', null);
    },
    editTeamMemberNumeric(tech, label, event) {
      const { value } = event.target;
      tech.set(label, parseFloat(value || 0));
      this.recalculateScenario();
    },
    randomizeTeam() {
      get(this, 'studio').makeMockTeam();
      this.recalculateScenario();
    }
  },

  recalculateScenario() {
    if (get(this, 'studio.selectedScenario')) get(this, 'studio').applyScenario(get(this, 'studio.selectedScenario'));
  },

  applyDummySettings() {
    if (get(this, 'studio.expenses') === 0) {
      get(this, 'notify').info('No expenses set. Setting to $90,000.');
      set(this, 'studio.expenses', 90000);
    }

    if (get(this, 'studio.desiredPayrollBufferMonths') === 0) {
      get(this, 'notify').info('No payroll buffer months set. Setting to 1 month.');
      set(this, 'studio.desiredPayrollBufferMonths', 1);
    }

    if (get(this, 'studio.efficiencyCap') === 0) {
      get(this, 'notify').info('No Efficiency Cap set. Setting to 1.85.');
      set(this, 'studio.efficiencyCap', 1.85);
    }
  }
});

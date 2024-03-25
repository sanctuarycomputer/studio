import Ember from 'ember';
import faker from 'faker';
const { Route, inject: { service }, set, get } = Ember;

export default Route.extend({
  studio: service(),
  notify: service(),

  model() {
    return fetch('http://localhost:3000/api/profit_share_passes').then((response) => {
      return response.json().then(function(data) {
        const results =  data.map(item => {
          return {
            title: item.year.toString(),
            attrs: {
              efficiencyCap: item.efficiency_cap_from_snapshot,
              desiredPayrollBufferMonths: item.desired_buffer_months,
              income: item.gross_revenue,
              expenses: item.gross_expenses - item.gross_payroll,
              actualLaborCost: item.gross_payroll,
              projectedLaborCost: item.projected_monthly_cost_of_doing_business,
              actualTotalPSUIssued: item.total_psu_issued,
              ficaPercentage: item.fica_tax_rate,
              internalsBudgetMultiplier: item.internals_budget_multiplier
            }
          };
        });
        return results.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      });
    }).catch((error) => {
      console.error('Error fetching data from API:', error);
      return [];
    });
  },

  setupController(controller, model) {
    set(controller, 'studio', get(this, 'studio'));
    set(controller, 'metricsDrawerOpen', false);
    set(controller, 'studio.historicalScenarios', model);
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

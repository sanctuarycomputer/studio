import Ember from 'ember';
import Technologist from 'profit/lib/technologist';
import Seeds from 'profit/lib/seeds';

function clamp(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const { computed, Service, get, set } = Ember;

export default Service.extend({
  expenses: 90000,
  desiredPayrollBufferMonths: 3,
  taxRate: 0.35,
  selectedScenario: null,

  /* Will be populated in this#init() */
  income: 0,
  technologists: [],

  scenarios: Seeds.scenarios,

  init() {
    Seeds.team.forEach(attrs => this.makeTechnologist(attrs));
    this.applyScenario(get(this, 'scenarios.firstObject'));
  },

  makeTechnologist({ name, monthsAtSanctu, salary }) {
    let technologist = Technologist.create({
      name,
      monthsAtSanctu,
      salary,
      studio: this
    });
    get(this, 'technologists').pushObject(technologist);
    return technologist;
  },

  removeTechnologist(technologist) {
    let newList = get(this, 'technologists').filter(tech => tech !== technologist);
    set(this, 'technologists', newList);
  },

  applyScenario(scenario) {
    set(this, 'income', scenario.profitIncurred(this));
    set(this, 'selectedScenario', scenario);
  },

  /* Computed Properties */
  rawEfficiency: computed('income', 'laborCost', 'expenses', function() {
    return get(this, 'income') / (get(this, 'laborCost') + get(this, 'expenses'));
  }).readOnly(),

  efficiency: computed('rawEfficiency', function() {
    let proposed = clamp(get(this, 'rawEfficiency'), 1.00, 1.85, 0, 1);
    return proposed > 1 ? 1 : proposed;
  }).readOnly(),

  totalProfit: computed('income', 'laborCost', 'expenses', function() {
    return get(this, 'income') - (get(this, 'laborCost') + get(this, 'expenses'));
  }).readOnly(),

  allowances: computed('monthlyLaborCost', 'totalProfit', function() {
    let desiredBuffer             = (get(this, 'monthlyLaborCost') * get(this, 'desiredPayrollBufferMonths') * (1 + get(this, 'taxRate')));
    let desiredUpgradeBudget      = get(this, 'monthlyLaborCost') * 1.15;
    let totalProfit               = get(this, 'totalProfit');
    let maxProfitBeforeInvestment = get(this, 'totalPSUIssued') * get(this, 'maxValuePerPSU');

    if (totalProfit >= desiredBuffer) {
      if ((totalProfit - desiredBuffer) >= desiredUpgradeBudget) {
        /* We made enough to afford both a payroll buffer, and
         * studio upgrades for the following year. Best scenario!
         */
        let pool = (totalProfit - desiredBuffer - desiredUpgradeBudget);
        let investment = 0;
        /* In this scenario, we maxxed out profit. This is the
         * best possible scenario, at this point, we're making
         * enough to re-invest either in new products, or build
         * totally different weird things like a video game company
         * or a bar that's modelled like an upstate lake shake
         */
        if (pool > maxProfitBeforeInvestment) {
          investment = pool - maxProfitBeforeInvestment;
          pool = maxProfitBeforeInvestment;
        }
        return {
          buffer: desiredBuffer,
          upgradeBudget: desiredUpgradeBudget,
          pool,
          investment
        };
      }
      /* We made enough to a payroll buffer, but not enough to
       * upgrade the studio, and make strategic hires, etc.
       */
      return {
        buffer: desiredBuffer,
        upgradeBudget: (totalProfit - desiredBuffer),
        pool: 0,
        investment: 0
      };
    }
    /* We didn't make enough for profit share or upgrades,
     * therefore all remaining profit goes to payroll buffer.
     */
    return {
      buffer: totalProfit,
      upgradeBudget: 0,
      pool: 0,
      investment: 0
    };
  }).readOnly(),

  laborCost: computed('technologists.@each.salary', function() {
    return get(this, 'technologists').reduce((a, tech) => {
      return a + get(tech, 'salary');
    }, 0);
  }).readOnly(),

  monthlyLaborCost: computed('laborCost', function() {
    return get(this, 'laborCost') / 12;
  }).readOnly(),

  actualValuePerPSU: computed('totalPSUIssued', 'allowances.pool', function() {
    return get(this, 'allowances.pool') / get(this, 'totalPSUIssued');
  }).readOnly(),

  maxValuePerPSU: computed('efficiency', function() {
    return get(this, 'efficiency') * 1000;
  }).readOnly(),

  totalPSUIssued: computed('technologists.@each.psu', function() {
    return get(this, 'technologists').reduce((a, tech) => {
      return a + get(tech, 'psu');
    }, 0);
  }).readOnly(),
});

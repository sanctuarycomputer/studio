import Ember from 'ember';
import clamp from 'profit/lib/clamp';
import ManagesTechnologists from 'profit/mixins/manages-technologists';
import ManagesScenarios from 'profit/mixins/manages-scenarios';

const { computed, Service, get } = Ember;
const Modes = { MOCK: 'mock', REAL: 'real' };
const TAX_RATE = 0.36;
const DEFAULT_FICA_TAX = 0.0765;
const DEFAULT_INTERNALS_BUDGET_MULTIPLIER = 0.5;

export default Service.extend(
  ManagesTechnologists,
  ManagesScenarios,
{
  /* Calculator Modes */
  mode: Modes.MOCK,
  Modes,

  /* Used in Both Modes */
  expenses: 0,
  income: 0,
  efficiencyCap: 0,
  desiredPayrollBufferMonths: 0,
  ficaPercentage: DEFAULT_FICA_TAX,
  internalsBudgetMultiplier: DEFAULT_INTERNALS_BUDGET_MULTIPLIER,

  /* Only used during "Modes.REAL" */
  actualLaborCost: 0,
  projectedLaborCost: 0,
  actualTotalPSUIssued: 0,
  benefits: 0,
  subcontractors: 0,
  preSpent: 0,
  preSpentReinvestment: 0,

  reset() {
    this.setProperties({
      selectedScenario: null,
      selectedHistoricalScenario: null,
      expenses: 0,
      income: 0,
      efficiencyCap: 0,
      desiredPayrollBufferMonths: 0,
      actualLaborCost: 0,
      projectedLaborCost: 0,
      actualTotalPSUIssued: 0,
      technologists: [],
      ficaPercentage: DEFAULT_FICA_TAX,
      internalsBudgetMultiplier: DEFAULT_INTERNALS_BUDGET_MULTIPLIER
    });
  },

  //   def raw_efficiency
  //   @actuals[:gross_revenue].to_f / total_cost_of_doing_business
  // end
  /* Computed Properties */
  rawEfficiency: computed('income', 'laborCost', 'expenses', function() {
    if (get(this, 'mode') === Modes.REAL) return get(this, 'income') / (get(this, 'totalCostOfDoingBusiness'));

    return get(this, 'income') / (get(this, 'laborCost') + get(this, 'expenses'));
  }).readOnly(),

  efficiency: computed('rawEfficiency', 'efficiencyCap', function() {
    let proposed = clamp(get(this, 'rawEfficiency'), 1.00, get(this, 'efficiencyCap'), 0, 1);
    return proposed > 1 ? 1 : proposed;
  }).readOnly(),

  totalProfit: computed('income', 'laborCost', 'expenses', function() {
    return get(this, 'income') - (get(this, 'laborCost') + get(this, 'expenses'));
  }).readOnly(),

  allowances: computed(
    'monthlyLaborCost',
    'totalProfit',
    'maxValuePerPSU',
    'desiredPayrollBufferMonths',
    'totalPSUIssued',
    'ficaPercentage',
    'internalsBudgetMultiplier',
  function() {
    let desiredBuffer
      = (get(this, 'monthlyLaborCost') * get(this, 'desiredPayrollBufferMonths') * (1 + TAX_RATE));

    let desiredUpgradeBudget      = get(this, 'monthlyLaborCost') * get(this, 'internalsBudgetMultiplier');
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

        /* See the application.hbs template for an explanation of FICA.
         * Because FICA is applied ontop as a percentage, and we are working
         * with the final digit ("pool"), we have to calculate this as a
         * "reverse increasing percentage".
         */
        let poolAfterFicaWithholding = (pool / (1 + get(this, 'ficaPercentage')));

        return {
          buffer: desiredBuffer,
          upgradeBudget: desiredUpgradeBudget,
          pool,
          ficaWithholding: (pool - poolAfterFicaWithholding),
          poolAfterFicaWithholding,
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
        ficaWithholding: 0,
        poolAfterFicaWithholding: 0,
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
      ficaWithholding: 0,
      poolAfterFicaWithholding: 0,
      investment: 0
    };
  }).readOnly(),

  // TODO: rename me to reflect more than labor
  laborCost: computed('technologists.@each.salary', 'mode', 'actualLaborCost', function() {
    /* The Labor Cost attribute is concerned with determining the years
     * efficiency, so in Modes.REAL we use the "actualLaborCost" for that
     * year, rather than a computed projection, as the team may have changed
     * substantially that year.
     */
    if (get(this, 'mode') === Modes.REAL) return get(this, 'totalCostOfDoingBusiness');

    /* Modes.MOCK doesn't take anything other than payroll into account for cost*/
    return get(this, 'technologists').reduce((a, tech) => a + get(tech, 'laborCostThisYear'), 0);
  }).readOnly(),

    //   def total_cost_of_doing_business
  //   @actuals[:gross_payroll].to_f +
  //   @actuals[:gross_expenses].to_f +
  //   @actuals[:gross_benefits].to_f +
  //   @actuals[:gross_subcontractors].to_f -
  //   @pre_spent - # Don't count prespent profit share against this
  //   @pre_spent_reinvestment # Don't count prespent reinvestment against this
  // end
  /* Total cost of doing business */
  totalCostOfDoingBusiness: computed('actuallaborCost', 'expenses',  'benefits', 'subcontractors', 'preSpent', 'preSpentReinvestment', function() {
    return get(this, 'actualLaborCost') + get(this, 'expenses') + get(this, 'benefits') + get(this, 'subcontractors') - get(this, 'preSpent') - get(this, 'preSpentReinvestment');
  }).readOnly(),

  monthlyLaborCost: computed('laborCost', 'mode', 'projectedLaborCost', function() {
    /* Monthly Labor Cost is concerned with Generating Payroll buffer,
     * so in Modes.REAL we use the most "up to date" projection for
     * salary costing, rather than actualLaborCost.
     */
    // This is really projected_monthly_cost_of_doing_business in Stacks, which takes 
    // more than labor into account
    if (get(this, 'mode') === Modes.REAL) return (get(this, 'projectedLaborCost') / 12);
    return get(this, 'laborCost') / 12;
  }).readOnly(),

  actualValuePerPSU: computed('totalPSUIssued', 'allowances.poolAfterFicaWithholding', function() {
    return get(this, 'allowances.poolAfterFicaWithholding') / get(this, 'totalPSUIssued');
  }).readOnly(),

  maxValuePerPSU: computed('efficiency', function() {
    return get(this, 'efficiency') * 1000;
  }).readOnly(),

  totalPSUIssued: computed('technologists.@each.psu', 'mode', 'actualTotalPSUIssued', function() {
    if (get(this, 'mode') === Modes.REAL) return get(this, 'actualTotalPSUIssued');
    return get(this, 'technologists').reduce((a, tech) => a + get(tech, 'psu'), 0);
  }).readOnly(),
});

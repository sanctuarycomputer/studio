import Ember from 'ember';
const { computed, get } = Ember;

const AVERAGE_HEALTHCARE_COST = 450;

export default Ember.Object.extend({
  monthsAtSanctu: 0,

  psu: computed('monthsAtSanctu', function() {
    return get(this, 'monthsAtSanctu');
  }),

  profitShare: computed('psu', 'studio.actualValuePerPSU', function() {
    return get(this, 'psu') * get(this, 'studio.actualValuePerPSU');
  }),

  laborCostThisYear: computed('salary', 'monthsAtSanctu', function() {
    const monthsAtSanctu = get(this, 'monthsAtSanctu');
    const salary = get(this, 'salary');
    const healthCareCost = (monthsAtSanctu * AVERAGE_HEALTHCARE_COST);

    if (monthsAtSanctu > 12) return (salary + healthCareCost);
    return (salary * (monthsAtSanctu / 12)) + healthCareCost;
  }),
});

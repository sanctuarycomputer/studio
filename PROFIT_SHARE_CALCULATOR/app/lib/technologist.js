import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Object.extend({
  monthsAtSanctu: 0,

  psu: computed('monthsAtSanctu', function() {
    return get(this, 'monthsAtSanctu');
  }),

  profitShare: computed('psu', 'studio.actualValuePerPSU', function() {
    return get(this, 'psu') * get(this, 'studio.actualValuePerPSU');
  })
});


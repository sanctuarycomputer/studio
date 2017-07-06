import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Object.extend({
  monthsAtSanctu: 0,

  psu: computed('monthsAtSanctu', function() {
    return get(this, 'monthsAtSanctu');
  }),

  profitShare: computed('studio.allowances.pool', 'studio.efficiency', 'studio.totalPSUIssued', 'psu', function() {
    return (
      get(this, 'studio.allowances.pool') *
      get(this, 'studio.efficiency') *
      (get(this, 'psu') / get(this, 'studio.totalPSUIssued'))
    );
  })
});


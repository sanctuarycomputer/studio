import Ember from 'ember';

function clamp(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const { computed, Service, get, inject: { service } } = Ember;

const Technologist = Ember.Object.extend({
  monthsAtSanctu: 0,

  psu: computed('monthsAtSanctu', function() {
    return get(this, 'monthsAtSanctu') * 2;
  }),

  profitShare: computed('studio.allowances.pool', 'studio.efficiency', 'studio.totalPSUIssued', 'psu', function() {
    return (
      get(this, 'studio.allowances.pool') *
      get(this, 'studio.efficiency') *
      (get(this, 'psu') / get(this, 'studio.totalPSUIssued'))
    );
  })
});

export default Service.extend({
  income: 620000,
  laborCost: 360000,
  expenses: 90000,

  technologists: [],

  init() {
    /* Seed the Technologists */
    [{
      name: 'Carly',
      monthsAtSanctu: 12
    }, {
      name: 'Jeffo',
      monthsAtSanctu: 31
    }, {
      name: 'Donna',
      monthsAtSanctu: 17
    }, {
      name: 'Avery',
      monthsAtSanctu: 19
    }, {
      name: 'Hugh',
      monthsAtSanctu: 48
    }].forEach(attrs => this.makeTechnologist(attrs));
  },

  makeTechnologist({ name, monthsAtSanctu }) {
    get(this, 'technologists').pushObject(Technologist.create({
      name,
      monthsAtSanctu,
      studio: this
    }));
  },

  totalPSUIssued: computed('technologists.@each.psu', function() {
    return get(this, 'technologists').reduce((a, tech) => {
      return a + get(tech, 'psu');
    }, 0);
  }),

  rawEfficiency: computed('income', 'laborCost', 'expenses', function() {
    return get(this, 'income') / (get(this, 'laborCost') + get(this, 'expenses'));
  }),

  /* 0.3 */
  efficiency: computed('rawEfficiency', function() {
    return clamp(get(this, 'rawEfficiency'), 1.00, 1.7, 0, 1);
  }),

  totalProfit: computed('income', 'laborCost', 'expenses', function() {
    return get(this, 'income') - (get(this, 'laborCost') + get(this, 'expenses'));
  }),

  monthlyLaborCost: computed('laborCost', function() {
    return get(this, 'laborCost') /12;
  }),

  allowances: computed('monthlyLaborCost', 'totalProfit', function() {
    let desiredBuffer        = get(this, 'monthlyLaborCost') * 2;
    let desiredUpgradeBudget = get(this, 'monthlyLaborCost') * 1.2;
    let totalProfit          = get(this, 'totalProfit');

    if (totalProfit >= desiredBuffer) {
      if ((totalProfit - desiredBuffer) >= desiredUpgradeBudget) {
        return {
          buffer: desiredBuffer,
          upgradeBudget: desiredUpgradeBudget,
          pool: (totalProfit - desiredBuffer - desiredUpgradeBudget)
        };
      };
      return {
        buffer: desiredBuffer,
        upgradeBudget: (totalProfit - desiredBuffer),
        pool: 0
      };
    };
    return {
      buffer: totalProfit,
      upgradeBudget: 0,
      pool: 0
    };
  }),

  studioUpgradeBudget: computed('monthlyLaborCost', function() {
    return get(this, 'monthlyLaborCost') * 1.2;
  })
});

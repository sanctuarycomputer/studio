import Ember from 'ember';
const { get } = Ember;

export default {
  /* Mock Team */
  team: [{
    name: 'Carly',
    monthsAtSanctu: 14,
    salary: 65000
  }, {
    name: 'Richie',
    monthsAtSanctu: 1,
    salary: 32000
  }, {
    name: 'Isa',
    monthsAtSanctu: 5,
    salary: 41000
  }, {
    name: 'Farrah',
    monthsAtSanctu: 35,
    salary: 86000
  }, {
    name: 'Avery',
    monthsAtSanctu: 19,
    salary: 82000
  }, {
    name: 'Jack',
    monthsAtSanctu: 48,
    salary: 65000
  }],

  /* Mock Scenarios */
  scenarios: [{
    title: "Struggle street",
    description: "Just scraping through without profit",
    profitIncurred: studio => {
      let { laborCost, expenses } = studio.getProperties(['laborCost', 'expenses']);
      return laborCost + expenses;
    }
  }, {
    title: "We're not dead",
    description: "Just enough profit for next year's payroll buffer",
    profitIncurred: studio => {
      let { laborCost, expenses } = studio.getProperties(['laborCost', 'expenses']);
      return laborCost + expenses + ((laborCost / 12) * ((get(studio, 'desiredPayrollBufferMonths')) + 0.85));
    }
  }, {
    title: "Pretty good tho",
    description: "Healthy profit, on our way to a big year",
    profitIncurred: studio => {
      let { laborCost, expenses } = studio.getProperties(['laborCost', 'expenses']);
      return (laborCost * 1.7) + expenses;
    }
  }, {
    title: "Neo from the Matrix",
    description: "We can literally make apps in our brains",
    profitIncurred: studio => {
      let { laborCost, expenses } = studio.getProperties(['laborCost', 'expenses']);
      return (laborCost + expenses) * 1.85;
    }
  }],

  /* Historial Scenarios */
  historicalScenarios: [{
    title: "2017",
    description: "Our first year of profit sharing!",
    attrs: {
      efficiencyCap: 1.9,
      desiredPayrollBufferMonths: 1,
      income: 614008.84,
      expenses: 132485.05,
      actualLaborCost: 346502.51,
      projectedLaborCost: 345000,
      actualTotalPSUIssued: 84,
      ficaPercentage: 0 // By mistake, we did not factor in FICA in 2017
    }
  }, {
    title: "2018",
    description: "We doubled our team!",
    attrs: {
      efficiencyCap: 1.6,
      desiredPayrollBufferMonths: 1,
      income: 1168836,
      expenses: 304610,
      actualLaborCost: 653351,
      projectedLaborCost: 1008000,
      actualTotalPSUIssued: 139,
      ficaPercentage: 0 // By mistake, we did not factor in FICA in 2018
    }
  }]
}

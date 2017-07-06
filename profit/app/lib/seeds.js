import Ember from 'ember';
const { get } = Ember;

export default {
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
    name: 'Hugh',
    monthsAtSanctu: 48,
    salary: 74000
  }],
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
    title: "Good solid dev",
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
  }]
}

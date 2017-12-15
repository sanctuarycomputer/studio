import Ember from 'ember';
import Technologist from 'profit/lib/technologist';
import Seeds from 'profit/lib/seeds';
const { get, set } = Ember;

export default Ember.Mixin.create({
  technologists: [],

  makeMockTeam() {
    Seeds.team.forEach(attrs => this.makeTechnologist(attrs));
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
});

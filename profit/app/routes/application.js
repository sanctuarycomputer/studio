import Ember from 'ember';
import faker from 'faker';
const { Route, inject: { service }, set, get } = Ember;

export default Route.extend({
  studio: service(),
  setupController(controller) {
    set(controller, 'studio', get(this, 'studio'));
  },
  actions: {
    applyScenario() {
      get(this, 'studio').applyScenario(...arguments);
    },
    setNumeric(label, event) {
      const { value } = event.target;
      get(this, 'studio').set(label, parseFloat(value || 0));
      get(this, 'studio').set('selectedScenario', null);
    },
    addTeamMember() {
      let newTech = get(this, 'studio').makeTechnologist({ name: faker.name.firstName(), monthsAtSanctu: 0, salary: 50000 });
      set(this, 'controller.editing', newTech);
    },
    removeTeamMember() {
      get(this, 'studio').removeTechnologist(...arguments);
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
    }
  }
});

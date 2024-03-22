import DS from 'ember-data';

export default DS.Model.extend({
  snapshot:  DS.attr(),
  totalPsuIssued: DS.attr('number'),
});

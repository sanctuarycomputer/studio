import DS from 'ember-data';

export default DS.Model.extend({
  profitSharePasses: DS.hasMany('profit_share_pass'),
});

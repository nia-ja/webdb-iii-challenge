exports.seed = function(knex, Promise) {
  return knex('cohorts').insert([
    {name: 'WEBPT4'},
    {name: 'WEBPT14'},
    {name: 'iOS3'}
  ]);
};
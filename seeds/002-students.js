exports.seed = function(knex, Promise) {
  return knex('students').insert([
    {name: 'Mychal Hall', cohorts_id: 1},
    {name: 'Dustin Snoap', cohorts_id: 1},
    {name: 'Carlos Lantigua', cohorts_id: 2}
  ]);
};
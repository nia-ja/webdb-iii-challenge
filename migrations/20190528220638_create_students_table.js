exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        // add id
        tbl.increments();
        
        // add 'name'
        tbl
            .text('name').notNullable();

        // add a foreign key
        tbl
            .integer('cohorts_id')
            .unsigned()
            .references('id')
            .inTable('cohorts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
        // add timestamp
        tbl.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
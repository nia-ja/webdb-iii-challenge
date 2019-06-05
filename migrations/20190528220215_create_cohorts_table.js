exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', tbl => {
        // creates 'id' column (primary key, auto-increments)
        tbl.increments();
        
        // creates 'name' column (text, required)
        tbl
          .text('name').notNullable();
        
        // creates timestemps for 'created_at' and for 'modified_at' 
        tbl.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    // deleting the table
    return knex.schema.dropTableIfExists('cohorts');
};
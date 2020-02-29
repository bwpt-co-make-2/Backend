
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 128)
                .notNullable()
                .unique();
            tbl.string('password', 256)
                .notNullable();
            tbl.integer('zipcode', 5)
                .notNullable();
            tbl.boolean('government official', false);
        })

        .createTable('issues', tbl => {
            tbl.increments();
            tbl.string('title', 256)
                .notNullable();
            tbl.string('description', 500)
                .notNullable();
            tbl.string('picture', 500);
            tbl.integer('zipcode', 5);
            tbl.integer('users_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })

        .createTable('upvote', tbl => {
            tbl.increments();
            tbl.integer('users_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('issues_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('issues')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('upvote')
        .dropTableIfExists('issues')
        .dropTableIfExists('users')
};

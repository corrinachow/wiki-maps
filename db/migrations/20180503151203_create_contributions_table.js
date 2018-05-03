exports.up = function(knex, Promise) {
  return knex.schema.createTable("contributions", function(table) {
    table.increments("id").primary();
    table.string("action");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull()
      .onDelete("cascade");
    table
      .integer("map_id")
      .references("id")
      .inTable("maps")
      .notNull()
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("contributions");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("contributions", function(table) {
    table.increments("id").primary();
    table.string("action", 10);
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull();
    table
      .integer("map_id")
      .references("id")
      .inTable("maps")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("contributions");
};

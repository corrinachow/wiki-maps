exports.up = function(knex, Promise) {
  return knex.schema.createTable("maps", function(table) {
    table.increments("id").primary();
    table.string("title", 50);
    table.specificType('coordinates', 'POINT');
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("maps");
};

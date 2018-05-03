exports.up = function(knex, Promise) {
  return knex.schema.createTable("maps", function(table) {
    table.increments("id").primary();
    table.string("title");
    table.specificType('coordinates', 'POINT');
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull()
      .onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("maps");
};

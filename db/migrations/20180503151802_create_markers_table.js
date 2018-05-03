exports.up = function(knex, Promise) {
  return knex.schema.createTable("markers", function(table) {
    table.increments("id").primary();
    table.string("title", 50);
    table.string("description");
    table.string("image_url");
    table.specificType("coordinates", "POINT");
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
    table.boolean("active");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("markers");
};

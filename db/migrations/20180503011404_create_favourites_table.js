exports.up = function(knex, Promise) {
  return knex.schema.createTable("favourites", function(table) {
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
  return knex.schema.dropTable("favourites");
};

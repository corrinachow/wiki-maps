const faker = require("faker");
let contributions = 10;

exports.seed = function(knex, Promise) {
  return Promise.resolve(["users", "maps"])
    .map(function(table) {
      return knex
        .select("id")
        .from(table)
        .pluck("id");
    })
    .spread(function(users, maps) {
      return new Array(contributions).fill(1).map(function() {
        return {
          action: faker.lorem.word(),
          user_id: faker.random.arrayElement(users),
          map_id: faker.random.arrayElement(maps)
        };
      });
    })
    .then(function(contributions) {
      return knex("contributions").insert(contributions);
    })
    .catch(err => {
      console.log(err);
    });
};

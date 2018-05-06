const faker = require("faker");
let favourites = 50;

exports.seed = function(knex, Promise) {
  return Promise.resolve(["users", "maps"])
    .map(function(table) {
      return knex
        .select("id")
        .from(table)
        .pluck("id");
    })
    .spread(function(users, maps) {
      return new Array(favourites).fill(1).map(function() {
        return {
          user_id: faker.random.arrayElement(users),
          map_id: faker.random.arrayElement(maps)
        };
      });
    })
    .then(function(favourites) {
      return knex("favourites").insert(favourites);
    })
    .catch(err => {
      console.log(err);
    });
};

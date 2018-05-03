const faker = require("faker");
let markers = 50;

exports.seed = function(knex, Promise) {
  return Promise.resolve(["users", "maps"])
    .map(function(table) {
      return knex
        .select("id")
        .from(table)
        .pluck("id");
    })
    .spread(function(users, maps) {
      return new Array(markers).fill(1).map(function() {
        let lat = faker.address.latitude();
        let lon = faker.address.longitude();
        return {
          title: faker.lorem.word(),
          description: faker.lorem.words(5),
          image_url: faker.image.imageUrl(),
          coordinates: knex.raw(`point(${lat}, ${lon})`),
          user_id: faker.random.arrayElement(users),
          map_id: faker.random.arrayElement(maps),
          active: faker.random.boolean(),
        };
      });
    })
    .then(function(markers) {
      return knex("markers").insert(markers);
    })
    .catch(err => {
      console.log(err);
    });
};

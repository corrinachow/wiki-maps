const faker = require("faker");
const dataLength = 10;

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      const users = [];
      for (let index = 0; index < dataLength; index++) {
        users.push({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        });
      }
      return knex("users").insert(users);
    })
    .then(() => {
      return knex("users")
        .pluck("id")
        .then(userIds => {
          const maps = [];
          for (let index = 0; index < dataLength; index++) {
            let lat = faker.address.latitude();
            let lon = faker.address.longitude();
            maps.push({
              title: faker.lorem.words(2),
              coordinates: knex.raw(`point(${lat}, ${lon})`),
              user_id: faker.random.arrayElement(userIds),
              location: faker.address.city()
            });
          }
          return knex("maps").insert(maps);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

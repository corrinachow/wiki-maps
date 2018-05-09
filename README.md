
# Wiki Maps

Wiki Maps is a web application that allows users to share their favourite spots with the world!
Users can search for a location and create maps with a topic, for example "Best Coffee in Montreal". Then users share their favourite coffee shops in Montreal by placing markers on a map indicating their favourite spots.

Users can view all maps on the home page whether they are logged in or not, however only authenticated users can create maps, modify maps (add, edit and remove markers) and favourite maps. Users have profiles that indicate their favourite maps, as well as the maps that they have contributed to.

## Final Product

!["home page"](https://github.com/corrinachow/wiki-maps/blob/master/docs/home-page.png)
!["view maps"](https://github.com/corrinachow/wiki-maps/blob/master/docs/view-maps.png)
!["create maps"](https://github.com/corrinachow/wiki-maps/blob/master/docs/create-maps-page.png)
!["edit maps"](https://github.com/corrinachow/wiki-maps/blob/master/docs/edit-maps-page.png)
!["mobile"](https://github.com/corrinachow/wiki-maps/blob/master/docs/mobile-users-page.png)

## Dependencies

- Node 5.10.x or above
- Express
- EJS
- Dotenv
- body-parser
- Cookies.js
- Knex
- Knex-logger
- Morgan
- Node-sass-middleware
- pg
- Faker
- Nodemon

## Getting Started

1. Create the .ENV with the correct local information
2. Install dependencies using `npm install`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run migrations: `npm run knex migrate:latest`
5. Run the seed: `npm run knex seed:run`
6. Run the server: `npm run local`
7. Visit http://localhost:8080/


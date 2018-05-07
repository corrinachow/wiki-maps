
# Wiki Maps

Wiki Maps is a web application that allows users to share their favourites spots with the world,
users can search for a loaction and create maps with a topic, for example 'Best Coffee in Montreal'. Then users collabority share their favourite coffee shops in Montreal by placing markers on a map indicating their favourite spots.

Users can view all maps on the home page whether they are logged in or not, however only authenticated users can create maps,modify maps (add, edit and remove markers) and favourite maps. Users have profiles that indicate their favourite maps as well as the maps that they have contributed to.

##Final Product

!["Screenshot of the login page"]()
!["Screenshot of the create new urls page"]()

## Dependencies

- node
- express
- ejs
- dotenv
- cookies
- knex
- knex-logger
- morgan
- node-sass-middleware
- pg

## Getting Started

1. Create the .evn with the correct local information
2. Install dependencies: npm install
3. Fix to binaries for sass: npm rebuild node-sass
4. Run migrations: npm run latest
5. Run the seed: npm run seed
6. Run the server: npm run local
7. Visit http://localhost:8080/


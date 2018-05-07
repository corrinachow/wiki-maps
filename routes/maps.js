"use strict";

const express = require("express");
const router = express.Router();

function aggregateData(data) {
  const mapData = {};
  for (const dataItem of data) {
    mapData[dataItem.map_id] = mapData[dataItem.map_id] || {
      map_id: dataItem.map_id,
      map_title: dataItem.map_title,
      map_location: dataItem.map_location,
      map_coordinates: dataItem.map_coordinates,
      map_creator: { user_id: dataItem.user_id, username: dataItem.username },
      favourites: []
    };

    mapData.markers = mapData.markers || [];

    const filteredData = data.filter(
      dataObj => dataObj.map_id === dataItem.map_id
    );

    const markerObj = {
      marker_id: dataItem.marker_id,
      map_id: dataItem.map_id,
      marker_title: dataItem.marker_title,
      marker_description: dataItem.marker_description,
      marker_coordinates: dataItem.marker_coordinates,
      marker_img_url: dataItem.marker_img_url
    };
    const filterMarker = mapData.markers.filter(
      fMarkerObj => fMarkerObj.marker_id === markerObj.marker_id
    );

    const favObj = {
      favourite_id: dataItem.favourite_id,
      user_id: dataItem.favourite_user_id
    };

    const filterFavourite = mapData[dataItem.map_id].favourites.filter(
      fFavObj => fFavObj.favourite_id === favObj.favourite_id
    );

    if (filterMarker.length < 1) {
      mapData.markers.push(markerObj);
    }
    if (filterFavourite.length < 1) {
      mapData[dataItem.map_id].favourites.push(favObj);
    }
  }
  return mapData;
}

module.exports = knex => {
  router.get("/new", (req, res) => {
    res.render("create_maps");
  }),
    router.get("/", (req, res) => {
      knex("maps")
        .leftJoin("users", "users.id", "maps.user_id")
        .select("username", "maps.id as id", "coordinates", "title")
        .then(results => {
          res.json(results);
        });
    }),
    router.get("/:id", (req, res) => {
      knex("maps")
        .leftJoin("users", "users.id", "maps.user_id")
        .leftJoin("markers", "maps.id", "markers.map_id")
        .leftJoin("favourites", "favourites.map_id", "maps.id")
        .where("maps.id", req.params.id)
        .select(
          "username",
          "users.id as user_id",
          "maps.id as map_id",
          "maps.title as map_title",
          "maps.location as map_location",
          "maps.coordinates as map_coordinates",
          "markers.id as marker_id",
          "markers.title as marker_title",
          "markers.description as marker_description",
          "markers.image_url as marker_img_url",
          "markers.coordinates as marker_coordinates",
          "markers.map_id as map_id",
          "favourites.id as favourite_id",
          "favourites.user_id as favourite_user_id"
        )
        .then(map => {
          const parseData = aggregateData(map);
          res.json(parseData);
        });
    }),
    router.get("/:id/favourites", (req, res) => {
      knex("favourites")
        .select("*")
        .where("map_id", req.params.id)
        .then(favourites => {
          res.json(favourites);
        });
    }),
    router.post("/new", (req, res) => {
      // FIXME: user_id to grab user_id from cookie...

      console.log(req.body)
      const mapInput = {
        user_id: 1
      };

      const mapLocation = req.body.location;
      const mapTitle = req.body.title;

      mapInput["location"] = mapLocation;
      mapInput["title"] = mapTitle;
      mapInput["coordinates"] = knex.raw(
        `point(${req.body.coordinates.lat},${req.body.coordinates.lng})`
      );

      knex("maps")
        .insert(mapInput)
        .returning("*")
        .then(([result])=> {


          const favouriteObj = {user_id:1, map_id: result.id}
          console.log(favouriteObj)

          knex("favourites")
            .insert(favouriteObj)
            .returning("*")
            .then(([result])=> {
              const markerObj = {
              user_id: 1,
              map_id: result.map_id,
              title: "Center of your map!",
              image_url: "",
              description:"",
              coordinates: knex.raw(`point(${req.body.coordinates.lat},${req.body.coordinates.lng})`)}

              return knex("markers").insert(markerObj).returning("*")

          })
            .then(([r]) => {
              console.log(r);
              res.send(r);
            })
          }),
    router.post("/:id", (req, res) => {
      console.log(req.body)
      //FIXME: use user_id from cookie lmfao

      const favouriteObj = {
        user_id: req.body.user_id,
        map_id: req.params.id
      };

      knex("favourites")
        .select("*")
        .where({ user_id: favouriteObj.user_id, map_id: req.params.id })
        .then(results => {
          // If the user has not liked the post, add to DB
          if (results.length < 1) {
            knex("favourites")
              .insert(favouriteObj)
              .returning("*")
              .then(favourite =>
                console.log("Successfully added like", favourite)
              );
            // The user is disliking the post, remove from DB
          } else {
            knex("favourites")
              .where(favouriteObj)
              .del()
              .then(() => {
                console.log("Successfully deleted like");
              });
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  })
  return router
}
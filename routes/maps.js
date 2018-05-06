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
      favourite_id: dataItem.favourite_id
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
    res.send("new maps page");
  }),
    router.get("/", (req, res) => {
      knex("maps")
        .join("users", "users.id", "maps.user_id")
        .select("username", "maps.id as id", "coordinates", "title")
        .then(results => {
          res.json(results);
        });
    }),
    router.get("/:id", (req, res) => {
      knex("maps")
        .join("users", "users.id", "maps.user_id")
        .join("markers", "maps.id", "markers.map_id")
        .join("favourites", "favourites.map_id", "maps.id")
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
          "favourites.id as favourite_id"
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

      // Fix user_id to grab user_id from cookie...
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
        .then(([r]) => {
          console.log(r.id);

          res.redirect(r.id);
        });
    });

  return router;
};

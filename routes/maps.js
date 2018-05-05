"use strict";

const express = require("express");
const router = express.Router();

function aggregateData(data) {
  const mapData = {};

  for (const dataItem of data) {
    mapData[dataItem.map_id] = mapData[dataItem.map_id] || {
      map_id: dataItem.map_id,
      map_title: dataItem.map_title,
      map_coordinates: dataItem.map_coordinates,
      map_creator: dataItem.username,
      favourites: []
    };

    console.log(mapData[dataItem.map_id].favourites);

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

function getMapFavourites(data) {
  const result = [];
  for (const obj of data) {
    result.push({
      favourites: obj.favourite_id
    });
  }
  return result;
}

module.exports = knex => {
  router.get("/new", (req, res) => {
    res.send("new maps page");
  }),
    router.get("/", (req, res) => {
      knex("maps")
        .join("users", "users.id", "maps.user_id")
        .select(
          "username",
          "maps.id as id",
          "coordinates",
          "title"
        )
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
          "maps.id as map_id",
          "maps.title as map_title",
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
    });

  return router;
};

"use strict";

const express = require("express");
const router = express.Router();

function getMapMarkers(data) {
  const result = [];
  for (const obj of data) {
    result.push({
      marker_id: obj.marker_id,
      marker_title: obj.marker_title,
      marker_description: obj.marker_description,
      marker_coordinates: obj.marker_coordinates,
      marker_img_url: obj.marker_img_url,
      marker_created_by: obj.marker_created_by
    });
  }
  return result;
}

function aggregateData(data) {
  const userData = {};

  for (const dataItem of data) {
    userData[dataItem.user_id] = userData[dataItem.user_id] || {
      user_id: dataItem.user_id,
      email: dataItem.email,
      username: dataItem.username
    };

    userData.maps = userData.maps || [];
    userData.contributions = userData.contributions || [];
    userData.favourites = userData.favourites || [];

    const filteredData = data.filter(
      dataObj => dataObj.map_id === dataItem.map_id
    );
    const mapObj = {
      map_id: filteredData[0].map_id,
      map_title: filteredData[0].map_title,
      map_coordinates: filteredData[0].map_coordinates
    };
    const filterMap = userData.maps.filter(
      fMapObj => fMapObj.map_id === mapObj.map_id
    );
    const contrObj = {
      marker_id: dataItem.marker_id,
      markers_map_id: dataItem.markers_map_id,
      marker_title: dataItem.marker_title,
      marker_description: dataItem.marker_description,
      marker_coordinates: dataItem.marker_coordinates,
      marker_img_url: dataItem.marker_img_url
    };
    const filterContr = userData.contributions.filter(
      fContrObj => fContrObj.marker_id === contrObj.marker_id
    );

    const favObj = {
      map_id: dataItem.favourite_map
    };

    const filterFavourite = userData.favourites.filter(
      fFavObj => fFavObj.map_id === favObj.map_id
    );

    if (filterMap.length < 1) {
      userData.maps.push(mapObj);
    }
    if (filterContr.length < 1) {
      userData.contributions.push(contrObj);
    }
    if (filterFavourite.length < 1) {
      userData.favourites.push(favObj);
    }
  }
  return userData;
}

module.exports = knex => {
  router.get("/", (req, res) => {
    knex("users")
      // .join("contributions", "users.id", "contributions.user_id")
      // .join("maps", "contributions.user_id", "maps.user_id")
      .select("*")
      .then(results => {
        res.json(results);
      });
  }),
    router.get("/:id", (req, res) => {
      console.log(req.params.id)
      knex("users")
        .leftJoin("maps", "users.id", "maps.user_id")
        .leftJoin("markers", "users.id", "markers.user_id")
        .leftJoin("favourites", "users.id", "favourites.user_id")
        .where("users.id", req.params.id)
        .select(
          "users.id as user_id",
          "email",
          "username",
          "maps.id as map_id",
          "maps.title as map_title",
          "maps.coordinates as map_coordinates",
          "markers.id as marker_id",
          "markers.title as marker_title",
          "markers.description as marker_description",
          "markers.image_url as marker_img_url",
          "markers.coordinates as marker_coordinates",
          "markers.map_id as markers_map_id",
          "favourites.map_id as favourite_map"
        )
        .then(user => {
          const parseData = aggregateData(user);
          res.json(parseData);
        });
    });
  router.get("/:id/favourites", (req, res) => {
    knex("favourites")
      .leftJoin("users", "users.id", "favourites.user_id")
      .leftJoin("maps", "maps.id", "favourites.map_id")
      .select(
        "maps.id as maps_id",
        "maps.title as map_title",
        "maps.coordinates as map_coordinates"
      )
      .where({ "users.id": req.params.id })
      .then(favourites => {
        res.json(favourites);
      });
  });

  return router;
};

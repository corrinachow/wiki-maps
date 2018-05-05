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
      map_id: dataItem.map_id,
      marker_title: dataItem.marker_title,
      marker_description: dataItem.marker_description,
      marker_coordinates: dataItem.marker_coordinates,
      marker_img_url: dataItem.marker_img_url
    };
    const filterContr = userData.contributions.filter(
      fContrObj => fContrObj.marker_id === contrObj.marker_id
    );

    if (filterMap.length < 1) {
      userData.maps.push(mapObj);
    } else if (filterContr.length < 1) {
      userData.contributions.push(contrObj);
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
        .join("maps", "users.id", "maps.user_id")
        .join("markers", "users.id", "markers.user_id")
        .where("users.id",req.params.id )
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
          "markers.map_id as map_id"
        )

        .then(user => {
          const parseData = aggregateData;(user);
          res.json(parseData);
        });
    }),
    router.get("/:id/favourites", (req, res) => {
      knex("favourites")
        .join("users", "users.id", "favourites.user_id")
        .join("maps", "maps.id", "favourites.map_id")
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

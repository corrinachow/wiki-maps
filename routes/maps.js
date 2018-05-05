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
      map_creator: dataItem.username
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

    if (filterMarker.length < 1) {
      mapData.markers.push(markerObj);
    }
  }
  return mapData;
}

module.exports = knex => {
  router.get("/new", (req, res) => {
    res.send("new maps page");
  }),
    router.get("/", (req, res) => {
      knex
        .select("*")
        .from("maps")
        .then(results => {
          res.json(results);
        });
    }),
    router.get("/:id", (req, res) => {
      knex("maps")
        .join("users", "users.id", "maps.user_id")
        .join("markers", "maps.id", "markers.map_id")
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
          "markers.map_id as map_id"
        )
        .then(map => {
          const parseData = aggregateData(map)
          res.json(parseData);
        });
    });

  return router;
};

"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex("users")
      .join("contributions", "users.id", "contributions.user_id")
      .join("maps", "contributions.user_id", "maps.user_id")
      .select("*")
      .then(results => {
        res.json(results);
      });
  }),
    router.get("/:id", (req, res) => {
      knex("users")
        .join("contributions", "users.id", "contributions.user_id")
        .join("maps", "maps.id", "contributions.map_id")
        .join("markers", "maps.id", "markers.map_id")
        .select(
          "users.id as user_id",
          "email",
          "username",
          "contributions.id as contribution_id",
          "contributions.action",
          "maps.id as map_id",
          "maps.title as map_title",
          "maps.coordinates as map_coordinates",
          "markers.id as marker_id",
          "markers.title as marker_title",
          "markers.description as marker_description",
          "markers.image_url as marker_img_url",
          "markers.coordinates as marker_coordinates",
          "markers.active"
        )
        .where({ "users.id": req.params.id })
        .then(user => {
          res.json(user);
        });
    }),
    router.get("/:id/favourites", (req, res) => {
      knex("favourites")
        .join("users", "users.id", "favourites.user_id")
        .join("maps", "maps.id", "favourites.map_id")
        .select("map_id", "title", "coordinates")
        .where({ "users.id": req.params.id })
        .then(favourites => {
          res.json(favourites);
        });
    });

  return router;
};

// user_contributions: [{contribution_id:info},
//                       {contribution2:info}
//                       ]

//                     action:
//                     map_id:

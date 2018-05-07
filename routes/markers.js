"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .then(results => {
        res.json(results);
      });
  }),
    router.post("/new", (req, res) => {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log(req.body);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

      const markerInput = {
      };


      let markerTitle = req.body.title;
      let markerImage = req.body.image_url;
      let markerDesc = req.body.description;

      console.log(markerInput)
      markerInput["title"] = markerTitle;
      markerInput.map_id = req.body.map_id;
      markerInput["image_url"] = markerImage;
      markerInput["description"] = markerDesc;
      markerInput["coordinates"] = knex.raw(
        `point(${req.body.coordinates.lat},${req.body.coordinates.lng})`
      );

      console.log(markerInput);

      knex("markers")
        .insert(markerInput)
        .returning("*")
        .then(([r]) => {
          res.send(r);
        });
    });

  return router;
};

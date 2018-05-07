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
      const markerInput = {
        user_id: req.body.user_id,
        map_id: req.body.map_id
      };

      let markerTitle = req.body.title;
      let markerImage = req.body.image_url;
      let markerDesc = req.body.description;

      console.log(markerInput);
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
    }),
    router.post("/edit", (req, res) => {
      console.log(req.body);
      knex("markers")
        .where("id", Number(req.body.marker_id))
        .update({
          title: req.body.title,
          description: req.body.description,
          image_url: req.body.image_url
        })
        .then(() => {
          res.status(200).send("Updated");
        })
        .catch(err => {
          console.log(err);
        });
    }),
    router.post("/delete", (req, res) => {
      knex("markers")
        .where("id", Number(req.body.marker_id))
        .del()
        .then(() => {
          res.status(200).send("Deleted");
        });
    });

  return router;
};

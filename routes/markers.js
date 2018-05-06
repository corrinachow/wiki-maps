"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
    .select("*")
    .from("markers")
    .then((results) => {
      res.json(results);
    })
  }),

    router.post("/new", (req,res) => {
console.log(req.body)
      const markerInput = {
        user_id:2,
        map_id:47
      }

      let markerTitle = req.body.marker_title
      let markerImage = req.body.marker_image
      let markerDesc = req.body.marker_description

      markerInput["title"] =  markerTitle
      markerInput["image_url"] = markerImage
      markerInput["description"] = markerDesc
      markerInput["coordinates"] = knex.raw(`point(${req.body.coordinates.lat},${req.body.coordinates.lng})`)

      console.log(markerInput);

      knex('markers').insert(markerInput).returning('*').then(([r])=>{
      res.redirect(r.map_id)
    })

    })

  return router;
}

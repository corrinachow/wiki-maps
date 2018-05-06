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
        map_id:3
      }


      let markerTitle = req.body.title
      let markerImage = req.body.image_url
      let markerDesc = req.body.description

      markerInput["title"] =  markerTitle

      markerInput["image_url"] = markerImage
      markerInput["description"] = markerDesc
      markerInput["coordinates"] = knex.raw(`point(${req.body.coordinates.lat},${req.body.coordinates.lng})`)

      console.log(markerInput);

      knex('markers').insert(markerInput).returning('*').then(([r])=>{
      console.log(r,'returning')
      res.send(r)
    })

    })

  return router;
}

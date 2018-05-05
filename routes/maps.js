"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {

  router.get("/", (req, res) => {
    knex
    .select("*")
    .from("maps")
    .then(results => {
      res.json(results);
    });
  }),
  router.get("/:id", (req, res) => {
    knex
    .join("users", "users.id", "maps.user_id")
    .select("maps.id", "title", "coordinates", "user_id", "username")
    .from("maps")
    .where({ "maps.id": req.params.id })
    .then(map => {
      res.json(map);
    });
  }),

  router.post('/new',(req, res) =>{

    const formInput = {
      user_id:1
    }

    console.log(req.body)

    let mapLocation = req.body.location
    let mapTitle = req.body.title

    formInput["location"] = mapLocation
    formInput["title"] = mapTitle
    formInput["coordinates"] = knex.raw(`point(${req.body.coordinates.lat},${req.body.coordinates.lng})`)


    knex('maps').insert(formInput).returning('*').then(([r])=>{
      console.log(r.id);

      res.redirect(r.id)
    })
  });

  return router;

}







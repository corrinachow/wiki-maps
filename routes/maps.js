"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {

  router.get('/new',(req,res)=> {
      res.send('new maps page')
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
      knex
        .join("users", "users.id", "maps.user_id")
        .select("maps.id", "title", "coordinates", "user_id", "username")
        .from("maps")
        .where({ "maps.id": req.params.id })
        .then(map => {
          res.json(map);
        });
    })

router.post('/new',(req, res) =>{

let mapLocation = req.body.location
let mapTitle = req.body.map_title
let mapLng = req.body.lat
let mapLat = req.body.lng

const formInput = {
  location:mapLocation,
  title:mapTitle
}

res.send(formInput)

});

 return router;

}





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



  return router;
};


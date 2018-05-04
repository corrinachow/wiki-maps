'use strict';

const express = require('express');
const loginRoutes = express.Router();

module.exports = function () {
  loginRoutes.post('/:id', function (req, res) {
    req.session.user_id = req.params.id;
    res.send(`logged in as user ${req.params.id}`);
  });

  loginRoutes.delete('/', function (req, res) {
    if (req.session) {
      req.session = null;
      res.send(`logged out`);
    }
  });
  return loginRoutes;
};

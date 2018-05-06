'use strict';

const express = require('express');
const loginRoutes = express.Router();


/**
 * Use Cookie.js instead to handle user login
 * and logouts
 */

module.exports = function () {
  loginRoutes.post('/:id', function (req, res) {
    req.session.user_id = req.params.id;
    res.send(`Logged in as user ${req.params.id}`);
  });

  loginRoutes.delete('/', function (req, res) {
    if (req.session) {
      req.session = null;
      res.send(`Logged out`);
    }
  });
  return loginRoutes;
};

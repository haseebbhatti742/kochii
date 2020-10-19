"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  res.render("client/login");
});
router.post("/login", function (req, res) {
  var query = "SELECT * from users where (username = '" + req.body.username + " OR email = '" + req.body.username + ") AND password= '" + req.body.password + "'";
  app.conn.query(query, function (err, result) {
    if (err) {
      res.status(200).json({
        status: "error"
      });
    } else if (result.length == 0) {
      res.status(200).json({
        status: "no"
      });
    } else {
      res.status(200).json({
        status: "yes"
      });
    }
  });
});
module.exports = router;
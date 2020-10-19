"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  res.render("client/register");
});
module.exports = router;
"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  res.render("client/products");
});
module.exports = router;
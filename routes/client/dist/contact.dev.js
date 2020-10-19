"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  res.render("client/contact"); // var i = ["hasee", "usama", "hamza"];
  // res.status(200).json({ "msg": i })
});
module.exports = router;
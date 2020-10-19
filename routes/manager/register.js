const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function (req, res) {
    res.render("manager/register");
});

module.exports = router;
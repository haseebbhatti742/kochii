const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function (req, res) {
    res.render("manager/index");
    // var i = ["hasee", "usama", "hamza"];
    // res.status(200).json({ "msg": i })
});

module.exports = router;
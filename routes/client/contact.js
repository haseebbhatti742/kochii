const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function (req, res) {
    res.locals.title = "Contact";
    res.render("client/contact"); //template engine gile on after route.
    // var i = ["hasee", "usama", "hamza"];
    // res.status(200).json({ "msg": i })
});

module.exports = router;
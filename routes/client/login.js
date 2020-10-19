const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function (req, res) {
    if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home")
    } else if (req.session.username == null) {
        res.locals.title = "Login";
        res.render("client/login");
    }
});

router.post("/login", function (req, res) {
    var query = "SELECT * from users where (username = '" + req.body.username + "' OR email = '" + req.body.username + "') AND password= '" + req.body.password + "'";
    app.conn.query(query, function (err, result) {
        if (err) {
            res.status(200).json({ status: "error" })
        } else if (result.length == 0) {
            res.status(200).json({ status: "no" })
        } else {
            req.session.username = result[0].username;
            req.session.fullname = result[0].fullname;
            req.session.email = result[0].email;
            req.session.dp = result[0].dp;
            req.session.type = "client";
            res.status(200).json({ "status": "yes" })
        }
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
let app = require("../../app");

router.get("/", function(req, res) {
    if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home")
    } else if (req.session.username == null) {
        res.locals.title = "Register";
        res.render("client/register");
    }
});

router.post("/checkusername", function(req, res) {
    var username = req.body.username;
    app.conn.query("SELECT * from users WHERE username='" + username + "'", function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else if (result.length == 0) {
            res.status(200).json({ "status": "no" });
        } else {
            res.status(200).json({ "status": "yes" });
        }
    });
})

router.post("/checkemail", function(req, res) {
    var email = req.body.email;
    app.conn.query("SELECT * from users WHERE email='" + email + "'", function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else if (result.length == 0) {
            res.status(200).json({ "status": "no" });
        } else {
            res.status(200).json({ "status": "yes" });
        }
    });
})

router.post("/register", function(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let phone = req.body.phone;
    let address = req.body.address;
    let query = "Insert into users (fullname, username ,email,  password, address, contact_number, status2) values ('" + fullname + "','" + username + "','" + email + "','" + password + "','" + address + "','" + phone + "','active')";
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message)
            res.status(200).json({ status: "error" });
        } else {
            req.session.username = username;
            req.session.fullname = fullname;
            req.session.email = email;
            req.session.type = "client";
            res.status(200).json({ status: "success" });
        }
    })
})


module.exports = router;
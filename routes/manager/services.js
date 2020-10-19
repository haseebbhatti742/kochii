const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Services";
        query = "Select * from services order by service_id desc"
        app.conn.query(query, function(err, result) {
            if (err) console.log("paati a na?")
            else if (result.length == 0) {
                res.render("manager/services", { "length": 0 });
            } else if (result.length > 0) {
                res.render("manager/services", { "length": result.length, "serviceData": result });
            }
        });
    }
})

router.post("/del", function(req, res) {
    var query = "delete from services where service_id = " + req.body.service_id
    app.conn.query(query, function(err, result) {
        if (err) console.log("couldn't Delete")
        else {
            res.redirect("/manager/services");
        }
    })
})

router.get("/search/:keyword", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Services";
        var keyword = req.params.keyword;
        var query = "Select * from services WHERE service_id = '" + keyword + "' OR service_name LIKE '%" + keyword + "%' OR service_price LIKE '%" + keyword + "%' OR service_desc LIKE '%" + keyword + "%' OR service_status LIKE '%" + keyword + "%'"
        app.conn.query(query, function(err, result) {
            if (err) {
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result.length == 0) {
                res.render("manager/services", { "length": 0 });
            } else if (result.length > 0) {
                res.render("manager/services", { "length": result.length, "serviceData": result });
            }
        });
    }
});

module.exports = router;
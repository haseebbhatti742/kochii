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
        res.locals.title = "Products";
        query = "Select * from product order by product_id desc"
        app.conn.query(query, function(err, result) {
            if (err) console.log("paati a na?")
            else if (result.length == 0) {
                res.render("manager/products", { "length": 0 });
            } else if (result.length > 0) {
                res.render("manager/products", { "length": result.length, "productData": result });
            }
        });
    }
});

router.post("/del", function(req, res) {
    var query = "delete from product where product_id = " + req.body.product_id
    app.conn.query(query, function(err, result) {
        if (err) console.log("couldn't Delete")
        else {
            res.redirect("/manager/products");
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
        res.locals.title = "Products";
        var keyword = req.params.keyword;
        var query = "Select * from product WHERE product_id = '" + keyword + "' OR product_price = '" + keyword + "' OR product_name LIKE '%" + keyword + "%' OR product_desc LIKE '%" + keyword + "%' OR product_status LIKE '%" + keyword + "%' order by product_id desc"
        app.conn.query(query, function(err, result) {
            if (err) {
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result.length == 0) {
                res.render("manager/products", { "length": 0 });
            } else if (result.length > 0) {
                res.render("manager/products", { "length": result.length, "productData": result });
            }
        });
    }
});

module.exports = router;
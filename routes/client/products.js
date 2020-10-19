const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function(req, res) {
    if (req.session.username == null || (req.session.username != null && req.session.type == "client")) {
        res.locals.title = " Products";
        query = "Select * from product where product_status='available' order by product_id desc"
        app.conn.query(query, function(err, result) {
            if (err) {
                errorMessage = "Error: " + err.message;
                res.redirect("/error");
            } else if (result.length == 0) {
                res.render("client/products", { "length": 0 });
            } else if (result.length > 0) {
                res.render("client/products", { "length": result.length, "productData": result });
            }
        });
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.redirect("/manager/home");
    }
})

router.get("/mobile", function(req, res) {
    query = "Select * from product where product_status='available' order by product_id desc"
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", errorMessage: err.message });
        } else if (result.length == 0) {
            res.status(200).json({ status: "error", errorMessage: "No Products" });
        } else if (result.length > 0) {
            res.status(200).json({ status: "ok", length: result.length, dataArray: result });
        }
    });
})

module.exports = router;
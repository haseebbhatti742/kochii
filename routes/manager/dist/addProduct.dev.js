"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  if (req.session.username == null) res.redirect("/manager");else if (req.session.username != null && req.session.type == "client") res.redirect("/home");else if (req.session.username != null && req.session.type == "manager") {
    res.locals.title = "Add Product";
    res.render("manager/addProduct");
  } else if (req.session.username != null && req.session.type == "receptionist") res.redirect("/receptionist/home");
});
router.post("/add", function (req, res) {
  console.log("Product Added");
  var product_name = req.body.product_name;
  var product_price = req.body.product_price;
  var product_quantity = req.body.product_quantity;
  var product_minQuantity = req.body.product_minQuantity;
  var product_desc = req.body.product_desc;
  var product_status = req.body.product_status;
  var query = "Insert into product (product_name, product_price, product_quantity, product_minQuantity, product_desc, product_status) values ('" + product_name + "','" + product_price + "','" + product_quantity + "','" + product_minQuantity + "','" + product_desc + "','" + product_status + "')";
  app.conn.query(query, function (err, result) {
    if (err) res.status(200).json({
      "status": "error"
    });else res.status(200).json({
      "status": "OK"
    });
  });
});
module.exports = router;
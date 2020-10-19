const express = require('express');
const router = express.Router();
const app = require("../../app");

router.post("/", function (req, res) {
    if (req.session.username == null)
        res.redirect("/manager");
    else if (req.session.username != null && req.session.type == "client")
        res.redirect("/home");
    else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Update Product";
        var query = "SELECT * from product where product_id = " + req.body.product_id
        app.conn.query(query, function (err, result) {
            if (err) console.log(err.message);
            else {
                res.render("manager/updateProduct", { product_data: result[0] }) // carrying data 


            }
        })
    }
    else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
});

router.post("/update", function (req, res) {
    console.log("Product updated")
    var product_id = req.body.product_id
    var product_name = req.body.product_name
    var product_price = req.body.product_price
    var product_quantity = req.body.product_quantity
    var product_minQuantity = req.body.product_minQuantity
    var product_desc = req.body.product_desc
    var product_status = req.body.product_status

    var query = "UPDATE product SET product_name= '" + product_name + "', product_price= '" + product_price + "', product_quantity= '" + product_quantity + "', product_minQuantity= '" + product_minQuantity + "', product_desc = '" + product_desc + "', product_status= '" + product_status + "' where product_id = '" + product_id + "'"

    app.conn.query(query, function (err, result) {
        if (err) res.status(200).json({ "status": "error" })
        else res.status(200).json({ "status": "OK" })

    })



})

module.exports = router;
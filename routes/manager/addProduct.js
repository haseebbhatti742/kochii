const express = require('express');
const router = express.Router();
const app = require("../../app");
const fileupload = require('express-fileupload');
router.use(fileupload());

router.get("/", function(req, res) {
    if (req.session.username == null)
        res.redirect("/manager");
    else if (req.session.username != null && req.session.type == "client")
        res.redirect("/home");
    else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Add Product";
        res.render("manager/addProduct");
    } else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
});

router.post("/add", function(req, res) {
    var product_name = req.body.product_name
    var product_price = req.body.product_price
    var product_quantity = req.body.product_quantity
    var product_minQuantity = req.body.product_minQuantity
    var product_desc = req.body.product_desc
    var product_status = req.body.product_status

    var query = "Insert into product (product_name, product_price, product_quantity, product_minQuantity, product_desc, product_status) values ('" + product_name + "','" + product_price + "','" + product_quantity + "','" + product_minQuantity + "','" + product_desc + "','" + product_status + "')"

    app.conn.query(query, function(err, result) {
        if (err) res.status(200).json({ "status": "error", msg: err.message })
        else {
            const image = req.files.product_image;
            const fileName = result.insertId + ".jpg";
            const path = __dirname + '/../../assets/images/Products/' + fileName;
            // const path = '/home/kochiine/saloon-api/assets/images/products/' + fileName;
            // const path = app.basicRoute + '/assets/images/products/' + fileName;


            image.mv(path, (error) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify({ status: 'error', msg: error.message }))
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify({ "status": "OK" }))
                }
            })
        }
    })
})

module.exports = router;
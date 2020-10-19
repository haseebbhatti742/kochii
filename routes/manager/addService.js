const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function (req, res) {
    if (req.session.username == null)
        res.redirect("/manager");
    else if (req.session.username != null && req.session.type == "client")
        res.redirect("/home");
    else if (req.session.username != null && req.session.type == "manager"){
        res.locals.title = "Add Services";
        res.render("manager/addService"); //rendering View
    }
    else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
});

router.post("/add", function (req, res) {
    var service_name = req.body.serviceName;
    var service_price = req.body.servicePrice;
    var service_status = req.body.serviceStatus;
    var service_desc = req.body.serviceDesc;

    var query = "Insert Into services (service_name, service_price, service_status, service_desc) values('" + service_name + "','" + service_price + "','" + service_status + "','" + service_desc + "')";
    app.conn.query(query, function (err, result) {
        if (err) res.status(200).json({ "status": "error" })
        else res.status(200).json({ "status": "OK" })

    })
})

module.exports = router;
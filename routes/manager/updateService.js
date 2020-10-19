const express = require('express');
const router = express.Router();
const app = require("../../app");

router.post("/", function (req, res) {
    if (req.session.username == null)
        res.redirect("/manager");
    else if (req.session.username != null && req.session.type == "client")
        res.redirect("/home");
    else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Update Service";
        var query = "SELECT * from services where service_id = " + req.body.service_id
        app.conn.query(query, function (err, result) {
            if (err) console.log(err.message);
            else {
                res.render("manager/updateService", { service_data: result[0] }) // carrying data 


            }
        })
    }
    else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
});

router.post("/update", function (req, res) {
    var service_id = req.body.service_id
    var service_name = req.body.service_name
    var service_price = req.body.service_price
    var service_status = req.body.service_status
    var service_desc = req.body.service_desc

    var query = "UPDATE services SET service_name = '" + service_name + "', service_price = '" + service_price + "', service_status= '" + service_status + "',service_desc = '" + service_desc + "' where service_id='" + service_id + "'"

    app.conn.query(query, function (err, result) {
        if (err) res.status(200).json({ "status": "error" })
        else res.status(200).json({ "status": "OK" })

    })

})
module.exports = router;
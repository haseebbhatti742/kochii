const express = require('express');
const router = express.Router();
const app = require("../../app");
const fetch = require('node-fetch');

router.get("/", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/");
    } else if (req.session.username != null && req.session.type == "manager") {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "recepetionist") {
        res.redirect("/recepetionist");
    } else if (req.session.username != null && req.session.type == "client") {
        res.locals.title = "Appointments";

        const body = { "username": req.session.username };
        fetch(app.basicRoute + "/appointments/mobile/" + req.session.username, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(data => data.json()).then(data => {
            if (data.status == "ok") {
                res.render("client/appointments", { appointments: data.dataArray });
            } else if (data.status == "error") {
                res.send("uuuhhhh")
                    // res.render("client/appointments", { appointments: data.dataArray });
            }
        })

        // var query = "SELECT * from appointments WHERE user_id = '" + req.session.username + "' order by appointment_id desc";
        // var appointments = [];
        // app.conn.query(query, function(err, result1) {
        //     if (err) {
        //         console.log(err.message);
        //         errorMessage = "Error: " + err.message;
        //         //res.redirect("/error");
        //     } else if (result1.length == 0) {
        //         console.log("No appointment");
        //         errorMessage = "Error: No appointment";
        //         //res.redirect("/error");
        //     } else if (result1.length > 0) {
        //         for (let i = 0; i < result1.length; i++) {
        //             appointments.push({ "appointments": result1[i] });
        //         }

        //         for (let i = 0; i < appointments.length; i++) {
        //             var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
        //             app.conn.query(query2, function(err, result2) {
        //                 if (err) {
        //                     console.log(err.message);
        //                     errorMessage = "Error: " + err.message;
        //                     //res.redirect("/error");
        //                 } else if (result2.length == 0) {
        //                     console.log("No appointment");
        //                     errorMessage = "Error: No Appointments";
        //                     //res.redirect("/error");
        //                 } else if (result2.length > 0) {
        //                     appointments[i].appointment_services = result2;
        //                     // console.log(appointments[i]);
        //                 }
        //             })
        //         }
        //         setTimeout(function() {
        //             // console.log(appointments);
        //             res.render("client/appointments", { appointments: appointments });
        //         }, 1000);
        //     }
        // });
    }
});

router.get("/cancel/:appointment_id", function(req, res) {
    let appointment_id = req.params.appointment_id;
    var query = "UPDATE appointments SET appointment_status = 'cancelled' WHERE appointment_id = " + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else {
            res.redirect("/appointments");
        }
    })
})

router.get("/delete/:appointment_id", function(req, res) {
    let appointment_id = req.params.appointment_id;
    var query = "delete from appointments where appointment_id = " + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else {
            res.redirect("/appointments");
        }
    })
})

//for mobile
router.get("/mobile/:username", function(req, res) {
    var query = "SELECT * from appointments WHERE user_id = '" + req.params.username + "'  order by appointment_id desc";
    var appointments = [];
    app.conn.query(query, function(err, result1) {
        if (err) {
            console.log(err.message);
            res.status(200).json({ status: "error", errorMessage: err.message });
        } else if (result1.length == 0) {
            console.log("No appointment");
            res.status(200).json({ status: "error", errorMessage: "No appointment" });
        } else if (result1.length > 0) {
            for (let i = 0; i < result1.length; i++) {
                appointments.push({ "appointments": result1[i] });
            }

            for (let i = 0; i < appointments.length; i++) {
                var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                app.conn.query(query2, function(err, result2) {
                    if (err) {
                        console.log(err.message);
                        res.status(200).json({ status: "error", errorMessage: err.message });
                    } else if (result2.length == 0) {
                        console.log("No appointment");
                        res.status(200).json({ status: "error", errorMessage: "No appointment" });
                    } else if (result2.length > 0) {
                        appointments[i].appointment_services = result2;
                        // console.log(appointments[i]);
                    }
                })
            }
            // console.log(appointments);
            // res.status(200).json({ status: "ok", dataArray: appointments });
            setTimeout(function() {
                res.status(200).json({ status: "ok", dataArray: appointments });
            }, 1000);
        }
    });
});

router.get("/cancel/mobile/:appointment_id", function(req, res) {
    let appointment_id = req.params.appointment_id;
    var query = "UPDATE appointments SET appointment_status = 'cancelled' WHERE appointment_id = " + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", errorMessage: err.message });
        } else {
            res.status(200).json({ status: "ok" });
        }
    })
})

router.get("/delete/mobile/:appointment_id", function(req, res) {
    let appointment_id = req.params.appointment_id;
    var query = "delete from appointments where appointment_id = " + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", errorMessage: err.message });
        } else {
            res.status(200).json({ status: "ok" });
        }
    })
})

module.exports = router
const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/pending", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Pending Appointments";

        var query = "SELECT * from appointments WHERE appointment_status = 'pending' order by appointment_id desc";
        var appointments = [];
        var appointmentsObject = {};
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result1.length == 0) {
                res.render("manager/appointments", { appointments: result1 });
            } else if (result1.length > 0) {
                for (let i = 0; i < result1.length; i++) {
                    appointments.push({ "appointments": result1[i] });
                }

                for (let i = 0; i < appointments.length; i++) {
                    var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                    app.conn.query(query2, function(err, result2) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/manager/error");
                        } else if (result2.length == 0) {
                            console.log("No appointment");
                        } else if (result2.length > 0) {
                            appointments[i].appointment_services = result2;
                            // console.log(appointments[i]);
                        }
                    })
                }
                setTimeout(function() {
                    // console.log(appointments);
                    res.render("manager/appointments", { appointments: appointments });
                }, 1000);
            }
        });
    }
})

router.get("/accepted", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Accepted Appointments";

        var query = "SELECT * from appointments JOIN employees ON appointments.employee_id = employees.employee_id WHERE appointment_status = 'accepted' order by appointment_id desc";
        var appointments = [];
        var appointmentsObject = {};
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result1.length == 0) {
                res.render("manager/appointments", { appointments: result1 });
            } else if (result1.length > 0) {
                for (let i = 0; i < result1.length; i++) {
                    appointments.push({ "appointments": result1[i] });
                }

                for (let i = 0; i < appointments.length; i++) {
                    var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                    app.conn.query(query2, function(err, result2) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/manager/error");
                        } else if (result2.length == 0) {
                            console.log("No appointment");
                            errorMessage = "Error: No Appointment Services";
                            res.redirect("/manager/error");
                        } else if (result2.length > 0) {
                            appointments[i].appointment_services = result2;
                            // console.log(appointments[i]);
                        }
                    })
                }
                setTimeout(function() {
                    // console.log(appointments);
                    res.render("manager/appointments", { appointments: appointments });
                }, 1000);
            }
        });

    }
})

router.get("/completed", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Completed Appointments";

        var query = "SELECT * from appointments JOIN employees ON appointments.employee_id = employees.employee_id WHERE appointment_status = 'completed' order by appointment_id desc";
        var appointments = [];
        var appointmentsObject = {};
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result1.length == 0) {
                res.render("manager/appointments", { appointments: result1 });
            } else if (result1.length > 0) {
                for (let i = 0; i < result1.length; i++) {
                    appointments.push({ "appointments": result1[i] });
                }

                for (let i = 0; i < appointments.length; i++) {
                    var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                    app.conn.query(query2, function(err, result2) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/manager/error");
                        } else if (result2.length == 0) {
                            console.log("No appointment");
                            errorMessage = "Error: No Appointment Services";
                            res.redirect("/manager/error");
                        } else if (result2.length > 0) {
                            appointments[i].appointment_services = result2;
                            // console.log(appointments[i]);
                        }
                    })
                }
                setTimeout(function() {
                    // console.log(appointments);
                    res.render("manager/appointments", { appointments: appointments });
                }, 1000);
            }
        });

    }
})

router.get("/cancelled", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Cancelled/Rejected Appointments";

        var query = "SELECT * from appointments WHERE appointment_status = 'cancelled' OR appointment_status = 'rejected' order by appointment_id desc";
        var appointments = [];
        var appointmentsObject = {};
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result1.length == 0) {
                res.render("manager/appointments", { appointments: result1 });
            } else if (result1.length > 0) {
                for (let i = 0; i < result1.length; i++) {
                    appointments.push({ "appointments": result1[i] });
                }

                for (let i = 0; i < appointments.length; i++) {
                    var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                    app.conn.query(query2, function(err, result2) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/manager/error");
                        } else if (result2.length == 0) {
                            console.log("No appointment");
                        } else if (result2.length > 0) {
                            appointments[i].appointment_services = result2;
                            // console.log(appointments[i]);
                        }
                    })
                }
                setTimeout(function() {
                    // console.log(appointments);
                    res.render("manager/appointments", { appointments: appointments });
                }, 1000);
            }
        });

    }
})

module.exports = router;
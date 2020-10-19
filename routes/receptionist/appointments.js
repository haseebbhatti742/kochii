const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/all", function(req, res) {
    // res.render("manager/login");
    if (req.session.username == null) {
        res.render("receptionist/login");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.redirect("/manager/home")
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.locals.title = "Appointments";

        var query = "SELECT * from appointments JOIN employees ON appointments.employee_id = employees.employee_id WHERE appointment_status != 'pending' order by appointment_id desc";
        var appointments = [];
        var appointmentsObject = {};
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/receptionist/error");
            } else if (result1.length == 0) {
                res.render("receptionist/appointments", { appointments: result1 });
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
                            res.redirect("/receptionist/error");
                        } else if (result2.length == 0) {
                            console.log("No appointment");
                            errorMessage = "Error: No Appointment Services";
                            res.redirect("/receptionist/error");
                        } else if (result2.length > 0) {
                            appointments[i].appointment_services = result2;
                            // console.log(appointments[i]);
                        }
                    })
                }
                setTimeout(function() {
                    // console.log(appointments);
                    res.render("receptionist/appointments", { appointments: appointments });
                }, 1000);
            }
        });
    }
});

router.get("/pending", function(req, res) {
    // res.render("manager/login");
    if (req.session.username == null) {
        res.render("receptionist/login");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.redirect("/manager/home")
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.locals.title = "Appointments";

        //removing notifications for receptionist start
        app.conn.query("DELETE from notifications WHERE usertype = 'receptionist'", function(err, result) {
            if (err) {
                console.log(err.message)
                errorMessage = "Error: " + err.message;
                res.redirect("/receptionist/error");
            }
        });

        //removing notifications for receptionist end

        var query = "SELECT * from appointments WHERE appointment_status = 'pending' order by appointment_id desc";
        var appointments = [];
        var appointmentsObject = {};
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/receptionist/error");
            } else if (result1.length == 0) {
                res.render("receptionist/appointments", { appointments: result1 });
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
                            res.redirect("/receptionist/error");
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
                    res.render("receptionist/appointments", { appointments: appointments });
                }, 1000);
            }
        });
    }
});

router.get("/cancel/:appointment_id", function(req, res) {
    var appointment_id = req.params.appointment_id;
    var query = "UPDATE appointments SET appointment_status = 'cancelled' WHERE appointment_id =" + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/receptionist/error");
        } else {
            app.conn.query("SELECT * from appointments WHERE appointment_id =" + appointment_id, function(err, result1) {
                if (err) {
                    console.log(err.message);
                    errorMessage = "Error: " + err.message;
                    res.redirect("/receptionist/error");
                } else {
                    var date = new Date(result1[0].appointment_date);
                    var notification_message = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " appointment at " + result1[0].appointment_time + " has been cancelled !";

                    var query_for_notifications = "INSERT INTO notifications (usertype, username, notification_message) values('client', '" + result1[0].user_id + "', '" + notification_message + "')";
                    app.conn.query(query_for_notifications, function(err, result_for_notifications) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/receptionist/error");
                        } else {
                            res.redirect("/receptionist/appointments/all");
                        }
                    })
                }
            });
            // res.redirect("/receptionist/appointments/all");
        }
    })
})

router.get("/reject/:appointment_id", function(req, res) {
    var appointment_id = req.params.appointment_id;
    var query = "UPDATE appointments SET appointment_status = 'rejected' WHERE appointment_id =" + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/receptionist/error");
        } else {
            app.conn.query("SELECT * from appointments WHERE appointment_id =" + appointment_id, function(err, result1) {
                if (err) {
                    console.log(err.message);
                    errorMessage = "Error: " + err.message;
                    res.redirect("/receptionist/error");
                } else {
                    var date = new Date(result1[0].appointment_date);
                    var notification_message = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " appointment has been rejected !";

                    var query_for_notifications = "INSERT INTO notifications (usertype, username, notification_message) values('client', '" + result1[0].user_id + "', '" + notification_message + "')";
                    app.conn.query(query_for_notifications, function(err, result_for_notifications) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/receptionist/error");
                        } else {
                            res.redirect("/receptionist/appointments/pending");
                        }
                    })
                }
            });
            // res.redirect("/receptionist/appointments/pending");
        }
    })
})

router.get("/delete/:appointment_id", function(req, res) {
    var appointment_id = req.params.appointment_id;
    var query = "DELETE from appointments where appointment_id =" + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/receptionist/error");
        } else {
            res.redirect("/receptionist/appointments/all");
        }
    })
})

module.exports = router;
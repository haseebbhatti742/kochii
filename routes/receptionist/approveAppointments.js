const express = require('express');
const router = express.Router();
const app = require("../../app");


router.get("/:appointment_id", function(req, res) {

    // if (req.session.username == null) {
    //     res.redirect("/receptionist/login-form");
    // } else if (req.session.username != null && req.session.type == "client") {
    //     res.redirect("/home")
    // } else if (req.session.username != null && req.session.type == "manager") {
    //     res.redirect("/manager/home")
    // } else if (req.session.username != null && req.session.type == "receptionist") {
    res.locals.title = "Appointments";

    var appointment_id = req.params.appointment_id;
    var query = "SELECT * from appointments WHERE appointment_status = 'pending' AND appointment_id = '" + appointment_id + "'";
    var appointments = [];
    app.conn.query(query, function(err, result1) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/receptionist/error");
        } else if (result1.length == 0) {
            console.log("No appointment");
            errorMessage = "Error: No Appointments";
            res.redirect("/receptionist/error");
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
                        errorMessage = "Error: No Appointments";
                        res.redirect("/receptionist/error");
                    } else if (result2.length > 0) {
                        appointments[i].appointment_services = result2;
                        // console.log(appointments[i]);
                    }
                })
            }
            setTimeout(function() {
                // console.log(appointments);
                var date = new Date(result1[0].appointment_date);
                let date1;
                if ((date.getMonth() + 1) < 10)
                    date1 = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
                else
                    date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                res.render("receptionist/approveAppointments", { appointments: appointments, date: date1 });
            }, 1000);
        }
    });
    // }
})

router.post("/approve", function(req, res) {
    var appointment_id = req.body.appointment_id;
    var user_id = req.body.user_id;
    var appointment_date = req.body.appointment_date;
    var appointment_time = req.body.appointment_time;
    var employee_id = req.body.employee_id;

    var query = "UPDATE appointments SET appointment_date = '" + appointment_date + "', appointment_time = '" + appointment_time + "', employee_id = '" + employee_id + "', user_id = '" + user_id + "', appointment_status = 'accepted' WHERE appointment_id = " + appointment_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message)
            res.status(200).json({ status: "ok", msg: err.message })
        } else {
            app.conn.query("SELECT * from appointments WHERE appointment_id =" + appointment_id, function(err, result1) {
                if (err) {
                    console.log(err.message);
                    errorMessage = "Error: " + err.message;
                    res.redirect("/receptionist/error");
                } else {
                    var date = new Date(result1[0].appointment_date);
                    var notification_message = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " appointment at " + appointment_time + " has been approved";

                    var query_for_notifications = "INSERT INTO notifications (usertype, username, notification_message) values('client', '" + result1[0].user_id + "', '" + notification_message + "')";
                    app.conn.query(query_for_notifications, function(err, result_for_notifications) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/receptionist/error");
                        } else {
                            res.status(200).json({ status: "ok" })
                        }
                    })
                }
            });
            // res.status(200).json({ status: "ok" })
        }
    })

})

router.post("/getEmployees", function(req, res) {
    app.conn.query("SELECT * from employees WHERE employee_role!='receptionist'", function(err, result) {
        if (err) {
            console.log(err.message)
            errorMessage = "Error: " + err.message;
            res.redirect("/receptionist/error");
        } else if (result.length > 0) {
            res.status(200).json({ status: "yes", employees: result })
        }
    })
})

module.exports = router;
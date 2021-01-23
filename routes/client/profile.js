const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", async function(req, res) {
    if (req.session.username != null && req.session.type == "client") {
        res.locals.title = "Profile";
        var orders = await getOrders(req.session.username);
        var appointments_completed = await getAppointmentsCompleted(req.session.username);
        var appointments_pending = await getAppointmentsPending(req.session.username);
        res.render("client/profile", { orders: orders.orders, appointments_completed: appointments_completed.appointments_completed, appointments_pending: appointments_pending.appointments_pending });
    } else if (req.session.username != null && req.session.type == "manager")
        res.redirect("/manager/home")
    else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
    else if (req.session.username == null)
        res.redirect("/");
});

router.get("/mobile/:username", function(req, res) {
    var query = "select * from users where username='" + req.params.username + "'";
    app.conn.query(query, async function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", errorMessage: err.message });
        } else {
            var orders = await getOrders(req.params.username);
            var appointments_completed = await getAppointmentsCompleted(req.params.username);
            var appointments_pending = await getAppointmentsPending(req.params.username);
            res.status(200).json({ status: "ok", profile: result[0], orders: orders.orders, appointments_completed: appointments_completed.appointments_completed, appointments_pending: appointments_pending.appointments_pending });
        }
    });
});

function getOrders(username) {
    return new Promise(function(resolve, reject) {
        var query = "select count(order_id) as orders from orders where user_id='" + username + "'";
        app.conn.query(query, function(err, result) {
            if (err) {
                resolve({ status: "error", errorMessage: err.message });
            } else {
                resolve({ status: "ok", orders: result[0].orders });
            }
        })
    })
}

function getAppointmentsCompleted(username) {
    return new Promise(function(resolve, reject) {
        var query = "select count(appointment_id) as appointments_completed from appointments where user_id='" + username + "' AND appointment_status='completed'";
        app.conn.query(query, function(err, result) {
            if (err) {
                resolve({ status: "error", errorMessage: err.message });
            } else {
                resolve({ status: "ok", appointments_completed: result[0].appointments_completed });
            }
        })
    })
}

function getAppointmentsPending(username) {
    return new Promise(function(resolve, reject) {
        var query = "select count(appointment_id) as appointments_pending from appointments where user_id='" + username + "' AND appointment_status!='completed'";
        app.conn.query(query, function(err, result) {
            if (err) {
                resolve({ status: "error", errorMessage: err.message });
            } else {
                resolve({ status: "ok", appointments_pending: result[0].appointments_pending });
            }
        })
    })
}

module.exports = router;
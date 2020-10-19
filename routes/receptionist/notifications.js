const express = require('express');
const router = express.Router();
let app = require("../../app");

router.post('/', (req, res, next) => {
    app.conn.query("SELECT appointments from notifications WHERE usertype = 'receptionist'", function(err, result) {
        if (err) {
            res.status(200).json({ status: "error" });
        } else if (result.length == 0) {
            res.status(200).json({ status: "ok", notifications: 0, notifications_new_appointments: 0 });
        } else if (result.length > 0) {
            res.status(200).json({ status: "ok", notifications: result[0].appointments, notifications_new_appointments: result[0].appointments });
        }
    })
})

module.exports = router;
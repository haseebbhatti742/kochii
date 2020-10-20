const express = require('express');
const router = express.Router();
let app = require("../../app");

router.post('/', (req, res, next) => {
    var query = "SELECT notification_id, notification_message from notifications where usertype='client' AND username = '" + req.session.username + "' order by notification_id desc";
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            res.status(200).json({ status: "ok", notification_length: 0 });
        } else if (result.length == 0) {
            res.status(200).json({ status: "ok", notification_length: 0 });
        } else {
            res.status(200).json({ status: "ok", notification_length: result.length, notifications: result });
        }
    })
})

router.post('/mobile', (req, res, next) => {
    //console.log(req.body.username)
    var query = "SELECT notification_id, notification_message from notifications where usertype='client' AND username = '" + req.body.username + "' order by notification_id desc";
    app.conn.query(query, function(err, result) {
        if (err) {
            console.log(err.message);
            res.status(200).json({ status: "error", errorMessage: err.message });
        } else if (result.length == 0) {
            res.status(200).json({ status: "ok", notification_length: 0 });
        } else {
            res.status(200).json({ status: "ok", notification_length: result.length, notifications: result });
        }
    })
})

module.exports = router;
"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  if (req.session.username != null && req.session.type == "client") {
    res.locals.title = "Add Appointment";
    res.render("client/addAppointment");
  } else if (req.session.username == null) {
    res.locals.title = "Login";
    res.render("client/login");
  }
});
router.post("/getStylists", function (req, res) {
  app.conn.query("SELECT * from employees WHERE employee_role!='receptionist'", function (err, result) {
    if (err) {
      console.log(err.message);
    } else if (result.length > 0) {
      res.status(200).json({
        status: "yes",
        stylists: result
      });
    }
  });
});
router.post("/getServices", function (req, res) {
  app.conn.query("SELECT * from services WHERE service_status='available'", function (err, result) {
    if (err) {
      console.log(err.message);
    } else if (result.length > 0) {
      res.status(200).json({
        status: "yes",
        services: result
      });
    }
  });
});
router.post("/add", function (req, res) {
  var services = JSON.parse(req.body.services);
  var appointment_date = new Date(req.body.date);
  app.conn.getConnection(function (err, conn) {
    if (err) {
      res.status(200).json({
        status: "error",
        "msg": err.message
      });
    } else {
      conn.beginTransaction(function (err) {
        if (err) {
          res.status(200).json({
            status: "error",
            "msg": err.message
          });
        } else {
          var query = "INSERT INTO appointments(appointment_date,appointment_status,user_id) values('" + appointment_date + "','pending','" + req.session.username + "')";
          conn.query(query, function (err, result) {
            if (err) {
              conn.rollback(function () {
                res.status(200).json({
                  status: "error",
                  "msg": err.message
                });
              });
            } else {
              //getting recently added primary key from appointments table
              var appointment_id = result.insertId;

              for (var i = 0; i < services.array.length; i++) {
                var query2 = "INSERT INTO appointment_services(appointment_id,service_id) values('" + appointment_id + "','" + services.array[i] + "')";
                conn.query(query2, function (err, result) {
                  if (err) {
                    conn.rollback(function () {
                      res.status(200).json({
                        status: "error",
                        "msg": err.message
                      });
                    });
                  } else {
                    conn.commit(function (err) {
                      if (err) {
                        conn.rollback(function () {
                          res.status(200).json({
                            status: "error",
                            "msg": err.message
                          });
                        });
                      } else {
                        res.status(200).json({
                          status: "yes"
                        });
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});
module.exports = router;
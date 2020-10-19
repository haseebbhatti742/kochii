"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/all", function (req, res) {
  // res.render("manager/login");
  if (req.session.username == null) {
    res.render("receptionist/login");
  } else if (req.session.username != null && req.session.type == "client") {
    res.redirect("/home");
  } else if (req.session.username != null && req.session.type == "manager") {
    res.redirect("/manager/home");
  } else if (req.session.username != null && req.session.type == "receptionist") {
    res.locals.title = "Appointments";
    var query = "SELECT * from appointments JOIN employees ON appointments.employee_id = employees.employee_id WHERE appointment_status != 'pending' order by appointment_id desc";
    var appointments = [];
    var appointmentsObject = {};
    app.conn.query(query, function (err, result1) {
      if (err) {
        console.log(err.message);
      } else if (result1.length == 0) {
        console.log("No appointment");
      } else if (result1.length > 0) {
        for (var i = 0; i < result1.length; i++) {
          appointments.push({
            "appointments": result1[i]
          });
        }

        var _loop = function _loop(_i) {
          query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[_i].appointments.appointment_id;
          app.conn.query(query2, function (err, result2) {
            if (err) {
              console.log(err.message);
            } else if (result2.length == 0) {
              console.log("No appointment");
            } else if (result2.length > 0) {
              appointments[_i].appointment_services = result2; // console.log(appointments[i]);
            }
          });
        };

        for (var _i = 0; _i < appointments.length; _i++) {
          var query2;

          _loop(_i);
        }

        setTimeout(function () {
          // console.log(appointments);
          res.render("receptionist/appointments", {
            appointments: appointments
          });
        }, 1000);
      }
    });
  }
});
router.get("/pending", function (req, res) {
  // res.render("manager/login");
  if (req.session.username == null) {
    res.render("receptionist/login");
  } else if (req.session.username != null && req.session.type == "client") {
    res.redirect("/home");
  } else if (req.session.username != null && req.session.type == "manager") {
    res.redirect("/manager/home");
  } else if (req.session.username != null && req.session.type == "receptionist") {
    res.locals.title = "Appointments";
    var query = "SELECT * from appointments WHERE appointment_status = 'pending' order by appointment_id desc";
    var appointments = [];
    var appointmentsObject = {};
    app.conn.query(query, function (err, result1) {
      if (err) {
        console.log(err.message);
      } else if (result1.length == 0) {
        console.log("No appointment");
      } else if (result1.length > 0) {
        for (var i = 0; i < result1.length; i++) {
          appointments.push({
            "appointments": result1[i]
          });
        }

        var _loop2 = function _loop2(_i2) {
          query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[_i2].appointments.appointment_id;
          app.conn.query(query2, function (err, result2) {
            if (err) {
              console.log(err.message);
            } else if (result2.length == 0) {
              console.log("No appointment");
            } else if (result2.length > 0) {
              appointments[_i2].appointment_services = result2; // console.log(appointments[i]);
            }
          });
        };

        for (var _i2 = 0; _i2 < appointments.length; _i2++) {
          var query2;

          _loop2(_i2);
        }

        setTimeout(function () {
          // console.log(appointments);
          res.render("receptionist/appointments", {
            appointments: appointments
          });
        }, 1000);
      }
    });
  }
});
router.get("/approveAppointments/:appointment_id", function (req, res) {
  var appointment_id = req.params.appointment_id;
  var query = "SELECT * from appointments WHERE appointment_status = 'pending' AND appointment_id = '" + appointment_id + "'";
  var appointments = [];
  var appointmentsObject = {};
  app.conn.query(query, function (err, result1) {
    if (err) {
      console.log(err.message);
    } else if (result1.length == 0) {
      console.log("No appointment");
    } else if (result1.length > 0) {
      for (var i = 0; i < result1.length; i++) {
        appointments.push({
          "appointments": result1[i]
        });
      }

      var _loop3 = function _loop3(_i3) {
        query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[_i3].appointments.appointment_id;
        app.conn.query(query2, function (err, result2) {
          if (err) {
            console.log(err.message);
          } else if (result2.length == 0) {
            console.log("No appointment");
          } else if (result2.length > 0) {
            appointments[_i3].appointment_services = result2; // console.log(appointments[i]);
          }
        });
      };

      for (var _i3 = 0; _i3 < appointments.length; _i3++) {
        var query2;

        _loop3(_i3);
      }

      setTimeout(function () {
        // console.log(appointments);
        res.render("receptionist/approveAppointments", {
          appointments: appointments
        });
      }, 1000);
    }
  });
});
module.exports = router;
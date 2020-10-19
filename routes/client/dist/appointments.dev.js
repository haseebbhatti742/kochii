"use strict";

var express = require('express');

var router = express.Router();

var app = require("../../app");

router.get("/", function (req, res) {
  if (req.session.username == null) {
    res.redirect("/");
  } else if (req.session.username != null && req.session.type == "manager") {
    res.redirect("/manager");
  } else if (req.session.username != null && req.session.type == "recepetionist") {
    res.redirect("/recepetionist");
  } else if (req.session.username != null && req.session.type == "client") {
    res.locals.title = "Appointments";
    var query = "SELECT * from appointments WHERE user_id = '" + req.session.username + "' order by appointment_id desc";
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
          res.render("client/appointments", {
            appointments: appointments
          });
        }, 1000);
      }
    });
  }
});
router.get("/cancel/:appointment_id", function (req, res) {
  var appointment_id = req.params.appointment_id;
  var query = "UPDATE appointments SET appointment_status = 'cancelled' WHERE appointment_id = " + appointment_id;
  app.conn.query(query, function (err, result) {
    if (err) {
      console.log(err.message);
    } else {
      res.redirect("/appointments");
    }
  });
}); // router.get("/", function (req, res) {
//     // if (req.session.username != null && req.session.type == "client") {
//     //     res.locals.title = "Appointments";
//     //     let query = "select * from appointments"
//     // var appointments = [];
//     // var appointmentsObject = {};
//     // var index = 0;
//     // var query1 = "SELECT * from appointments order by appointment_id desc";
//     // app.conn.query(query1, function (err, result1) {
//     //     for (var i = 0; i < result1.length; i++) {
//     //         index = i;
//     //         var query2 = "SELECT * from appointment_services WHERE appointment_id=" + result1[i].appointment_id;
//     //         appointments.push({ "appointments": result1[i] });
//     //         var appointment_services = [];
//     //         app.conn.query(query2, function (err, result2) {
//     //             for (var j = 0; j < result2.length; j++) {
//     //                 appointment_services.push({ "appointment_services": result2[j] });
//     //             }
//     //             appointments[index].appointment_services = appointment_services[j];
//     //         })
//     //     }
//     //     setTimeout(function () {
//     //         console.log(appointments);
//     //         res.render("client/appointments");
//     //     }, 2000)
//     // })
//     // } else if (req.session.username == null) {
//     //     res.locals.title = "Login";
//     //     res.render("client/login");
//     // }
// });
// --------------------------------
// router.get("/", function (req, res) {
//     // if (req.session.username != null && req.session.type == "client") {
//     //     res.locals.title = "Appointments";
//     //     let query = "select * from appointments"
//     var query = "SELECT * from appointments order by appointment_id desc";
//     var appointmentsObject = {};
//     app.conn.query(query, function (err, result) {
//         if (result.length == 0 || err) {
//             console.log("No Appointments");
//         } else {
//             var appointments = [];
//             for (var i = result.length - 1; i >= 0; i--) {
//                 appointments.push(result[i]);
//             }
//             var counter = 0;
//             var appointment_services = [];
//             if (appointments.length > 0) {
//                 for (var i = appointments.length - 1; i >= 0; i--) {
//                     var query2 = "SELECT * from appointment_services WHERE appointment_id=" + appointments[i].appointment_id;
//                     app.conn.query(query2, function (err, result2) {
//                         if (!err) {
//                             var single_pro = {};
//                             for (var i = appointments.length - 1; i >= 0; i--) {
//                                 if (appointments[i].appointment_id == result2[0].appointment_id) {
//                                     single_pro.appointments = appointments[i];
//                                 }
//                             }
//                             single_pro.appointment_services = result2;
//                             if (typeof single_pro.appointments !== 'undefined') {
//                                 appointment_services.push(single_pro);
//                             }
//                         }
//                         counter++;
//                         if (counter == appointments.length) {
//                             console.log(appointments);
//                             res.render("client/appointments")
//                         }
//                     })
//                 }
//             }
//         }
//     });
// });

module.exports = router;
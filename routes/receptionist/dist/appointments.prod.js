"use strict";var express=require("express"),router=express.Router(),app=require("../../app");router.get("/all",function(e,i){var p;null==e.session.username?i.render("receptionist/login"):null!=e.session.username&&"client"==e.session.type?i.redirect("/home"):null!=e.session.username&&"manager"==e.session.type?i.redirect("/manager/home"):null!=e.session.username&&"receptionist"==e.session.type&&(i.locals.title="Appointments",p=[],app.conn.query("SELECT * from appointments JOIN employees ON appointments.employee_id = employees.employee_id WHERE appointment_status != 'pending' order by appointment_id desc",function(e,n){if(e)console.log(e.message);else if(0==n.length)console.log("No appointment");else if(0<n.length){for(var t=0;t<n.length;t++)p.push({appointments:n[t]});for(var s,o=0;o<p.length;o++){!function(t){s="SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id="+p[t].appointments.appointment_id,app.conn.query(s,function(e,n){e?console.log(e.message):0==n.length?console.log("No appointment"):0<n.length&&(p[t].appointment_services=n)})}(o)}setTimeout(function(){i.render("receptionist/appointments",{appointments:p})},1e3)}}))}),router.get("/pending",function(e,i){var p;null==e.session.username?i.render("receptionist/login"):null!=e.session.username&&"client"==e.session.type?i.redirect("/home"):null!=e.session.username&&"manager"==e.session.type?i.redirect("/manager/home"):null!=e.session.username&&"receptionist"==e.session.type&&(i.locals.title="Appointments",p=[],app.conn.query("SELECT * from appointments WHERE appointment_status = 'pending' order by appointment_id desc",function(e,n){if(e)console.log(e.message);else if(0==n.length)console.log("No appointment");else if(0<n.length){for(var t=0;t<n.length;t++)p.push({appointments:n[t]});for(var s,o=0;o<p.length;o++){!function(t){s="SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id="+p[t].appointments.appointment_id,app.conn.query(s,function(e,n){e?console.log(e.message):0==n.length?console.log("No appointment"):0<n.length&&(p[t].appointment_services=n)})}(o)}setTimeout(function(){i.render("receptionist/appointments",{appointments:p})},1e3)}}))}),router.get("/approveAppointments/:appointment_id",function(e,i){var n="SELECT * from appointments WHERE appointment_status = 'pending' AND appointment_id = '"+e.params.appointment_id+"'",p=[];app.conn.query(n,function(e,n){if(e)console.log(e.message);else if(0==n.length)console.log("No appointment");else if(0<n.length){for(var t=0;t<n.length;t++)p.push({appointments:n[t]});for(var s,o=0;o<p.length;o++){!function(t){s="SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id="+p[t].appointments.appointment_id,app.conn.query(s,function(e,n){e?console.log(e.message):0==n.length?console.log("No appointment"):0<n.length&&(p[t].appointment_services=n)})}(o)}setTimeout(function(){i.render("receptionist/approveAppointments",{appointments:p})},1e3)}})}),module.exports=router;
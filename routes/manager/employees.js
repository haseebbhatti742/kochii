const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Employees";
        query = "select * from employees"
        app.conn.query(query, function(err, result) {
            if (err) console.log("paati a na?")
            else if (result.length == 0) {
                res.render("manager/employees", { "length": 0 });
            } else if (result.length > 0) {
                res.render("manager/employees", { "length": result.length, "employeeData": result });
            }
        });
    }
});

router.get("/del/:employee_id", function(req, res) {
    var query = "delete from employees where employee_id = " + req.params.employee_id
    app.conn.query(query, function(err, result) {
        if (err) console.log("couldn't Delete")
        else {
            res.redirect("/manager/employees");
        }
    })
})

router.get("/search/:keyword", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/manager");
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/home");
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Employees";
        var keyword = req.params.keyword;
        var query = "Select * from employees WHERE employee_id = '" + keyword + "' OR employee_contact LIKE '%" + keyword + "%' OR employee_name LIKE '%" + keyword + "%' OR employee_username LIKE '%" + keyword + "%' OR employee_address LIKE '%" + keyword + "%' OR employee_cnic LIKE '%" + keyword + "%'"
        app.conn.query(query, function(err, result) {
            if (err) {
                errorMessage = "Error: " + err.message;
                res.redirect("/manager/error");
            } else if (result.length == 0) {
                res.render("manager/employees", { "length": 0 });
            } else if (result.length > 0) {
                res.render("manager/employees", { "length": result.length, "employeeData": result });
            }
        });
    }
});

module.exports = router;
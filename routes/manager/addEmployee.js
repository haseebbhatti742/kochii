const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function (req, res) {
    if (req.session.username == null)
        res.redirect("/manager");
    else if (req.session.username != null && req.session.type == "client")
        res.redirect("/home");
    else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Add Employee";
        res.render("manager/addEmployee")
    }
    else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
});

router.post("/add", function (req, res) {
    var employee_name = req.body.employee_name
    var employee_contact = req.body.employee_contact
    var employee_dob = req.body.employee_dob
    var employee_address = req.body.employee_address
    var employee_role = req.body.employee_role
    var employee_username = req.body.employee_username
    var employee_password = req.body.employee_password
    var employee_cnic = req.body.employee_cnic


    var query = "Insert into employees(employee_name, employee_contact, employee_dob,employee_address,employee_role,employee_username,employee_password,employee_cnic )values ('" + employee_name + "','" + employee_contact + "','" + employee_dob + "','" + employee_address + "', '" + employee_role + "' , '" + employee_username + "' , '" + employee_password + "', '" + employee_cnic + "' )"
    app.conn.query(query, function (err, result) {
        if (err) res.status(200).json({ "status": "error" })
        else res.status(200).json({ "status": "OK" })

    })
})

router.post("/checkusername", function (req, res) {
    var query = "SELECT * from employees where employee_username = '" + req.body.username + "'";
    app.conn.query(query, function (err, result) {
        if (err) {
            res.status(200).json({ status: "error" })
        } else if (result.length == 0) {
            res.status(200).json({ status: "no" })
        } else {
            res.status(200).json({ "status": "yes" })
        }
    })
})

module.exports = router;
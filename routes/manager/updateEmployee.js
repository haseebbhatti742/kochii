const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/:employee_id", function (req, res) {
    if (req.session.username == null)
        res.redirect("/manager");
    else if (req.session.username != null && req.session.type == "client")
        res.redirect("/home");
    else if (req.session.username != null && req.session.type == "manager") {
        res.locals.title = "Update Employee";
        var query = "SELECT * from employees where employee_id = " + req.params.employee_id
        app.conn.query(query, function (err, result) {
            if (err) console.log(err.message);
            else {
                res.render("manager/updateEmployee", { employee_data: result[0] }) // carrying data 


            }
        })
    }
    else if (req.session.username != null && req.session.type == "receptionist")
        res.redirect("/receptionist/home")
});

router.post("/update", function (req, res) {
    var employee_id = req.body.employee_id
    var employee_name = req.body.employee_name
    var employee_contact = req.body.employee_contact
    var employee_dob = req.body.employee_dob
    var employee_address = req.body.employee_address
    var employee_role = req.body.employee_role
    var employee_username = req.body.employee_username
    var employee_password = req.body.employee_password
    var employee_cnic = req.body.employee_cnic

    var query = "UPDATE employees SET employee_name = '" + employee_name + "', employee_contact = '" + employee_contact + "', employee_dob= '" + employee_dob + "',employee_address = '" + employee_address + "', employee_role='" + employee_role + "', employee_username='" + employee_username + "', employee_password='" + employee_password + "', employee_cnic='" + employee_cnic + "'  where employee_id='" + employee_id + "'"

    app.conn.query(query, function (err, result) {
        if (err) res.status(200).json({ "status": "error" })
        else res.status(200).json({ "status": "OK" })

    })

})
module.exports = router;
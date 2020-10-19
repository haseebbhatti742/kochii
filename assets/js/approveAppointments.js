$(window).on('load', function() {
    // getStylists();
    getEmployees();
});

var $selectEmployees = $('#employees');
var employeesNameArray = [];
var employeesIdArray = [];

function addSelectEmployees(arrayNames, arrayId, $select) {
    for (var i = 0; i < arrayNames.length; i++) {
        $select.append($("<option></option>").attr("value", arrayId[i]).text(arrayNames[i]));
    }
}

function getEmployees() {
    var name = "";
    fetch("/receptionist/approveAppointments/getEmployees", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "yes") {
            for (var i = 0; i < data.employees.length; i++) {
                employeesNameArray.push(data.employees[i].employee_name);
                employeesIdArray.push(data.employees[i].employee_id);
            }
            addSelectEmployees(employeesNameArray, employeesIdArray, $selectEmployees);
        }
    })
}

function cancel() {
    window.location.replace("/");
}

function approveAppointments() {
    var appointment_id = document.getElementById("appointment_id").value;
    var user_id = document.getElementById("user_id").value;
    var appDate = document.getElementById("appointment_date").value;

    var appointment_date = new Date(appDate);
    appointment_date.setHours(0, 0, 0, 0);

    var appointment_time = document.getElementById("appointment_time").value;

    var employee_id = document.getElementById("employees").value;

    fetch("/receptionist/approveAppointments/approve", {
        method: "POST",
        body: JSON.stringify({ appointment_id, user_id, appointment_date, appointment_time, employee_id }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok") {
            alert("Accepted Successfully");
            window.location.replace("/home");
        } else if (data.status == "error") {
            document.getElementById("msg").innerHTML = data.msg;
            document.getElementById("addError").hidden = false;
        }
    })
}
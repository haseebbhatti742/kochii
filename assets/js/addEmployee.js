function addEmployee() {
    var employee_dob = document.getElementById("employee_dob").value;
    var employee_name = document.getElementById("employee_name").value;
    var employee_contact = document.getElementById("employee_contact").value;
    var employee_address = document.getElementById("employee_address").value;
    var employee_role = document.getElementById("employee_role").value;
    var employee_username = document.getElementById("employee_username").value;
    var employee_password = document.getElementById("employee_password").value;
    var employee_cnic = document.getElementById("employee_cnic").value;
    fetch("/manager/addEmployee/add", {
        method: "POST",
        body: JSON.stringify({
            "employee_name": employee_name,
            "employee_dob": employee_dob,
            "employee_contact": employee_contact,
            "employee_cnic": employee_cnic,
            "employee_address": employee_address,
            "employee_role": employee_role,
            "employee_username": employee_username,
            "employee_password": employee_password
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "OK") {
            alert("Employee Added");
            window.location.replace("/manager/employees");
        } else if (data.status == "error") {
            document.getElementById("Error").hidden = false;
        }
    })
}

function updateEmployee() {
    var employee_id = document.getElementById("employee_id").value;
    var employee_dob = document.getElementById("employee_dob").value;
    var employee_name = document.getElementById("employee_name").value;
    var employee_contact = document.getElementById("employee_contact").value;
    var employee_address = document.getElementById("employee_address").value;
    var employee_role = document.getElementById("employee_role").value;
    var employee_username = document.getElementById("employee_username").value;
    var employee_password = document.getElementById("employee_password").value;
    var employee_cnic = document.getElementById("employee_cnic").value;

    fetch("/manager/updateEmployee/update", {
        method: "POST",
        body: JSON.stringify({
            "employee_id": employee_id,
            "employee_name": employee_name,
            "employee_dob": employee_dob,
            "employee_cnic": employee_cnic,
            "employee_contact": employee_contact,
            "employee_address": employee_address,
            "employee_role": employee_role,
            "employee_username": employee_username,
            "employee_password": employee_password
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "OK") {
            alert("Employee updated");
            window.location.replace("/manager/employees");
        } else if (data.status == "error") {
            document.getElementById("Error").hidden = false;
        }
    })
}

function roleFunction() {
    var str1 = $("#employee_role").find(":selected").text();
    var str2 = "Receptionist";
    if (str1 == str2) {
        document.getElementById("employee_username").hidden = false;
        document.getElementById("employee_password").hidden = false;
    } else {
        document.getElementById("employee_username").hidden = true;
        document.getElementById("employee_password").hidden = true;
        document.getElementById("unError").innerHTML = "";
        document.getElementById("addBtn").disabled = false;
    }
}

function checkUsername() {
    var username = document.getElementById("employee_username").value;
    fetch("/manager/addEmployee/checkusername", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "no") {
            document.getElementById("unError").innerHTML = "Username Available";
            document.getElementById("unError").style.color = "green";
            document.getElementById("unError").hidden = false;
            document.getElementById("addBtn").disabled = false;
        } else if (data.status == "yes") {
            document.getElementById("unError").innerHTML = "Username Not Available";
            document.getElementById("unError").style.color = "red";
            document.getElementById("unError").hidden = false;
            document.getElementById("addBtn").disabled = true;
        }
    })
}
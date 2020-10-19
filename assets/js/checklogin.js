function clientLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch("/login-form/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "yes") {
            window.location.replace("/home");
        } else if (data.status == "no") {
            document.getElementById("loginError").hidden = false;
        }
    })
}

function managerLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch("/manager/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "yes") {
            window.location.replace("/manager/home");
        } else if (data.status == "no") {
            document.getElementById("loginError").hidden = false;
        }
    })
}

function receptionistLogin(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    fetch("/receptionist/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "yes") {
            window.location.replace("/receptionist/home");
        } else if (data.status == "no") {
            document.getElementById("loginError").hidden = false;
        }
    })
}
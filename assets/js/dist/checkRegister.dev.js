"use strict";

function checkusername() {
  var username = document.getElementById("username").value;

  if (username.length < 4 || username.length > 15 || username.includes(" ")) {
    document.getElementById("username").focus();
    document.getElementById("unError").style.color = "red";
    document.getElementById("unError").innerHTML = "Username length must be greater than 4";
    document.getElementById("register").disabled = true;
  } else {
    document.getElementById("unError").innerHTML = "";
    fetch("/register-form/checkusername", {
      method: "POST",
      body: JSON.stringify({
        "username": username
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.status == "yes") {
        document.getElementById("username").focus();
        document.getElementById("unError").style.color = "red";
        document.getElementById("unError").innerHTML = "Username Not Available";
        document.getElementById("register").disabled = true;
      } else if (data.status == "no") {
        document.getElementById("unError").style.color = "green"; // document.getElementById("unError").innerHTML = "Username Available";

        document.getElementById("unError").innerHTML = " ";
        document.getElementById("register").disabled = false;
      }
    });
  }
}

function checkemail() {
  var email = document.getElementById("email").value;

  if (email.includes("@") == false && email.includes(".") == false || email.includes("@") == true && email.includes(".") == false || email.includes("@") == false && email.includes(".") == true) {
    document.getElementById("emailError").style.color = "red";
    document.getElementById("emailError").innerHTML = "Invalid email";
    document.getElementById("register").disabled = true;
  } else {
    fetch("/register-form/checkemail", {
      method: "POST",
      body: JSON.stringify({
        email: email
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.status == "yes") {
        document.getElementById("emailError").style.color = "red";
        document.getElementById("emailError").innerHTML = "Email Already Taken"; // document.getElementById("loginBtn").disabled = true;
      } else if (data.status == "no") {
        document.getElementById("emailError").style.color = "green";
        document.getElementById("emailError").innerHTML = ""; // document.getElementById("loginBtn").disabled = true;

        fetch("/register-form/checkemail", {
          method: "POST",
          body: JSON.stringify({
            email: email
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function (data) {
          return data.json();
        }).then(function (data) {
          if (data.status == "yes") {
            document.getElementById("emailError").style.color = "red";
            document.getElementById("emailError").innerHTML = "Email Already Taken"; // document.getElementById("loginBtn").disabled = true;
          } else if (data.status == "no") {
            document.getElementById("emailError").style.color = "green";
            document.getElementById("emailError").innerHTML = ""; // document.getElementById("loginBtn").disabled = true;

            document.getElementById("register").disabled = false;
          }
        });
      }
    });
  }
}

function checkPass() {
  //alert("Enter ho gya hai");
  var x = document.getElementById("password").value; // alert(x.length);

  if (x.length < 6) {
    document.getElementById("passError").innerHTML = "Password too Short";
    document.getElementById("passError").style.color = "Red";
    document.getElementById("register").disabled = true;
  } else {
    document.getElementById("passError").innerHTML = "";
    document.getElementById("register").disabled = false;
  }
} // register submitd


function addForm() {
  var fullname = document.getElementById("fullname").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  if (fullname.length == 0 || username.length == 0 || password.length == 0 || email.length == 0 || phone.length == 0) {
    alert("You must fill mandatory feilds");
  } else {
    fetch("/register-form/register", {
      method: "POST",
      body: JSON.stringify({
        "fullname": fullname,
        "username": username,
        "password": password,
        "address": address,
        "phone": phone,
        "email": email
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.status == "success") {
        window.location.replace("/home");
      } else if (data.status == "error") {
        alert("Something went wrong");
      }
    });
  }
} //  Phone number validation


function checkPhone(evt) {
  var theEvent = evt || window.event; // Handle paste

  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    if (document.getElementById("phone").value.length < 11) {
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
  }

  var regex = /[0-9]|\./;

  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
} // check name 


function checkName(evt) {
  var theEvent = evt || window.event; // Handle paste

  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }

  var regex = /[A-Z, a-z]|\./;

  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}
$(window).on('load', function() {
    // getStylists();
    getServices();
});

// var $selectStylists = $('#stylist');
var $selectServices = $('#service');
var serviceNameArray = [];
var serviceIdArray = [];

function addSelectServices(arrayNames, arrayId, $select) {
    for (var i = 0; i < arrayNames.length; i++) {
        $select.append($("<option></option>").attr("value", arrayId[i]).text(arrayNames[i]));
    }
}

function addSelectStylist(arr, $select) {
    $.each(arr, function(key, value) {
        $select.append($("<option></option>").attr("value", value).text(value));
    });
}

function getStylists() {
    var name = "";
    fetch("/addAppointment/getStylists", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "yes") {
            // var arr = this[x.replace(/\s/g, "") + "Array"];
            var arr = [];
            for (var i = 0; i < data.stylists.length; i++) {
                arr.push(data.stylists[i].employee_name);
            }
            addSelectStylist(arr, $selectStylists);
        }
    })
}

function getServices() {
    var name = "";
    fetch("/addAppointment/getServices", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "yes") {
            for (var i = 0; i < data.services.length; i++) {

                serviceNameArray.push(data.services[i].service_name);
                serviceIdArray.push(data.services[i].service_id);
            }
            addSelectServices(serviceNameArray, serviceIdArray, $selectServices);
        }
    })
}

var serviceArray = [];

function selectService() {
    var str1 = $("#service").find(":selected").text();
    var val = $("#service").find(":selected").val();
    if (serviceArray.includes(val) == false) {
        serviceArray.push(val);
        var node = document.createElement("div");

        var inputId = document.createElement("input");
        inputId.setAttribute("type", "hidden");
        inputId.setAttribute("value", val);
        node.setAttribute("class", "alert alert-warning alert-dismissible");

        var button = document.createElement("button");
        button.setAttribute("class", "close");
        button.setAttribute("type", "button");
        button.setAttribute("data-dismiss", "alert");
        button.onclick = function() {
            var index = serviceArray.indexOf(val);
            if (index !== -1) serviceArray.splice(index, 1);
        }
        button.innerHTML = "&times;";
        node.appendChild(button);
        node.appendChild(inputId);

        var strong = document.createElement("strong");
        strong.innerHTML = str1;
        node.appendChild(strong);
        document.getElementById("selectedServices").appendChild(node);

    }
}

function addAppointment() {
    var appDate = document.getElementById("appintment_date").value;
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)
    var appointmentDate = new Date(appDate);
    appointmentDate.setHours(0, 0, 0, 0);
    if (appointmentDate < currentDate || appDate == "") {
        document.getElementById("msg").innerHTML = "Invalid Date";
        document.getElementById("addError").hidden = false;
    } else if (serviceArray.length == 0) {
        document.getElementById("msg").innerHTML = "Select Any Service";
        document.getElementById("addError").hidden = false;
    } else {
        document.getElementById("addError").hidden = true;
        var serviceArrayJson = JSON.stringify({ "array": serviceArray });
        fetch("/addAppointment/add", {
            method: "POST",
            body: JSON.stringify({ "date": appointmentDate, "services": serviceArrayJson }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(data => data.json()).then(data => {
            if (data.status == "yes") {
                alert("Added Successfully");
                window.location.replace("/home");
            } else if (data.status == "error") {
                document.getElementById("msg").innerHTML = data.msg;
                document.getElementById("addError").hidden = false;
            }
        })
    }
}
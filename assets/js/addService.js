function addService() {
    var service_name = document.getElementById("serviceName").value;
    var service_price = document.getElementById("servicePrice").value;
    var service_status = document.getElementById("serviceStatus").value;
    var service_desc = document.getElementById("serviceDesc").value
    fetch("/manager/addService/add", {
        method: "POST",
        body: JSON.stringify({ "serviceName": service_name, "servicePrice": service_price, "serviceStatus": service_status, "serviceDesc": service_desc }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "OK") {
            alert("Service Added");
            window.location.replace("/manager/services");
        } else if (data.status == "error") {
            document.getElementById("Error").hidden = false;
        }
    })
}
function updateService() {
    var service_id = document.getElementById("serviceId").value;
    var service_name = document.getElementById("serviceName").value;
    var service_price = document.getElementById("servicePrice").value;
    var service_status = document.getElementById("serviceStatus").value;
    var service_desc = document.getElementById("serviceDesc").value
    fetch("/manager/updateService/update", {
        method: "POST",
        body: JSON.stringify({ "service_id": service_id, "service_name": service_name, "service_price": service_price, "service_status": service_status, "service_desc": service_desc }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "OK") {
            alert("Service Updated");
            window.location.replace("/manager/services");
        } else if (data.status == "error") {
            document.getElementById("Error").hidden = false;
        }
    })

}
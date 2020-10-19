"use strict";

function addProduct() {
  var product_name = document.getElementById("product_name").value;
  var product_price = document.getElementById("product_price").value;
  var product_quantity = document.getElementById("product_quantity").value;
  var product_minQuantity = document.getElementById("product_minQuantity").value;
  var product_desc = document.getElementById("product_desc").value;
  var product_status = document.getElementById("product_status").value;

  if (product_name == "" || product_price == "" || product_quantity == "" || product_minQuantity == "" || product_desc == "" || product_status == "") {
    // alert("Please Fill all fields");
    document.getElementById("msg").innerHTML = "Please Fill Mandatory Fields";
    document.getElementById("addError").hidden = false;
  } else if (product_price <= 0 || product_quantity <= 0 || product_minQuantity <= 0) {
    document.getElementById("msg").innerHTML = "Price or Quantity must be a positive number";
    document.getElementById("addError").hidden = false;
  } else {
    fetch("/manager/addProduct/add", {
      method: "POST",
      body: JSON.stringify({
        "product_name": product_name,
        "product_price": product_price,
        "product_quantity": product_quantity,
        "product_minQuantity": product_minQuantity,
        "product_desc": product_desc,
        "product_status": product_status
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.status == "OK") {
        alert("Product Added");
        window.location.replace("/manager/products");
      } else if (data.status == "error") {
        document.getElementById("Error").hidden = false;
      }
    });
  }
}

function updateProduct() {
  var product_id = document.getElementById("product_id").value;
  var product_name = document.getElementById("product_name").value;
  var product_price = document.getElementById("product_price").value;
  var product_quantity = document.getElementById("product_quantity").value;
  var product_minQuantity = document.getElementById("product_minQuantity").value;
  var product_desc = document.getElementById("product_desc").value;
  var product_status = document.getElementById("product_status").value;

  if (product_name == "" || product_price == "" || product_quantity == "" || product_minQuantity == "" || product_desc == "" || product_status == "") {
    document.getElementById("msg").innerHTML = "Please Fill Mandatory Fields";
    document.getElementById("updateError").hidden = false;
  } else if (product_price <= 0 || product_quantity <= 0 || product_minQuantity <= 0) {
    document.getElementById("msg").innerHTML = "Price or Quantity must be a positive number";
    document.getElementById("updateError").hidden = false;
  } else {
    fetch("/manager/updateProduct/update", {
      method: "POST",
      body: JSON.stringify({
        "product_id": product_id,
        "product_name": product_name,
        "product_price": product_price,
        "product_quantity": product_quantity,
        "product_minQuantity": product_minQuantity,
        "product_desc": product_desc,
        "product_status": product_status
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(function (data) {
      return data.json();
    }).then(function (data) {
      if (data.status == "OK") {
        alert("Product updated");
        window.location.replace("/manager/products");
      } else if (data.status == "error") {
        document.getElementById("Error").hidden = false;
      }
    });
  }
} // Validations
// function checkPrice(evt) {
//     var price = document.getElementById("product_price").value;
//     if (price <= 0) {
//         document.getElementById("priceError").innerHTML = "Invalid Product Price";
//         document.getElementById("priceError").style.color = "red";
//         document.getElementById("addProduct").disabled = true;
//     } else {
//         document.getElementById("priceError").innerHTML = "";
//         document.getElementById("addProduct").disabled = false;
//     }
//     var theEvent = evt || window.event;
//     // Handle paste
//     if (theEvent.type === 'paste') {
//         key = event.clipboardData.getData('text/plain');
//     } else {
//         // Handle key press
//         var key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//     }
//     var regex = /[0-9]|\./;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// }
// function checkQuantity(evt) {
//     var quantity = document.getElementById("product_quantity").value;
//     if (quantity <= 0) {
//         document.getElementById("quantityError").innerHTML = "Invalid Product Quantity";
//         document.getElementById("quantityError").style.color = "red";
//         document.getElementById("addProduct").disabled = true;
//     } else {
//         document.getElementById("quantityError").innerHTML = "";
//         document.getElementById("addProduct").disabled = false;
//     }
//     var theEvent = evt || window.event;
//     // Handle paste
//     if (theEvent.type === 'paste') {
//         key = event.clipboardData.getData('text/plain');
//     } else {
//         // Handle key press
//         var key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//     }
//     var regex = /[0-9]|\./;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// }
// function checkMinQuantity(evt) {
//     var minQuantity = document.getElementById("product_minQuantity").value;
//     if (minQuantity <= 0) {
//         document.getElementById("minQuantityError").innerHTML = "Invalid Product Quantity";
//         document.getElementById("minQuantityError").style.color = "red";
//         document.getElementById("addProduct").disabled = true;
//     } else {
//         document.getElementById("minQuantityError").innerHTML = "";
//         document.getElementById("addProduct").disabled = false;
//     }
//     var theEvent = evt || window.event;
//     // Handle paste
//     if (theEvent.type === 'paste') {
//         key = event.clipboardData.getData('text/plain');
//     } else {
//         // Handle key press
//         var key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//     }
//     var regex = /[0-9]|\./;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// }
// validations end
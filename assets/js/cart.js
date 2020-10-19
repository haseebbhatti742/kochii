function addToCart(product_id) {

    var quantity = prompt("Please enter quantity:", 1);
    if (quantity == null || quantity == "" || quantity == 0) {

    } else {
        var product_id = product_id;
        fetch("/cart/add", {
            method: "POST",
            body: JSON.stringify({ "product_id": product_id, "quantity": quantity }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(data => data.json()).then(data => {
            if (data.status == "ok") {
                alert("Added To Cart");
            } else if (data.status == "error") {
                alert("Error: " + data.msg);
            }
        })
    }
}

function clientUpdateCart(cart_id, quantity, i, username) {
    var updated_quantity = quantity[i].value;
    fetch("/cart/updateQuantity", {
        method: "POST",
        body: JSON.stringify({ "cart_id": cart_id, "quantity": updated_quantity }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok") {
            window.location.replace("/cart/" + username);
        } else if (data.status == "error") {
            alert("Error: " + data.msg);
        }
    })
}

function clientDeleteCart(cart_id, username) {
    fetch("/cart/delete", {
        method: "POST",
        body: JSON.stringify({ "cart_id": cart_id }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok") {
            window.location.replace("/cart/" + username);
        } else if (data.status == "error") {
            alert("Error: " + data.msg);
        }
    })
}

function getCartByUsername() {

    var username = prompt("Please enter username:", "");
    if (username == null || username == "" || username == 0) {

    } else {
        fetch("/receptionist/cart/checkUsername", {
            method: "POST",
            body: JSON.stringify({ "username": username }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(data => data.json()).then(data => {
            if (data.status == "error") {
                alert("Error: " + data.msg);
            } else if (data.status == "no") {
                alert("Username not found")
            } else if (data.status == "yes") {
                window.location.replace("/receptionist/cart/" + username);
            }
        })
    }
}

function receptionistUpdateCart(cart_id, quantity, i, username) {
    var updated_quantity = quantity[i].value;
    fetch("/receptionist/cart/updateQuantity", {
        method: "POST",
        body: JSON.stringify({ "cart_id": cart_id, "quantity": updated_quantity }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok") {
            window.location.replace("/receptionist/cart/" + username);
        } else if (data.status == "error") {
            alert("Error: " + data.msg);
        }
    })
}

function receptionistDeleteCart(cart_id, username) {
    fetch("/receptionist/cart/delete", {
        method: "POST",
        body: JSON.stringify({ "cart_id": cart_id }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok") {
            window.location.replace("/receptionist/cart/" + username);
        } else if (data.status == "error") {
            alert("Error: " + data.msg);
        }
    })
}

// function checkoutByReceptionist() {
//     window.print();
// }

//template
setInterval(function() {
    getNewNotificationsForReceptionist();
    getNewNotificationsForClient();
    getCartForClient();
}, 1000);

function getNewNotificationsForReceptionist() {
    fetch("/receptionist/notifications", {
        method: "POST",
        body: JSON.stringify({ username: "" }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok" && data.notifications > 0) {
            document.getElementById("notifications").innerHTML = data.notifications;
            document.getElementById("notifications_new_appointments").innerHTML = data.notifications_new_appointments + "";
        } else if (data.status == "ok" && data.notifications == 0) {
            document.getElementById("notifications").innerHTML = "";
            document.getElementById("notifications_new_appointments").innerHTML = "";
        }
    })
}

var array = [];

function getNewNotificationsForClient() {
    array = [];
    document.getElementById("notifications_message").innerHTML = "";
    fetch("/notifications", {
        method: "POST",
        body: JSON.stringify({ username: "" }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok" && data.notification_length > 0) {
            document.getElementById("notification_length").innerHTML = data.notification_length;

            var node;
            for (var i = 0; i < data.notification_length; i++) {
                if (array.includes(data.notifications[i].notification_id) == false) {
                    array.push(data.notifications[i].notification_id);
                    node = document.createElement("p");
                    node.innerHTML = data.notifications[i].notification_message;
                    document.getElementById("notifications_message").appendChild(node);
                }
            }

        } else if (data.status == "ok" && data.notification_length == 0) {
            document.getElementById("notification_length").innerHTML = "";
            document.getElementById("notifications_message").innerHTML = "";
        }
    })
}

function getCartForClient() {
    fetch("/cart/getCart", {
        method: "POST",
        body: JSON.stringify({ username: "" }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }).then(data => data.json()).then(data => {
        if (data.status == "ok" && data.cart_items > 0) {
            document.getElementById("cart_items").innerHTML = data.cart_items;
        } else if (data.status == "ok" && data.cart_items == 0) {
            document.getElementById("cart_items").innerHTML = "";
        }
    })
}
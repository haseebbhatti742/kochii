const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/:username", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/");
    } else if (req.session.username != null && req.session.type == "manager") {
        res.redirect("/manager/home")
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.redirect("/receptionist/home")
    } else if (req.session.username != null && req.session.type == "client") {
        res.locals.title = "Cart";

        //adding
        var query = "SELECT * from appointments WHERE user_id = '" + req.params.username + "' AND appointment_status='accepted' order by appointment_id desc";
        var appointments = [];
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/error");
            } else if (result1.length == 0) {
                getCartProducts(req, res, appointments, req.params.username);
            } else if (result1.length > 0) {
                var appointments_total = 0;
                for (let i = 0; i < result1.length; i++) {
                    appointments.push({ "appointments": result1[i] });
                }

                for (let i = 0; i < appointments.length; i++) {
                    var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                    app.conn.query(query2, function(err, result2) {
                        if (err) {
                            console.log(err.message);
                            errorMessage = "Error: " + err.message;
                            res.redirect("/error");
                        } else if (result2.length == 0) {
                            console.log("No appointment");
                            errorMessage = "Error: No Appointments";
                            res.redirect("/error");
                        } else if (result2.length > 0) {
                            appointments[i].appointment_services = result2;
                            let total = 0;
                            for (var j = 0; j < result2.length; j++) {
                                total = total + result2[j].service_price;
                            }
                            appointments[i].appointment_total = total;
                            appointments_total = appointments_total + total;
                            // console.log(appointments[i]);
                        }
                    })
                }
                setTimeout(function() {
                    // console.log(appointments);
                    appointments.appointments_total = appointments_total;
                    getCartProducts(req, res, appointments, req.params.username);
                    // res.render("client/cart", { appointments: appointments });
                }, 1000);
            }
        });
    }
});

function getCartProducts(req, res, appointments, username) {
    var cart = [];
    var query = "SELECT * from cart JOIN product ON cart.product_id = product.product_id WHERE cart.username = '" + username + "' AND cart.status ='new'";
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else if (result.length == 0) {
            res.render("client/cart", { appointments: appointments, cart: cart });
            // res.status(200).json({ status: "ok", appointments: appointments, cart: cart });
        } else if (result.length > 0) {
            var cart_total = 0;
            for (let i = 0; i < result.length; i++) {
                cart.push({ "cart_item": result[i] });
            }

            for (let i = 0; i < cart.length; i++) {
                cart[i].total = cart[i].cart_item.product_price * cart[i].cart_item.quantity;
                cart_total = cart_total + cart[i].total;
            }

            cart.cart_total = cart_total;
            res.render("client/cart", { appointments: appointments, cart: cart });
            // res.status(200).json({ status: "ok", appointments: appointments, cart: cart });
        }
    })
}

router.get("/mobile/:username", function(req, res) {
    // if (req.session.username == null) {
    //     res.redirect("/");
    // } else if (req.session.username != null && req.session.type == "manager") {
    //     res.redirect("/manager/home")
    // } else if (req.session.username != null && req.session.type == "receptionist") {
    //     res.redirect("/receptionist/home")
    // } else if (req.session.username != null && req.session.type == "client") {
    res.locals.title = "Cart";

    var query = "SELECT * from appointments WHERE user_id = '" + req.params.username + "' AND appointment_status='accepted' order by appointment_id desc";
    var appointments = [];
    app.conn.query(query, function(err, result1) {
        if (err) {
            console.log(err.message);
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else if (result1.length == 0) {
            getCartProductsMoile(req, res, appointments, req.params.username);
        } else if (result1.length > 0) {
            var appointments_total = 0;
            for (let i = 0; i < result1.length; i++) {
                appointments.push({ "appointments": result1[i] });
            }

            for (let i = 0; i < appointments.length; i++) {
                var query2 = "SELECT * from appointment_services JOIN services ON appointment_services.service_id = services.service_id WHERE appointment_services.appointment_id=" + appointments[i].appointments.appointment_id;
                app.conn.query(query2, function(err, result2) {
                    if (err) {
                        console.log(err.message);
                        errorMessage = "Error: " + err.message;
                        res.redirect("/error");
                    } else if (result2.length == 0) {
                        console.log("No appointment");
                        errorMessage = "Error: No Appointments";
                        res.redirect("/error");
                    } else if (result2.length > 0) {
                        appointments[i].appointment_services = result2;
                        let total = 0;
                        for (var j = 0; j < result2.length; j++) {
                            total = total + result2[j].service_price;
                        }
                        appointments[i].appointment_total = total;
                        appointments_total = appointments_total + total;
                        // console.log(appointments[i]);
                    }
                })
            }
            setTimeout(function() {
                // console.log(appointments);
                appointments.appointments_total = appointments_total;
                getCartProductsMoile(req, res, appointments, req.params.username);
                // res.render("client/cart", { appointments: appointments });
            }, 1000);
        }
    });
    // }
});

function getCartProductsMoile(req, res, appointments, username) {
    var cart = [];
    var query = "SELECT * from cart JOIN product ON cart.product_id = product.product_id WHERE cart.username = '" + username + "' AND cart.status ='new'";
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else if (result.length == 0) {
            // res.render("client/cart", { appointments: appointments, cart: cart });
            res.status(200).json({ status: "ok", appointments: appointments, cart: cart });
        } else if (result.length > 0) {
            var cart_total = 0;
            for (let i = 0; i < result.length; i++) {
                cart.push({ "cart_item": result[i] });
            }

            for (let i = 0; i < cart.length; i++) {
                cart[i].total = cart[i].cart_item.product_price * cart[i].cart_item.quantity;
                cart_total = cart_total + cart[i].total;
            }

            cart.cart_total = cart_total;

            // console.log(cart)
            // setTimeout(function() {
            //     res.status(200).json({ status: "ok", appointments: appointments, cart: cart });
            // }, 3000)

            //console.log(cart)
            res.status(200).json({ status: "ok", appointments: appointments, cart: cart });
        }
    })
}

router.post("/add", function(req, res) {
    var product_id = req.body.product_id;
    var quantity = req.body.quantity;
    var date = new Date();

    var query = "SELECT * from cart WHERE username = '" + req.session.username + "' AND product_id = '" + product_id + "'";
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else if (result.length == 0) {
            var query = "INSERT INTO cart (username, product_id, quantity, day, month, year, status) VALUES ('" + req.session.username + "', " + product_id + ", " + quantity + " , " + date.getDate() + ", " + (date.getMonth() + 1) + ", " + date.getFullYear() + ", 'new')";
            app.conn.query(query, function(err, result) {
                if (err) {
                    res.status(200).json({ status: "error", "msg": err.message });
                } else {
                    res.status(200).json({ status: "ok" });
                }
            })
        } else if (result.length > 0) {
            var total_quantity = Number(quantity) + Number(result[0].quantity);
            var query = "UPDATE cart SET quantity = " + total_quantity + ",  day = " + date.getDate() + ", month = " + (date.getMonth() + 1) + ", year = " + date.getFullYear() + " WHERE cart_id =" + result[0].cart_id;
            app.conn.query(query, function(err, result) {
                if (err) {
                    res.status(200).json({ status: "error", "msg": err.message });
                } else {
                    res.status(200).json({ status: "ok" });
                }
            })
        }
    })



});

router.post("/getCart", function(req, res) {
    var query = "SELECT * from cart WHERE username = '" + req.session.username + "' AND status ='new'";
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else {
            res.status(200).json({ status: "ok", cart_items: result.length });
        }
    })
});

router.post("/updateQuantity", function(req, res) {
    var query = "UPDATE cart SET quantity = " + req.body.quantity + " WHERE cart_id = " + req.body.cart_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else {
            res.status(200).json({ status: "ok" });
        }
    })
});

router.post("/delete", function(req, res) {
    var query = "DELETE from cart where cart_id=" + req.body.cart_id;
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else {
            res.status(200).json({ status: "ok" });
        }
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const app = require("../../app");

// router.get("/", function(req, res) {
//     var query = "SELECT * from cart WHERE username = '" + req.session.username + "' AND status ='new'";
//     app.conn.query(query, function(err, result) {
//         if (err) {
//             res.status(200).json({ status: "error", "msg": err.message });
//         } else {
//             res.status(200).json({ status: "ok", cart_items: result.length });
//         }
//     })
// });

router.get("/:username", function(req, res) {
    if (req.session.username == null) {
        res.redirect("/receptionist");
    } else if (req.session.username != null && req.session.type == "manager") {
        res.redirect("/manager/home")
    } else if (req.session.username != null && req.session.type == "client") {
        res.redirect("/cart")
    } else if (req.session.username != null && req.session.type == "receptionist") {
        res.locals.title = "Cart";
        var username = req.params.username;

        var query = "SELECT * from appointments WHERE user_id = '" + username + "' AND appointment_status='accepted' order by appointment_id desc";
        var appointments = [];
        app.conn.query(query, function(err, result1) {
            if (err) {
                console.log(err.message);
                errorMessage = "Error: " + err.message;
                res.redirect("/error");
            } else if (result1.length == 0) {
                getCartProducts(req, res, appointments, username);
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
                    getCartProducts(req, res, appointments, username);
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
            res.render("receptionist/cart", { appointments: appointments, cart: cart, username: username });
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
            res.render("receptionist/cart", { appointments: appointments, cart: cart, username: username });
        }
    })
}

router.post("/checkUsername", function(req, res) {
    var query = "SELECT * from users WHERE username = '" + req.body.username + "'";
    app.conn.query(query, function(err, result) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else if (result.length == 0) {
            res.status(200).json({ status: "no" });
        } else if (result.length > 0) {
            res.status(200).json({ status: "yes" });
        }
    })
});

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

router.post("/checkout", function(req, res) {
    let username = req.body.username;
    let order_amount = req.body.order_amount;
    let date = new Date();

    app.conn.getConnection(function(err, conn) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message });
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    res.status(200).json({ status: "error", "msg": err.message });
                } else {
                    let query1 = "INSERT INTO orders(user_id, order_day, order_month, order_year, order_amount, order_status) values('" + username + "','" + date.getDate() + "','" + (date.getMonth() + 1) + "','" + date.getFullYear() + "','" + order_amount + "','completed')";
                    app.conn.query(query1, function(err, result1) {
                        if (err) {
                            conn.rollback(() => {
                                res.status(200).json({ status: "error", "msg": err.message });
                            });
                        } else {
                            let order_id = result1.insertId; //latest added order id

                            //adding cart products to order
                            let query2 = "select * from cart where username = '" + username + "'";
                            app.conn.query(query2, function(err, result2) {
                                if (err) {
                                    conn.rollback(() => {
                                        res.status(200).json({ status: "error", "msg": err.message });
                                    });
                                } else {
                                    if (result2.length > 0) {
                                        for (var i = 0; i < result2.length; i++) {
                                            let query3 = "INSERT INTO order_products(order_id, product_id, quantity) values('" + order_id + "','" + result2[i].product_id + "','" + result2[i].quantity + "')";
                                            app.conn.query(query3, function(err, result3) {
                                                // if (err) {
                                                //     conn.rollback(() => {
                                                //         res.status(200).json({ status: "error", "msg": err.message });
                                                //     });
                                                // }
                                            })
                                        }

                                        setTimeout(function() {
                                            //deleting from cart
                                            let query7 = "delete from cart where username = '" + username + "'";
                                            app.conn.query(query7, function(err, result7) {
                                                if (err) {
                                                    conn.rollback(() => {
                                                        res.status(200).json({ status: "error", "msg": err.message });
                                                    });
                                                } else {
                                                    checkoutAppointments(req, res, order_id, username, conn);
                                                }
                                            })
                                        })
                                    } else if (result2.length === 0) {
                                        checkoutAppointments(req, res, order_id, username, conn);
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

function checkoutAppointments(req, res, order_id, username, conn) {
    //adding completed appointments order
    let query4 = "select * from appointments where user_id = '" + username + "' AND appointment_status='accepted'";
    app.conn.query(query4, function(err, result4) {
        if (err) {
            conn.rollback(() => {
                res.status(200).json({ status: "error", "msg": err.message });
            });
        } else {
            if (result4.length > 0) {
                for (var j = 0; j < result4.length; j++) {
                    let query5 = "INSERT INTO order_appointments(order_id, appointment_id) values('" + order_id + "','" + result4[j].appointment_id + "')";
                    app.conn.query(query5, function(err, result5) {
                        // if (err) {
                        //     conn.rollback(() => {
                        //         res.status(200).json({ status: "error", "msg": err.message });
                        //     });
                        // }
                    })
                }

                setTimeout(function() {
                    //chaging status of completed appointments
                    let query6 = "UPDATE appointments SET appointment_status = 'completed' WHERE user_id = '" + username + "' AND appointment_status = 'accepted'";
                    app.conn.query(query6, function(err, result6) {
                        if (err) {
                            conn.rollback(() => {
                                res.status(200).json({ status: "error", "msg": err.message });
                            });
                        } else {
                            res.status(200).json({ status: "ok", bill_number: order_id });
                        }
                    })
                }, 250);
            } else if (result4.length == 0) {
                res.status(200).json({ status: "ok", bill_number: order_id });
            }
        }
    })
}

module.exports = router;
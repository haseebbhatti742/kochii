const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function(req, res) {
    if (req.session.username != null && req.session.type == "client") {
        res.locals.title = "Add Appointment";
        res.render("client/addAppointment");
    } else if (req.session.username == null) {
        res.locals.title = "Login";
        res.render("client/login");
    }
});

router.post("/getStylists", function(req, res) {
    app.conn.query("SELECT * from employees WHERE employee_role!='receptionist'", function(err, result) {
        if (err) {
            console.log(err.message)
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else if (result.length > 0) {
            res.status(200).json({ status: "yes", stylists: result })
        }
    })
})

router.post("/getServices", function(req, res) {
    app.conn.query("SELECT * from services WHERE service_status='available'", function(err, result) {
        if (err) {
            console.log(err.message)
            errorMessage = "Error: " + err.message;
            res.redirect("/error");
        } else if (result.length > 0) {
            res.status(200).json({ status: "yes", services: result })
        }
    })
})

router.post("/add", function(req, res) {
    var services = JSON.parse(req.body.services);
    var appointment_date = new Date(req.body.date);

    app.conn.getConnection(function(err, conn) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message })
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    res.status(200).json({ status: "error", "msg": err.message })
                } else {
                    var query = "INSERT INTO appointments(appointment_date,appointment_status,user_id) values('" + appointment_date + "','pending','" + req.session.username + "')";
                    conn.query(query, function(err, result) {
                        if (err) {
                            conn.rollback(() => {
                                res.status(200).json({ status: "error", "msg": err.message })
                            });
                        } else {
                            //getting recently added primary key from appointments table
                            var appointment_id = result.insertId;
                            for (var i = 0; i < services.array.length; i++) {
                                var query2 = "INSERT INTO appointment_services(appointment_id,service_id) values('" + appointment_id + "','" + services.array[i] + "')";
                                conn.query(query2, function(err, result) {
                                    if (err) {
                                        conn.rollback(() => {
                                            res.status(200).json({ status: "error", "msg": err.message })
                                        });
                                    }
                                })
                            }

                            setTimeout(function() {
                                conn.commit((err) => {
                                    if (err) {
                                        conn.rollback(() => {
                                            res.status(200).json({ status: "error", "msg": err.message });
                                        });
                                    }
                                });
                                //sending notification start
                                app.conn.query("SELECT * from notifications WHERE usertype='receptionist'", function(err, res1) {
                                    if (err) {
                                        console.log(err.message);
                                        res.status(200).json({ status: "error", "msg": err.message });
                                    } else if (res1.length == 0) {
                                        app.conn.query("INSERT INTO notifications (usertype,appointments) values ('receptionist', 1)", function(err, res2) {
                                            if (err) {
                                                console.log(err.message);
                                                res.status(200).json({ status: "error", "msg": err.message });
                                            } else {
                                                res.status(200).json({ status: "yes" });
                                            }
                                        })
                                    } else if (res1.length > 0) {
                                        var appointments = res1[0].appointments;
                                        appointments++;
                                        app.conn.query("UPDATE notifications SET appointments=" + appointments + " WHERE usertype='receptionist'", function(err, res2) {
                                            if (err) {
                                                console.log(err.message);
                                                res.status(200).json({ status: "error", "msg": err.message });
                                            } else {
                                                res.status(200).json({ status: "yes" });
                                            }
                                        })
                                    }
                                })

                                //sending notification end
                            }, 100)
                        }
                    })
                }
            })
        }
    })
})

router.post("/add/mobile", function(req, res) {
    var services = JSON.parse(req.body.services);
    var appointment_date = new Date(req.body.date);
    var username = req.body.username;

    app.conn.getConnection(function(err, conn) {
        if (err) {
            res.status(200).json({ status: "error", "msg": err.message })
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    res.status(200).json({ status: "error", "msg": err.message })
                } else {
                    var query = "INSERT INTO appointments(appointment_date,appointment_status,user_id) values('" + appointment_date + "','pending','" + username + "')";
                    conn.query(query, function(err, result) {
                        if (err) {
                            conn.rollback(() => {
                                res.status(200).json({ status: "error", "msg": err.message })
                            });
                        } else {
                            //getting recently added primary key from appointments table
                            var appointment_id = result.insertId;
                            for (var i = 0; i < services.array.length; i++) {
                                var query2 = "INSERT INTO appointment_services(appointment_id,service_id) values('" + appointment_id + "','" + services.array[i] + "')";
                                conn.query(query2, function(err, result) {
                                    if (err) {
                                        conn.rollback(() => {
                                            res.status(200).json({ status: "error", "msg": err.message })
                                        });
                                    }
                                })
                            }

                            setTimeout(function() {
                                conn.commit((err) => {
                                    if (err) {
                                        conn.rollback(() => {
                                            res.status(200).json({ status: "error", "msg": err.message });
                                        });
                                    }
                                });
                                //sending notification start
                                app.conn.query("SELECT * from notifications WHERE usertype='receptionist'", function(err, res1) {
                                    if (err) {
                                        console.log(err.message);
                                        res.status(200).json({ status: "error", "msg": err.message });
                                    } else if (res1.length == 0) {
                                        app.conn.query("INSERT INTO notifications (usertype,appointments) values ('receptionist', 1)", function(err, res2) {
                                            if (err) {
                                                console.log(err.message);
                                                res.status(200).json({ status: "error", "msg": err.message });
                                            } else {
                                                res.status(200).json({ status: "yes" });
                                            }
                                        })
                                    } else if (res1.length > 0) {
                                        var appointments = res1[0].appointments;
                                        appointments++;
                                        app.conn.query("UPDATE notifications SET appointments=" + appointments + " WHERE usertype='receptionist'", function(err, res2) {
                                            if (err) {
                                                console.log(err.message);
                                                res.status(200).json({ status: "error", "msg": err.message });
                                            } else {
                                                res.status(200).json({ status: "yes" });
                                            }
                                        })
                                    }
                                })

                                //sending notification end
                            }, 100)
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;
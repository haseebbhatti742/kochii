//libraries
const express = require('express');
const app1 = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const cors = require('cors');
var passport = require('passport');

//settings
app1.use(cookieParser('secret'));
app1.use(flash());
app1.use(bodyParser.json({ limit: '50mb' }));
app1.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app1.use(cors());
app1.use(bodyParser.json());
app1.use(express.static('assets'));
// views and default location for views
app1.set('views', './views');
app1.set('view engine', 'jade'); // both keywords

//session management
app1.use(session({
    saveUninitialized: false,
    resave: true,
    secret: 'ssshhhhh',
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app1.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app1.use(passport.initialize());
app1.use(passport.session());

//db connection
var conn = mysql.createPool({
    host: 'localhost',
    user: 'kochiine_kochi',
    password: '742kochii742',
    database: 'kochiine_kochi'
});

// var conn = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'saloon'
// });

conn.getConnection(function(err, con) {
    if (err) {
        console.log("DB Error!");
    } else {
        console.log("DB Connected!");
    }
})

////////////////////////////////////////////////////////////////////////////////////
/* ---------------------------- client routes start ---------------------------- */
var clientIndexRoute = require('./routes/client/index')
var clientLoginRoute = require('./routes/client/login')
var clientRegisterRoute = require('./routes/client/register')
var clientContactRoute = require('./routes/client/contact')
var clientHomeRoute = require('./routes/client/home')
var clientServicesRoute = require('./routes/client/services')
var clientProductsRoute = require('./routes/client/products')
var clientAddAppointmentRoute = require('./routes/client/addAppointment')
var clientAppointmentsRoute = require('./routes/client/appointments')
var clientProfileRoute = require('./routes/client/profile')
var clientNotificationsRoute = require('./routes/client/notifications')
var clientErrorRoute = require('./routes/client/error')
var clientCartRoute = require('./routes/client/cart')

app1.use("/", clientIndexRoute);
app1.use("/login-form", clientLoginRoute);
app1.use("/register-form", clientRegisterRoute);
app1.use("/contact", clientContactRoute);
app1.use("/home", clientHomeRoute);
app1.use("/services", clientServicesRoute);
app1.use("/products", clientProductsRoute)
app1.use("/addAppointment", clientAddAppointmentRoute)
app1.use("/appointments", clientAppointmentsRoute)
app1.use("/profile", clientProfileRoute)
app1.use("/notifications", clientNotificationsRoute)
app1.use("/error", clientErrorRoute)
app1.use("/cart", clientCartRoute)

app1.use("/client/logout", function(req, res) {

    //removing notifications for receptionist start
    conn.query("DELETE from notifications WHERE usertype = 'client' AND username = '" + req.session.username + "'", function(err, result) {
        if (err) {
            console.log(err.message)
        }
    });

    //removing notifications for receptionist end

    req.session.destroy(function(err) {
        res.redirect("/")
    })
})

/* ---------------------------- client routes end ---------------------------- */


////////////////////////////////////////////////////////////////////////////////////
/* ---------------------------- manager routes start ---------------------------- */
var managerIndexRoute = require('./routes/manager/login')
var managerLoginRoute = require('./routes/manager/login')
var managerRegisterRoute = require('./routes/manager/register')
var managerProductsRoute = require('./routes/manager/products')
var managerEmployeesRoute = require('./routes/manager/employees')
var managerAddProductRoute = require('./routes/manager/addProduct')
var managerAddEmployeeRoute = require('./routes/manager/addEmployee')
var managerHomeRoute = require('./routes/manager/home')
var managerServicesRoute = require('./routes/manager/services')
var managerAddServiceRoute = require('./routes/manager/addService')
var managerUpdateEmployee = require('./routes/manager/updateEmployee')
var managerUpdateServiceRoute = require('./routes/manager/updateService')
var managerUpdateProductRoute = require('./routes/manager/updateProduct')
var managerAppointmentsRoute = require('./routes/manager/appointments')
var managerErrorRoute = require('./routes/manager/error')

app1.use("/manager/", managerIndexRoute); //JS file not jade file
app1.use("/manager/login-form", managerLoginRoute);
app1.use("/manager/register-form", managerRegisterRoute);
app1.use("/manager/products", managerProductsRoute);
app1.use("/manager/employees", managerEmployeesRoute);
app1.use("/manager/addProduct", managerAddProductRoute);
app1.use("/manager/addEmployee", managerAddEmployeeRoute)
app1.use("/manager/home", managerHomeRoute)
app1.use("/manager/services", managerServicesRoute)
app1.use("/manager/addService", managerAddServiceRoute)
app1.use("/manager/updateEmployee", managerUpdateEmployee)
app1.use("/manager/updateService", managerUpdateServiceRoute)
app1.use("/manager/updateProduct", managerUpdateProductRoute)
app1.use("/manager/appointments", managerAppointmentsRoute)
app1.use("/manager/error", managerErrorRoute)

app1.use("/manager/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/manager")
    })
})

app1.use("/hey", function(req, res) {
    res.send("New Route")
})

/* ---------------------------- manager routes end ---------------------------- */


//////////////////////////////////////////////////////////////////////////////////
/* ---------------------------- receptionist routes start ---------------------------- */
var receptionistLoginRoute = require('./routes/receptionist/login');
var receptionistHomeRoute = require('./routes/receptionist/home');
var receptionistAppointmentRoute = require('./routes/receptionist/appointments');
var receptionistApproveAppointmentRoute = require('./routes/receptionist/approveAppointments');
var receptionistNotificationsRoute = require('./routes/receptionist/notifications');
var receptionistErrorRoute = require('./routes/receptionist/error');
var receptionistCartRoute = require('./routes/receptionist/cart');

app1.use("/receptionist/", receptionistLoginRoute); //JS file not jade file
app1.use("/receptionist/login-form", receptionistLoginRoute);
app1.use("/receptionist/home", receptionistHomeRoute);
app1.use("/receptionist/appointments", receptionistAppointmentRoute);
app1.use("/receptionist/approveAppointments", receptionistApproveAppointmentRoute);
app1.use("/receptionist/notifications", receptionistNotificationsRoute);
app1.use("/receptionist/error", receptionistErrorRoute);
app1.use("/receptionist/cart", receptionistCartRoute);

app1.use("/receptionist/logout", function(req, res) {

    //removing notifications for receptionist start
    // app.conn.query("DELETE from notifications WHERE usertype = 'receptionist'", function(err, result) {
    //     if (err) {
    //         console.log(err.message)
    //     }
    // });

    //removing notifications for receptionist end

    req.session.destroy(function(err) {
        res.redirect("/receptionist")
    })
})

/* ---------------------------- receptionist routes end ---------------------------- */

// const basicRoute = "http://localhost:8080";
const basicRoute = "http://kochii.net";

module.exports.app = app1;
module.exports.conn = conn;
module.exports.basicRoute = basicRoute;
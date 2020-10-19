"use strict";var express=require("express"),app1=express(),bodyParser=require("body-parser"),session=require("express-session"),mysql=require("mysql"),cookieParser=require("cookie-parser"),flash=require("connect-flash"),cors=require("cors"),passport=require("passport");app1.use(cookieParser("secret")),app1.use(flash()),app1.use(bodyParser.json({limit:"50mb"})),app1.use(bodyParser.urlencoded({limit:"50mb",extended:!0})),app1.use(cors()),app1.use(bodyParser.json()),app1.use(express.static("assets")),app1.set("views","./views"),app1.set("view engine","jade"),app1.use(session({saveUninitialized:!1,resave:!0,secret:"ssshhhhh",cookie:{maxAge:2592e6}})),app1.use(function(e,r,t){r.locals.session=e.session,t()}),app1.use(passport.initialize()),app1.use(passport.session());var conn=mysql.createPool({host:"localhost",user:"root",password:"",database:"saloon"});conn.getConnection(function(e,r){e?console.log("DB Error!"):console.log("DB Connected!")});var clientIndexRoute=require("./routes/client/index"),clientLoginRoute=require("./routes/client/login"),clientRegisterRoute=require("./routes/client/register"),clientContactRoute=require("./routes/client/contact"),clientHomeRoute=require("./routes/client/home"),clientServicesRoute=require("./routes/client/services"),clientProductsRoute=require("./routes/client/products"),clientAddAppointmentRoute=require("./routes/client/addAppointment"),clientAppointmentsRoute=require("./routes/client/appointments");app1.use("/",clientIndexRoute),app1.use("/login-form",clientLoginRoute),app1.use("/register-form",clientRegisterRoute),app1.use("/contact",clientContactRoute),app1.use("/home",clientHomeRoute),app1.use("/services",clientServicesRoute),app1.use("/products",clientProductsRoute),app1.use("/addAppointment",clientAddAppointmentRoute),app1.use("/appointments",clientAppointmentsRoute),app1.use("/client/logout",function(e,r){e.session.destroy(function(e){r.redirect("/")})});var managerIndexRoute=require("./routes/manager/login"),managerLoginRoute=require("./routes/manager/login"),managerRegisterRoute=require("./routes/manager/register"),managerProductsRoute=require("./routes/manager/products"),managerEmployeesRoute=require("./routes/manager/employees"),managerAddProductRoute=require("./routes/manager/addProduct"),managerAddEmployeeRoute=require("./routes/manager/addEmployee"),managerHomeRoute=require("./routes/manager/home"),managerServicesRoute=require("./routes/manager/services"),managerAddServiceRoute=require("./routes/manager/addService"),managerUpdateEmployee=require("./routes/manager/updateEmployee"),managerUpdateServiceRoute=require("./routes/manager/updateService"),managerUpdateProductRoute=require("./routes/manager/updateProduct"),managerAppointmentsRoute=require("./routes/manager/appointments");app1.use("/manager/",managerIndexRoute),app1.use("/manager/login-form",managerLoginRoute),app1.use("/manager/register-form",managerRegisterRoute),app1.use("/manager/products",managerProductsRoute),app1.use("/manager/employees",managerEmployeesRoute),app1.use("/manager/addProduct",managerAddProductRoute),app1.use("/manager/addEmployee",managerAddEmployeeRoute),app1.use("/manager/home",managerHomeRoute),app1.use("/manager/services",managerServicesRoute),app1.use("/manager/addService",managerAddServiceRoute),app1.use("/manager/updateEmployee",managerUpdateEmployee),app1.use("/manager/updateService",managerUpdateServiceRoute),app1.use("/manager/updateProduct",managerUpdateProductRoute),app1.use("/manager/appointments",managerAppointmentsRoute),app1.use("/manager/logout",function(e,r){e.session.destroy(function(e){r.redirect("/manager")})});var receptionistLoginRoute=require("./routes/receptionist/login"),receptionistHomeRoute=require("./routes/receptionist/home"),receptionistAppointmentRoute=require("./routes/receptionist/appointments");app1.use("/receptionist/",receptionistLoginRoute),app1.use("/receptionist/login-form",receptionistLoginRoute),app1.use("/receptionist/home",receptionistHomeRoute),app1.use("/receptionist/appointments",receptionistAppointmentRoute),app1.use("/receptionist/logout",function(e,r){e.session.destroy(function(e){r.redirect("/receptionist")})}),module.exports.app=app1,module.exports.conn=conn;
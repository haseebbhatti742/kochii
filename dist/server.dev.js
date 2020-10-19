"use strict";

var http = require('http');

var app1 = require("./app");

var app = app1.app;
var port = process.env.PORT || 8080;
var server = http.createServer(app);
server.listen(port, function () {
  console.log("Server Running");
});
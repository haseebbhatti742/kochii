"use strict";var express=require("express"),router=express.Router(),app=require("../../app");router.get("/",function(e,r){r.render("client/contact")}),module.exports=router;
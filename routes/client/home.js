const express = require('express');
const router = express.Router();
const app = require("../../app");

router.get("/", function(req, res) {
    if(req.session.username != null && req.session.type=="client"){
        res.locals.title = "Home";
        res.render("client/home");
    }
    else if(req.session.username != null && req.session.type=="manager")
        res.redirect("/manager/home")
    else if(req.session.username != null && req.session.type=="receptionist")
        res.redirect("/receptionist/home")
    else if(req.session.username == null)
        res.redirect("/");
});

module.exports = router;
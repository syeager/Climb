var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", function(req, res) {
  res.sendFile(app.settings.views + "/user.html");
});

router.get("/listAll", function(req, res) {
  User.listAll(function(users) {
    res.send(users);
  });
});

router.post("/delete", urlencodedParser, function(req, res) {
  var userID = req.body.userID;
  User.remove(function(user) {
    res.end();
  });
});

router.post("/signUp", urlencodedParser, function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  User.create(username, email, password, function(user) {
    res.end();
  });
});

router.post("/logIn", urlencodedParser, function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("Logging in: " + JSON.stringify(req.body));

  logIn(email, password, function(username) {
    res.send(username);
  });
});

router.get("/getID", function(req, res) {
  var userEmail = req.query.userEmail;
  User.findByEmail(function(user) {
    if (!user) return console.error("No user with email '%s' found!", userEmail);
    res.send(user._id);
  });
});

module.exports = router;

function logIn(email, password, onComplete) {
  User.findByEmail(email, function(user) {
    if (user != null) {
      if (password == user.password) {
        console.log("Logged In: " + user.name);

        onComplete(user.name);
      } else {
        console.log("Passwords did not match.");
      }
    } else {
      console.log("Couldn't find user with email: " + email);
    }

    return undefined;
  });
}
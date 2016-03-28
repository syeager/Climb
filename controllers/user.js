var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var UserModel = require('../models/user');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", function(req, res) {
  res.sendFile(app.settings.views + "/user.html");
});

router.get("/listAll", function(req, res) {
  UserModel.find({}, function(error, users) {
    if (error) return console.error(error);
    res.send(users);
  });
});

router.post("/delete", urlencodedParser, function(req, res) {
  var userID = req.body.userID;
  UserModel.find({_id: userID}, function(error, user) {
    if (error) return console.error(error);
    res.end();
  }).remove().exec();
});

router.post("/signUp", urlencodedParser, function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);

  var user = new UserModel({
    name: username,
    email: email,
    password: password,
  });
  user.save(function(error, newUser) {
    if (error) console.error(error);
    console.log("New user '%s' created.", username);
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
  UserModel.findOne({ email: userEmail }, function(error, user) {
    if (error) return console.error(error);
    if (!user) return console.error("No user with email '%s' found!", userEmail);
    res.send(JSON.stringify(user._id));
  })
});

module.exports = router;

function logIn(email, password, onComplete) {
  UserModel.findOne({ email: email }, function(err, user) {
    if (err) return console.error(err);

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
var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var UserModel = require('../models/user');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/logIn", urlencodedParser, function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("Logging in: " + JSON.stringify(req.body));

  logIn(email, password, function(username) {
    res.send(username);
  });
});

module.exports = router;

function logIn(email, password, onComplete) {
  UserModel.findOne({ email: email }, function(err, user) {
    if (err) return console.error(err);

    if (user != null) {
      if (password == user.password) {
        console.log("Logged In: " + user.username);

        onComplete(user.username);
      } else {
        console.log("Passwords did not match.");
      }
    } else {
      console.log("Couldn't find user with email: " + email);
    }

    return undefined;
  });
}
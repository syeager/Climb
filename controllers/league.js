
var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var LeagueModel = require('../models/league');
var UserModel = require('../models/user');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/league.html");
});

router.post("/create", urlencodedParser, function(req, res) {
  var name = req.body.name;

  LeagueModel.findOne({ name: name }, function(err, league) {
    if (err) return console.error(err);
    if (league != null) return console.log("League '%s' already created.", name);

    var adminEmail = req.body.adminEmail;
    UserModel.findOne({ email: adminEmail }, function(err, user) {
      if (err) return console.error(err)

      if (user == null) {
        console.log("No user with email '%s' found.", adminEmail)
      } else {
        var newLeague = new League({
          name: name,
          description: req.body.description,
          admin: user._id
        })
        newLeague.save(function(err, newLeague) {
          if (err) return console.error(err)

          console.log("Created new league: %s", newLeague)
        })
      }
    })
  })

  resCleanup(res)
});

router.get("/listAll", function (req, res) {
  League.find({}, function (err, leagues) {
    if (err) return console.error(err)

    console.log("League Count: %s", leagues.length)
    console.log(leagues)
  })

  resCleanup(res)
})

module.exports = router;

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
        var newLeague = new LeagueModel({
          name: name,
          description: req.body.description,
          admin: user._id
        });

        var id = user._id;

        newLeague.save(function(err, newLeague) {
          if (err) return console.error(err);

          LeagueModel.findByIdAndUpdate(
            newLeague._id,
            { $push: { "members": id } },
            { safe: true, upsert: true, new: true },
            function(err, model) {
              if (err) return console.error(err);

              console.log("Created new league: %s", newLeague);
              res.end();
            });
        });
      }
    });
  });
});

router.get("/listAll", function(req, res) {
  LeagueModel.find({}, function(err, leagues) {
    if (err) return console.error(err);

    // console.log("League Count: %s", leagues.length);
    // console.log(leagues);
    res.send(JSON.stringify(leagues));
  });
});

router.get("/listMemberOf", function(req, res) {
  var email = req.query.email;
  console.log("Looking for email: " + email);

  UserModel.findOne({ email: email }, function(error, user) {
    if (error) return console.error(error);

    var userID = user._id;
    LeagueModel.find({ members: userID }, function(error, leagues) {
      if (error) return console.error(error);

      console.log(leagues);
      res.send(leagues);
    });
  });
});

router.post("/joinMember", urlencodedParser, function(req, res) {
  var leagueName = req.body.leagueName;
  var userEmail = req.body.userEmail;

  LeagueModel.findOne({ name: leagueName }, function(error, league) {
    if (error) return console.error(error);

    if (!league) return console.error("League '%s' not found!", leagueName);

    UserModel.findOne({ email: userEmail }, function(error, user) {
      if (error) return console.error(error);

      var id = user._id;
      LeagueModel.findByIdAndUpdate(
        league._id,
        { $push: { "members": id } },
        { safe: true, upsert: true, new: true },
        function(err, model) {
          if (err) return console.error(err);

          res.end();
        });
    });
  });
});

module.exports = router;
var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var SeasonModel = require('../models/season');
var UserModel = require('../models/user');
var GameModel = require('../models/game');
var LeagueModel = require('../models/league');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", function(req, res) {
  res.sendFile(app.settings.views + "/season.html");
});

router.get("/listAll", function(req, res) {
  SeasonModel.find({}, function(err, seasons) {
    if (err) return console.error(err);

    res.send(seasons);
  });
});

router.post("/create", urlencodedParser, function(req, res) {
  var gameName = req.body.gameName;
  var leagueName = req.body.leagueName;
  var adminEmail = req.body.adminEmail;
  var seasonName = req.body.seasonName;

  GameModel.findOne({ name: gameName }, function(error, game) {
    if (error) return console.error(error);
    if (!game) return console.error("No game '%s' found!", gameName);

    LeagueModel.findOne({ name: leagueName }, function(error, league) {
      if (error) return console.error(error);
      if (!league) return console.error("No league '%s' found!", leagueName);

      UserModel.findOne({ email: adminEmail }, function(error, admin) {
        if (error) return console.error(error);
        if (!admin) return console.error("No user with email '%s' found!", adminEmail);

        SeasonModel.find({ name: seasonName }, function(error, seasons) {
          if (error) return console.error(error);
          for (var i = 0; i < seasons.length; i++) {
            if (seasons[i].league == league._id) {
              return console.error("Season '%s' already exists in league '%s'!", seasonName, leagueName);
            }
          }

          var season = new SeasonModel({
            name: seasonName,
            league: league._id,
            game: game._id,
            admin: admin._id
          });
          season.save(function(error, season) {
            if (error) return console.error(error);

            LeagueModel.findByIdAndUpdate(
              league._id,
              { $push: { "seasons": season._id } },
              { safe: true, upsert: true, new: true },
              function(error, league) {
                if (error) return console.error(error);
                console.log("Created season '%s' in league '%s'", seasonName, leagueName);
                res.end();
              });
          });
        });
      });
    });
  });
});

router.get("/listParticipantOf", function(req, res) {
  var userID = req.query.userID;

  SeasonModel.find({participants: userID}, function(error, seasons) {
    if (error) return console.error(error);
    res.send(seasons);
  });
});

router.post("/signUp", urlencodedParser, function(req, res) {
  var userEmail = req.body.email;
  var seasonName = req.body.seasonName;
  var leagueName = req.body.leagueName;

  UserModel.findOne({ email: userEmail }, function(error, user) {
    if (error) return console.error(error);
    if (!user) return console.error("No user with email '%s' found!", userEmail);

    LeagueModel.findOne({ name: leagueName }, function(error, league) {
      if (error) return console.error(error);
      if (!league) return console.error("No league '%s' found!", leagueName);
      console.log(league.seasons.length)
      for (var i = 0; i < league.seasons.length; i++) {
        SeasonModel.findOne({ _id: league.seasons[i] }, function(error, season) {
          if (error) return console.error(error);

          if (season && season.name == seasonName) {
            var seasonID = season._id;
            SeasonModel.findByIdAndUpdate(
              seasonID,
              { $push: { "participants": user._id } },
              { safe: true, upsert: true, new: true },
              function(error, season) {
                if (error) return console.error(error);
                console.log("User '%s' added to season '%s' in league '%s'.", user.name, seasonName, leagueName);
                res.end();
              });
          }
        });
      }
    });
  });
});

module.exports = router;
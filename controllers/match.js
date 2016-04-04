var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var LeagueModel = require('../models/league');
var GameModel = require('../models/game');
var SeasonModel = require('../models/season');
var MatchModel = require('../models/match');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/match.html");
});

router.post("/create", urlencodedParser, function(req, res) {
  var season = req.body.season;
  var player1 = req.body.player1;
  var player1Score = req.body.player1Score;
  var player2 = req.body.player2;
  var player2Score = req.body.player2Score;

  var match = new MatchModel({
      season: season,
      player1: player1,
      player1Score: player1Score,
      player2: player2,
      player2Score: player2Score
    });
    match.save(function(error, newMatch) {
      if (error) return console.error(error);
      console.log("Match created: " + newMatch);

      SeasonModel.findByIdAndUpdate(
        season,
        { $push: {"matches": newMatch._id}},
        { safe: true, upsert: true, new: true},
        function(error) {
          if (error) return console.error(error);
          res.end();
        }
      );
    });
});

module.exports = router;
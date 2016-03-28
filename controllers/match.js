var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var LeagueModel = require('../models/league');
var GameModel = require('../models/game');
var MatchModel = require('../models/match');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/match.html");
});

router.post("/create", urlencodedParser, function(req, res) {
  var leagueName = req.body.leagueName;
  var seasonName = req.body.seasonName;
  var player1Name = req.body.player1Name;
  var player1Score = req.body.player1Score;
  var player2Name = req.body.player2Name;
  var player2Score = req.body.player2Score;

  LeagueModel.findOne({name: leagueName}, function(error, league) {
    if (error) return console.error(error);
    if (!league) return console.error("No league '%s' found!", leagueName);

  });
});

module.exports = router;
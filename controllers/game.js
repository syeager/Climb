var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var LeagueModel = require('../models/league');
var Game = require('../models/game');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/game.html");
});

router.get("/listAll", function(req, res) {
  Game.listAll(function(games) {
    res.send(games);
  });
});

router.post("/delete", urlencodedParser, function(req, res) {
  var gameID = req.body.gameID;

  Game.deleteGame(gameID, function() {
    res.end();
  });
});

router.post("/create", urlencodedParser, function(req, res) {
  var name = req.body.name;

  Game.createGame(name, function(newGame) {
    res.end();
  });
});

module.exports = router;
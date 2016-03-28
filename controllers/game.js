var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var LeagueModel = require('../models/league');
var GameModel = require('../models/game');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/game.html");
});

router.get("/listAll", function(req, res) {
  GameModel.find({}, function(err, games) {
    if (err) return console.error(err);

    res.send(games);
  });
});

router.post("/create", urlencodedParser, function(req, res) {
  var name = req.body.name;

  GameModel.findOne({name: name}, function(error, game) {
    if (error) return console.error(error);
    if (game) return console.error("Game '&s' already created!", name);

    var newGame = new GameModel({
      name: name
    });
    newGame.save(function(error, newGame) {
      if (error) return console.error(error);
      console.log("Game '%s' created!", name);
      res.end();
    });
  });
});

module.exports = router;
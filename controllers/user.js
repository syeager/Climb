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







// function User(email, password) {
//   this.email = email;
//   this.password = password;
//   this.leagues = new Array();
//   leagues.add({
//     league: "PopCap",
//     username: "boyBlue_"
//   })
// }

// function Team(name) {
//   this.id = 0;
//   this.name = name;
//   this.members = new Array();

//   this.addMember = function(userID) {
//     if (!members.contains(userID)) {
//       members.add(userID);
//     }
//   }
// }

// function Game(model) {
//   this.id = model.id;
//   this.name = model.name;
//   // characters
// }

// function GameInstance(model) {
//   this.id = model.id;
//   this.parentID = model.gameID;
//   this.participants = new Array();
//   this.matches = new Array();
//   this.teamSize = 1;
// }

// function League(model) {
//   this.id = model.id;
//   this.name = model.name;
//   this.description = "";
//   this.games = new Array();
//   this.members = new Array();

//   this.addGame = function(gameID) {
//     games.add(gameID);
//   }

//   this.addMemberToGame = function(userID, gameID) {
//     for (var game in games) {
//       if (game.parentID === gameID) {
//         game.add(userID);
//       }
//     }
//   }
// }

// function Season(startDate, endDate, matchCount) {

// }

// function Match(team1, score1, team2, score2) {
//   this.team1 = team1;
//   this.score1 = score1;
//   this.team2 = team2;
//   this.score2 = score2;
// }

// function RankEvent(team, oldRank, newRank, match) {
//   this.team = team;
//   this.oldRank = oldRank;
//   this.newRank = newRank;
//   this.match = match;
// }
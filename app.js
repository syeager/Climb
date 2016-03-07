var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Climb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("CONNECTED to Mongo!");
})

//app.use(express.bodyParser());
//app.use(express.cookieParser('climbsecret'));
//app.use(express.session());
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

fs.readdirSync('./controllers').forEach(function (file) {
  if (file.substr(-3) == '.js') {
    file = file.substr(0, file.length - 3);
    require('./controllers/' + file).controller(router);
    app.use('/' + file, router);
  }
});

app.get("/", function (req, res) {
  res.sendFile(app.settings.views + "index.html");
});

app.get("/test", function (req, res) {
  res.sendFile(app.settings.views + "test.html");
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s%s", host, port);
});





// // create db schemas
// var gameSchema = mongoose.Schema({
//   name: String,
//   type: String,
// })
// var Game = mongoose.model("Game", gameSchema)
//
// var matchSchema = mongoose.Schema({
//   player1: String,
//   player1Score: Number,
//   player2: String,
//   player2Score: Number
// })
//
// var leagueSchema = mongoose.Schema({
//   name: String,
//   description: String,
//   admin: String
// })
// var League = mongoose.model("League", leagueSchema)
//
// // USERS
// // var userSchema = mongoose.Schema({
// //   email: String,
// //   name: String,
// //   username: String,
// //   password: String,
// // })
// // var User = mongoose.model("User", userSchema)
//
//
//
// app.get("/user/listAll", function (req, res) {
//   console.log("User.ListAll")
//   User.find(function (err, users) {
//     if (err) return console.error(err)
//
//     res.send(users);
//     console.log("User Count: %s", users.length)
//     console.log(users)
//   })
// })
//
// app.post("/userDeleteAll", function (req, res) {
//   User.remove({}, function (err) {
//     if (err) return console.error(err)
//
//     console.log("All users deleted!")
//   })
//
//   resCleanup(res)
// })
//
// app.post("/user/userLogIn", urlencodedParser, function (req, res) {
//   var email = req.body.email
//   console.log("Logging in: " + JSON.stringify(req.body));
//
//   User.findOne({ email: email }, function (err, user) {
//     if (err) return console.error(err)
//
//     if (user != null) {
//       if (req.body.password == user.password) {
//         console.log("Logged In: " + user.username)
//         res.send(user.username)
//       } else {
//         console.log("Passwords did not match.")
//       }
//     } else {
//       console.log("Couldn't find user with email: " + email)
//     }
//   })
// })
//
// // TODO: Password validation.
// // TODO: Lowercase usernames for searches.
// // TODO: Validate usernames.
// app.post("/userSignUp", urlencodedParser, function (req, res) {
//   var email = req.body.email
//   var username = req.body.username
//
//   User.findOne({ email: email, username: username }, function (err, user) {
//     if (err) return console.error(err)
//
//     if (user != null) {
//       if (user.email == email) {
//         console.log("Email '%s' already taken.", email)
//       } else {
//         console.log("Username '%s' already taken.")
//       }
//     } else {
//       var newUser = new User({
//         email: email,
//         username: username,
//         password: req.body.password
//       })
//       newUser.save(function (err, newUser) {
//         if (err) return console.error(err)
//
//         console.log("Saved: " + newUser)
//       })
//     }
//   })
//
//   resCleanup(res)
// })
//
// // PAGES
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/views/test.html")
// })
//
// // LEAGUES
// app.post("/leagueCreate", urlencodedParser, function (req, res) {
//   var name = req.body.name
//
//   League.findOne({ name: name }, function (err, league) {
//     if (err) return console.error(err)
//     if (league != null) return console.log("League '%s' already created.", name)
//
//     var adminEmail = req.body.adminEmail
//     User.findOne({ email: adminEmail }, function (err, user) {
//       if (err) return console.error(err)
//
//       if (user == null) {
//         console.log("No user with email '%s' found.", adminEmail)
//       } else {
//         var newLeague = new League({
//           name: name,
//           description: req.body.description,
//           admin: user._id
//         })
//         newLeague.save(function (err, newLeague) {
//           if (err) return console.error(err)
//
//           console.log("Created new league: %s", newLeague)
//         })
//       }
//     })
//   })
//
//   resCleanup(res)
// })
//
// app.get("/leagueListAll", function (req, res) {
//   League.find({}, function (err, leagues) {
//     if (err) return console.error(err)
//
//     console.log("League Count: %s", leagues.length)
//     console.log(leagues)
//   })
//
//   resCleanup(res)
// })
//
// // GAMES
// app.post("/gameCreate", urlencodedParser, function (req, res) {
//   var name = req.body.name
//
//   Game.findOne({ name: name }, function (err, game) {
//     if (err) return console.error(err)
//     if (game != null) return console.log("Game '%s' already created.", name)
//
//     var newGame = new Game({
//       name: name,
//       type: req.body.type
//     })
//     newGame.save(function (err, newGame) {
//       if (err) return console.error(err)
//       console.log("Game created: %s", newGame)
//     })
//   })
//
//   resCleanup(res)
// })
//
// app.get("/gameListAll", function (req, res) {
//   Game.find({}, function (err, games) {
//     if (err) return console.error(err)
//
//     console.log("Game Count: %s", games.length)
//     console.log(games)
//   })
//
//   resCleanup(res)
// })
//
// // MATCHES
// app.post("/matchCreate", urlencodedParser, function (req, res) {
//   // TODO: Get player IDs!
//   var player1 = req.body.player1
//   var player1Score = req.body.player1Score
//   var player2 = req.body.player2
//   var player2Score = req.body.player2Score
//   var league = req.body.league
//   var game = req.body.game
//
//   var modelName = getMatches(league, game)
//   var Match = mongoose.model(modelName, matchSchema)
//   var match = new Match({
//     player1: player1,
//     player1Score: player1Score,
//     player2: player2,
//     player2Score: player2Score
//   })
//   match.save(function (err, match) {
//     if (err) return console.error(err)
//     console.log("Match saved: %s", match)
//   })
//
//   calculateRanks(league, game, true)
//
//   resCleanup(res)
// })
//
// app.post("/matchListAll", urlencodedParser, function (req, res) {
//   var league = req.body.league
//   var game = req.body.game
//   var modelName = getMatches(league, game)
//   var Match = mongoose.model(modelName, matchSchema)
//
//   Match.find({}, function (err, matches) {
//     if (err) return console.error(err)
//
//     console.log("%s Count: %s", modelName, matches.length)
//     console.log(matches)
//   })
//
//   calculateRanks(league, game)
//
//   resCleanup(res)
// })
//
// var getMatches = function (league, game) {
//   return league + "." + game + " Matches";
// }
//
// // GENERAL
// var resCleanup = function (res) {
//   //res.redirect("/")
//   res.end()
// }
//
// var calculateRanks = function (league, game, notify) {
//   console.log("Calculating ranks.")
//   // TODO: Calculate rank.
//   var modelName = getMatches(league, game)
//   var Match = mongoose.model(modelName, matchSchema)
//   Match.find({}, function (err, matches) {
//     if (err) return console.error(err)
//
//     var playerScores = new Object()
//
//     for (var i = 0; i < matches.length; i++) {
//       var match = matches[i];
//       if (!playerScores.hasOwnProperty(match.player1)) {
//         playerScores[match.player1] = 0
//       }
//       playerScores[match.player1] += match.player2Score - match.player1Score
//       if (!playerScores.hasOwnProperty(match.player2)) {
//         playerScores[match.player2] = 0
//       }
//       playerScores[match.player2] += match.player1Score - match.player2Score
//     }
//
//     var sortedPlayers = Object.keys(playerScores).sort(function (a, b) { return playerScores[b] - playerScores[a] })
//     for (var i = 0; i < sortedPlayers.length; i++) {
//       console.log("#%s %s (%s)", (i + 1), sortedPlayers[i], playerScores[sortedPlayers[i]])
//     }
//   })
//
//   // TODO: Send rank events.
// }
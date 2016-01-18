// Users
//   Join League
//   Join Game
//   Submit Match
// Leagues
//   Add Game
// Games
// General
//   Calculate ranks.
//   Save rank events.
//   Unit testing.
//   Break files up.

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongo = require("mongodb")
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Climb')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log("CONNECTED to Mongo!")
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname + "/public"))

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s%s", host, port)
})

// create db schemas
var userSchema = mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
})
var User = mongoose.model("User", userSchema)

var gameSchema = mongoose.Schema({
  name: String,
  type: String,
})
var Game = mongoose.model("Game", gameSchema)

var matchScema = mongoose.Schema({
  player1: String,
  player1Score: Number,
  player2: String,
  player2Score: Number
})
var Match = mongoose.model("Match", matchScema)

var leagueSchema = mongoose.Schema({
  name: String,
  description: String,
  admin: String
})
var League = mongoose.model("League", leagueSchema)

// PAGES
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/test.htm")
})

// USERS
app.get("/userListAll", function (req, res) {
  User.find(function (err, users) {
    if (err) return console.error(err)

    console.log("User Count: %s", users.length)
    console.log(users)
  })

  res.redirect("/")
  res.end()
})

app.post("/userDeleteAll", function (req, res) {
  User.remove({}, function (err) {
    if (err) return console.error(err)

    console.log("All users deleted!")
  })

  res.redirect("/")
  res.end()
})

app.post("/userLogIn", urlencodedParser, function (req, res) {
  var email = req.body.email

  User.findOne({ email: email }, function (err, user) {
    if (err) return console.error(err)

    if (user != null) {
      if (req.body.password == user.password) {
        console.log("Logged In: " + user.username)
      } else {
        console.log("Passwords did not match.")
      }
    } else {
      console.log("Couldn't find user with email: " + email)
    }
  })

  res.redirect("/")
  res.end()
})

// TODO: Password validation.
// TODO: Lowercase usernames for searches.
// TODO: Validate usernames.
app.post("/userSignUp", urlencodedParser, function (req, res) {
  var email = req.body.email
  var username = req.body.username

  User.findOne({ email: email, username: username }, function (err, user) {
    if (err) return console.error(err)

    if (user != null) {
      if (user.email == email) {
        console.log("Email '%s' already taken.", email)
      } else {
        console.log("Username '%s' already taken.")
      }
    } else {
      var newUser = new User({
        email: email,
        username: username,
        password: req.body.password
      })
      newUser.save(function (err, newUser) {
        if (err) return console.error(err)

        console.log("Saved: " + newUser)
      })
    }
  })

  res.redirect("/")
  res.end()
})

// LEAGUES
app.post("/leagueCreate", urlencodedParser, function (req, res) {
  var name = req.body.name

  League.findOne({ name: name }, function (err, league) {
    if (err) return console.error(err)
    if (league != null) return console.log("League '%s' already created.", name)

    var adminEmail = req.body.adminEmail
    User.findOne({ email: adminEmail }, function (err, user) {
      if (err) return console.error(err)

      if (user == null) {
        console.log("No user with email '%s' found.", adminEmail)
      } else {
        var newLeague = new League({
          name: name,
          description: req.body.description,
          admin: user._id
        })
        newLeague.save(function (err, newLeague) {
          if (err) return console.error(err)

          console.log("Created new league: %s", newLeague)
        })
      }
    })
  })

  res.redirect("/")
  res.end()
})

app.get("/leagueListAll", function (req, res) {
  League.find({}, function (err, leagues) {
    if (err) return console.error(err)

    console.log("League Count: %s", leagues.length)
    console.log(leagues)
  })

  res.redirect("/")
  res.end()
})

// GAMES
app.post("/gameCreate", urlencodedParser, function (req, res) {
  var name = req.body.name

  Game.findOne({ name: name }, function (err, game) {
    if (err) return console.error(err)
    if (game != null) return console.log("Game '%s' already created.", name)

    var newGame = new Game({
      name: name,
      type: req.body.type
    })
    newGame.save(function (err, newGame) {
      if (err) return console.error(err)

      console.log("Game created: %s", newGame)
    })
  })

  res.redirect("/")
  res.end()
})

app.get("/gameListAll", function (req, res) {
  Game.find({}, function (err, games) {
    if (err) return console.error(err)

    console.log("Game Count: %s", games.length)
    console.log(games)
  })

  res.redirect("/")
  res.end()
})
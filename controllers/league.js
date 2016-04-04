var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var League = require('../models/league');
var UserModel = require('../models/user');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/league.html");
});

router.post("/create", urlencodedParser, function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var adminID = req.body.adminID;

  League.create(name, description, adminID, function(league) {
    res.end();
  });

  // LeagueModel.findOne({ name: name }, function(err, league) {
  //   if (err) return console.error(err);
  //   if (league != null) return console.log("League '%s' already created.", name);

  //   var adminEmail = req.body.adminEmail;
  //   UserModel.findOne({ email: adminEmail }, function(err, user) {
  //     if (err) return console.error(err)

  //     if (user == null) {
  //       console.log("No user with email '%s' found.", adminEmail)
  //     } else {
  //       var newLeague = new LeagueModel({
  //         name: name,
  //         description: req.body.description,
  //         admin: user._id
  //       });

  //       var id = user._id;

  //       newLeague.save(function(err, newLeague) {
  //         if (err) return console.error(err);

  //         LeagueModel.findByIdAndUpdate(
  //           newLeague._id,
  //           { $push: { "members": id } },
  //           { safe: true, upsert: true, new: true },
  //           function(err, model) {
  //             if (err) return console.error(err);

  //             console.log("Created new league: %s", newLeague);
  //             res.end();
  //           });
  //       });
  //     }
  //   });
  // });
});

router.get("/listAll", function(req, res) {
  League.listAll(function(leagues) {
    res.send(JSON.stringify(leagues));
  });
});

router.post("/delete", urlencodedParser, function(req, res) {
  var leagueID = req.body.leagueID;
  League.model.find({ _id: leagueID }, function(error, league) {
    if (error) return console.error(error);
    res.end();
  }).remove().exec();
});

router.get("/listMemberOf", function(req, res) {
  var email = req.query.email;
  console.log("Looking for email: " + email);

  UserModel.findOne({ email: email }, function(error, user) {
    if (error) return console.error(error);
    if (!user) return console.error("No user with email '" + email + "' found!");
    var userID = user._id;
    League.model.find({ members: userID }, function(error, leagues) {
      if (error) return console.error(error);

      console.log(leagues);
      res.send(leagues);
    });
  });
});

router.post("/joinMember", urlencodedParser, function(req, res) {
  var leagueName = req.body.leagueName;
  var userEmail = req.body.userEmail;

  League.model.findOne({ name: leagueName }, function(error, league) {
    if (error) return console.error(error);

    if (!league) return console.error("League '%s' not found!", leagueName);

    UserModel.findOne({ email: userEmail }, function(error, user) {
      if (error) return console.error(error);

      var id = user._id;
      League.model.findByIdAndUpdate(
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

router.get("/membersLeague", function(req, res) {
  var userID = req.query.userID;
  League.model.find({members: userID}, function(error, leagues) {
    if (error) return console.error(error);
    res.send(leagues);
  });
});

module.exports = router;
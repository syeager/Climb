var express = require("express");
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var SeasonModel = require('../models/season');
var UserModel = require('../models/user');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlencodedParser, function(req, res) {
  res.sendFile(app.settings.views + "/season.html");
});

module.exports = router;
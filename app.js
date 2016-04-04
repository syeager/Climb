var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Climb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("CONNECTED to Mongo!");
})

app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

fs.readdirSync('./controllers').forEach(function(file) {
  if (file.substr(-3) == '.js') {
    file = file.substr(0, file.length - 3);
    var controller = require('./controllers/' + file);
    app.use('/' + file, controller);
  }
});

app.get("/", function(req, res) {
  res.sendFile(app.settings.views + "index.html");
});

app.get("/test", function(req, res) {
  res.sendFile(app.settings.views + "test.html");
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s%s", host, port);
});


//require('./models/season').remove({}, function() {});
// require('./models/league').remove({}, function() {});
// require('./models/game').remove({}, function() {});
// require('./models/match').remove({}, function() {});
// require('./models/user').remove({}, function() {});
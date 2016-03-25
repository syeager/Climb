var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
  league: Number,
  season: Number,
  player1: Number,
  player1Score: Number,
  player2: Number,
  player2Score: Number
});
var Match = mongoose.model("Match", matchSchema);

module.exports = Match;
var mongoose = require('mongoose');

var matchSchema = mongoose.Schema({
  season: String,
  player1: String,
  player1Score: Number,
  player2: String,
  player2Score: Number
});
var Match = mongoose.model("Match", matchSchema);

module.exports = Match;
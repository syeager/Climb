var mongoose = require('mongoose');

var rankEventSchema = mongoose.Schema({
  player: Number,
  league: Number,
  season: Number,
  match: Number,
  previousRank: Number,
  currentRank: Number
});
var RankEvent = mongoose.model("RankEvent", rankEventSchema);

module.exports = RankEvent;
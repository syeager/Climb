var mongoose = require('mongoose');

var seasonSchema = mongoose.Schema({
  league: Number,
  admin: Number,
  game: Number,
  participants: [Number],
  matches: [Number],
  finalRankings: [Number],
  rankEvents: [Number],
  startDate: String,
  endDate: String
});
var Season = mongoose.model("Season", seasonSchema);

module.exports = Season;
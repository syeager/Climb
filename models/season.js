var mongoose = require('mongoose');

var seasonSchema = mongoose.Schema({
  name: String,
  league: String,
  game: String,
  admin: String,
  participants: [String],
  matches: [String],
  finalRankings: [String],
  rankEvents: [String],
  startDate: String,
  endDate: String
});
var Season = mongoose.model("Season", seasonSchema);

module.exports = Season;
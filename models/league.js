var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({
  name: String,
  description: String,
  admin: String,
  seasons: [String],
  members: [String],
})
var League = mongoose.model("League", leagueSchema);

module.exports = League;
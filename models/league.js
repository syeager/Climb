var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({
  name: String,
  description: String,
  admin: String,
  seasons: [Number],
  members: [Number],
})
var League = mongoose.model("League", leagueSchema);

module.exports = League;

var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name: String,
})
var Game = mongoose.model("Game", gameSchema)

module.exports = Game;
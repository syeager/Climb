
var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name: String,
})
var Model = mongoose.model("Game", gameSchema)

var listAll = function(onComplete) {
  Model.find({}, function(error, games) {
    if (error) return console.error(error);
    onComplete(games);
  });
}

var findByID = function(id, onComplete) {
  Model.findOne({ _id: id }, function(error, game) {
    if (error) return console.error(error);
    onComplete(game);
  });
}

var findByName = function(name, onComplete) {
  Model.findOne({ name: name }, function(error, game) {
    if (error) return console.error(error);
    onComplete(game);
  });
}

var deleteGame = function(id, onComplete) {
  findByID(id, function(game) {
    game.remove().exec();
    onComplete();
  });
}

var createGame = function(name, onComplete) {
  findByName(name, function(game) {
    if (game) return console.error("Game '&s' already created!", name);

    var newGame = new Model({
      name: name
    });
    newGame.save(function(error, newGame) {
      if (error) return console.error(error);
      console.log("Game '%s' created!", name);
      onComplete(newGame);
    });
  });
}

module.exports = {
  model: Model,
  listAll: listAll,
  findByID: findByID,
  findByName: findByName,
  deleteGame: deleteGame,
  createGame: createGame,
};
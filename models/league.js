var mongoose = require('mongoose');
var User = require('../models/user');

var leagueSchema = mongoose.Schema({
  name: String,
  description: String,
  admin: String,
  seasons: [String],
  members: [String],
})
var Model = mongoose.model("League", leagueSchema);

var listAll = function(onComplete) {
  Model.find({}, function(error, leagues) {
    if (error) return console.error(error);

    onComplete(leagues);
  });
}

var findByID = function(id, onComplete) {
  Model.findOne({ _id: id }, function(error, league) {
    if (error) return console.error(error);
    onComplete(league);
  });
}

var findByName = function(name, onComplete) {
  Model.findOne({ name: name }, function(error, league) {
    if (error) return console.error(error);
    onComplete(league);
  });
}

var create = function(name, description, adminID, onComplete) {
  findByName(name, function(league) {
    if (league != null) return console.log("League '%s' already created.", name);

    User.findByID(adminID, function(admin) {
      if (!admin) return console.error("No admin user found!");

      var newLeague = new Model({
        name: name,
        description: description,
        admin: adminID
      });

      newLeague.save(function(error, savedLeague) {
        if (error) return console.error(error);

        Model.findByIdAndUpdate(
          savedLeague._id,
          { $push: { "members": adminID } },
          { safe: true, upsert: true, new: true },
          function(error, createdLeague) {
            if (error) return console.error(error);

            console.log("Created new league: %s", createdLeague);
            onComplete(createdLeague);
          });
      });
    });
  });
}

module.exports = {
  model: Model,
  listAll: listAll,
  findByID: findByID,
  findByName: findByName,
};
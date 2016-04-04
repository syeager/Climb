var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
  rankEvents: [String],
});
var Model = mongoose.model("User", userSchema);

var listAll = function(onComplete) {
  Model.find({}, function(error, users) {
    if (error) return console.error(error);
    onComplete(users);
  });
}

var findByID = function(id, onComplete) {
  Model.findOne({ _id: id }, function(error, user) {
    if (error) return console.error(error);
    onComplete(user);
  });
}

var findByEmail = function(email, onComplete) {
  Model.findOne({ email: email }, function(error, user) {
    if (error) return console.error(error);
    onComplete(user);
  });
}

var remove = function(id, onComplete) {
  findByID(id, function(remove) {
    remove.remove().exec();
    onComplete();
  });
}

var create = function(username, email, password, onComplete) {
  var user = new Model({
    name: username,
    email: email,
    password: password,
  });
  user.save(function(error, newUser) {
    if (error) console.error(error);
    onComplete(newUser);
  });
}

module.exports = {
  model: Model,
  listAll: listAll,
  findByID: findByID,
  findByEmail: findByEmail,
  remove: remove,
  create: create,
};
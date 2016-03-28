var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
  rankEvents: [String],
});
var User = mongoose.model("User", userSchema);

module.exports = User;
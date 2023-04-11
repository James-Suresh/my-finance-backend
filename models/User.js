const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  money: Number
});

module.exports = mongoose.model('User', userSchema);
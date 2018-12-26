const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  chatId: {
    type: Number,
    unique: true,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('users', userSchema);

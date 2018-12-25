const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chatId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model('users', userSchema);

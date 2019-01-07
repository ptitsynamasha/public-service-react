const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const waterServiceSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
  },
  hotKittenValue: {
    type: String,
  },
  coldKittenValue: {
    type: String,
  },
  hotBathroomValue: {
    type: String,
  },
  coldBathroomValue: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('waterServices', waterServiceSchema);

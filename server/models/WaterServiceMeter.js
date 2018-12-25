const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const waterServiceMeterSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
  },
  coldWaterKitchen: {
    type: String,
  },
  coldWaterBathroom: {
    type: String,
  },
  hotWaterKitchen: {
    type: String,
  },
  hotWaterBathroom: {
    type: String,
  },
});

module.exports = mongoose.model('waterServiceMeters', waterServiceMeterSchema);

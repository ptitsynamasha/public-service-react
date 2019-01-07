
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const priceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  chatId: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('prices', priceSchema);

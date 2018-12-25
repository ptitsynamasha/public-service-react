const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const WaterServiceMeter = require('../models/WaterServiceMeter');
const keys = require('../config/keys');

module.exports.get = (req, res) => {
  if (!req.body.chatId) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }
  const chatId = req.body.chatId;
  WaterServiceMeter.findOne({ chatId }, (err, meter) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!meter) {
      return res.status(400).json({ message: 'Meter not found' });
    }
    return res.status(200).json(meter);
  });
};

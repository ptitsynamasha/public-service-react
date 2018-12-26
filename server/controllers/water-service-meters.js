const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const WaterServiceMeter = require('../models/WaterServiceMeter');
const keys = require('../config/keys');

module.exports.get = (req, res) => {
  const chatId = req.body.chatId;

  if (!chatId) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }
  WaterServiceMeter.findOne({ chatId }, (err, meter) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!meter) {
      return res.status(400).json({ message: 'Meter not found' });
    }
    return res.status(200).json(meter);
  });
};

module.exports.put = (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }

  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    WaterServiceMeter.findOne({ chatId: user.chatId }, (err, meter) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (!meter) return res.status(400).json({ message: 'Meter not found' });

      meter[key] = value;
      meter.save(err => {
        if (err) return res.status(500).json({ message: 'Server error' });

        res.status(200).json({
          coldWaterKitchen: meter.coldWaterKitchen,
          coldWaterBathroom: meter.coldWaterBathroom,
          hotWaterKitchen: meter.hotWaterKitchen,
          hotWaterBathroom: meter.hotWaterBathroom,
        });
      });
    });
  });
};

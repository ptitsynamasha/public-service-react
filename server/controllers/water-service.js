const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const WaterService = require('../models/WaterService');
const keys = require('../config/keys');
const moment = require('moment');

module.exports.post = (req, res) => {

  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    WaterService.find({ chatId: user.chatId })
      .limit(20)
      .select('hotKittenValue coldKittenValue hotBathroomValue coldBathroomValue date')
      .exec((err, services) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!services) return res.status(200).json({ message: 'Water Service not found' });
        return res.status(200).json(services);
      });
  });
};

module.exports.put = (req, res) => {
  const { indication } = req.body;

  if (!indication) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }

  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const newIndication = new WaterService({
      ...indication,
      chatId: user.chatId,
    });

    newIndication.save(err => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.status(200).json({
        hotKittenValue: indication.hotKittenValue,
        coldKittenValue: indication.coldKittenValue,
        hotBathroomValue: indication.hotBathroomValue,
        coldBathroomValue: indication.coldBathroomValue,
        date: indication.date,
      });
    });
  });
};

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

    const monthStart = new Date(moment().startOf('month').toDate());
    const monthEnd = new Date(moment().endOf('month').toDate());

    WaterService.findOne({
      chatId: user.chatId, date: {
        $gt: monthStart,
        $lt: monthEnd,
      },
    }, (err, service) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (!service) return res.status(200).json({ message: 'Water Service not found' });
      const { hotKittenValue, coldKittenValue, hotBathroomValue, coldBathroomValue, date } = service;
      return res.status(200).json({ hotKittenValue, coldKittenValue, hotBathroomValue, coldBathroomValue, date });
    });
  });
};

module.exports.put = (req, res) => {
  const { key, value } = req.body;

  // if (!key || !value) {
  //   return res.status(404).json({
  //     message: 'empty body request',
  //   });
  // }
  //
  // User.findOne({ _id: req.user.id }, (err, user) => {
  //   if (err) return res.status(500).json({ message: 'Server error' });
  //   if (!user) return res.status(400).json({ message: 'User not found' });
  //
  //   WaterServiceMeter.findOne({ chatId: user.chatId }, (err, meter) => {
  //     if (err) return res.status(500).json({ message: 'Server error' });
  //     if (!meter) return res.status(400).json({ message: 'Meter not found' });
  //
  //     meter[key] = value;
  //     meter.save(err => {
  //       if (err) return res.status(500).json({ message: 'Server error' });
  //
  //       res.status(200).json({
  //         coldWaterKitchen: meter.coldWaterKitchen,
  //         coldWaterBathroom: meter.coldWaterBathroom,
  //         hotWaterKitchen: meter.hotWaterKitchen,
  //         hotWaterBathroom: meter.hotWaterBathroom,
  //       });
  //     });
  //   });
  // });
};

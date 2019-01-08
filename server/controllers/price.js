const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Price = require('../models/Price');
const keys = require('../config/keys');

module.exports.post = (req, res) => {
  const { serviceName } = req.body;

  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    Price.findOne({ chatId: user.chatId, serviceName }, (err, price) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (!price) return res.status(400).json({ message: 'Price not found' });
      return res.status(200).json(price.data);
    });
  });
};

module.exports.put = (req, res) => {
  const { key, value, serviceName } = req.body;

  if (!key || !value || !serviceName) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }

  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    Price.findOne({ chatId: user.chatId, serviceName }, (err, price) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (!price) return res.status(400).json({ message: 'Price not found' });
      (price.data)[key] = value;
      price.save(err => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ ...price.data });
      });
    });
  });
};

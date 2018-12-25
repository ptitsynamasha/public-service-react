const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }
  return User.findOne({ email: req.body.email }, (err, candidate) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password,
      );
      if (passwordResult) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
          },
          keys.jwt,
          { expiresIn: 60 * 60 },
        );
        return res.status(200).json({
          token: `Bearer ${token}`,
        });
      }
      return res.status(401).json({
        message: 'user not found',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });
    user.save(err => {
      if (err) return res.status(500).json({ message: 'Server error' });

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 },
      );
      res.status(200).json({
        token: `Bearer ${token}`,
      });
    });
  });
};

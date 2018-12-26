const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = (req, res) => {
  const { password, username } = req.body;
  if (!password || !username) {
    return res.status(404).json({
      message: 'empty body request',
    });
  }


  return User.findOne({ username }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (!user) {
      return res.status(401).json({
        message: 'user not found',
      });
    }

    if (user && user.password) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (passwordResult) {
        const token = jwt.sign(
          {
            username: user.username,
            userId: user._id,
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


    user.password = bcrypt.hashSync(password, salt);
    user.save(err => {
      if (err) return res.status(500).json({ message: 'Server error' });

      const token = jwt.sign(
        {
          username: user.username,
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

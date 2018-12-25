const express = require('express');
const router = express.Router();
const controller = require('../controllers/water-service-meters');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}), controller.get);

module.exports = router;

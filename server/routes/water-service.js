const express = require('express');
const router = express.Router();
const controller = require('../controllers/water-service');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}), controller.post);
router.put('/', passport.authenticate('jwt', {session: false}), controller.put);

module.exports = router;

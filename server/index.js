/* eslint consistent-return:0 import/order:0 */

const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger');
const keys = require('./config/keys');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const authRoutes = require('./routes/auth');
const waterServiceMetersRoutes = require('./routes/water-service-meters');
const waterServiceRoutes = require('./routes/water-service');
const priceRoutes = require('./routes/price');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

mongoose.connect(keys.mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('mongo db connected'))
  .catch(error => console.log(error));

app.use(passport.initialize());
require('./middlewares/passport')(passport);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/water-service-meters', waterServiceMetersRoutes);
app.use('/api/water-service', waterServiceRoutes);
app.use('/api/price', priceRoutes);

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

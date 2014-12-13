var express = require('express');
var router = express.Router();

var appRoutes = require('./app');
var apiRoutes = require('./api');

//index
router.route('/')
  .get(appRoutes.index);

//login
router.route('/login')
  .get(appRoutes.login)
  .post(appRoutes.authenticate);

//logout
router.route('/logout')
  .get(appRoutes.logout);

//api
router.use('/api', apiRoutes);

module.exports = router;

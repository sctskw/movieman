var express = require('express');
var router = express.Router();

var appRoutes = require('./default');

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

module.exports = router;

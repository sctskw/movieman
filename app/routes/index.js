var express = require('express');
var router = express.Router();

var appRoutes = require('./default');


//login
router.route('/login')
  .get(appRoutes.login)
  .post(appRoutes.authenticate);

//logout
router.route('/logout')
  .get(appRoutes.logout);


//index -- default route
router.use(appRoutes.index);

module.exports = router;

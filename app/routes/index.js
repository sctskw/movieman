var express = require('express');
var router = express.Router();
var auth = require('../auth');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home'});
});

router.route('/login')
  .get(function(req, res) {
    res.render('login');
  })
  .post(auth.authenticate);

module.exports = router;

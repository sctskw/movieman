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

router.get('/logout', function(req, res) {
  delete req.user;
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;

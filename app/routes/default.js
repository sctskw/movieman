var auth = require(__basedir + 'auth');

/* GET home page. */
function index(req, res) {
  res.render('index', { title: 'Home'});
}

//GET: render login view
function login(req, res) {
  res.render('login');
}

//GET: log a user out
function logout(req, res) {
  delete req.user;
  delete req.session.user;
  res.redirect('/');
}

module.exports = {
  index: index,
  login: login,
  authenticate: auth.authenticate,
  logout: logout
};

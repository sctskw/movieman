
function authenticate(req, res, next) {
  var user = req.body.username;
  var password = req.body.password;

  req.session.user = user;
  res.redirect('/');
}

module.exports = {
  authenticate: authenticate,
  configure: function(app) {

    //middleware to redirect non-logged in users to login page
    app.use(function(req, res, next) {
      if(!req.session.user && req.path !== '/login'){
        app.locals.user = {}; //need something
        console.log('redirecting to login...');
        res.redirect('/login');
      } else {
        var user = req.session.user; //@TODO: database query
        req.user = user;
        app.locals.user = user;
        next();
      }
    });
  }
};

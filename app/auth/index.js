var _ = require('lodash');

function authenticate(req, res, next) {
  var user = req.body.username;
  var password = req.body.password;

  req.session.user = user;
  res.redirect('/');
}

module.exports = {
  authenticate: authenticate,
  configure: function(app, ignorePaths) {


    //ignore certain paths
    function isIgnored(path) {
      var ignore = false;

      //check all ignored paths against current path
      _.each(ignorePaths, function(val) {
        if(_.contains(path, val)){
          ignore = true;
          return false; //break loop
        }
      });

      return ignore;
    }

    //middleware to redirect non-logged in users to login page
    app.use(function(req, res, next) {
      var ignore = isIgnored(req.path);

      if(ignore){
        next() //path authentication ignored. continue
      } else if(!ignore && !req.session.user && req.path !== '/login'){
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

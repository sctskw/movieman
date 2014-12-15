var _ = require('lodash');

//authenticate a user
function authenticate(req, res, next) {
  var user = req.body.username;
  var password = req.body.password;

  //@TODO -- need to check credentials against user db
  //for now, just pass the user through
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
        var user = req.session.user;
        var data = {username: user}; //@TODO: database query
        req.user = data;

        //pass user data to templates
        app.locals.user = JSON.stringify(data);
        next();
      }
    });
  }
};

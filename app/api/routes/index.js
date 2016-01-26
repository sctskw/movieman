var express = require('express');
var router = express.Router();
var _ = require('lodash');
var movieRoutes = require('./movies');
var authRoutes = require('./auth');

//GET - api index
function index(req, res) {
  res.json({message: "API is ALIVE!"});
}

//declare api routes
router.get('/', index);

//movie search endpoints
router.get('/movies/search/title/:title', movieRoutes.search.byTitle);
router.get('/movies/search/id/:id', movieRoutes.search.byId);
router.get('/movies/user/:user', movieRoutes.byUser);

//movie persistence endpoints
router.route('/movies/:id')
  .get(movieRoutes.read)
  .put(movieRoutes.update)
  .delete(movieRoutes.destroy);

//POST requires a separate route, since there's no ID yet
router.post('/movies', movieRoutes.create);

//route that will authenticate users that have logged in.
router.post('/login', authRoutes.login);


// removes any sensitive information before it gets sent to the client
router.use(function(req, res, next) {
  if (_.isArray(res.body)){
    res.body = _.map(res.body, function(obj){
      return _.omit(obj, ['password']);
    });

    return next();
  }
  res.body = _.omit(res.body, ['password']);
  return next();
});

//default json response handler
router.use(function(req, res, next) {
  if(!res.body) {
    next(new Error("NOT FOUND"));
  } else {
    res.json({
      status: 200,
      message: "OK",
      data: res.body
    });
  }
});


//default error handling for API routes
router.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    "success": false,
    "message": err.message
  });
});

module.exports = router;

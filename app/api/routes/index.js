var express = require('express');
var router = express.Router();

var movieRoutes = require('./movies');

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
  res.json({
    "success": false,
    "status": err.status || 500,
    "message": err.message
  });
});

module.exports = router;

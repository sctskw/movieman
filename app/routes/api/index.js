var express = require('express');
var router = express.Router();

var movieRoutes = require('./movies');

//GET - api index
function index(req, res) {
  res.json({message: 'success', success: true});
}


//declare api routes
router.get('/', index);

//movie search endpoints
router.get('/movies/search/title/:title', movieRoutes.search.byTitle);
router.get('/movies/search/id/:id', movieRoutes.search.byId);

//movie persistence endpoints
router.route('/movies/:id')
  .get(movieRoutes.read)
  .put(movieRoutes.update)
  .delete(movieRoutes.destroy);

//POST requires a separate route, since there's no ID yet
router.post('/movies', movieRoutes.create);

module.exports = router;

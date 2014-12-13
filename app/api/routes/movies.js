var movies = require(__basedir + 'api/movies');

//@TODO: create JSON response middleware

//return a list of movie suggestions by title
function moviesByTitle(req, res, next) {
  movies.search.byTitle(req.params.title, function(err, data) {
    if(err) {
      res.json({message: err.message, status: 401, success: false});
    } else {
      res.json(data);
    }
  });
}

//return movie data by it's ID
function moviesById(req, res, next) {
  movies.search.byId(req.params.id, function(err, data) {
    if(err) {
      res.json({message: err.message, status: 401, success: false});
    } else {
      res.json(data);
    }
  });
}

/**
 * CRUD operations for persistence in some db layer
 */

//CREATE - store a new movie in DB
function createMovie(req, res) {
  res.send(movies.create(req.body));
}

//READ - retrieve an existing movie from the DB
function readMovie(req, res) {
  res.send(movies.read(req.params.id));
}

//UPDATE - modify an existing movie in the DB
function updateMovie(req, res) {
  res.send(movies.update(req.params.id, req.body))
}

//DESTROY - remove an existing movie from the DB
function deleteMovie(req, res) {
  res.send(movies.destroy(req.params.id));
}

module.exports = {

  //search movies
  search: {
    byTitle: moviesByTitle,
    byId: moviesById
  },

  //CRUD ops
  create: createMovie,
  read: readMovie,
  update: updateMovie,
  destroy: deleteMovie,
  delete: deleteMovie
};

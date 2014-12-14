var movies = require(__basedir + 'api/movies');

//return a list of movie suggestions by title
function moviesByTitle(req, res, next) {
  movies.search.byTitle(req.params.title)
    .then(function(data) {
      res.body = data;
      next();
    })
    .error(next);
}

//return movie data by it's ID
function moviesById(req, res, next) {
  movies.search.byId(req.params.id)
    .then(function(data) {
      res.body = data; //passthrough
      next();
    })
    .error(next);
}

//return list of movies by username
function moviesByUser(req, res, next) {
  movies.byUser(req.params.user)
    .then(function(data) {
      //json passthrough
      res.body = data;
      next();
    })
    .error(next);
}

/**
 * CRUD operations for persistence in some db layer
 */

//CREATE - store a new movie in DB
function createMovie(req, res, next) {
  try {
    var result = movies.create(req.body);

    if(!result) {
      throw new Error('COULD NOT ADD MOVIE');
    }

    //passthrough to json response handler
    res.body = result;
    next();

  } catch( err ) {
    next(err);
  }

}

//READ - retrieve an existing movie from the DB
function readMovie(req, res, next) {
  try {
    var result = movies.read(req.params.id);

    if(!result) {
      throw new Error("MOVIE NOT FOUND");
    }

    //passthrough to json response handler
    res.body = result;
    next();

  } catch ( err ) {
    next(err);
  }
}

//UPDATE - modify an existing movie in the DB
function updateMovie(req, res, next) {

  try {
    var result = movies.update(req.params.id, req.body);

    if(!result) {
      throw new Error("MOVIE NOT UPDATED");
    }

    //passthrough to json response handler
    res.body = result;
    next();

  } catch ( err ) {
    next(err);
  }
}

//DESTROY - remove an existing movie from the DB
function deleteMovie(req, res, next) {
  try {
    var id = req.params.id;
    var result = movies.destroy(id);

    if(!result) {
      throw new Error("MOVIE NOT DELETED");
    }

    //pass through to json response handler
    res.body = "deleted movie id " + id;
    next();

  } catch ( err ) {
    next(err);
  }
}

module.exports = {

  //search movies
  search: {
    byTitle: moviesByTitle,
    byId: moviesById
  },

  //user movies
  byUser: moviesByUser,

  //CRUD ops
  create: createMovie,
  read: readMovie,
  update: updateMovie,
  destroy: deleteMovie,
  delete: deleteMovie
};

var Promises = require('bluebird');
var rotten = require('tomatoes')('pm6h7hhqmxd4rawgbvtuyux3');
var loki = require('lokijs');
var db = new loki(__basedir + 'db.json');

//init moviedb
var moviedb;

//load db from disk
db.loadDatabase(function() {
  //retrieve the collections, if it doesn't exist, create it
  try {
      moviedb = db.getCollection('movies');
  } catch (err) {
      moviedb = db.addCollection('movies');
  }
});

//search RottenTomatoes for movie title
function searchByTitle(title) {
  return new Promises(function(resolve, reject) {
    console.log('searching for movie title ' + title);
    rotten.search(title, function(err, data) {
      return err ? reject(err) : resolve(data);
    });
  });
}

//search RottenTomatoes for movie ID
function getById(id) {
  return new Promises(function(resolve, reject) {
    console.log('searching for movie id ' + id);
    rotten.get(id, function(err, data) {
      return err ? reject(err) : resolve(data);
    });
  });
}

//search db for movies for a particular user
function getByUser(username) {
  return new Promises(function(resolve, reject) {
    try{
      return resolve(moviedb.find({user: username}));
    } catch( err ) {
      return reject(err);
    }
  });
}

function getByUserAndOriginalId(username, id) {
  return moviedb.find({ user: username, _id: id});
}

//retrieve a movie from the db
function readMovie(id) {
  console.log('retrieving movie ' + id);
  return moviedb.get(parseInt(id, 10));
}

//store a movie in the db
function createMovie(data) {
  //check if user already added it to collection
  var row = getByUserAndOriginalId(data.user, data._id);

  //make sure users can't duplicate
  if(!row) {
    moviedb.insert(data);
    db.saveToDisk();
  } else {
    console.log(data.user + ' already favorited ' + data.title);
  }

  return row;
}

//update a movie in the db
function updateMovie(id, data) {
  console.log('updating movie ' + id);
  var row = moviedb.update(data);
  db.saveToDisk();
  return row;
}

//remove a movie from the db
function deleteMovie(id) {
  console.log('deleting movie ' + id);
  moviedb.remove(readMovie(id));
  db.saveToDisk();
  return true;
}

module.exports = {
  search: {
    byTitle: searchByTitle,
    byId: getById
  },

  byUser: getByUser,

  create: createMovie,
  read: readMovie,
  update: updateMovie,
  destroy: deleteMovie,
  delete: deleteMovie
};

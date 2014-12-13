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
function searchByTitle(title, callback) {
  rotten.search(title, callback);
}

//search RottenTomatoes for movie ID
function getById(id, callback) {
  rotten.get(id, callback);
}

//store a movie in the db
function createMovie(data) {
  var row = moviedb.insert(data);
  db.saveToDisk();
  return row;
}

//retrieve a movie from the db
function readMovie(id) {
  console.log('retrieving movie ' + id);
  return moviedb.get(parseInt(id, 10));
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
  var row = moviedb.remove(id);
  db.saveToDisk();
  return row;
}

module.exports = {
  search: {
    byTitle: searchByTitle,
    byId: getById
  },

  create: createMovie,
  read: readMovie,
  update: updateMovie,
  destroy: deleteMovie,
  delete: deleteMovie
};

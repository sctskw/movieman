var rotten = require('tomatoes')('pm6h7hhqmxd4rawgbvtuyux3');
var loki = require('lokijs');
var db = new loki(__basedir + 'db.json');

var moviedb;

db.loadDatabase(function() {
  try {
      moviedb = db.getCollection('movies');
  } catch (err) {
      moviedb = db.addCollection('movies');
  }
});

function searchByTitle(title, callback) {
  rotten.search(title, callback);
}

function getById(id, callback) {
  rotten.get(id, callback);
}

function createMovie(data) {
  var row = moviedb.insert(data);
  db.saveToDisk();
  return row;
}

function readMovie(id) {
  console.log('retrieving movie ' + id);
  return moviedb.get(parseInt(id, 10));
}

function updateMovie(id, data) {
  var row = moviedb.update(data);
  db.saveToDisk();
  return row;
}

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

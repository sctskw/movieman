var rotten = require('tomatoes')('pm6h7hhqmxd4rawgbvtuyux3');

function searchByTitle(title, callback) {
  rotten.search(title, callback);
}

function getById(id, callback) {
  rotten.get(id, callback);
}

module.exports = {
  search: {
    byTitle: searchByTitle,
    byId: getById
  }
};

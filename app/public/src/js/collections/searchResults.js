var BaseCollection = require('./base');
var searchResult = require('../models/searchResult');

//Class SearchResultsCollection
module.exports = BaseCollection.extend({

  model: searchResult,

  initialize: function(cfg) {
    this.searchTerm = cfg.searchTerm;
  },

  url: function() {
    return '/api/movies/search/title/' + this.searchTerm;
  }

});

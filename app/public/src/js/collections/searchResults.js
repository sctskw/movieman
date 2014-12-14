var BaseCollection = require('./base');
var searchResult = require('../models/searchResult');

module.exports = BaseCollection.extend({

  model: searchResult,

  initialize: function(cfg) {
    this.searchTerm = cfg.searchTerm;
  },

  url: function() {
    return '/api/movies/search/title/' + this.searchTerm;
  }

});

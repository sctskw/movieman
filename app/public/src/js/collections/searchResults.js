var Backbone = require('backbone');
var searchResult = require('../models/searchResult');

module.exports = Backbone.Collection.extend({

  model: searchResult,

  initialize: function(cfg) {
    this.searchTerm = cfg.searchTerm;
  },

  url: function() {
    return '/api/movies/search/title/' + this.searchTerm;
  },

  parse: function(resp, opts) {
    return resp.data;
  }
});

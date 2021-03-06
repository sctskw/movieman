var BaseCollection = require('./base');
var Movie = require('../models/movie');

//Class UserMovieCollection
module.exports = BaseCollection.extend({

  initialize: function(cfg) {
    this.user = cfg.user;
  },

  model: Movie,

  url: function() {
    return '/api/movies/user/' + this.user;
  }

});

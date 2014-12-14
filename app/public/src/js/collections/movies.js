var BaseCollection = require('./base');
var Movie = require('../models/movie');

module.exports = BaseCollection.extend({

  model: Movie,

  url: '/api/movies/'

});

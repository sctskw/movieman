var BaseCollection = require('./base');
var Movie = require('../models/movie');

//Class MovieCollection
module.exports = BaseCollection.extend({

  model: Movie,

  url: '/api/movies/'

});

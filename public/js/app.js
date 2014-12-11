var _ = require('underscore');
var Backbone = require('backbone');
var Router = require('./router');

var App = {};

App.start = function(config) {
  var opts = _.extend({}, config);
  var router = new Router();
  Backbone.history.start({pushState: true});

  console.log('application bootstrapped...');
};

module.exports = App;




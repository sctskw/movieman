var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

//store jquery dependency
Backbone.$ = $;

//import routing
var Router = require('./router');

//create app namespace
var App = {};
global.App = App;

//function to bootstrap application
App.start = function(config) {
  console.log('starting application...');
  var opts = _.extend({}, config || {});

  this.routes = new Router(opts);
  Backbone.history.start({pushState: true});

  return this;
};

module.exports = App;




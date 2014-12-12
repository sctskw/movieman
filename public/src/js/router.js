var Backbone = require('backbone');
var _ = require('underscore');

//import views
var indexView = require('./views/index');
var loginView = require('./views/login');

var Router = Backbone.Router.extend({

  _defaults: {
    viewEl: 'body' //graceful fail
  },

  initialize: function(cfg) {
    console.log('initializing routing');
    this.configs = _.extend(this._defaults, cfg || {});
  },

  routes: {
    "": "showIndex",
    "login": "showLogin"
  },

  showIndex: function() {
    console.log('rendering index view');
    this._renderView(new indexView(this.configs));
  },

  showLogin: function() {
    console.log('rendering login view...');
    this._renderView(new loginView(this.configs));
  },

  _renderView: function(view) {
    console.log('rendering a view...');
    var el = Backbone.$(this.configs.viewEl);
    el.html(view.render().el);
  }
});


module.exports = Router;

var Backbone = require('backbone');
var _ = require('underscore');

//import views
var Viewport = require('./views/viewport');
var IndexView = require('./views/index');
var LoginView = require('./views/login');
var SearchView = require('./views/search');

//class Router
//handles all routing for the application
module.exports = Backbone.Router.extend({

  _defaults: {
    viewEl: 'body' //graceful fail
  },

  //setup routes
  routes: {
    "": "showIndex",
    "login": "showLogin",
    "search/:term": "showSearchResults"
  },

  initialize: function(cfg) {
    console.log('initializing routing');
    this.configs = _.extend(this._defaults, cfg || {});

    //create main viewport
    var viewport = new Viewport(this.configs);

    //render viewport
    viewport.render();
  },

  //index page
  showIndex: function() {
    console.log('rendering index view');
    this._renderView(new IndexView(this.configs));
  },

  //login page
  showLogin: function() {
    console.log('rendering login view...');
    this._renderView(new LoginView(this.configs));
  },

  //search page
  showSearchResults: function(searchTerm) {
    console.log('rendering search results view...');

    //create config for search view
    var cfg = _.extend({
      searchTerm: searchTerm //pass search term to view
    }, this.configs);

    this._renderView(new SearchView(cfg));
  },

  //render specified view into selector
  _renderView: function(view, selector) {
    var el = Backbone.$(selector || this.configs.viewEl);
    el.html(view.render().el);
  }
});

var Backbone = require('backbone');
var _ = require('underscore');

//import views
var IndexView = require('./views/index');
var LoginView = require('./views/login');
var Viewport = require('./views/viewport');

var Router = Backbone.Router.extend({

  _defaults: {
    viewEl: 'body' //graceful fail
  },

  initialize: function(cfg) {
    console.log('initializing routing');
    this.configs = _.extend(this._defaults, cfg || {});


    //create main viewport
    var viewport = new Viewport(this.configs);

    //render viewport
    viewport.render();
  },

  routes: {
    "": "showIndex",
    "login": "showLogin"
  },

  showIndex: function() {
    console.log('rendering index view');
    this._renderView(new IndexView(this.configs));
  },

  showLogin: function() {
    console.log('rendering login view...');
    this._renderView(new LoginView(this.configs));
  },

  _renderView: function(view, selector) {
    console.log('rendering a view...');
    var el = Backbone.$(selector || this.configs.viewEl);
    el.html(view.render().el);
  }
});


module.exports = Router;

var Backbone = require('backbone');
var _ = require('underscore');

//import views
var loginView = require('./views/login');

var Router = Backbone.Router.extend({

  viewEl: '#content',

  routes: {
    "": "showLogin"
  },

  showLogin: function() {
    this._renderView(new loginView());
  },

  _renderView: function(view) {
    Backbone.$(this.viewEl).html(view.render().el);
  }
});


module.exports = Router;

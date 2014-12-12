var Backbone = require('backbone');
var _ = require('underscore');


//helper class for all future views
module.exports = Backbone.View.extend({

  $: Backbone.$,

  _defaults: {},

  initialize: function(cfg) {
    this.configs = _.extend(this._defaults, cfg || {});
  },

  getUser: function() {
    return this.configs.user || {};
  },

  //helper function to return html from DOM templates
  $html: function(selector) {
    return Backbone.$(selector).html();
  }
});

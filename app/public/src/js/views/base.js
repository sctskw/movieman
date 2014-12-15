var Backbone = require('backbone');
var _ = require('underscore');


//helper class for all future views
module.exports = Backbone.View.extend({

  $: Backbone.$,

  _defaults: {},

  initialize: function(cfg) {
    this.initConfigs(cfg);
  },

  initConfigs: function(cfg) {
    this.configs = _.extend(this._defaults, cfg || {});
  },

  getUser: function() {
    return this.configs.user || {};
  },

  getUserName: function() {
    return this.getUser().username;
  },

  //helper function to return html from DOM templates
  $html: function(selector) {
    return Backbone.$(selector).html();
  },

  //helper function to create a template func
  $tpl: _.template
});

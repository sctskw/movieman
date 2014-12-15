var Backbone = require('backbone');
var _ = require('underscore');

//Class BaseView
//helper class for all future views
module.exports = Backbone.View.extend({

  _defaults: {},

  initialize: function(cfg) {
    this.initConfigs(cfg);
  },

  //cache configuration object
  initConfigs: function(cfg) {
    this.configs = _.extend(this._defaults, cfg || {});
  },

  //return user data
  getUser: function() {
    return this.configs.user || {};
  },

  //return username
  getUserName: function() {
    return this.getUser().username;
  },

  //helper function to return html from DOM templates
  $html: function(selector) {
    return Backbone.$(selector).html();
  },

  //helper function to create a template func
  $tpl: _.template,

  //jquery helper
  $: Backbone.$
});

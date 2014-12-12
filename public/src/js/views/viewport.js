var BaseView = require('./base');
var _ = require('underscore');

module.exports = BaseView.extend({

  _renderHeader: function() {
    var user = this.getUser();
    var tpl= this.$html('#tpl-header');
    var template = _.template(tpl);
    this.$('body').append(template({username: user.name}));
  },

  _renderFooter: function() {
    var tpl= this.$html('#tpl-footer');
    var template = _.template(tpl);
    this.$('body').append(template());
  },

  render: function() {
    console.log('rendering viewport');
    this._renderHeader();
    this._renderFooter();
    return this;
  }
});

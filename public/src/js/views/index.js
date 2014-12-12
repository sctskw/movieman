var BaseView = require('./base');
var _ = require('underscore');

module.exports = BaseView.extend({

  render: function() {
    var user = this.getUser();
    var template = _.template(this.$html('#tpl-welcome-banner'));
    this.$el.html(template({name: user.name}));
    return this;
  }
});

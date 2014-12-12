var BaseView = require('./base');

module.exports = BaseView.extend({

  render: function() {
    this.$el.html(this.$html('#tpl-login-form'));
    return this;
  }
});

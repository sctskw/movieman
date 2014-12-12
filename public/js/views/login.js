var BaseView = require('./base');

module.exports = BaseView.extend({

  render: function() {
    this.$el.html(this.$html('#login-form'));
    return this;
  }
});

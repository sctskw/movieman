var BaseView = require('./base');

//Class LoginView
//shows the login form
module.exports = BaseView.extend({

  //render view
  render: function() {
    this.$el.html(this.$html('#tpl-login-form'));
    return this;
  }
});

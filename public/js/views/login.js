var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: '<h1>Login Page!</h1>',

  render: function() {
    this.$el.html(this.template);
    return this;
  }
});

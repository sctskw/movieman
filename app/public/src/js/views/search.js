var BaseView = require('./base');

module.exports = BaseView.extend({

  initialize: function(cfg) {
    this.searchTerm = cfg.searchTerm;
  },

  render: function() {
    var html = this.$html('#tpl-search-results');
    var template = this.$tpl(html);

    this.$el.html(template({searchTerm: this.searchTerm}));
    return this;
  }
});

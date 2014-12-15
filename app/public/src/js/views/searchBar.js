var BaseView = require('./base');

module.exports = BaseView.extend({

  tagName: 'div',
  id: 'search-bar',
  className: 'search-bar',

  events: {
    "submit": "onSearch"
  },

  onSearch: function($event) {
    $event.preventDefault();
    var input = this.$($event.currentTarget).find('.search-input');
    var term = encodeURIComponent(input.val());

    //change route
    App.routes.navigate('/search/' + term, true);
  },

  render: function() {
    var html = this.$html('#tpl-search-bar');
    var template = this.$tpl(html);
    this.$el.html(template());
    return this;
  }
});

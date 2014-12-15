var BaseView = require('./base');

module.exports = BaseView.extend({

  tagName: 'div',
  id: 'search-bar',
  className: 'search-bar',

  inputSelector: '.search-input',

  events: {
    "submit": "onSearch", //handles enter key submit
    "click .submit": "onSearch"
  },

  getSearchTerm: function() {
    return this.$el.find(this.inputSelector).val();
  },

  doSearch: function(term) {
    //change route
    App.routes.navigate('/search/' + encodeURIComponent(term), true);
  },

  onSearch: function($event) {
    $event.preventDefault();
    this.doSearch(this.getSearchTerm());
  },

  render: function() {
    var html = this.$html('#tpl-search-bar');
    var template = this.$tpl(html);
    this.$el.html(template());
    this.delegateEvents(); //force event behavior
    return this;
  }
});

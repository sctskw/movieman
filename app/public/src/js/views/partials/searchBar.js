var BaseView = require('../base');

//Class SearchBar
//partial view contains the search form
module.exports = BaseView.extend({

  tagName: 'div',
  id: 'search-bar',
  className: 'search-bar',

  inputSelector: '.search-input',

  events: {
    "submit": "onSearch", //handles enter key submit
    "click .submit": "onSearch" //handles button press
  },

  //return the value of the search input
  getSearchTerm: function() {
    return this.$el.find(this.inputSelector).val();
  },

  //perform search
  doSearch: function(term) {
    //change route
    App.routes.navigate('/search/' + encodeURIComponent(term), true);
  },

  //fires when user triggers search submission
  onSearch: function($event) {
    $event.preventDefault();
    this.doSearch(this.getSearchTerm());
  },

  //render the view
  render: function() {
    var html = this.$html('#tpl-search-bar');
    var template = this.$tpl(html);
    this.$el.html(template());
    this.delegateEvents(); //force event behavior
    return this;
  }
});

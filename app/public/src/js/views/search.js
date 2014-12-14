var BaseView = require('./base');
var SearchResults = require('../collections/searchResults');

module.exports = BaseView.extend({

  initialize: function(cfg) {
    var self = this;

    this.searchTerm = cfg.searchTerm;

    //fetch search results
    this.results = new SearchResults({
      searchTerm: this.searchTerm
    });

    //fetch results
    this.results.fetch().then(function(results){
      self.renderSearchResults(results);
    });
  },

  //hide the loading indicator
  stopLoading: function() {
    this.$('#search-loader').hide();
  },

  //show the loading indicator
  startLoading: function() {
    this.$('#search-loader').show();
  },

  renderSearchResults: function(results) {
    var html = this.$html('#tpl-search-results');
    var template = this.$tpl(html);

    //hide the loading indicator
    this.stopLoading();

    //render results list
    this.$('#search-results').append(template({
      searchTerm: this.searchTerm,
      results: results
    }));


  },

  render: function() {
    var html = this.$html('#tpl-search-view');
    var template = this.$tpl(html);

    this.$el.html(template({
      searchTerm: this.searchTerm
    }));

    return this;
  }
});

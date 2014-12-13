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
    this.results.fetch().then(function(){
      self.renderSearchResults();
    });
  },

  renderSearchResults: function() {
    var html = this.$html('#tpl-search-results');
    var template = this.$tpl(html);

    this.$('#search-results').append(template({
      searchTerm: this.searchTerm,
      results: this.results.models
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
